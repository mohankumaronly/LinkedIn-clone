const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userAuthModel = require('../authModels/UserAuthModel');
const { verifyMail } = require('../emailVerify/verifyMail');
const Session = require('../authModels/sessionModel');
const { sendOtpMail } = require('../emailVerify/sendOtpMail');


const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }
        const existingUser = await userAuthModel.findOne({ email })
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = await userAuthModel.create({
            username,
            email,
            password: hashedPassword
        })
        const token = jwt.sign({ id: newUser._id }, process.env.SECRET_KEY, { expiresIn: "10m" })
        verifyMail(token, email)
        newUser.token = token
        await newUser.save()
        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: newUser
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })

    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            })
        }
        const user = await userAuthModel.findOne({ email })
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized access"
            })
        }
        const passwordCheck = await bcrypt.compare(password, user.password)
        if (!passwordCheck) {
            return res.status(402).json({
                success: false,
                message: "Incorrect Password"
            })
        }
        if (user.isVerified !== true) {
            return res.status(403).json({
                success: false,
                message: "Verify your account than login"
            })
        }
        const existingSession = await Session.findOne({ userId: user._id });
        if (existingSession) {
            await Session.deleteOne({ userId: user._id })
        }
        await Session.create({ userId: user._id })
        const accessToken = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: "10d" })
        const refreshToken = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: "30d" })

        user.isLoggedIn = true;
        await user.save()

        return res.status(200).json({
            success: true,
            message: `Welcome back ${user.username}`,
            accessToken,
            refreshToken,
            user
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }

}

const logoutUser = async (req, res) => {

    try {
        const userId = req.userId;
        await Session.deleteMany({ userId });
        await userAuthModel.findByIdAndUpdate(userId, { isLoggedIn: false })
        return res.status(200).json({
            success: true,
            message: "Logged out successfully"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await userAuthModel.findOne({ email })
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const expiry = new Date(Date.now() + 10 * 60 * 1000)

        user.otp = otp;
        user.otpExpiry = expiry;
        await user.save()
        await sendOtpMail(email, otp);
        return res.status(200).json({
            success: true,
            message: "OTP sent successfully"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const changePassword = async (req, res) => {
    const { newPassword, confirmPassword } = req.body
    const email = req.params.email

    if (!newPassword || !confirmPassword) {
        return res.status(400).json({
            success: false,
            message: "All fields are required"
        })
    }

    if (newPassword !== confirmPassword) {
        return res.status(400).json({
            success: false,
            message: "Password do not match"
        })
    }

    try {
        const user = await userAuthModel.findOne({ email })
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10)
        user.password = hashedPassword
        await user.save()

        return res.status(200).json({
            success: true,
            message: "Password changed successsfully"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    forgotPassword,
    changePassword
}
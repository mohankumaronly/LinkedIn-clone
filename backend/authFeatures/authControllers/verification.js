require('dotenv').config();
const jwt = require('jsonwebtoken');
const userAuthModel = require('../authModels/UserAuthModel');

const verification = async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                success: false,
                message: "Authorization token is missing or invalid"
            })
        }

        const token = authHeader.split(" ")[1]

        let decoded;
        try {
            decoded = jwt.verify(token, process.env.SECRET_KEY)
        } catch (err) {
            if (err.name === "TokenExpiredError") {
                return res.status(400).json({
                    success: false,
                    message: "The registration token has expired"
                })
            }
            return res.status(400).json({
                success: false,
                message: "Token verification failed"
            })
        }
        const user = await userAuthModel.findById(decoded.id)
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }

        user.token = null
        user.isVerified = true
        await user.save()

        return res.status(200).json({
            success: true,
            message: "Email verified successfully"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const verifyOTP = async (req, res) => {
    const { otp } = req.body
    const email = req.params.email

    if (!otp) {
        return res.status(400).json({
            success: false,
            message: "OTP is required"
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
        if (!user.otp || !user.otpExpiry) {
            return res.status(400).json({
                success: false,
                message: "OTP not generated or already verified"
            })
        }
        if (user.otpExpiry < new Date()) {
            return res.status(400).json({
                success: false,
                message: "OTP has expired. Please request a new one"
            })
        }
        if (otp !== user.otp) {
            return res.status(400).json({
                success: false,
                message: "Invalid OTP"
            })
        }

        user.otp = null
        user.otpExpiry = null
        await user.save()

        return res.status(200).json({
            success: true,
            message: "OTP verified successfully"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

module.exports = {
    verification,
    verifyOTP,
}
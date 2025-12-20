const mongoose = require('mongoose');

const userAuthSchema = mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    isVerified: { type: Boolean, default: false },
    isLoggedIn: { type: Boolean, default: false },
    token: { type: String, default: null },
    otp: { type: String, default: null },
    otpExpiry: { type: String, default: null }
}, { timestamps: true });

const userAuthModel = mongoose.model('userAuth', userAuthSchema);

module.exports = userAuthModel;
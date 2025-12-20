const express = require('express');
const { registerUser, loginUser, logoutUser, forgotPassword, changePassword } = require('../authControllers/userAuthControllers');
const { verification, verifyOTP } = require('../authControllers/verification');
const { isAuthenticated } = require('../middleware/isAuthenticated');
const { validateUser, userSchema } = require('../validators/userValidators');

const router = express.Router();

router.post('/register', validateUser(userSchema), registerUser);
router.post('/verify', verification);
router.post('/login', loginUser);
router.post('/logout', isAuthenticated, logoutUser);
router.post('/forgot-password', forgotPassword);
router.post('/verify-otp/:email', verifyOTP);
router.post('/change-password/:email', changePassword);


module.exports = router;
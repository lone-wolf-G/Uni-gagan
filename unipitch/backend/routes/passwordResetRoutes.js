const express = require('express');
const { requestOtp, verifyOtp, resetPassword } = require('../controllers/passwordResetController');

const router = express.Router();

// Request OTP
router.post('/request-otp', requestOtp);

// Verify OTP
router.post('/verify-otp', verifyOtp);

// Reset Password
router.post('/reset-password', resetPassword);

module.exports = router;

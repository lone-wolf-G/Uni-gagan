const express = require('express');
const emailController = require('../controllers/emailController');

const router = express.Router();

// Google OAuth redirect
router.get('/google', emailController.googleAuth);

// Google OAuth callback
router.get('/google/callback', emailController.googleAuthCallback);

// Send email
router.post('/send-email', emailController.sendEmail);

module.exports = router;

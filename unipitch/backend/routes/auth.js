const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');


const otpHelper = require('../helpers/otpHelpers');
const nodemailer = require('nodemailer'); // For sending emails

require('dotenv').config(); // Load environment variables from .env file

const router = express.Router();

// Register
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body; // Change `username` to `name`

    console.log('Request Body:', req.body);
    //const name = username;
    console.log("Request Body:", req.body);  // log to inspect the incoming data
    
    try {
        // Validation: Ensure all fields are provided
        if (!username || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }  
        // Log plaintext password
        console.log('Plaintext Password:', password);

        // Log request body for debugging
        console.log('Register Request Body:', req.body);

        // Check if the user already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Log hashed password
        console.log('Hashed Password:', hashedPassword);

        // Create a new user
        const user = await User.create({
            name: username, // Save `name` directly in the database
            email,
            password, //  it will be hashed in the schema middleware
        });

        res.status(201).json({
            message: 'User registered successfully',
            user: {
                id: user._id,
                name: user.name, // Corrected to use `name` here
                email: user.email,
            },
        });
    } catch (error) {
        console.error('Error during registration:', error.message);

        // Handle MongoDB duplicate key error
        if (error.code === 11000) {
            return res.status(400).json({ message: 'Email already in use' });
        }

        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Login

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Log the incoming request body for debugging
        console.log('Login request data:', req.body);

        // Check if the user exists
        const user = await User.findOne({ email });

        // Log the found user (if any) for debugging
        console.log('User found:', user);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        
        // Log the passwords for comparison
        console.log('Plaintext Password:', password);
        console.log('Hashed Password from DB:', user.password);

        // Validate password
        const isMatch = await bcrypt.compare(password, user.password);
        console.log('Password match:', isMatch);  // This should log `true` if the passwords match

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        res.status(200).json({ token, message: 'Login successful' });
    } catch (error) {
        console.error('Error during login:', error.message);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});


/* Reset Password
router.post("/reset-password", async (req, res) => {
    const { otp, newPassword, email } = req.body;

    try {
        // Validate OTP
        const savedOtp = otps[email];
        if (!savedOtp || savedOtp.otp !== otp || Date.now() > savedOtp.expiresAt) {
            return res.status(400).json({ message: "Invalid or expired OTP" });
        }

        // Hash new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        // Update user password
        await User.findOneAndUpdate({ email }, { password: hashedPassword });

        // Clear OTP
        delete otps[email];

        res.status(200).json({ message: "Password reset successfully" });
    } catch (error) {
        console.error("Error resetting password:", error.message);
        res.status(500).json({ message: "Error resetting password" });
    }
});
*/





module.exports = router;

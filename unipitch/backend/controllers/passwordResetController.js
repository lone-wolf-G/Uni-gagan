const { storeOtp, getOtp, deleteOtp } = require('../helpers/otpHelpers');
const User = require('../models/user'); // Ensure this is your User model
const { sendOtpEmail } = require('../helpers/emailHelper');
const bcrypt = require('bcryptjs');

/**
 * Request OTP for password reset
 */
exports.requestOtp = async (req, res) => {
    const { email } = req.body;
    try {
        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Generate OTP and store in Redis
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        await storeOtp(email, otp);

        // Send OTP via email
        await sendOtpEmail(email, otp);

        res.status(200).json({ message: 'OTP sent to your email' });
    } catch (error) {
        console.error('Error in requestOtp:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

/**
 * Verify OTP for password reset
 */
exports.verifyOtp = async (req, res) => {
    const { email, otp } = req.body;
    try {
        // Check OTP in Redis
        const storedOtp = await getOtp(email);
        if (!storedOtp || storedOtp !== otp) {
            return res.status(400).json({ message: 'Invalid or expired OTP' });
        }

        // Delete OTP after successful verification
        await deleteOtp(email);

        res.status(200).json({ message: 'OTP verified successfully' });
    } catch (error) {
        console.error('Error in verifyOtp:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


/**
 * Reset password
*/
exports.resetPassword = async (req, res) => {
    const { email, newPassword, otp } = req.body;

    try {
        // Check for missing fields
        if (!email || !newPassword || !otp) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Retrieve OTP from Redis
        const storedOtp = await getOtp(email);
        if (!storedOtp || storedOtp !== otp) {
            return res.status(400).json({ message: 'Invalid or expired OTP' });
        }

        // Find the user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isHashed = newPassword.startsWith('$2a$'); // Check if the password is already hashed
        if (!isHashed) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(newPassword, salt);

        } else {
            user.password = newPassword; // Save the provided password directly
        }

        console.log('Password from reset password:', newPassword);
        console.log('Hashed Password from reset password:', user.password);
        await user.save();
        

        // Delete OTP after successful password reset
        await deleteOtp(email);

        res.status(200).json({ message: 'Password reset successfully' });
    } catch (error) {
        console.error('Error in resetPassword:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
 

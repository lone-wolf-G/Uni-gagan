import axios from 'axios';

// Backend API base URL
const API_URL = "http://localhost:5000/api/auth";

// Register user
export const registerUser = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/register`, userData);
        return response.data;
    } catch (error) {
        console.error("Error during registration:", error.response.data);
        throw error.response.data;
    }
};

// Login user
export const loginUser = async (credentials) => {
    try {
        const response = await axios.post(`${API_URL}/login`, credentials);
        return response.data;
    } catch (error) {
        console.error("Error during login:", error.response.data);
        throw error.response.data;
    }
};

// Send OTP
export const sendOtp = async (email) => {
    const response = await axios.post(`${API_URL}/send-otp`, { email });
    return response.data;
};

// Reset Password
export const resetPassword = async (data) => {
    const response = await axios.post(`${API_URL}/reset-password`, data);
    return response.data;
};
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";  // Add this import
//import './Register'; // Reusing the CSS file

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();  // For navigation

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email || !/\S+@\S+\.\S+/.test(email)) {
            setError('Please enter a valid email address');
            return;
          }
        setMessage("");
        setError("");

        try {
            const response = await axios.post("http://localhost:5000/api/password-reset/request-otp", { email });
            setMessage(response.data.message);
            // Redirect to ResetPassword page if OTP is correct
            navigate("/reset-password");

        } catch (err) {
            setError(err.response?.data?.message || "Something went wrong!");
        }
    };

    return (
        <div style={{ textAlign: "center", padding: "20px" }}>
            <h2>Forgot Password</h2>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: "10px" }}>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={{ padding: "8px", width: "250px" }}
                    />
                </div>
                {message && <p style={{ color: "green" }}>{message}</p>}
                {error && <p style={{ color: "red" }}>{error}</p>}
                <button type="submit" style={{ padding: "10px 20px" }}>Send OTP</button>
            </form>
        </div>
    );
};

export default ForgotPassword;

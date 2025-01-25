import React, { useState } from "react";
import axios from "axios";
import { Link,useNavigate } from "react-router-dom";  // Add this import
import './ForgotPassword.css'; // Reusing the CSS file

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
        <div className="forgot-password-container">
            <h2>Forgot Password</h2>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: "10px" }}>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                {message && <p className="success-message">{message}</p>}
                {error && <p className="error-message">{error}</p>}
                <button type="submit">Send OTP</button>
            </form>
            <div className="link-container">
                <p>
                    Remember your password?{" "}
                    <Link to="/login">
                        Login here
                    </Link>
                </p>
                <p>
                    Don't have an account?{" "}
                    <Link to="/register">
                        Create Account
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default ForgotPassword;

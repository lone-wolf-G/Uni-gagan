import React, { useState } from "react";
import { loginUser } from "../services/authService"; // Auth service for API call
import { Link, useNavigate } from "react-router-dom";
import "./Login.css"; // Import external CSS for better styling

const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [error, setError] = useState(null); // To store error messages
    const navigate = useNavigate(); // To navigate to other routes

    // Handle form input changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const [loading, setLoading] = useState(false);

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null); // Clear previous errors
        setLoading(true); // Show loading indicator
        try {
            const { token } = await loginUser(formData); // Call the auth service
            alert("Login successful!");
            localStorage.setItem("token", token); // Store token in local storage
            navigate("/dashboard/user"); // Redirect to dashboard
        } catch (error) {
            console.error("Login error:", error.message); // Log error for debugging
            setError(error.message || "Invalid credentials. Please try again.");
        }finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="input-container">
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="input-container">
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                {error && <p className="error-message">{error}</p>}
                <button type="submit">Login</button>
            </form>

            {/* Links for forgot password and creating an account */}
            <div className="links-container">
                <p className="forgot-password-link">
                    Forgot your password?{" "}
                    <Link to="/forgot-password">Reset it here</Link>
                </p>
                <p className="create-account-link">
                    Don't have an account?{" "}
                    <Link to="/register">Create Account</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;

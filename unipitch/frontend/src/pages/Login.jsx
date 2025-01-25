import React, { useState } from "react";
import { loginUser } from "../services/authService"; // Auth service for API call
import { Link, useNavigate } from "react-router-dom";

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

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null); // Clear previous errors
        try {
            const { token } = await loginUser(formData); // Call the auth service
            alert("Login successful!");
            localStorage.setItem("token", token); // Store token in local storage
            navigate("/dashboard/user"); // Redirect to dashboard
        } catch (error) {
            console.error("Login error:", error.message); // Log error for debugging
            setError(error.message || "Invalid credentials. Please try again.");
        }
    };

    return (
        <div style={{ textAlign: "center", padding: "20px" }}>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: "10px" }}>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        style={{ padding: "8px", width: "250px" }}
                    />
                </div>
                <div style={{ marginBottom: "10px" }}>
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        style={{ padding: "8px", width: "250px" }}
                    />
                </div>
                {error && <p style={{ color: "red" }}>{error}</p>}
                <button type="submit" style={{ padding: "10px 20px" }}>Login</button>
            </form>
            <p>
                Forgot your password?{" "}
                <Link to="/forgot-password" style={{ color: "blue", textDecoration: "underline" }}>
                    Reset it here
                </Link>
            </p>
            <p>
                Don't have an account?{" "}
                <Link to="/register" style={{ color: "blue", textDecoration: "underline" }}>
                    Create Account
                </Link>
            </p>
        </div>
    );
};

export default Login;

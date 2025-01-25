import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Register.css"; // Import external CSS for better styling

const Register = () => {
    const [formData, setFormData] = useState({
        username: "", 
        email: "",
        password: "",
    });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const [loading, setLoading] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);
        try {
            console.log('Form Data:', formData);
            // Send data to the backend
            const response = await axios.post("http://localhost:5000/api/auth/register", formData);


            if (response.status === 201) {
                setSuccess("Account created successfully!");
                setTimeout(() => {
                    navigate("/login"); // Redirect to login after successful registration
                }, 2000);
            }
        } catch (error) {
            // Handle errors from the backend
            setError(error.response?.data?.message || "Registration failed!");
        }finally {
        setLoading(false);
        }
    };

    return (
        <div className="register-container">
            <h2>Create Account</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="username" // Changed from "Name" to "name" to match backend expectations
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                {error && <p className="error-message">{error}</p>}
                {success && <p className="success-message">{success}</p>}
                <button type="submit">Register</button>
            </form>
            <p>
                Already have an account? <a href="/login">Login here</a>
            </p>
        </div>
    );
};

export default Register;

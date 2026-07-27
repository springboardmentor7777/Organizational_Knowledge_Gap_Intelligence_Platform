import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Signup.css";

const Signup = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSignup = (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        // TODO: Connect Backend API

        alert("Account Created Successfully!");

        navigate("/");
    };

    return (

        <div className="signup-page">

            <div className="signup-card">

                <div className="signup-header">

                    <div className="logo-circle">
                        🎓
                    </div>

                    <h2>Create Account</h2>

                    <p>Knowledge Gap Intelligence Platform</p>

                </div>

                <form onSubmit={handleSignup}>

                    <div className="input-group">

                        <label>Full Name</label>

                        <input
                            type="text"
                            name="fullName"
                            placeholder="Enter Full Name"
                            value={formData.fullName}
                            onChange={handleChange}
                            required
                        />

                    </div>

                    <div className="input-group">

                        <label>Email</label>

                        <input
                            type="email"
                            name="email"
                            placeholder="Enter Email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />

                    </div>

                    <div className="input-group">

                        <label>Password</label>

                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Enter Password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />

                    </div>

                    <div className="input-group">

                        <label>Confirm Password</label>

                        <input
                            type={showPassword ? "text" : "password"}
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                        />

                    </div>

                    <div className="checkbox">

                        <input
                            type="checkbox"
                            onChange={() => setShowPassword(!showPassword)}
                        />

                        <span>Show Password</span>

                    </div>

                    <button className="signup-btn">

                        Create Account

                    </button>

                </form>

                <div className="login-link">

                    Already have an account?

                    <Link to="/"> Login</Link>

                </div>

            </div>

        </div>

    );

};

export default Signup;
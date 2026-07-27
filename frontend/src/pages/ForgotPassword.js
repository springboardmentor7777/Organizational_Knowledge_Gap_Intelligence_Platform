import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./ForgotPassword.css";

const ForgotPassword = () => {

    const [email, setEmail] = useState("");
    const [otpSent, setOtpSent] = useState(false);
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const sendOTP = (e) => {
        e.preventDefault();

        // TODO: Call Backend API
        alert("OTP sent successfully!");

        setOtpSent(true);
    };

    const resetPassword = (e) => {

        e.preventDefault();

        if (newPassword !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        // TODO: Verify OTP & Reset Password

        alert("Password changed successfully!");

    };

    return (

        <div className="forgot-page">

            <div className="forgot-card">

                <div className="forgot-header">

                    <div className="logo-circle">
                        🔐
                    </div>

                    <h2>Forgot Password</h2>

                    <p>Reset your account password</p>

                </div>

                {!otpSent ? (

                    <form onSubmit={sendOTP}>

                        <div className="input-group">

                            <label>Email Address</label>

                            <input
                                type="email"
                                placeholder="Enter Email"
                                value={email}
                                onChange={(e)=>setEmail(e.target.value)}
                                required
                            />

                        </div>

                        <button className="forgot-btn">

                            Send OTP

                        </button>

                    </form>

                ) : (

                    <form onSubmit={resetPassword}>

                        <div className="input-group">

                            <label>OTP</label>

                            <input
                                type="text"
                                placeholder="Enter OTP"
                                value={otp}
                                onChange={(e)=>setOtp(e.target.value)}
                                required
                            />

                        </div>

                        <div className="input-group">

                            <label>New Password</label>

                            <input
                                type="password"
                                placeholder="New Password"
                                value={newPassword}
                                onChange={(e)=>setNewPassword(e.target.value)}
                                required
                            />

                        </div>

                        <div className="input-group">

                            <label>Confirm Password</label>

                            <input
                                type="password"
                                placeholder="Confirm Password"
                                value={confirmPassword}
                                onChange={(e)=>setConfirmPassword(e.target.value)}
                                required
                            />

                        </div>

                        <button className="forgot-btn">

                            Reset Password

                        </button>

                    </form>

                )}

                <div className="back-login">

                    <Link to="/">← Back to Login</Link>

                </div>

            </div>

        </div>

    );

};

export default ForgotPassword;
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();

    // TODO: Replace with your authentication logic
    console.log({
      email,
      password,
      rememberMe,
    });

    navigate("/dashboard");
  };

  return (
    <div className="login-page">
      <div className="login-card">

        <div className="login-header">
          <div className="logo-circle">🎓</div>
          <h2>Knowledge Gap Intelligence Platform</h2>
          <p>Welcome Back</p>
        </div>

        <form onSubmit={handleLogin}>

          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>

            <div className="password-box">

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter Password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                required
              />

              <button
                type="button"
                className="show-btn"
                onClick={()=>setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>

            </div>

          </div>

          <div className="login-options">

            <label>

              <input
                type="checkbox"
                checked={rememberMe}
                onChange={()=>setRememberMe(!rememberMe)}
              />

                  Remember Me

            </label>

            <Link to="/forgot-password">
              Forgot Password?
            </Link>

          </div>

          <button className="login-btn">
            Login
          </button>

        </form>

        <div className="divider">
          OR
        </div>

        <button
          className="signup-btn"
          onClick={()=>navigate("/signup")}
        >
          Create New Account
        </button>

      </div>
    </div>
  );
};

export default Login;
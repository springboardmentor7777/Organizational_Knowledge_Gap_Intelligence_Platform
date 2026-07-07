import React from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        flexDirection: "column",
      }}
    >
      <h1 className="text-center px-3 mb-4">Knowledge Gap Intelligence Platform</h1>

      <input
        type="email"
        placeholder="Email"
        style={{ width: "250px", marginBottom: "10px" }}
      />

      <input
        type="password"
        placeholder="Password"
        style={{ width: "250px", marginBottom: "10px" }}
      />

      <button
        onClick={() => navigate("/dashboard")}
        style={{
          padding: "10px 20px",
          cursor: "pointer",
        }}
      >
        Login
      </button>
    </div>
  );
}

export default Login;
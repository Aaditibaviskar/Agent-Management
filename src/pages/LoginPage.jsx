import React, { useState } from "react";
import { Navigate, useNavigate, Link } from "react-router-dom";
import { getCurrentUser, login } from "../services/authService";

function LoginPage() {
  const navigate = useNavigate();
  const currentUser = getCurrentUser();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  if (currentUser) {
    return <Navigate to={currentUser.role === "ADMIN" ? "/admin" : currentUser.role === "MANAGER"
          ? "/manager" : "/"} replace />;
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");

  try {
    const user = await login(formData.email, formData.password);

    if (user.role === "ADMIN") {
      navigate("/admin", { replace: true });
    } else if (user.role === "MANAGER") {
      navigate("/manager", { replace: true });
    } else {
      navigate("/", { replace: true });
    }

  } catch (err) {
    setError(err.response?.data?.message || "Invalid email or password");
  }
};

  // ===== Internal Styles =====
  return (
  <div
    style={{
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "#e5e7eb",
      padding: "20px",
    }}
  >
    <div
      style={{
        width: "1200px",
        height: "700px",
        display: "flex",
        borderRadius: "25px",
        overflow: "hidden",
        boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
        background: "#0f172a",
      }}
    >
      {/* Left Side */}
      <div
        style={{
          flex: 1,
          position: "relative",
           backgroundImage: "url('/images/img.jpeg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(0,0,40,0.9), rgba(0,0,0,0.2))",
          }}
        />

        <div
          style={{
            position: "absolute",
            bottom: "60px",
            width: "100%",
            textAlign: "center",
            color: "white",
            zIndex: 2,
          }}
        >
          <h1
            style={{
              fontSize: "48px",
              fontWeight: "300",
              marginBottom: "10px",
            }}
          >
            Real Estate CRM
          </h1>

          <p
            style={{
              fontSize: "20px",
              opacity: 0.9,
            }}
          >
            Manage Properties, Leads & Customers
          </p>
        </div>
      </div>

      {/* Right Side */}
      <div
        style={{
          flex: 1,
          background:
            "linear-gradient(180deg,#020617 0%, #0f172a 40%, #1d4ed8 100%)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "50px",
        }}
      >
        <form
          onSubmit={handleSubmit}
          style={{
            width: "100%",
            maxWidth: "400px",
            color: "white",
          }}
        >
          <p
            style={{
              color: "#94a3b8",
              marginBottom: "10px",
            }}
          >
            Login to your account
          </p>

          <h1
            style={{
              fontSize: "48px",
              marginBottom: "30px",
            }}
          >
            Welcome Back!
          </h1>

          {error && (
            <div
              style={{
                background: "#dc2626",
                padding: "12px",
                borderRadius: "8px",
                marginBottom: "20px",
              }}
            >
              {error}
            </div>
          )}

          <div style={{ marginBottom: "20px" }}>
            <label>Email Address</label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
              style={{
                width: "100%",
                marginTop: "8px",
                padding: "15px",
                borderRadius: "12px",
                border: "1px solid rgba(255,255,255,0.15)",
                background: "rgba(255,255,255,0.05)",
                color: "white",
                outline: "none",
              }}
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label>Password</label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Enter your password"
              style={{
                width: "100%",
                marginTop: "8px",
                padding: "15px",
                borderRadius: "12px",
                border: "1px solid rgba(255,255,255,0.15)",
                background: "rgba(255,255,255,0.05)",
                color: "white",
                outline: "none",
              }}
            />
          </div>

          <div
            style={{
              textAlign: "right",
              marginBottom: "25px",
            }}
          >
            <a
              href="#"
              style={{
                color: "#cbd5e1",
                textDecoration: "none",
              }}
            >
              Forgot Password?
            </a>
          </div>

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "16px",
              border: "none",
              borderRadius: "12px",
              background: "#000",
              color: "white",
              fontSize: "18px",
              cursor: "pointer",
              fontWeight: "600",
            }}
          >
            Sign In
          </button>

          <Link
            to="/inquiry"
            style={{
              display: "block",
              textAlign: "center",
              marginTop: "20px",
              color: "#fff",
              textDecoration: "none",
            }}
          >
            Submit Inquiry
          </Link>
        </form>
      </div>
    </div>
  </div>
);

}  

export default LoginPage;
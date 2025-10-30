import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

const LoginPage = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [changingText, setChangingText] = useState(0);
  const navigate = useNavigate();

  const textOptions = [
    "Empower Your Vision",
    "Build the Future",
    "Secure Your Access",
    "Join Our Community",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setChangingText((prev) => (prev + 1) % textOptions.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/main");
    }
  }, [navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
  const LOGIN_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';
    try {
      const response = await fetch(`${LOGIN_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
        }),
        credentials: "include",
      });

      const data = await response.json();
      console.log("🔹 Login response:", data);

      if (!response.ok) throw new Error(data.message || "Login failed");

      localStorage.setItem("token", data.accessToken);
      localStorage.setItem("user", JSON.stringify(data.user));

      navigate("/main");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="lgnpg-container">
      {/* Left Side - Form */}
      <div className="lgnpg-left">
        <div className="lgnpg-form-box">
          <h2>Welcome Back 👋</h2>
          <p className="lgnpg-subtext">Login to your account</p>

          {error && <div className="lgnpg-error">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="lgnpg-form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
                disabled={loading}
              />
            </div>

            <div className="lgnpg-form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
                disabled={loading}
              />
            </div>

            <button type="submit" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <div className="lgnpg-links">
            <p>
              Don't have an account?{" "}
              <span className="lgnpg-link" onClick={() => navigate("/signup")}>
                Sign up
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Glassy Visual */}
      <div className="lgnpg-right">
        <div className="lgnpg-overlay"></div>
        <div className="lgnpg-content">
          <h2>Welcome to Your Space</h2>
          <h4 className="lgnpg-changing-text">{textOptions[changingText]}</h4>
          <p>
            Join thousands of users who trust our platform for secure and seamless authentication.
          </p>
          <div className="lgnpg-features">
            <div>🔒 Secure JWT Authentication</div>
            <div>🚀 Fast & Reliable</div>
            <div>💼 Personalized Dashboard</div>
            <div>🌐 Cross-Platform Access</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

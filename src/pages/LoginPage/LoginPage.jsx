import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://sincut-razorpay.vercel.app';

const LoginPage = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // If user already logged in via cookie → redirect
  useEffect(() => {
    checkLoggedIn();
  }, []);

  async function checkLoggedIn() {
    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/me`, {
        method: "GET",
        credentials: "include",   // send cookies
      });

      if (res.ok) {
        navigate("/main");
      }
    } catch (err) {
      console.log("User not logged in yet");
    }
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
        credentials: "include", // <-- CRUCIAL
      });

      const data = await response.json();
      console.log("Login Response:", data);

      if (!response.ok) throw new Error(data.message || "Login failed");

      // No localStorage at all!
      // Cookies handle the session.

      navigate("/main");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="lgnpg-container">
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
                required
                disabled={loading}
              />
            </div>

            <button type="submit" disabled={loading} className="lgn-btn">
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <div className="lgnpg-links">
            <p>
              Don’t have an account?{" "}
              <span className="lgnpg-link" onClick={() => navigate("/signup")}>
                Sign up
              </span>
            </p>
          </div>
        </div>
      </div>

      <div className="lgnpg-right">
        <div className="lgnpg-overlay"></div>
        <div className="lgnpg-content">
          <h2>Welcome to Your Space</h2>
          <p>Secure authentication powered by cookies & JWT.</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

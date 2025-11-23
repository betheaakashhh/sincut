import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://sincut-razorpay.vercel.app";

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
    "Earn Referral Rewards",
    "Manage Your Coins",
  ];

  // ✨ Text animation
  useEffect(() => {
    const interval = setInterval(() => {
      setChangingText((prev) => (prev + 1) % textOptions.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  // 🚨 FIXED: No flicker / shake / totter
  // Redirect runs once only & does NOT re-render Login UI
  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (!token) return; // No token → show login page

    console.log("🔍 Token found → redirecting to main");

    const id = setTimeout(() => {
      navigate("/main", { replace: true });
    }, 150);

    return () => clearTimeout(id);
  }, []); // ← VERY IMPORTANT (runs only once)

  // 🚨 FIX: Prevent UI flicker when token exists
  if (localStorage.getItem("accessToken")) {
    return (
      <div className="lgnpg-loading-screen">
        <div className="lgnpg-spinner"></div>
      </div>
    );
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      console.log("🔐 Attempting login...");

      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
        }),
        credentials: "include",
      });

      const data = await response.json();
      console.log("🔹 Login response received");

      if (!response.ok) {
        throw new Error(data.message || `Login failed: ${response.status}`);
      }

      if (!data.accessToken) {
        throw new Error("No access token received from server");
      }

      // Store token + user
      console.log("💾 Storing tokens...");
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("user", JSON.stringify(data.user));

      // Remove any bad keys
      const wrongKeys = ["token", "authToken", "jwtToken", "Token"];
      wrongKeys.forEach((key) => localStorage.removeItem(key));

      console.log("🎉 Login successful → redirecting");

      setTimeout(() => {
        navigate("/main", { replace: true });
      }, 200);
    } catch (err) {
      console.error("❌ Login error:", err);
      setError(err.message || "Login failed. Please try again.");
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

          {error && <div className="lgnpg-error">⚠️ {error}</div>}

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
                autoComplete="email"
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
                autoComplete="current-password"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`lgn-btn ${loading ? "loading" : ""}`}
            >
              {loading ? (
                <>
                  <div className="lgnpg-spinner"></div> Logging in...
                </>
              ) : (
                "Login"
              )}
            </button>
          </form>

          <div className="lgnpg-links">
            <p>
              Don't have an account?{" "}
              <span
                className="lgnpg-link"
                onClick={() => navigate("/signup")}
                style={{ cursor: "pointer" }}
              >
                Sign up
              </span>
            </p>
            <p className="lgnpg-feature-hint">
              🎁 Earn <strong>150 coins</strong> when you sign up with a referral
              code!
            </p>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="lgnpg-right">
        <div className="lgnpg-overlay"></div>
        <div className="lgnpg-content">
          <h2>Welcome to Sincut</h2>
          <h4 className="lgnpg-changing-text">{textOptions[changingText]}</h4>
          <p>Join our community to access exclusive features, earn rewards, and grow together.</p>

          <div className="lgnpg-features">
            <div>🔒 Secure JWT Authentication</div>
            <div>🚀 Fast & Reliable</div>
            <div>💰 Earn Referral Coins</div>
            <div>💎 Convert to Divine Coins</div>
            <div>📊 Personal Dashboard</div>
            <div>🌐 Cross-Platform Access</div>
          </div>

          <div className="lgnpg-coin-info">
            <h5>Coin System</h5>
            <div className="coin-details">
              <div className="coin-type">
                <span className="coin-icon">🪙</span>
                <span>Regular Coins: Earn from referrals</span>
              </div>
              <div className="coin-type">
                <span className="coin-icon">💎</span>
                <span>Divine Coins: Convert 333 coins = 1 divine</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

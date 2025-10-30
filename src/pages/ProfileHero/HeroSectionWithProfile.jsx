import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./HeroSectionWithProfile.css";

const HeroSectionWithProfile = () => {
  const [textIndex, setTextIndex] = useState(0);
  const [showMenu, setShowMenu] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const texts = [
    "Empower your creativity.",
    "Build your dreams with us.",
    "Innovate. Create. Inspire.",
    "Transform ideas into impact.",
  ];

  // Animated text switch
  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % texts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);
  const REACT_BACKEND_URL = import.meta.env.VITE_API_BASE_URL || 'https://sincut-razorpay.vercel.app';
  // Fetch logged-in user data
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/main");

    fetch(`${REACT_BACKEND_URL}/api/auth/me`, {
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type' : "application/json",
        'Accept': "application/json"

     },
    credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => setUser(data))
      .catch((err) =>{
      
       console.error("Error fetching user:", err);
       localStorage.removeItem("token");
       localStorage.removeItem("user");
         navigate("/main");
      });
  }, [navigate]);

  // Logout handler
  const handleLogout = async () => {
    try {
      await fetch(`${REACT_BACKEND_URL}/api/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <div className="snct-hero-container">
      {/* Top Navbar */}
      <div className="snct-hero-navbar">
        <h2 className="snct-logo">Sincut</h2>
        <div className="snct-profile-section">
          {user ? (
            <>
              <img
                src="https://cdn-icons-png.flaticon.com/512/847/847969.png"
                alt="profile"
                className="snct-profile-photo"
                onClick={() => setShowMenu(!showMenu)}
              />
              {showMenu && (
                <div className="snct-dropdown-menu">
                  <p onClick={() => navigate("/account-settings")}>
                    Account Settings
                  </p>
                  <p onClick={handleLogout}>Logout</p>
                </div>
              )}
            </>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="snct-login-btn"
            >
              Login
            </button>
          )}
        </div>
      </div>

      {/* Hero Content */}
      <div className="snct-hero-content">
        <h1 key={textIndex} className="snct-hero-title">
          {texts[textIndex]}
        </h1>
        <p className="snct-hero-subtitle">
          Explore, create, and manage your digital experience.
        </p>
        <button
          className="snct-hero-btn"
          onClick={() => navigate("/program")}
        >
          Explore Programs
        </button>
      </div>
    </div>
  );
};

export default HeroSectionWithProfile;

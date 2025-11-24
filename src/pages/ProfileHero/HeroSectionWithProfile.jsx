import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./HeroSectionWithProfile.css";

const HeroSectionWithProfile = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [user, setUser] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();

  const REACT_BACKEND_URL = import.meta.env.VITE_API_BASE_URL || 'https://sincut-razorpay.vercel.app';

  // Check screen size for responsive behavior
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Fetch logged-in user data
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
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
      .catch((err) => {
        console.error("Error fetching user:", err);
        // ✅ FIXED: Using correct key
        localStorage.removeItem("accessToken");
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
      // ✅ FIXED: Using correct key
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
      navigate("/");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      if (showMenu) setShowMenu(false);
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [showMenu]);

  // Debugging
  const gotoDashboard = () => {
    console.log('🔍 Dashboard button clicked');
    console.log('🔍 Current tokens:', {
      accessToken: localStorage.getItem('accessToken'),
      user: localStorage.getItem('user')
    });
    
    // Test if user is authenticated
    const token = localStorage.getItem('accessToken');
    const userData = localStorage.getItem('user');
    
    if (!token || !userData) {
      console.log('❌ No authentication data found, redirecting to login');
      navigate('/login');
      return;
    }
    
    console.log('✅ User authenticated, navigating to dashboard');
    navigate('/dashboard');
  };
  const gotoAccountSetting = () => {
    console.log('🔍 Account Setting button clicked');
    console.log('🔍 Current tokens:',  {
      accessToken: localStorage.getItem('accessToken'),
      user: localStorage.getItem('user')
    }); 

    const token = localStorage.getItem('accessToken');
    const userData = localStorage.getItem('user');
    if (!token || !userData) {
      console.log('❌ No authentication data found, redirecting to login');
      navigate('/login');
      return;
    }   
    console.log('✅ User authenticated, navigating to account setting');
    navigate('/accountsetting');
    
  }
  return (
    <div className="snct-navbar-container">
      {/* Modern Glass Navbar */}
      <nav className="snct-navbar">
  <div className="snct-navbar-content">

    {/* Logo (REPLACED as requested) */}
    <div className="nav-left">
      <div className="logo-circle">
        <span>★</span>
      </div>
      <span className="logo-text">
        Sin<span className="logo-accent">Cut</span>
      </span>
    </div>

    {/* Profile Section (unchanged) */}
    <div className="snct-profile-section">
      {user ? (
        <div className="snct-user-menu">
          <div 
            className="snct-user-trigger"
            onClick={(e) => {
              e.stopPropagation();
              setShowMenu(!showMenu);
            }}
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/847/847969.png"
              alt="profile"
              className="snct-profile-photo"
            />
            {!isMobile && (
              <span className="snct-username">
                {user.name || user.email?.split('@')[0]}
              </span>
            )}
            <svg 
              className={`snct-dropdown-arrow ${showMenu ? 'snct-rotated' : ''}`}
              width="12" 
              height="12" 
              viewBox="0 0 12 12"
              fill="currentColor"
            >
              <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" fill="none"/>
            </svg>
          </div>

          {showMenu && (
            <div className="snct-dropdown-menu">
              <div className="snct-menu-item snct-dashboard-item" onClick={gotoDashboard}>
                Dashboard
              </div>
              <div className="snct-menu-divider"></div>

              <div className="snct-menu-item snct-account-item" onClick={gotoAccountSetting}>
                Account Setting
              </div>
              <div className="snct-menu-divider"></div>

              <div className="snct-menu-item snct-logout-item" onClick={handleLogout}>
                Logout
              </div>
            </div>
          )}
        </div>
      ) : (
        <button
          onClick={() => navigate("/login")}
          className="snct-login-btn"
        >
          {isMobile ? 'Login' : 'Sign In'}
        </button>
      )}
    </div>

  </div>
</nav>

    </div>
  );
};

export default HeroSectionWithProfile;
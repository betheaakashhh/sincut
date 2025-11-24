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
          {/* Logo */}
          <div className="snct-logo-section">
            <h2 className="snct-logo">Sincut</h2>
          </div>

          {/* Profile Section */}
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
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M8 8a3 3 0 100-6 3 3 0 000 6zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                      </svg>
                      Dashboard
                    </div>
                    <div className="snct-menu-divider"></div>
                    <div className="snct-menu-item snct-account-item" onClick={gotoAccountSetting}>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M6 2H2v12h4v1H1V1h5v1zm7.707 5.707l-3 3a1 1 0 01-1.414-1.414L10.586 8H5V7h5.586L9.293 5.707a1 1 0 011.414-1.414l3 3a1 1 0 010 1.414z"/>
                      </svg>
                      Account Setting
                    </div>
                    <div className="snct-menu-divider"></div>
                    <div className="snct-menu-item snct-logout-item" onClick={handleLogout}>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M6 2H2v12h4v1H1V1h5v1zm7.707 5.707l-3 3a1 1 0 01-1.414-1.414L10.586 8H5V7h5.586L9.293 5.707a1 1 0 011.414-1.414l3 3a1 1 0 010 1.414z"/>
                      </svg>
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
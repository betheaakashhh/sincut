import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./HeroSectionWithProfile.css";

const HeroSectionWithProfile = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [user, setUser] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();

  const REACT_BACKEND_URL =
    import.meta.env.VITE_API_BASE_URL || "https://sincut-razorpay.vercel.app";

  // Detect mobile screen
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Fetch logged-in user using cookies
  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch(`${REACT_BACKEND_URL}/api/auth/me`, {
          method: "GET",
          credentials: "include",
        });

        if (res.status === 401) {
          navigate("/login");
          return;
        }

        const data = await res.json();
        setUser(data);
      } catch (err) {
        console.error("User fetch failed:", err);
        navigate("/login");
      }
    }

    fetchUser();
  }, []);

  // Logout
  const handleLogout = async () => {
    try {
      await fetch(`${REACT_BACKEND_URL}/api/auth/logout`, {
        method: "POST",
        credentials: "include",
      });

      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const close = () => showMenu && setShowMenu(false);
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, [showMenu]);

  return (
    <div className="snct-navbar-container">
      <nav className="snct-navbar">
        <div className="snct-navbar-content">
          <div className="snct-logo-section">
            <h2 className="snct-logo">Sincut</h2>
          </div>

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
                      {user?.name || user?.email?.split("@")[0]}
                    </span>
                  )}
                  <svg
                    className={`snct-dropdown-arrow ${
                      showMenu ? "snct-rotated" : ""
                    }`}
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="currentColor"
                  >
                    <path
                      d="M3 4.5L6 7.5L9 4.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      fill="none"
                    />
                  </svg>
                </div>

                {showMenu && (
                  <div className="snct-dropdown-menu">
                    <div
                      className="snct-menu-item"
                      onClick={() => navigate("/account-settings")}
                    >
                      Account Settings
                    </div>

                    <div className="snct-menu-divider"></div>

                    <div
                      className="snct-menu-item snct-logout-item"
                      onClick={handleLogout}
                    >
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
                {isMobile ? "Login" : "Sign In"}
              </button>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default HeroSectionWithProfile;

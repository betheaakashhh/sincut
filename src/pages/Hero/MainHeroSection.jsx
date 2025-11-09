import React, { useState, useEffect } from "react";
import "./mainherosection.css";
import { useNavigate } from "react-router-dom";

const MainHeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  const slides = [
    {
      title: "Transform Your Digital Experience",
      subtitle: "Innovate with cutting-edge technology and elevate your business to new heights"
    },
    {
      title: "Build Amazing Products",
      subtitle: "Create solutions that matter with our powerful platform and tools"
    },
    {
      title: "Join Our Community",
      subtitle: "Connect with like-minded individuals and grow together"
    },
    {
      title: "Start Your Journey",
      subtitle: "Begin your transformation with our comprehensive suite of features"
    },
    {
      title: "Achieve Greatness",
      subtitle: "Unlock your potential and reach new milestones every day"
    },
    {
      title: "Innovate & Create",
      subtitle: "Bring your ideas to life with our intuitive platform"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const handleGetStarted = () => {
    // Add your get started logic here
     navigate("/login");
    console.log("Get Started clicked");
  };

  const handleLogin = () => {
   navigate("/login");
  };

  const handleSignup = () => {
    navigate("/signup");
  };

  return (
    <div className="main-hero-section">
      {/* Animated Background Elements */}
      <div className="main-hero-background">
        <div className="main-floating-orb main-orb-1"></div>
        <div className="main-floating-orb main-orb-2"></div>
        <div className="main-floating-orb main-orb-3"></div>
        <div className="main-grid-lines"></div>
      </div>

      <div className="main-hero-container">
        {/* Main Content Sections */}
        <div className="main-hero-content">
          {/* Left Section - 60% width */}
          <div className="main-left-section">
            <div className="main-text-slider">
              <div className="main-slide-content" key={currentSlide}>
                <h1 className="main-hero-title">
                  <span className="main-title-gradient">{slides[currentSlide].title}</span>
                </h1>
                <p className="main-hero-subtitle">{slides[currentSlide].subtitle}</p>
              </div>
              
              {/* Modern Button */}
              <button className="main-main-modern-btn" onClick={handleGetStarted}>
                <span className="main-btn-glow"></span>
                <span className="main-btn-text">Get Started Free</span>
                <span className="main-btn-arrow">→</span>
              </button>

              {/* Features List */}
              <div className="main-features-list">
                <div className="main-feature-item">
                  <span className="main-feature-icon">🚀</span>
                  <span>No credit card required</span>
                </div>
                <div className="main-feature-item">
                  <span className="main-feature-icon">⭐</span>
                  <span>Free forever plan</span>
                </div>
                <div className="main-feature-item">
                  <span className="main-feature-icon">⚡</span>
                  <span>Set up in minutes</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section - 40% width */}
          <div className="main-right-section">
            <div className="main-auth-container">
              <h3 className="main-join-text">Join Our Community</h3>
              
              <button className="main-auth-btn main-login-btn" onClick={handleLogin}>
               
                Login to Account
              </button>
              
              <button className="main-auth-btn main-signup-btn" onClick={handleSignup}>
               
                Create New Account
              </button>

              <div className="main-social-divider">
                <span>or continue with</span>
              </div>

              <div className="main-social-buttons">
                <button className="main-social-btn main-google-btn">
                 
                  Google
                </button>
                
                <button className="main-social-btn main-github-btn">
                  
                  GitHub
                </button>
              </div>

              <div className="main-security-note">
                <span className="main-security-icon">🛡️</span>
                Your data is securely encrypted
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Image Section */}
        
      </div>
    </div>
  );
};

export default MainHeroSection;
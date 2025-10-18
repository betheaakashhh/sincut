import React, { useState, useEffect } from 'react'
import './bottom.css'

const Bottom = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleMouseMove = (e) => {
    if (isMobile) return;
    
    const { clientX, clientY } = e;
    const footer = document.querySelector('.inferno-footer');
    if (footer) {
      const rect = footer.getBoundingClientRect();
      setMousePosition({
        x: clientX - rect.left,
        y: clientY - rect.top
      });
    }
  };

  const handleLogoHover = (hovering) => {
    setIsHovering(hovering);
  };

  return (
    <footer 
      className="inferno-footer"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => !isMobile && setIsHovering(true)}
      onMouseLeave={() => !isMobile && setIsHovering(false)}
    >
      {/* Animated Background Elements */}
      <div className="hellfire-background">
        <div className="floating-ember"></div>
        <div className="floating-ember"></div>
        <div className="floating-ember"></div>
        <div className="floating-ember"></div>
        <div className="floating-ember"></div>
        <div className="lava-flow"></div>
      </div>

      {/* Mouse Glow Effect for Desktop */}
      {!isMobile && (
        <div 
          className="cursor-inferno" 
          style={{
            left: `${mousePosition.x}px`,
            top: `${mousePosition.y}px`,
            opacity: isHovering ? 1 : 0
          }}
        >
          <div className="fire-ring"></div>
          <div className="fire-core"></div>
        </div>
      )}

      <div className="footer-container">
        {/* Logo Section with Fire Effect */}
        <div 
          className="logo-section"
          onMouseEnter={() => handleLogoHover(true)}
          onMouseLeave={() => handleLogoHover(false)}
          onTouchStart={() => isMobile && handleLogoHover(true)}
          onTouchEnd={() => isMobile && handleLogoHover(false)}
        >
          <div className={`logo-inferno ${isHovering ? 'burning' : ''}`}>
            <h1 className="logo-text">SinCUT</h1>
            <div className="fire-effect"></div>
            <div className="smoke-effect"></div>
            {isMobile && <div className="mobile-melt"></div>}
          </div>
          <p className="logo-subtitle">From Ashes to Redemption</p>
        </div>

        {/* Navigation Sections */}
        <div className="navigation-sections">
          <section className="company-section">
            <h4 className="section-title">
              <span className="title-icon'>🔥</span>
              Company
            </h4>
            <ul className="nav-links">
              <li><a href="/" className="nav-link">Home</a></li>
              <li><a href="/about" className="nav-link">About us</a></li>
              <li><a href="/contact" className="nav-link">Contact</a></li>
              <li><a href="/FAQs" className="nav-link">FAQs</a></li>
              <li><a href="/terms" className="nav-link">Term & Conditions</a></li>
            </ul>
          </section>

          <section className="social-section">
            <h4 className="section-title">
              <span className="title-icon">👥</span>
              Social
            </h4>
            <ul className="social-links">
              <li><a href="#" className="social-link">Facebook</a></li>
              <li><a href="#" className="social-link">Instagram</a></li>
              <li><a href="#" className="social-link">LinkedIn</a></li>
              <li><a href="#" className="social-link">GitHub</a></li>
              <li><a href="#" className="social-link">Thread</a></li>
              <li><a href="#" className="social-link">X</a></li>
            </ul>
          </section>
        </div>

        {/* Copyright Section */}
        <div className="copyright-section">
          <div className="copyright-glow">
            <p className="copyright-text">
              © 2024 SINCUT. All Rights Reserved. 
              <span className="copyright-emoji"> 🔥</span>
            </p>
          </div>
          <div className="hell-divider"></div>
        </div>
      </div>
    </footer>
  )
}

export default Bottom;
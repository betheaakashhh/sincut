import React from "react";
import "./header.css";
import QuoteMarquee from "../../components/marquee/QouteMarque";

const Header = () => {
  return (
    <div className="spiritual-hero">
      {/* Background Elements */}
      <div className="spiritual-background">
        <div className="light-ray ray-1"></div>
        <div className="light-ray ray-2"></div>
        <div className="light-ray ray-3"></div>
        <div className="floating-particle particle-1">🌸</div>
        <div className="floating-particle particle-2">🕊️</div>
        <div className="floating-particle particle-3">✨</div>
        <div className="floating-particle particle-4">🌿</div>
      </div>

      {/* Main Content */}
      <div className="spiritual-container">
        <div className="spiritual-content">
          {/* Sacred Symbol */}
          <div className="sacred-symbol">
            <div className="symbol-outer">
              <div className="symbol-middle">
                <div className="symbol-inner">
                  <span className="karma-char">ॐ</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Heading */}
          <div className="spiritual-heading">
            <h1 className="main-title">
              Welcome To <span className="sacred-text">SinCUT</span>
            </h1>
            <div className="title-underline"></div>
          </div>

          {/* Sacred Message */}
          <div className="sacred-message">
            <p className="spiritual-text">
              At <span className="highlight">SinCUT</span>, every small act creates cosmic impact. 
              Your <span className="donation-amount">$1 donation</span> becomes a sacred offering — 
              transforming <span className="karma-word">guilt</span> into 
              <span className="grace-word"> grace</span>, and every 
              <span className="sin-word"> sin</span> into an opportunity for 
              <span className="redemption-word"> redemption</span>.
            </p>
            
            {/* Karma Principle */}
            <div className="karma-principle">
              <div className="principle-icon">☯</div>
              <p className="principle-text">
                "As you sow, so shall you reap. Your confession cleanses the soul, 
                your donation plants seeds of goodness."
              </p>
            </div>
          </div>

          {/* Divine Quote Marquee */}
          <div className="divine-marquee-container">
            <QuoteMarquee />
          </div>

          {/* Sacred Action Buttons */}
          <div className="sacred-actions">
            <button className="sacred-btn confession-btn">
              <span className="btn-icon">🙏</span>
              Confess & Cleanse
            </button>
            <button className="sacred-btn donate-btn">
              <span className="btn-icon">💫</span>
              Donate & Transform
            </button>
          </div>

          {/* Spiritual Stats */}
          <div className="spiritual-stats">
            <div className="stat-item">
              <div className="stat-number">1,234+</div>
              <div className="stat-label">Souls Cleansed</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">$5,678+</div>
              <div className="stat-label">Goodness Spread</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">99%</div>
              <div className="stat-label">Peace Attained</div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
    );
    

     
  
};

export default Header;

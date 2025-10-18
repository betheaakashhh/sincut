import React, { useState } from "react";
import sampleVideo from "../../assets/maskman.mp4";
import "./doodle.css";

const VideoSection = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section className="divine-video-section">
      {/* Divine Background Elements */}
      <div className="divine-video-background">
        <div className="heavenly-light"></div>
        <div className="floating-sparkle"></div>
        <div className="floating-sparkle"></div>
        <div className="floating-sparkle"></div>
      </div>

      <div className="divine-video-container">
        {/* Video Container */}
        <div 
          className="video-wrapper"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onTouchStart={() => setIsHovered(true)}
          onTouchEnd={() => setIsHovered(false)}
        >
          <div className="video-overlay"></div>
          <video 
            autoPlay 
            loop 
            muted 
            playsInline
            className="divine-video"
          >
            <source src={sampleVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* Text Overlay for Mobile */}
          <div className={`mobile-text-overlay ${isHovered ? 'active' : ''}`}>
            <div className="text-content">
              <div className="divine-icon">✨</div>
              <h2 className="video-title">Discover SinCut</h2>
              <p className="video-description">
                SinCut allows you to share your confessions anonymously and
                contribute to a positive change. With just a small donation, you
                can relieve your guilt and make a meaningful impact.
              </p>
              <div className="divine-cta">
                <span className="cta-text">Begin Your Journey</span>
                <div className="cta-arrow">→</div>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Text Container */}
        <div className="desktop-text-container">
          <div className="text-header">
            <div className="divine-line"></div>
            <h2 className="desktop-title">Discover SinCut</h2>
            <div className="divine-line"></div>
          </div>
          
          <div className="text-content-desktop">
            <p className="desktop-description">
              SinCut allows you to share your confessions anonymously and
              contribute to a positive change. With just a small donation, you
              can relieve your guilt and make a meaningful impact.
            </p>
            <p className="desktop-description">
              Join our community today and see how your small actions can make a
              big difference in the world.
            </p>
            
            <div className="divine-features">
              <div className="feature-item">
                <span className="feature-icon">🕊️</span>
                <span className="feature-text">Anonymous Confessions</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">💫</span>
                <span className="feature-text">Transformative Donations</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">🌍</span>
                <span className="feature-text">Global Impact</span>
              </div>
            </div>

            <button className="divine-action-btn">
              Start Your Redemption
              <span className="btn-sparkle">✨</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
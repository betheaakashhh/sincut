import React, { useState } from "react";
import sampleVideo from "../../assets/saddoddle.mp4";
import "./doodlesad.css";

const VideoSectionSad = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section className="divine-sad-video-section">
      {/* Divine Background Elements */}
      <div className="divine-sad-video-background">
        <div className="sad-heavenly-light"></div>
        <div className="sad-floating-sparkle"></div>
        <div className="sad-floating-sparkle"></div>
        <div className="sad-floating-sparkle"></div>
      </div>

      <div className="divine-sad-video-container">
        {/* Video Container */}
        <div 
          className="sad-video-wrapper"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onTouchStart={() => setIsHovered(true)}
          onTouchEnd={() => setIsHovered(false)}
        >
          <div className="sad-video-overlay"></div>
          <video 
            autoPlay 
            loop 
            muted 
            playsInline
            className="divine-sad-video"
          >
            <source src={sampleVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* Text Overlay for Mobile */}
          <div className={`sad-mobile-text-overlay ${isHovered ? 'active' : ''}`}>
            <div className="sad-text-content">
              <div className="sad-divine-icon">💫</div>
              <h2 className="sad-video-title">Find Peace with SinCut</h2>
              <p className="sad-video-description">
                Share your burdens anonymously and transform guilt into positive change. 
                Your small donation creates meaningful impact while bringing you peace.
              </p>
              <div className="sad-divine-cta">
                <span className="sad-cta-text">Begin Healing</span>
                <div className="sad-cta-arrow">→</div>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Text Container */}
        <div className="sad-desktop-text-container">
          <div className="sad-text-header">
            <div className="sad-divine-line"></div>
            <h2 className="sad-desktop-title">Find Peace with SinCut</h2>
            <div className="sad-divine-line"></div>
          </div>
          
          <div className="sad-text-content-desktop">
            <p className="sad-desktop-description">
              SinCut allows you to share your confessions anonymously and
              contribute to a positive change. With just a small donation, you
              can relieve your guilt and make a meaningful impact.
            </p>
            <p className="sad-desktop-description">
              Join our community today and see how your small actions can make a
              big difference in the world.
            </p>
            
            <div className="sad-divine-features">
              <div className="sad-feature-item">
                <span className="sad-feature-icon">🕊️</span>
                <span className="sad-feature-text">Anonymous Confessions</span>
              </div>
              <div className="sad-feature-item">
                <span className="sad-feature-icon">💖</span>
                <span className="sad-feature-text">Emotional Healing</span>
              </div>
              <div className="sad-feature-item">
                <span className="sad-feature-icon">🌱</span>
                <span className="sad-feature-text">Personal Growth</span>
              </div>
            </div>

            <button className="sad-divine-action-btn">
              Start Your Healing
              <span className="sad-btn-sparkle">✨</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoSectionSad;
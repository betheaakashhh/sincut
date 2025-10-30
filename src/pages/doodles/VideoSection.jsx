import React, { useState, useEffect } from "react";
import sampleVideo from "../../assets/maskman.mp4";
import "./doodle.css";

const VideoSection = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [animatedText, setAnimatedText] = useState("");

  const fullText = "Discover SinCut";
  const descriptionText = "SinCut allows you to share your confessions anonymously and contribute to a positive change. With just a small donation, you can relieve your guilt and make a meaningful impact.";

  // Text animation effect
  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setAnimatedText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="divine-video-section">
      {/* Modern Dark Background Elements */}
      <div className="divine-video-background">
        <div className="video-floating-orb video-orb-1"></div>
        <div className="video-floating-orb video-orb-2"></div>
        <div className="video-floating-orb video-orb-3"></div>
        <div className="video-grid-lines"></div>
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
              <h2 className="video-title">
                <span className="animated-text-gradient">{animatedText}</span>
                <span className="text-cursor">|</span>
              </h2>
              <p className="video-description slide-in-text">
                {descriptionText}
              </p>
              <div className="divine-cta bounce-in">
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
            <h2 className="desktop-title">
              <span className="title-gradient">{fullText}</span>
            </h2>
            <div className="divine-line"></div>
          </div>
          
          <div className="text-content-desktop">
            <p className="desktop-description typewriter-text">
              {descriptionText}
            </p>
            <p className="desktop-description fade-in-text">
              Join our community today and see how your small actions can make a
              big difference in the world.
            </p>
            
            <div className="divine-features">
              <div className="feature-item slide-in-feature" style={{ animationDelay: '0.1s' }}>
                <span className="feature-icon">🕊️</span>
                <span className="feature-text">Anonymous Confessions</span>
              </div>
              <div className="feature-item slide-in-feature" style={{ animationDelay: '0.2s' }}>
                <span className="feature-icon">💫</span>
                <span className="feature-text">Transformative Donations</span>
              </div>
              <div className="feature-item slide-in-feature" style={{ animationDelay: '0.3s' }}>
                <span className="feature-icon">🌍</span>
                <span className="feature-text">Global Impact</span>
              </div>
            </div>

            <button className="divine-action-btn pulse-glow">
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
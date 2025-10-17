import React, { useState, useEffect } from 'react'
import "./title.css"

const Title = ({ subtitle, title }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animation after component mounts
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="divine-title-container">
      {/* Heavenly Background Elements */}
      <div className="heavenly-background">
        <div className="divine-light light-1"></div>
        <div className="divine-light light-2"></div>
        <div className="divine-light light-3"></div>
        <div className="floating-spirit spirit-1">✨</div>
        <div className="floating-spirit spirit-2">🌙</div>
        <div className="floating-spirit spirit-3">⭐</div>
        <div className="floating-spirit spirit-4">💫</div>
      </div>

      {/* Main Title Content */}
      <div className={`divine-title-content ${isVisible ? 'visible' : ''}`}>
        {/* Sacred Symbol */}
        <div className="sacred-symbol-wrapper">
          <div className="sacred-symbol">
            <div className="symbol-ring outer-ring">
              <div className="symbol-ring middle-ring">
                <div className="symbol-ring inner-ring">
                  <span className="divine-char">ॐ</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Subtitle with Divine Entrance */}
        <div className="subtitle-container">
          <div className="subtitle-line left-line"></div>
          <h2 className="divine-subtitle">{subtitle}</h2>
          <div className="subtitle-line right-line"></div>
        </div>

        {/* Main Title with Glowing Effect */}
        <div className="title-container">
          <p className="divine-title">{title}</p>
          <div className="title-glow"></div>
        </div>

        {/* Divine Particles */}
        <div className="divine-particles">
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
        </div>

        {/* Blessing Text */}
        <div className="blessing-text">
          "May these words guide you to peace and enlightenment"
        </div>
      </div>

      {/* Animated Border */}
      <div className="divine-border-animation"></div>
    </div>
  )
}

export default Title
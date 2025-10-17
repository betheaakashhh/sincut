import React, { useState, useRef, useEffect } from 'react'
import './program.css'

const Program = () => {
  const [activeCard, setActiveCard] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef(null);

  const cards = [
    {
      id: 1,
      title: "Refer a Friend",
      description: "Share the goodness. Invite your friends to donate and make a difference.",
      buttonText: "Refer",
      icon: "👥",
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      theme: "refer"
    },
    {
      id: 2,
      title: "Clean a Drop",
      description: "Donate $1 to help clean one drop of water — small purity, big change.",
      buttonText: "Donate",
      icon: "💧",
      gradient: "linear-gradient(135deg, #11998e 0%, #38ef7d 100%)",
      theme: "donate"
    },
    {
      id: 3,
      title: "Plant Your Karma",
      description: "Each dollar plants hope. Turn guilt into green by supporting reforestation.",
      buttonText: "Plant",
      icon: "🌱",
      gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      theme: "plant"
    },
    {
      id: 4,
      title: "Redeem a Sin",
      description: "Every sin deserves a second chance. Give $1, spread kindness, start fresh.",
      buttonText: "Redeem",
      icon: "✨",
      gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
      theme: "redeem"
    }
  ];

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Auto-scroll to active card on mobile
  useEffect(() => {
    if (isMobile && containerRef.current) {
      const cardWidth = containerRef.current.offsetWidth;
      containerRef.current.scrollTo({
        left: activeCard * cardWidth,
        behavior: 'smooth'
      });
    }
  }, [activeCard, isMobile]);

  const handleCardClick = (index) => {
    if (isMobile) {
      setActiveCard(index);
    }
  };

  const handleNext = () => {
    setActiveCard((prev) => (prev + 1) % cards.length);
  };

  const handlePrev = () => {
    setActiveCard((prev) => (prev - 1 + cards.length) % cards.length);
  };

  const handleDotClick = (index) => {
    setActiveCard(index);
  };

  return (
    <section className="program-section">
      <div className="program-header">
        <h2 className="program-title">Make a Difference</h2>
        <p className="program-subtitle">Choose your path to positive impact</p>
      </div>

      <div className="program-container">
        {/* Desktop Layout */}
        <div className="cards-grid">
          {cards.map((card, index) => (
            <div 
              key={card.id}
              className={`card ${card.theme}`}
              style={{ '--card-gradient': card.gradient }}
            >
              <div className="card-icon">{card.icon}</div>
              <h3 className="card-title">{card.title}</h3>
              <p className="card-description">{card.description}</p>
              <button className="card-button">
                {card.buttonText}
                <svg className="button-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <div className="card-glow"></div>
            </div>
          ))}
        </div>

        {/* Mobile Slider */}
        <div className="mobile-slider-container">
          <div 
            className="cards-slider"
            ref={containerRef}
          >
            {cards.map((card, index) => (
              <div 
                key={card.id}
                className={`card mobile-card ${card.theme} ${activeCard === index ? 'active' : ''}`}
                style={{ '--card-gradient': card.gradient }}
                onClick={() => handleCardClick(index)}
              >
                <div className="card-icon">{card.icon}</div>
                <h3 className="card-title">{card.title}</h3>
                <p className="card-description">{card.description}</p>
                <button className="card-button">
                  {card.buttonText}
                  <svg className="button-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                <div className="card-glow"></div>
              </div>
            ))}
          </div>

          {/* Navigation Dots */}
          <div className="slider-dots">
            {cards.map((_, index) => (
              <button
                key={index}
                className={`dot ${activeCard === index ? 'active' : ''}`}
                onClick={() => handleDotClick(index)}
              />
            ))}
          </div>

          {/* Navigation Arrows */}
          <button className="slider-arrow prev" onClick={handlePrev}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button className="slider-arrow next" onClick={handleNext}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}

export default Program
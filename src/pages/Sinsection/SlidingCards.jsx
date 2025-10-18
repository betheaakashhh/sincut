import React, { useState, useEffect } from 'react';
import './SlidingCards.css';

const SlidingCards = () => {
  const [darkMode, setDarkMode] = useState(false);

  const cards = [
    {
      id: 1,
      title: "Confess Without Fear",
      description: "Share your truth in a safe, judgment-free space. Your confession stays between you and your consciousness.",
      bgColor: "#4f46e5",
      textColor: "#ffffff"
    },
    {
      id: 2,
      title: "Clear Your Karma",
      description: "Don't let guilt weigh you down. Confess and contribute to charity to balance your spiritual energy.",
      bgColor: "#059669",
      textColor: "#ffffff"
    },
    {
      id: 3,
      title: "Heal Your Soul",
      description: "Release the burden you've been carrying. Find peace through honest confession.",
      bgColor: "#dc2626",
      textColor: "#ffffff"
    },
    {
      id: 4,
      title: "$1 for Good Karma",
      description: "Your small contribution goes to charity, creating positive energy while you cleanse your soul.",
      bgColor: "#7c3aed",
      textColor: "#ffffff"
    },
    {
      id: 5,
      title: "Complete Anonymity",
      description: "No names, no tracking. Just pure confession between you and the universe.",
      bgColor: "#ea580c",
      textColor: "#ffffff"
    }
  ];

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  return (
    <div className={`sliding-cards-container ${darkMode ? 'dark' : 'light'}`}>
      {/* Header Section */}
      <header className="header">
        <div className="header-content">
          <h1>SINCUT</h1>
          <p>Confess. Contribute. Cleanse.</p>
          <button 
            className="theme-toggle"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? '☀️ Light' : '🌙 Dark'}
          </button>
        </div>
      </header>

      

      {/* Sliding Cards Section */}
      <section className="cards-section">
        <h3>Ready to Start Your Journey?</h3>
        <p className="section-subtitle">Choose your path to peace and clarity</p>
        
        <div className="cards-wrapper">
          <div className="cards-track">
            {[...cards, ...cards].map((card, index) => (
              <div
                key={`${card.id}-${index}`}
                className="card"
                style={{
                  backgroundColor: card.bgColor,
                  color: card.textColor
                }}
              >
                <div className="card-content">
                  <h4>{card.title}</h4>
                  <p>{card.description}</p>
                  <div className="card-chip"></div>
                  <div className="card-glow"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="features-grid">
          <div className="feature">
            <div className="feature-icon">🔒</div>
            <h4>100% Anonymous</h4>
            <p>Your identity remains completely hidden</p>
          </div>
          <div className="feature">
            <div className="feature-icon">💝</div>
            <h4>Charity Donation</h4>
            <p>$1 goes to verified charitable causes</p>
          </div>
          <div className="feature">
            <div className="feature-icon">⚖️</div>
            <h4>Karma Balance</h4>
            <p>Clear your conscience through good deeds</p>
          </div>
          <div className="feature">
            <div className="feature-icon">🕊️</div>
            <h4>Peace of Mind</h4>
            <p>Find inner peace without judgment</p>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      
    </div>
  );
};

export default SlidingCards;
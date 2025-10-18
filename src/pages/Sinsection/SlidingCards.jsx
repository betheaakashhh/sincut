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
      document.body.classList.add('sincut-dark-mode');
    } else {
      document.body.classList.remove('sincut-dark-mode');
    }
  }, [darkMode]);

  return (
    <div className={`sincut-container ${darkMode ? 'dark' : 'light'}`}>
      {/* Header Section */}
      <header className="sincut-header">
        <div className="sincut-header-content">
          <h1>SINCUT</h1>
          <p>Confess. Contribute. Cleanse.</p>
          <button 
            className="sincut-theme-toggle"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? '☀️ Light' : '🌙 Dark'}
          </button>
        </div>
      </header>

      {/* Sliding Cards Section */}
      <section className="sincut-cards-section">
        <h3>Ready to Start Your Journey?</h3>
        <p className="sincut-section-subtitle">Choose your path to peace and clarity</p>

        <div className="sincut-cards-wrapper">
          <div className="sincut-cards-track">
            {[...cards, ...cards].map((card, index) => (
              <div
                key={`${card.id}-${index}`}
                className="sincut-card"
                style={{
                  backgroundColor: card.bgColor,
                  color: card.textColor
                }}
              >
                <div className="sincut-card-content">
                  <h4>{card.title}</h4>
                  <p>{card.description}</p>
                  <div className="sincut-card-chip"></div>
                  <div className="sincut-card-glow"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default SlidingCards;
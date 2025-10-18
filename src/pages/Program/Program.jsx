import React from 'react';
import { useNavigate } from 'react-router-dom';
import './program.css';
import ShareButton from '../ShareButton/ShareButton';

const Program = () => {
  const navigate = useNavigate();

  const handleGalleryNavigation = () => {
    navigate('/gallery');
  };

  const features = [
    {
      id: 1,
      title: "Refer a Friend",
      description: "Share the goodness. Invite your friends to donate and make a difference.",
      buttonText: "Refer",
      icon: "👥",
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      isShare: true
    },
    {
      id: 2,
      title: "Clean a Drop",
      description: "Donate $1 to help clean one drop of water — small purity, big change.",
      buttonText: "Donate",
      icon: "💧",
      gradient: "linear-gradient(135deg, #11998e 0%, #38ef7d 100%)"
    },
    {
      id: 3,
      title: "Plant Your Karma",
      description: "Each dollar plants hope. Turn guilt into green by supporting reforestation.",
      buttonText: "Plant",
      icon: "🌱",
      gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
    },
    {
      id: 4,
      title: "Redeem a Sin",
      description: "Every sin deserves a second chance. Give $1, spread kindness, start fresh.",
      buttonText: "Redeem",
      icon: "✨",
      gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
    }
  ];

  return (
    <section className="program-section" id="program">
      <div className="program-container">

        {/* Header */}
        <div className="program-header">
          <h1 className="program-main-title">BE WITH US</h1>
          <p className="program-subtitle">
            Join our community and embrace a life of kindness, compassion, and positive change. 
            Together, we can make the world a better place, one act of kindness at a time.
          </p>
        </div>

        {/* Divider */}
        <div className="program-divider"></div>

        {/* Features */}
        <div className="program-features">
          <div className="program-features-header">
            <h2 className="program-feature-title">Make a Difference</h2>
            <p className="program-feature-subtitle">Choose your path to positive impact</p>
          </div>

          <div className="program-features-grid">
            {features.map((feature, index) => (
              <div
                key={feature.id}
                className="program-feature-card"
                style={{ '--card-gradient': feature.gradient }}
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="program-card-content">
                  <div className="program-feature-icon">{feature.icon}</div>
                  <h3 className="program-feature-title">{feature.title}</h3>
                  <p className="program-feature-description">{feature.description}</p>

                  {feature.isShare ? (
                    <div className="program-share-button-wrapper">
                      <ShareButton />
                    </div>
                  ) : (
                    <button className="program-feature-button">
                      {feature.buttonText}
                      <svg className="program-button-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  )}
                </div>
                <div className="program-card-glow"></div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="program-cta-section">
          <h3 className="program-cta-title">You Confessed. Someone Smiled.</h3>
          <p className="program-cta-description">
            Witness how your small act of giving became someone’s moment of relief.
          </p>
          <div className="program-cta-buttons">
            <button className="program-cta-button primary" onClick={handleGalleryNavigation}>Gallery</button>
            <button className="program-cta-button secondary">Learn More</button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Program;
import React from 'react'
import './community.css'

const Community = () => {
  const features = [
    {
      id: 1,
      title: "Refer a Friend",
      description: "Share the goodness. Invite your friends to donate and make a difference.",
      buttonText: "Refer",
      icon: "👥",
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
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
    <section className="community-section" id="community">
      <div className="community-container">
        {/* Header Section */}
        <div className="community-header">
          <h1 className="community-main-title">BE WITH US</h1>
          <p className="community-subtitle">
            Join our community and embrace a life of kindness, compassion, and positive change. 
            Together, we can make the world a better place, one act of kindness at a time.
          </p>
        </div>

        {/* Divider */}
        <div className="section-divider"></div>

        {/* Features Section */}
        <div className="features-section">
          <div className="features-header">
            <h2 className="features-title">Make a Difference</h2>
            <p className="features-subtitle">Choose your path to positive impact</p>
          </div>

          <div className="features-grid">
            {features.map((feature, index) => (
              <div 
                key={feature.id}
                className="feature-card"
                style={{ '--card-gradient': feature.gradient }}
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="card-content">
                  <div className="feature-icon">{feature.icon}</div>
                  <h3 className="feature-title">{feature.title}</h3>
                  <p className="feature-description">{feature.description}</p>
                  <button className="feature-button">
                    {feature.buttonText}
                    <svg className="button-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
                <div className="card-glow"></div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="cta-section">
          <div className="cta-content">
            <h3 className="cta-title">Ready to Start Your Journey?</h3>
            <p className="cta-description">
              Join thousands of others who are already making a difference in the world.
            </p>
            <div className="cta-buttons">
              <button className="cta-button primary">Get Started</button>
              <button className="cta-button secondary">Learn More</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Community
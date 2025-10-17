import React from 'react'
import image1 from "../../assets/aboutus.jpeg"
import "./about.css"

const About = () => {
  return (
    <section className="about-section" id="about">
      <div className="about-container">
        <div className="about-content">
          <div className="about-image-container">
            <img src={image1} alt="SinCUT Team" className="about-image" />
            <div className="image-overlay"></div>
          </div>
          
          <div className="about-text">
            <div className="section-header">
              <h1 className="about-title">About Us</h1>
              <div className="title-underline"></div>
            </div>
            
            <div className="about-description">
              <p className="intro-text">
                <span className="highlight">Welcome to SinCUT</span> where every small act creates a big impact. Our mission is to transform guilt into goodness by encouraging individuals to donate just $1 to charitable causes around the world.
              </p>
              
              <div className="mission-card">
                <h3>Our Mission</h3>
                <p>To empower people to acknowledge their past, take responsibility, and engage in a symbolic act of letting go through confession and conscious giving.</p>
              </div>
              
              <p>Founded on the principles of kindness, compassion, and positive change, SinCUT is more than just a donation platform. It's a community of like-minded individuals who are committed to making the world a better place, one act of kindness at a time.</p>
              
              <p>When you donate through SinCUT, you're not just giving money; you're cleansing your conscience and contributing to meaningful change. Your $1 donation helps fund various charitable initiatives, from providing clean water and education to supporting healthcare and disaster relief efforts.</p>
              
              <div className="values-grid">
                <div className="value-item">
                  <div className="value-icon">💫</div>
                  <h4>Transformation</h4>
                  <p>Turning guilt into positive action</p>
                </div>
                <div className="value-item">
                  <div className="value-icon">🤝</div>
                  <h4>Community</h4>
                  <p>Together we create bigger impact</p>
                </div>
                <div className="value-item">
                  <div className="value-icon">🔒</div>
                  <h4>Privacy</h4>
                  <p>Your confessions stay anonymous</p>
                </div>
              </div>
              
              <p>Join us in our mission to turn every sin into a chance for redemption. Together, we can create a ripple effect of kindness that spreads far and wide. Thank you for being a part of the SinCUT community and for helping us make a positive impact in the world.</p>
              
              <p>Our vision extends beyond individual redemption. By creating a community that values introspection, self-improvement, and generosity, SinCut encourages a culture of compassion and understanding. Each act of confession or donation contributes to this shared ethos, reminding us that even small gestures can have a meaningful impact.</p>
              
              <div className="cta-section">
                <p className="cta-text">Ready to make a difference?</p>
                <a href="/donate" className="cta-button">Start Your Journey</a>
              </div>
            </div>
            
            <div className="legal-section">
              <a href="/terms" className="legal-link" target="_blank" rel="noopener noreferrer">
                Read our legal terms and conditions
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 6H6C4.89543 6 4 6.89543 4 8V18C4 19.1046 4.89543 20 6 20H16C17.1046 20 18 19.1046 18 18V14M14 4H20M20 4V10M20 4L10 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
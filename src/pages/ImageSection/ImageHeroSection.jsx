import React from "react";
import "./ImageHeroSection.css";


const ImageHeroSection = () => {
  return (
    <div className="modern-dark-section">
      {/* Animated Background */}
      <div className="modern-dark-background">
        <div className="floating-orb orb-1"></div>
        <div className="floating-orb orb-2"></div>
        <div className="floating-orb orb-3"></div>
       
      </div>

      {/* Content Container */}
      <div className="content-container">
        {/* Animated Heading */}
        <div className="text-animation-container">
          <h2 className="animated-heading">
            <span className="title-gradient">Transform Your Digital Vision Into Reality</span>
          </h2>
          <p className="animated-subtitle">
            Experience the future of digital innovation with our cutting-edge solutions
          </p>
        </div>

        {/* Floating Images Container */}
        <div className="images-container">
          {/* Image 1 */}
          <div className="image-wrapper image-1">
            <div className="glassy-image">
              <div className="image-content">
                <div className="image-overlay"></div>
                <div className="image-text">
                  <h3>AI Powered</h3>
                  <p>Smart solutions for modern problems</p>
                </div>
              </div>
            </div>
            <div className="floating-dots"></div>
          </div>

          {/* Image 2 */}
          <div className="image-wrapper image-2">
            <div className="glassy-image">
              <div className="image-content">
                <div className="image-overlay"></div>
                <div className="image-text">
                  <h3>Cloud Native</h3>
                  <p>Scalable infrastructure for growth</p>
                </div>
              </div>
            </div>
            <div className="floating-dots"></div>
          </div>

          {/* Image 3 */}
          <div className="image-wrapper image-3">
            <div className="glassy-image">
              <div className="image-content">
                <div className="image-overlay"></div>
                <div className="image-text">
                  <h3>Secure</h3>
                  <p>Enterprise-grade security</p>
                </div>
              </div>
            </div>
            <div className="floating-dots"></div>
          </div>
        </div>

        {/* Floating Text Elements */}
        <div className="floating-text-elements">
          <div className="floating-text text-1">Innovate</div>
          <div className="floating-text text-2">Create</div>
          <div className="floating-text text-3">Transform</div>
          <div className="floating-text text-4">Elevate</div>
        </div>
          
      </div>
      
    </div>
    
  );
};

export default ImageHeroSection;
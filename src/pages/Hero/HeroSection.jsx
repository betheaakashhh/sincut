import React, { useState, useEffect } from "react";
import "./hero.css";
import QuoteMarquee from "../../components/marquee/QouteMarque";
import RazorpayButton from "../Razorpay/RazorpayButton";

const HeroSection = () => {
  const [heroText, setHeroText] = useState("");
  const [isWriting, setIsWriting] = useState(false);
  const [characterCount, setCharacterCount] = useState(0);
  const [userCountry, setUserCountry] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // This runs when Razorpay button asks permission to continue payment
  const handleBeforePay = () => {
    if (!heroText.trim()) {
      alert("Please write your confession before proceeding.");
      return false; // stop payment
    }
    setIsProcessing(true);
    
    // Simulate processing
    setTimeout(() => {
      alert("Your confession has been received. May you find peace and redemption.");
      setHeroText("");
      setCharacterCount(0);
      setIsProcessing(false);
    }, 2000);
    
    return true; // allow RazorpayButton to proceed
  };

  const handleTextChange = (e) => {
    const text = e.target.value;
    setHeroText(text);
    setCharacterCount(text.length);
    setIsWriting(text.length > 0);
  };

  useEffect(() => {
    const fetchUserCountry = async () => {
      try {
        const res = await fetch("https://ipapi.co/json/");
        const data = await res.json();
        console.log("Detected country:", data.country);
        setUserCountry(data.country);
      } catch (err) {
        console.error("Country detection failed", err);
      }
    };
    fetchUserCountry();
  }, []);

  return (
    <div className="modern-hero-section">
      {/* Animated Background Elements */}
      <div className="hero-background">
        <div className="floating-orb orb-1"></div>
        <div className="floating-orb orb-2"></div>
        <div className="floating-orb orb-3"></div>
        <div className="grid-lines"></div>
      </div>

      <div className="hero-container">
        {/* Main Heading */}
        <div className="hero-heading-container">
          <h1 className="hero-title">
            <span className="title-gradient">Confess Your</span>
            <span className="title-glitch">Sins</span>
          </h1>
          <p className="hero-subtitle">
            Release your burdens and find redemption. Your confession is sacred, 
            anonymous, and brings you closer to inner peace.
          </p>
        </div>

        {/* Dynamic Text Area */}
        <div className={`modern-textarea-container ${isWriting ? 'writing-active' : ''}`}>
          <div className="textarea-glow-effect"></div>
          <div className="dynamic-border"></div>
          <div className="sparkle-container">
            <div className="sparkle s1"></div>
            <div className="sparkle s2"></div>
            <div className="sparkle s3"></div>
          </div>
          
          <textarea
            className="modern-textarea"
            placeholder="Write your confession here... Let your heart speak freely"
            value={heroText}
            onChange={handleTextChange}
            rows={5}
          ></textarea>

          {/* Character Counter */}
          <div className="character-feedback">
            <div className="character-counter">
              {characterCount} / 1000 characters
            </div>
            {characterCount > 0 && (
              <div className="writing-feedback">
                {characterCount < 100 ? "Begin your healing journey..." :
                 characterCount < 400 ? "The divine is listening to your heart..." :
                 characterCount < 700 ? "Your honesty brings you closer to peace..." :
                 "You are being cleansed with every word..."}
              </div>
            )}
          </div>

          {/* Writing Animation */}
          {isWriting && (
            <div className="typing-animation">
              <div className="glow-dot dot-1"></div>
              <div className="glow-dot dot-2"></div>
              <div className="glow-dot dot-3"></div>
            </div>
          )}
        </div>

        {/* Progress Indicator */}
        {characterCount > 0 && (
          <div className="progress-indicator">
            <div className="progress-track">
              <div 
                className="progress-fill" 
                style={{width: `${Math.min(100, (characterCount / 1000) * 100)}%`}}
              ></div>
            </div>
            <div className="progress-label">
              {characterCount < 200 ? "Burden Lifting..." :
               characterCount < 500 ? "Soul Cleansing..." :
               "Almost Free..."}
            </div>
          </div>
        )}

        {/* Action Section with Razorpay Only */}
        <div className="hero-action-section">
          {isProcessing ? (
            <div className="processing-overlay">
              <div className="processing-spinner"></div>
              <p>Processing your confession...</p>
            </div>
          ) : userCountry === null ? (
            <div className="payment-loading">
              <div className="loading-spinner"></div>
              <p>Connecting to divine redemption...</p>
            </div>
          ) : userCountry === "IN" ? (
            <div className="razorpay-integration">
              <div className="confession-message">
                <span className="blessing-icon">🙏</span>
                Your confession prepares you for transformation
              </div>
              <RazorpayButton 
                amount={100} 
                onBeforePay={handleBeforePay}
                className="razorpay-custom-btn"
              />
              <p className="donation-note">
                Your ₹1 donation plants seeds of goodness and completes your redemption
              </p>
            </div>
          ) : (
            <div className="international-options">
              <div className="confession-message">
                <span className="global-icon">🌍</span>
                Divine redemption available worldwide
              </div>
              <div className="stripe-placeholder">
                <button className="modern-submit-btn" >
                  <span className="btn-glow"></span>
                  <span className="btn-text">Complete Redemption ($1)</span>
                  <span className="btn-arrow">→</span>
                </button>
              </div>
              <p className="donation-note">
                Your contribution supports spiritual healing worldwide
              </p>
            </div>
          )}
          
          <p className="action-note">
            Your confession is sacred and completely anonymous
          </p>
        </div>

        {/* Inspiration Quote */}
        <div className="inspiration-quote">
          <div className="quote-text">
            <QuoteMarquee />
          </div>
          <div className="quote-author">- The Path to Redemption</div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

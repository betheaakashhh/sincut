import React, { useState } from "react";
import "./hero.css";

import PaymentButton from "../Razorpay/PaymentButton";
import ThankfulPage from "../PaymentSuccess/ThankfulPage";

const HeroSection = () => {
  const [heroText, setHeroText] = useState("");
  const [isWriting, setIsWriting] = useState(false);
  const [characterCount, setCharacterCount] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showThankful, setShowThankful] = useState(false);
  const [paidAmount, setPaidAmount] = useState(0);

  const handleBeforePay = () => {
    if (!heroText.trim()) {
      alert("Please write your confession before proceeding.");
      return false;
    }
    setIsProcessing(true);

    setTimeout(() => {
      alert("May you find peace and redemption.");
      setHeroText("");
      setCharacterCount(0);
      setIsProcessing(false);
    }, 1300);

    return true;
  };
  
  const handlePaymentSuccess = (amount, response) => {
    console.log("Payment successful:", response);
    setPaidAmount(amount);
    setShowThankful(true);
  };

  const handleTextChange = (e) => {
    const text = e.target.value;
    setHeroText(text);
    setCharacterCount(text.length);
    setIsWriting(text.length > 0);
  };

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
        </div>

        {/* Dynamic Text Area */}
        <div
          className={`modern-textarea-container ${
            isWriting ? "writing-active" : ""
          }`}
        >
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
                {characterCount < 100
                  ? "Begin your healing journey..."
                  : characterCount < 400
                  ? "The divine is listening to your heart..."
                  : characterCount < 700
                  ? "Your honesty brings you closer to peace..."
                  : "You are being cleansed with every word..."}
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
                style={{
                  width: `${Math.min(100, (characterCount / 1000) * 100)}%`,
                }}
              ></div>
            </div>
            <div className="progress-label">
              {characterCount < 200
                ? "Burden Lifting..."
                : characterCount < 500
                ? "Soul Cleansing..."
                : "Almost Free..."}
            </div>
          </div>
        )}

        {/* Action Section */}
        <div className="hero-action-section">
          {isProcessing ? (
            <div className="processing-overlay">
              <div className="processing-spinner"></div>
              <p>Processing your confession...</p>
            </div>
          ) : (
            <div className="payment-integration">
              <PaymentButton
                onBeforePay={handleBeforePay}
                onPaymentSuccess={handlePaymentSuccess}
              />
            </div>
          )}
        </div>
      </div>

      {/* Thankful Page Modal */}
      {showThankful && (
        <div className="thankful-modal-overlay">
          <div className="thankful-modal-content">
            <ThankfulPage
              amount={paidAmount}
              onClose={() => setShowThankful(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default HeroSection;
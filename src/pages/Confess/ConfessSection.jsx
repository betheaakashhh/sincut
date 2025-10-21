import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./confess.css";
import RazorpayButton from "../Razorpay/RazorpayButton";

const ConfessSection = () => {
  
  const [userCountry, setUserCountry] = useState(null);
  const [isWriting, setIsWriting] = useState(false);
  const [characterCount, setCharacterCount] = useState(0);
  const navigate = useNavigate();

  const handleBeforePay = () => {
    if (!sinText.trim()) {
      alert("Please write your sin before donating.");
      return false;
    }
    alert("GOD BLESS YOU CHILD, Thank you!");
    setSinText("");
    setCharacterCount(0);
    return true;
  };

  const handlePaymentSuccess = (amount, response) => {
    console.log("Payment successful:", response);
    // Navigate to thankful page with amount in state
    navigate("/thanks", { state: { amount } });
  };

  const handleTextChange = (e) => {
    const text = e.target.value;
    setSinText(text);
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
    <div className="divine-confess-section">
      {/* Divine Background */}
      <div className="divine-background">
        <div className="heaven-light"></div>
        <div className="floating-blessing">🙏</div>
        <div className="floating-blessing">✨</div>
        <div className="floating-blessing">🕊️</div>
        <div className="floating-blessing">🌿</div>
      </div>

      <div className="confess-container">
        {/* Header */}
        <div className="sacred-header">
          <div className="divine-line left-line"></div>
          <div className="confess-title-container">
            <div className="halo-effect"></div>
            <h2 className="confess-title">Confess Your Sin</h2>
            <p className="divine-subtitle">
              Release Your Burden, Embrace Redemption
            </p>
          </div>
          <div className="divine-line right-line"></div>
        </div>

        {/* Sacred Description */}
        <div className="sacred-description-container">
          <div className="protection-icon">🔒</div>
          <p className="sacred-description">
            Your confession is sacred and completely anonymous. What you write
            here is between you and the divine — never stored, never shared.
            Release your guilt, and let your journey to peace begin.
          </p>
          <div className="protection-icon">🙏</div>
        </div>

        {/* Text Area */}
        <div className={`divine-textarea-container ${isWriting ? "active" : ""}`}>
          <div className="textarea-glow"></div>
          <div className="sparkle-effect"></div>
          <div className="divine-border"></div>

          <textarea
            className="divine-textarea"
            placeholder="Write your confession here... Let your heart speak freely"
            value={sinText}
            onChange={handleTextChange}
            rows={6}
            maxLength={500}
          ></textarea>

          <div className="character-guidance">
            <div className="character-count">
              {characterCount} / 500 characters
            </div>
            {characterCount > 0 && (
              <div className="divine-message">
                {characterCount < 50
                  ? "Begin your healing journey..."
                  : characterCount < 150
                  ? "The divine is listening to your heart..."
                  : characterCount < 300
                  ? "Your honesty brings you closer to peace..."
                  : "You are being cleansed with every word..."}
              </div>
            )}
          </div>
        </div>

        {/* Karma Bar */}
        {characterCount > 0 && (
          <div className="karma-indicator">
            <div className="karma-bar">
              <div
                className="karma-progress"
                style={{
                  width: `${Math.min(100, (characterCount / 500) * 100)}%`,
                }}
              ></div>
            </div>
            <div className="karma-label">
              {characterCount < 100
                ? "Burden Lifting..."
                : characterCount < 300
                ? "Soul Cleansing..."
                : "Almost Free..."}
            </div>
          </div>
        )}

        {/* Divine Action Section */}
        <div className="divine-action-section">
          {userCountry === null ? (
            <div className="payment-loading">
              <div className="loading-spinner"></div>
              <p>Connecting you to divine redemption...</p>
            </div>
          ) : userCountry === "IN" ? (
            <div className="razorpay-container">
              <div className="blessing-message">
                <span className="blessing-icon">💫</span>
                Your confession prepares you for transformation
              </div>
              <RazorpayButton
                amount={100}
                onBeforePay={handleBeforePay}
                onPaymentSuccess={handlePaymentSuccess}
              />
              <p className="donation-note">
                Your ₹100 donation plants seeds of goodness and completes your
                redemption
              </p>
            </div>
          ) : (
            <div className="international-payment">
              <div className="global-icon">🌍</div>
              <p>Divine redemption available worldwide</p>
              <p className="payment-note">
                Stripe payment integration for international users
              </p>
            </div>
          )}
        </div>

        {/* Final Blessing */}
        <div className="final-blessing">
          <div className="blessing-text">
            "Every confession is a step toward inner peace. Every donation is a
            seed of kindness."
          </div>
          <div className="blessing-signature">- The Path to Redemption</div>
        </div>
      </div>
    </div>
  );
};

export default ConfessSection;

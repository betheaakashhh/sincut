import React from "react";
import "./thankfull.css";

const ThankFull = ({ amount, onClose }) => {
  return (
    <div className="thankful-overlay">
      <div className="thankful-popup">
        <button className="close-btn" onClick={onClose}>✕</button>

        <h2>🙏 Payment Successful</h2>
        <p className="amount-text">
          You have contributed ₹{amount} towards your Karma Relief.
        </p>

        <div className="gratitude-section">
          <h3>🌸 Thank You for Your Confession</h3>
          <p>
            You’ve taken the first step towards inner peace and balance.
            This journey is about healing, forgiveness, and self-realization.
          </p>
        </div>

        <div className="healing-steps">
          <h3>🕊 Steps for Self-Healing</h3>
          <ol>
            <li><strong>Accept</strong> – Acknowledge your actions without judgment.</li>
            <li><strong>Forgive</strong> – Let go of guilt and self-blame.</li>
            <li><strong>Reflect</strong> – Spend 10 minutes daily in silence.</li>
            <li><strong>Give</strong> – Do one act of kindness every day.</li>
            <li><strong>Heal</strong> – Meditate or journal your emotions.</li>
          </ol>
        </div>

        <footer className="thankful-footer">
          <p>🌻 Your journey of healing has begun — continue with love and awareness.</p>
        </footer>
      </div>
    </div>
  );
};

export default ThankFull;

import React from "react";
import "./thankfull.css";

const ThankFull= ({ amount, onClose }) => {
  return (
    <div className="thankful-overlay">
      <div className="thankful-popup">
        <button className="close-btn" onClick={onClose}>✕</button>

        <h2>🙏 Payment Successful</h2>
        <p className="amount-text">You have contributed ₹{amount} towards your Karma Relief.</p>

        <div className="gratitude-section">
          <h3>🌸 Thank You for Your Confession</h3>
          <p>
            You’ve taken the first step towards inner peace and balance. This journey is
            about healing, forgiveness, and self-realization.
          </p>
        </div>

        <div className="healing-steps">
          <h3>🕊 Steps for Self-Healing</h3>
          <ol>
            <li><strong>Accept</strong> – Acknowledge your actions and emotions without judgment.</li>
            <li><strong>Forgive</strong> – Let go of guilt and negative self-talk. You are evolving.</li>
            <li><strong>Reflect</strong> – Spend 10 minutes in silence daily; ask yourself what you learned.</li>
            <li><strong>Give</strong> – Do one act of kindness every day without expecting return.</li>
            <li><strong>Heal</strong> – Meditate, journal, or pray to release emotional pain.</li>
          </ol>
        </div>

        <div className="dos-donts">
          <h3>☯ What to Do & What Not To</h3>
          <ul>
            <li>✅ Be honest with yourself and others.</li>
            <li>✅ Practice gratitude daily.</li>
            <li>❌ Don’t dwell on guilt or negativity.</li>
            <li>❌ Don’t compare your healing pace with others.</li>
          </ul>
        </div>

        <div className="introspection">
          <h3>💫 Self-Introspection</h3>
          <p>
            Ask yourself: “What am I learning from this?” “How can I grow from it?”
            Each answer brings you closer to peace.
          </p>
        </div>

        <footer className="thankful-footer">
          <p>🌻 Your journey of healing has begun — continue with love and awareness.</p>
        </footer>
      </div>
    </div>
  );
};

export default ThankFull;

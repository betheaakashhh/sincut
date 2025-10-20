import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./thankfull.css";

const ThankfulPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const amount = location.state?.amount || 100; // Default to 100 if not passed

  return (
    <div className="thankful-container">
      <div className="thankful-popup">
        <button className="close-btn" onClick={() => navigate("/")}>✖</button>
        
        {/* Divine Header */}
        <div className="thankful-header">
          <div className="halo-glow"></div>
          <h1>🙏 Thank You for Your Contribution 🙏</h1>
          <p className="divine-subtitle">Your Journey to Peace Begins Now</p>
        </div>

        <div className="payment-success">
          <div className="success-icon">✨</div>
          <p className="success-text">You have successfully paid ₹{amount}</p>
          <p className="divine-message">
            Your act of kindness has lightened your soul. You have taken a step
            toward peace, reflection, and self-healing.
          </p>
        </div>

        {/* Healing Guidance Sections */}
        <div className="healing-sections">
          <div className="healing-steps">
            <h2>🕊️ Self-Healing Journey 🕊️</h2>
            <ol>
              <li>Accept your past without fear or shame</li>
              <li>Practice forgiveness — both for yourself and others</li>
              <li>Spend 5 minutes in silent reflection daily</li>
              <li>Do one selfless act of kindness every day</li>
              <li>Maintain gratitude — write one thing you're thankful for daily</li>
              <li>Let go of guilt and walk forward with faith and clarity</li>
            </ol>
          </div>

          <div className="dos-donts">
            <h2>🌟 Dos & Don'ts for Inner Peace 🌟</h2>
            <div className="dos-donts-grid">
              <div className="dos">
                <h3>✅ Do</h3>
                <ul>
                  <li>Practice daily meditation</li>
                  <li>Be kind to yourself and others</li>
                  <li>Express gratitude regularly</li>
                  <li>Seek positive company</li>
                  <li>Help those in need</li>
                </ul>
              </div>
              <div className="donts">
                <h3>❌ Don't</h3>
                <ul>
                  <li>Dwell on past mistakes</li>
                  <li>Compare yourself to others</li>
                  <li>Hold onto resentment</li>
                  <li>Neglect self-care</li>
                  <li>Isolate yourself</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="introspection-guide">
            <h2>📝 Self-Introspection Guide 📝</h2>
            <div className="introspection-steps">
              <div className="intro-step">
                <span className="step-number">1</span>
                <div className="step-content">
                  <h4>Morning Reflection</h4>
                  <p>Start each day with 5 minutes of quiet contemplation. Ask yourself: "What good can I do today?"</p>
                </div>
              </div>
              <div className="intro-step">
                <span className="step-number">2</span>
                <div className="step-content">
                  <h4>Evening Review</h4>
                  <p>Before sleep, reflect on your day. Acknowledge both successes and learning opportunities.</p>
                </div>
              </div>
              <div className="intro-step">
                <span className="step-number">3</span>
                <div className="step-content">
                  <h4>Weekly Assessment</h4>
                  <p>Each week, note your growth in compassion, patience, and understanding.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="motivational-messages">
            <h2>💫 Words of Wisdom 💫</h2>
            <div className="wisdom-quotes">
              <blockquote>"The wound is the place where the Light enters you." - Rumi</blockquote>
              <blockquote>"You yourself, as much as anybody in the entire universe, deserve your love and affection." - Buddha</blockquote>
              <blockquote>"Peace comes from within. Do not seek it without." - Buddha</blockquote>
              <blockquote>"What we think, we become." - Buddha</blockquote>
            </div>
          </div>
        </div>

        <button className="return-btn" onClick={() => navigate("/")}>
          Return to Confession
        </button>
      </div>
    </div>
  );
};

export default ThankfulPage;

import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./thankfull.css";

const ThankfulPage = ({amount:propAmount = 100, onClose }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const amount = location.state?.amount || propAmount;
  

  return (
    <div className="thankful-page-container">
      <div className="thankful-page-content">
        <button className="thankful-close-btn" onClick={() => navigate("/confess")}>
          ✖
        </button>
        
        {/* Divine Header */}
        <div className="thankful-page-header">
          <div className="thankful-halo-glow"></div>
          <h1 className="thankful-main-title">🙏 Thank You for Your Contribution 🙏</h1>
          <p className="thankful-page-subtitle">
            Your Journey to Peace Begins Now
          </p>
        </div>

        <div className="thankful-payment-success">
          <div className="thankful-success-icon">✨</div>
          <p className="thankful-success-text">You have successfully paid ₹{amount}</p>
          <p className="thankful-divine-message">
            Your act of kindness has lightened your soul. You have taken a step
            toward peace, reflection, and self-healing.
          </p>
        </div>

        {/* Healing Guidance Sections */}
        <div className="thankful-healing-sections">
          <div className="thankful-healing-steps">
            <h2 className="thankful-section-title">🕊️ Self-Healing Journey 🕊️</h2>
            <ol className="thankful-steps-list">
              <li className="thankful-step-item">Accept your past without fear or shame</li>
              <li className="thankful-step-item">Practice forgiveness — both for yourself and others</li>
              <li className="thankful-step-item">Spend 5 minutes in silent reflection daily</li>
              <li className="thankful-step-item">Do one selfless act of kindness every day</li>
              <li className="thankful-step-item">Maintain gratitude — write one thing you're thankful for daily</li>
              <li className="thankful-step-item">Let go of guilt and walk forward with faith and clarity</li>
            </ol>
          </div>

          <div className="thankful-dos-donts">
            <h2 className="thankful-section-title">🌟 Dos & Don'ts for Inner Peace 🌟</h2>
            <div className="thankful-dos-donts-grid">
              <div className="thankful-dos-section">
                <h3 className="thankful-dos-title">✅ Do</h3>
                <ul className="thankful-dos-list">
                  <li className="thankful-dos-item">Practice daily meditation</li>
                  <li className="thankful-dos-item">Be kind to yourself and others</li>
                  <li className="thankful-dos-item">Express gratitude regularly</li>
                  <li className="thankful-dos-item">Seek positive company</li>
                  <li className="thankful-dos-item">Help those in need</li>
                </ul>
              </div>
              <div className="thankful-donts-section">
                <h3 className="thankful-donts-title">❌ Don't</h3>
                <ul className="thankful-donts-list">
                  <li className="thankful-donts-item">Dwell on past mistakes</li>
                  <li className="thankful-donts-item">Compare yourself to others</li>
                  <li className="thankful-donts-item">Hold onto resentment</li>
                  <li className="thankful-donts-item">Neglect self-care</li>
                  <li className="thankful-donts-item">Isolate yourself</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="thankful-introspection-guide">
            <h2 className="thankful-section-title">📝 Self-Introspection Guide 📝</h2>
            <div className="thankful-introspection-steps">
              <div className="thankful-intro-step">
                <span className="thankful-step-number">1</span>
                <div className="thankful-step-content">
                  <h4 className="thankful-step-heading">Morning Reflection</h4>
                  <p className="thankful-step-description">Start each day with 5 minutes of quiet contemplation. Ask yourself: "What good can I do today?"</p>
                </div>
              </div>
              <div className="thankful-intro-step">
                <span className="thankful-step-number">2</span>
                <div className="thankful-step-content">
                  <h4 className="thankful-step-heading">Evening Review</h4>
                  <p className="thankful-step-description">Before sleep, reflect on your day. Acknowledge both successes and learning opportunities.</p>
                </div>
              </div>
              <div className="thankful-intro-step">
                <span className="thankful-step-number">3</span>
                <div className="thankful-step-content">
                  <h4 className="thankful-step-heading">Weekly Assessment</h4>
                  <p className="thankful-step-description">Each week, note your growth in compassion, patience, and understanding.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="thankful-motivational-messages">
            <h2 className="thankful-section-title">💫 Words of Wisdom 💫</h2>
            <div className="thankful-wisdom-quotes">
              <blockquote className="thankful-quote">"The wound is the place where the Light enters you." - Rumi</blockquote>
              <blockquote className="thankful-quote">"You yourself, as much as anybody in the entire universe, deserve your love and affection." - Buddha</blockquote>
              <blockquote className="thankful-quote">"Peace comes from within. Do not seek it without." - Buddha</blockquote>
              <blockquote className="thankful-quote">"What we think, we become." - Buddha</blockquote>
            </div>
          </div>
        </div>

<<<<<<< HEAD
        <button className="thankful-return-btn" onClick={onClose ? onClose : () => navigate("/confess")}>
=======
        <button className="thankful-return-btn" onClick={() => navigate('/confess')}>
>>>>>>> c6a145a (asd)
          Return to Confession
        </button>
      </div>
    </div>
  );
};

export default ThankfulPage;

import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./thankfull.css";

const ThankfulPage = ({ amount: propAmount = 100, onClose }) => {
 const {state} = useLocation();
 if (!state?.paid) {
    return <Navigate to="/main" replace />;
  } 
  const location = useLocation();
  const navigate = useNavigate();
  const amount = location.state?.amount || propAmount;

  const handleClose = () => onClose ? onClose() : navigate("/confess");

  const healingSteps = [
    "Accept your past without fear or shame",
    "Practice forgiveness — both for yourself and others",
    "Spend 5 minutes in silent reflection daily",
    "Do one selfless act of kindness every day",
    "Maintain gratitude — write one thing you're thankful for daily",
    "Let go of guilt and walk forward with faith and clarity"
  ];

  const dosList = [
    "Practice daily meditation",
    "Be kind to yourself and others",
    "Express gratitude regularly",
    "Seek positive company",
    "Help those in need"
  ];

  const dontsList = [
    "Dwell on past mistakes",
    "Compare yourself to others",
    "Hold onto resentment",
    "Neglect self-care",
    "Isolate yourself"
  ];

  const introspectionSteps = [
    {
      title: "Morning Reflection",
      description: "Start each day with 5 minutes of quiet contemplation. Ask yourself: 'What good can I do today?'"
    },
    {
      title: "Evening Review",
      description: "Before sleep, reflect on your day. Acknowledge both successes and learning opportunities."
    },
    {
      title: "Weekly Assessment",
      description: "Each week, note your growth in compassion, patience, and understanding."
    }
  ];

  const quotes = [
    '"The wound is the place where the Light enters you." - Rumi',
    '"You yourself, as much as anybody in the entire universe, deserve your love and affection." - Buddha',
    '"Peace comes from within. Do not seek it without." - Buddha',
    '"What we think, we become." - Buddha'
  ];

  return (
    <div className="thankful-page-container">
      <div className="thankful-page-content">
        <button className="thankful-close-btn" onClick={handleClose}>
          ✖
        </button>
        
        {/* Header */}
        <div className="thankful-page-header">
          <div className="thankful-halo-glow"></div>
          <h1 className="thankful-main-title">🙏 Thank You for Your Contribution 🙏</h1>
          <p className="thankful-page-subtitle">Your Journey to Peace Begins Now</p>
        </div>

        {/* Payment Success */}
        <div className="thankful-payment-success">
          <div className="thankful-success-icon">✨</div>
          <p className="thankful-success-text">You have successfully paid ₹{amount}</p>
          <p className="thankful-divine-message">
            Your act of kindness has lightened your soul. You have taken a step
            toward peace, reflection, and self-healing.
          </p>
        </div>

        {/* Healing Sections */}
        <div className="thankful-healing-sections">
          {/* Self-Healing Journey */}
          <div className="thankful-section-card">
            <h2 className="thankful-section-title">🕊️ Self-Healing Journey 🕊️</h2>
            <ol className="thankful-steps-list">
              {healingSteps.map((step, index) => (
                <li key={index} className="thankful-step-item">{step}</li>
              ))}
            </ol>
          </div>

          {/* Dos & Don'ts */}
          <div className="thankful-section-card">
            <h2 className="thankful-section-title">🌟 Dos & Don'ts for Inner Peace 🌟</h2>
            <div className="thankful-dos-donts-grid">
              <div className="thankful-dos-section">
                <h3 className="thankful-dos-title">✅ Do</h3>
                <ul className="thankful-dos-list">
                  {dosList.map((item, index) => (
                    <li key={index} className="thankful-dos-item">{item}</li>
                  ))}
                </ul>
              </div>
              <div className="thankful-donts-section">
                <h3 className="thankful-donts-title">❌ Don't</h3>
                <ul className="thankful-donts-list">
                  {dontsList.map((item, index) => (
                    <li key={index} className="thankful-donts-item">{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Introspection Guide */}
          <div className="thankful-section-card">
            <h2 className="thankful-section-title">📝 Self-Introspection Guide 📝</h2>
            <div className="thankful-introspection-steps">
              {introspectionSteps.map((step, index) => (
                <div key={index} className="thankful-intro-step">
                  <span className="thankful-step-number">{index + 1}</span>
                  <div className="thankful-step-content">
                    <h4 className="thankful-step-heading">{step.title}</h4>
                    <p className="thankful-step-description">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Motivational Messages */}
          <div className="thankful-section-card">
            <h2 className="thankful-section-title">💫 Words of Wisdom 💫</h2>
            <div className="thankful-wisdom-quotes">
              {quotes.map((quote, index) => (
                <blockquote key={index} className="thankful-quote">{quote}</blockquote>
              ))}
            </div>
          </div>
        </div>

        <button className="thankful-return-btn" onClick={handleClose}>
          Return to Confession
        </button>
      </div>
    </div>
  );
};

export default ThankfulPage;

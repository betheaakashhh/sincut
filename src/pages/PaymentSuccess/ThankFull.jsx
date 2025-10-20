import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./thankfull.css";

const ThankFull = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const amount = location.state?.amount || 0;

  return (
    <div className="thankful-container">
      <div className="thankful-popup">
        <button className="close-btn" onClick={() => navigate("/")}>✖</button>
        <h1>🙏 Thank You for Your Contribution 🙏</h1>
        <p className="success-text">You have successfully paid ₹{amount}</p>
        <p className="divine-message">
          Your act of kindness has lightened your soul. You have taken a step
          toward peace, reflection, and self-healing.
        </p>

        <div className="healing-steps">
          <h2>🕊️ Self-Healing Journey 🕊️</h2>
          <ol>
            <li>Accept your past without fear or shame.</li>
            <li>Practice forgiveness — both for yourself and others.</li>
            <li>Spend 5 minutes in silent reflection daily.</li>
            <li>Do one selfless act of kindness every day.</li>
            <li>Maintain gratitude — write one thing you’re thankful for daily.</li>
            <li>Let go of guilt and walk forward with faith and clarity.</li>
          </ol>
        </div>

        <button className="return-btn" onClick={() => navigate("/")}>
          Return to Confession
        </button>
      </div>
    </div>
  );
};

export default Thankull;

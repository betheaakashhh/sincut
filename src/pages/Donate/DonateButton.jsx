import React from 'react';
import { useNavigate } from 'react-router-dom';
import './donatebutton.css'; // separate CSS or reuse existing

const DonateButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/clean0a1drop'); // route to your new page
  };

  return (
     <div className="donate-button-container">
      {/* Main Share Button */}
      <button className="donate-main-btn" onClick={handleClick}>
        <span className="donate-icon">🔗</span>
        <span className="donate-text">Donate</span>
        <span className="donate-arrow">▼</span>
      </button>
      </div>
  );
};

export default DonateButton;

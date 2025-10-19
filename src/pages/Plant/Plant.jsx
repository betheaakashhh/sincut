import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Plant.css'; // separate CSS or reuse existing

const DonateButton = () => {
  const navigate = useNavigate();

  const handleClickPlant = () => {
    navigate('/plant-your-karma'); // route to your new page
  };

  return (
     <div className="plant-button-container">
      {/* Main Share Button */}
      <button className="plant-main-btn" onClick={handleClickPlant}>
        <span className="plant-icon">🔗</span>
        <span className="plant-text">Plant</span>
        <span className="plant-arrow">▼</span>
      </button>
      </div>
  );
};

export default DonateButton;

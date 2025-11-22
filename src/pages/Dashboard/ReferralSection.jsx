// components/ReferralSection.jsx
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import './referral.css';

const ReferralSection = ({ data, onUpdate }) => {
  const [copied, setCopied] = useState(false);

  const copyReferralLink = () => {
    const referralLink = `${window.location.origin}/register?ref=${data.referralCode}`;
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    toast.success('Referral link copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  const shareReferral = async () => {
    const referralLink = `${window.location.origin}/register?ref=${data.referralCode}`;
    const shareText = `Join me on this amazing platform! Use my referral code: ${data.referralCode} and we both get rewards!`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Join with my referral',
          text: shareText,
          url: referralLink,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      copyReferralLink();
    }
  };

  return (
    <div className="referral-section">
      {/* Referral Code Card */}
      <div className="referral-card">
        <div className="referral-header">
          <span className="referral-icon">📤</span>
          <h3 className="referral-title">Your Referral Code</h3>
        </div>
        <p className="referral-description">
          Share your code with friends and earn rewards when they join!
        </p>
        <div className="referral-actions">
          <code className="referral-code">
            {data.referralCode}
          </code>
          <div className="action-buttons">
            <button
              className="action-button copy-button"
              onClick={copyReferralLink}
            >
              <span className="button-icon">{copied ? '✅' : '📋'}</span>
              {copied ? 'Copied!' : 'Copy'}
            </button>
            <button
              className="action-button share-button"
              onClick={shareReferral}
            >
              <span className="button-icon">📤</span>
              Share
            </button>
          </div>
        </div>
        <div className="referral-bonus">
          <div className="bonus-icon">🎁</div>
          <div className="bonus-content">
            <p className="bonus-title">Referral Bonus</p>
            <p className="bonus-amount">+40 coins</p>
            <p className="bonus-subtitle">per successful referral</p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="referral-stats">
        <div className="stat-item">
          <div className="stat-item-icon">👥</div>
          <div className="stat-item-content">
            <p className="stat-item-label">Total Referred</p>
            <p className="stat-item-value">{data.totalReferredUsers}</p>
          </div>
        </div>
        
        <div className="stat-item">
          <div className="stat-item-icon">🎁</div>
          <div className="stat-item-content">
            <p className="stat-item-label">Signup Bonus</p>
            <p className="stat-item-value">{data.totalSignupBonus} coins</p>
          </div>
        </div>
        
        <div className="stat-item">
          <div className="stat-item-icon">🪙</div>
          <div className="stat-item-content">
            <p className="stat-item-label">Confession Bonus</p>
            <p className="stat-item-value">{data.totalConfessionBonus} coins</p>
          </div>
        </div>
      </div>

      {/* Referral History */}
      <div className="history-section">
        <div className="history-header">
          <span className="history-icon">📊</span>
          <h3 className="history-title">Referral History</h3>
        </div>
        
        {data.history && data.history.length > 0 ? (
          <div className="history-list">
            {data.history.slice(0, 10).map((item, index) => (
              <div
                key={index}
                className="history-item"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="history-item-main">
                  <div className={`history-icon-container ${
                    item.type === 'signup_bonus' ? 'signup' : 'confession'
                  }`}>
                    {item.type === 'signup_bonus' ? '👥' : '🪙'}
                  </div>
                  <div className="history-details">
                    <p className="history-type">
                      {item.type.replace('_', ' ').toUpperCase()}
                    </p>
                    <p className="history-date">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="history-amount">
                  <p className="amount-value">+{item.amount} coins</p>
                  {item.referredUser && (
                    <p className="referred-user">
                      {item.referredUser.name || 'Anonymous'}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-history">
            <div className="empty-icon">👥</div>
            <p className="empty-title">No referral history yet</p>
            <p className="empty-description">Start sharing your referral code to earn rewards!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReferralSection;
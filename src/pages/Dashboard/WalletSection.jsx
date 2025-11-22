// components/WalletSection.jsx
import React, { useState } from 'react';
import { convertCoinsToDivine, useDivineCoin } from '../../services/api';
import { toast } from 'react-hot-toast';
import './wallet.css';

const WalletSection = ({ data, onUpdate }) => {
  const [converting, setConverting] = useState(false);
  const [usingDivine, setUsingDivine] = useState(false);

  const handleConvert = async () => {
    if (data.coins < 333) {
      toast.error('You need at least 333 coins to convert');
      return;
    }

    setConverting(true);
    try {
      await convertCoinsToDivine();
      toast.success('Successfully converted 333 coins to 1 Divine Coin!');
      onUpdate();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Conversion failed');
    } finally {
      setConverting(false);
    }
  };

  const handleUseDivine = async () => {
    if (data.divineCoins < 1) {
      toast.error('You need at least 1 Divine Coin');
      return;
    }

    setUsingDivine(true);
    try {
      await useDivineCoin();
      toast.success('Divine Coin used successfully!');
      onUpdate();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to use Divine Coin');
    } finally {
      setUsingDivine(false);
    }
  };

  return (
    <div className="wallet-section">
      {/* Balance Cards */}
      <div className="balance-cards">
        <div className="balance-card coins-card">
          <div className="balance-header">
            <div className="balance-icon">🪙</div>
            <span className="balance-title">Regular Coins</span>
          </div>
          <p className="balance-amount">{data.coins}</p>
          <p className="balance-subtitle">Available balance</p>
          <div className="balance-info">
            <p className="info-label">Conversion Rate</p>
            <p className="info-value">333 coins = 1 Divine</p>
          </div>
        </div>

        <div className="balance-card divine-card">
          <div className="balance-header">
            <div className="balance-icon">💎</div>
            <span className="balance-title">Divine Coins</span>
          </div>
          <p className="balance-amount">{data.divineCoins}</p>
          <p className="balance-subtitle">Premium currency</p>
          <div className="balance-info">
            <p className="info-label">Special Features</p>
            <p className="info-value">Unlock Premium</p>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="wallet-actions">
        <div className="actions-header">
          <span className="actions-icon">⚡</span>
          <h3 className="actions-title">Quick Actions</h3>
        </div>
        
        <div className="action-buttons-grid">
          <button
            className={`action-button convert-button ${converting ? 'loading' : ''} ${data.coins < 333 ? 'disabled' : ''}`}
            onClick={handleConvert}
            disabled={converting || data.coins < 333}
          >
            <span className="button-icon">
              {converting ? '🔄' : '🔄'}
            </span>
            <span className="button-text">
              {converting ? 'Converting...' : 'Convert to Divine Coin'}
            </span>
          </button>

          <button
            className={`action-button use-button ${usingDivine ? 'loading' : ''} ${data.divineCoins < 1 ? 'disabled' : ''}`}
            onClick={handleUseDivine}
            disabled={usingDivine || data.divineCoins < 1}
          >
            <span className="button-icon">
              {usingDivine ? '🔄' : '💎'}
            </span>
            <span className="button-text">
              {usingDivine ? 'Processing...' : 'Use Divine Coin'}
            </span>
          </button>
        </div>
      </div>

      {/* Transaction History */}
      <div className="transaction-section">
        <div className="transaction-header">
          <span className="transaction-icon">📊</span>
          <h3 className="transaction-title">Transaction History</h3>
        </div>
        
        {data.walletHistory && data.walletHistory.length > 0 ? (
          <div className="transaction-list">
            {data.walletHistory.map((transaction, index) => (
              <div
                key={index}
                className="transaction-item"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="transaction-main">
                  <div className={`transaction-icon-container ${
                    transaction.amount > 0 ? 'income' : 
                    transaction.type.includes('divine') ? 'divine' : 'expense'
                  }`}>
                    {transaction.amount > 0 ? '🪙' : '⚡'}
                  </div>
                  <div className="transaction-details">
                    <p className="transaction-type">
                      {transaction.type.replace(/_/g, ' ').toUpperCase()}
                    </p>
                    <p className="transaction-date">
                      {new Date(transaction.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="transaction-amount">
                  <p className={`amount-value ${
                    transaction.amount > 0 ? 'positive' : 
                    transaction.type.includes('divine') ? 'divine' : 'negative'
                  }`}>
                    {transaction.amount > 0 ? '+' : ''}{transaction.amount}
                    {transaction.type.includes('divine') ? ' divine coin' : ' coins'}
                  </p>
                  {transaction.message && (
                    <p className="transaction-message">{transaction.message}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-transactions">
            <div className="empty-icon">📊</div>
            <p className="empty-title">No transaction history yet</p>
            <p className="empty-description">Your transactions will appear here</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WalletSection;
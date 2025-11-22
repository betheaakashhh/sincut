// components/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import ReferralSection from './ReferralSection';
import WalletSection from './WalletSection';
import { getReferralDashboard, getWallet } from '../../services/api.js';
import './dashboard.css';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('referral');
  const [dashboardData, setDashboardData] = useState(null);
  const [walletData, setWalletData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [referralRes, walletRes] = await Promise.all([
        getReferralDashboard(),
        getWallet()
      ]);
      setDashboardData(referralRes.data);
      setWalletData(walletRes.data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="loading-spinner"></div>
        <p>Loading your dashboard...</p>
      </div>
    );
  }
    // Safe data access
  const safeDashboardData = dashboardData || {};
  const safeWalletData = walletData || {};
  return (
    <div className="dashboard">
      {/* Header */}
      <header className="dashboard-header">
        <div className="dashboard-container">
          <div className="header-content">
            <h1 className="dashboard-title">Your Dashboard</h1>
            <div className="user-info">
              <p className="welcome-text">Welcome back!</p>
              <p className="user-name">{safeDashboardData.user?.name || 'User'}</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="dashboard-main">
        <div className="dashboard-container">
          {/* Stats Overview */}
          <div className="stats-grid">
            <StatCard
              icon="👥"
              title="Total Referrals"
              value={safeDashboardData.totalReferredUsers || 0}
              color="blue"
            />
            <StatCard
              icon="🪙"
              title="Referral Coins"
              value={safeDashboardData.referralCoins || 0}
              color="yellow"
            />
            <StatCard
              icon="💎"
              title="Divine Coins"
              value={safeWalletData.divineCoins || 0}
              color="purple"
            />
            <StatCard
              icon="📈"
              title="Total Bonus"
              value={(safeDashboardData.totalSignupBonus || 0) + (safeDashboardData.totalConfessionBonus || 0)}
              color="green"
            />
          </div>

          {/* Tab Navigation */}
          <div className="tab-navigation">
            <div className="tab-buttons">
              <button
                className={`tab-button ${activeTab === 'referral' ? 'active' : ''}`}
                onClick={() => setActiveTab('referral')}
              >
                <span className="tab-icon">📤</span>
                Referral Program
              </button>
              <button
                className={`tab-button ${activeTab === 'wallet' ? 'active' : ''}`}
                onClick={() => setActiveTab('wallet')}
              >
                <span className="tab-icon">💰</span>
                Wallet & Coins
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="tab-content">
            {activeTab === 'referral' ? (
              <ReferralSection 
                data={dashboardData} 
                onUpdate={fetchDashboardData}
              />
            ) : (
              <WalletSection 
                data={walletData}
                onUpdate={fetchDashboardData}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

const StatCard = ({ icon, title, value, color }) => (
  <div className={`stat-card stat-card-${color}`}>
    <div className="stat-content">
      <div>
        <p className="stat-title">{title}</p>
        <p className="stat-value">{value}</p>
      </div>
      <div className="stat-icon">
        {icon}
      </div>
    </div>
  </div>
);

export default Dashboard;
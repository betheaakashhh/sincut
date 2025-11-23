// components/Dashboard.jsx - FIXED FOR BUG 5
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ReferralSection from './ReferralSection';
import WalletSection from './WalletSection';
import { getReferralDashboard, getWallet } from '../../services/api.js';
import './dashboard.css';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('referral');
  const [dashboardData, setDashboardData] = useState(null);
  const [walletData, setWalletData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  console.log('🔍 Dashboard mounted');

  // 🔥 BUG 5 FIX: No getCurrentUser() here
  useEffect(() => {
    const token = localStorage.getItem('accessToken');

    console.log('🔍 Checking auth: token', token ? 'FOUND' : 'NOT FOUND');

    if (!token) {
      console.log('❌ No token, redirecting...');
      navigate('/login');
      return;
    }

    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    console.log('🔍 Fetching referral + wallet...');
    try {
      setLoading(true);
      setError(null);

      const [referralRes, walletRes] = await Promise.all([
        getReferralDashboard(),
        getWallet()
      ]);

      setDashboardData(referralRes.data);
      setWalletData(walletRes.data);

      console.log('✅ Dashboard loaded');
    } catch (err) {
      console.error('❌ Dashboard error:', err);

      if (err.response?.status === 401) {
        console.log('❌ 401 -> redirect login');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');
        navigate('/login');
      } else {
        setError(err.response?.data?.message || 'Failed to load dashboard');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    navigate('/login');
  };

  // Loading screen
  if (loading) {
    return (
      <div className="dashboard">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  // Error screen
  if (error) {
    return (
      <div className="dashboard">
        <div className="error-container">
          <div className="error-icon">⚠️</div>
          <h3>Error Loading Dashboard</h3>
          <p>{error}</p>
          <button onClick={fetchDashboardData} className="retry-button">
            Try Again
          </button>
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        </div>
      </div>
    );
  }

  const storedUser = JSON.parse(localStorage.getItem('user') || '{}');

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="dashboard-container">
          <div className="header-content">
            <h1 className="dashboard-title">Your Dashboard</h1>
            <div className="user-info">
              <p className="welcome-text">Welcome back!</p>
              <p className="user-name">{storedUser?.name || 'User'}</p>

              <button onClick={handleLogout} className="logout-btn">
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="dashboard-main">
        <div className="dashboard-container">

          {/* Stats */}
          <div className="stats-grid">
            <StatCard
              icon="👥"
              title="Total Referrals"
              value={dashboardData?.totalReferredUsers || 0}
              color="blue"
            />
            <StatCard
              icon="🪙"
              title="Referral Coins"
              value={dashboardData?.referralCoins || 0}
              color="yellow"
            />
            <StatCard
              icon="💎"
              title="Divine Coins"
              value={walletData?.divineCoins || 0}
              color="purple"
            />
            <StatCard
              icon="📈"
              title="Total Bonus"
              value={
                (dashboardData?.totalSignupBonus || 0) +
                (dashboardData?.totalConfessionBonus || 0)
              }
              color="green"
            />
          </div>

          {/* Tabs */}
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

          {/* Content */}
          <div className="tab-content">
            {activeTab === 'referral' ? (
              <ReferralSection data={dashboardData} onUpdate={fetchDashboardData} />
            ) : (
              <WalletSection data={walletData} onUpdate={fetchDashboardData} />
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
      <div className="stat-icon">{icon}</div>
    </div>
  </div>
);

export default Dashboard;

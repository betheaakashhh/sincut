// components/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // ADD THIS IMPORT
import ReferralSection from './ReferralSection';
import WalletSection from './WalletSection';
import { getReferralDashboard, getWallet, getCurrentUser } from '../../services/api.js';
import './dashboard.css';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('referral');
  const [dashboardData, setDashboardData] = useState(null);
  const [walletData, setWalletData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  console.log('🔍 Dashboard component mounted');

  useEffect(() => {
    console.log('🔍 Dashboard useEffect triggered');
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    console.log('🔍 fetchDashboardData called');
    try {
      setLoading(true);
      setError(null);
      
      console.log('🔍 Checking authentication...');
      const token = localStorage.getItem('accessToken');
      const user = localStorage.getItem('user');
      console.log('🔍 Token exists:', !!token);
      console.log('🔍 User data exists:', !!user);
      
      if (!token) {
        console.log('❌ No token found, redirecting to login');
        navigate('/login');
        return;
      }

      console.log('🔍 Making API calls...');
      
      // First verify the user is still valid
      try {
        const userResponse = await getCurrentUser();
        console.log('✅ User verification successful');
      } catch (userError) {
        console.error('❌ User verification failed:', userError);
        throw userError;
      }
      
      const [referralRes, walletRes] = await Promise.all([
        getReferralDashboard(),
        getWallet()
      ]);
      
      console.log('✅ API calls successful:', {
        referralData: referralRes.data,
        walletData: walletRes.data
      });
      
      setDashboardData(referralRes.data);
      setWalletData(walletRes.data);
      
    } catch (error) {
      console.error('❌ Error fetching dashboard data:', error);
      console.log('🔍 Error details:', {
        status: error.response?.status,
        message: error.message,
        data: error.response?.data
      });
      
      if (error.response?.status === 401 || error.message.includes('token')) {
        console.log('🔍 Authentication error - Clearing tokens and redirecting');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');
        navigate('/login');
      } else {
        setError('Failed to load dashboard data. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const safeDashboardData = dashboardData || {};
  const safeWalletData = walletData || {};

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
        </div>
      </div>
    );
  }

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
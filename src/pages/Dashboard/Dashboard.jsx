// components/Dashboard.jsx - UPDATED
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
  const checkAuth = () => {
    // Check both localStorage and sessionStorage
    const accessToken = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');
    const user = localStorage.getItem('user');
    
    console.log('🔍 Comprehensive auth check:');
    console.log('   localStorage accessToken:', localStorage.getItem('accessToken') ? '✅ Present' : '❌ Missing');
   
    console.log('   localStorage user:', localStorage.getItem('user') ? '✅ Present' : '❌ Missing');
    
    
    // Log all storage keys for debugging
    console.log('   All localStorage keys:', Object.keys(localStorage));
    console.log('   All sessionStorage keys:', Object.keys(sessionStorage));

    if (!accessToken) {
      console.log('❌ No authentication token found in any storage');
      navigate('/login');
      return false;
    }
    
    console.log('✅ Authentication found!');
    return true;
  };

  if (checkAuth()) {
    fetchDashboardData();
  }
}, [navigate]);

  const fetchDashboardData = async () => {
    console.log('🔍 Starting to fetch dashboard data...');
    try {
      setLoading(true);
      setError(null);

      // Verify token is still valid
      try {
        console.log('🔍 Verifying token with /auth/me...');
        const userResponse = await getCurrentUser();
        console.log('✅ Token is valid, user:', userResponse.data);
      } catch (authError) {
        console.error('❌ Token verification failed:', authError);
        throw new Error('Authentication failed');
      }

      // Fetch dashboard data
      console.log('🔍 Fetching referral and wallet data...');
      const [referralRes, walletRes] = await Promise.all([
        getReferralDashboard(),
        getWallet()
      ]);
      
      console.log('✅ Dashboard data fetched successfully');
      setDashboardData(referralRes.data);
      setWalletData(walletRes.data);
      
    } catch (error) {
      console.error('❌ Error fetching dashboard data:', error);
      
      if (error.response?.status === 401 || error.message.includes('Authentication failed')) {
        console.log('🔍 Authentication error, clearing tokens and redirecting...');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');
        navigate('/login');
      } else {
        setError(error.response?.data?.message || 'Failed to load dashboard data. Please try again.');
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

  // Loading state
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

  // Error state (non-auth errors)
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

  // Main dashboard render
  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="dashboard-container">
          <div className="header-content">
            <h1 className="dashboard-title">Your Dashboard</h1>
            <div className="user-info">
              <p className="welcome-text">Welcome back!</p>
              <p className="user-name">{dashboardData?.user?.name || 'User'}</p>
              <button onClick={handleLogout} className="logout-btn">
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="dashboard-main">
        <div className="dashboard-container">
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
              value={(dashboardData?.totalSignupBonus || 0) + (dashboardData?.totalConfessionBonus || 0)}
              color="green"
            />
          </div>

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
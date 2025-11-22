// pages/DebugAuth.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const DebugAuth = () => {
  const navigate = useNavigate();

  const checkTokens = () => {
    const token = localStorage.getItem('accessToken');
    const user = localStorage.getItem('user');
    
    console.log('🔍 Current tokens in localStorage:', {
      accessToken: token,
      user: user ? JSON.parse(user) : null
    });
    
    alert(`Token: ${token ? 'EXISTS' : 'MISSING'}\nUser: ${user ? JSON.parse(user).email : 'MISSING'}`);
  };

  const clearTokens = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    console.log('🧹 Tokens cleared');
    alert('Tokens cleared!');
  };

  const testAPI = async () => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      alert('No token found!');
      return;
    }

    try {
      const response = await fetch('https://sincut-razorpay.vercel.app/api/auth/me', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      console.log('🔐 API test response:', response.status, response.statusText);
      alert(`API Test: ${response.status} ${response.statusText}`);
    } catch (error) {
      console.error('🔐 API test failed:', error);
      alert('API test failed: ' + error.message);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>🔧 Authentication Debug</h1>
      
      <div style={{ margin: '20px 0' }}>
        <button onClick={checkTokens} style={{ margin: '5px', padding: '10px' }}>
          Check Tokens
        </button>
        <button onClick={clearTokens} style={{ margin: '5px', padding: '10px' }}>
          Clear Tokens
        </button>
        <button onClick={testAPI} style={{ margin: '5px', padding: '10px' }}>
          Test API
        </button>
      </div>

      <div>
        <button onClick={() => navigate('/register')} style={{ margin: '5px', padding: '10px' }}>
          Go to Register
        </button>
        <button onClick={() => navigate('/dashboard')} style={{ margin: '5px', padding: '10px' }}>
          Go to Dashboard
        </button>
      </div>
    </div>
  );
};

export default DebugAuth;
// services/api.js - UPDATED
import axios from 'axios';

// FIXED: Use correct environment variable
const API_URL = import.meta.env.VITE_API_BASE_URL || 'https://sincut-razorpay.vercel.app/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token && token !== 'null' && token !== 'undefined') {
      config.headers.Authorization = `Bearer ${token}`;
      console.log('🔐 Adding token to request');
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle token refresh
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(token => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return api(originalRequest);
        }).catch(err => {
          return Promise.reject(err);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        console.log('🔄 Attempting to refresh token...');
        
        // Make refresh request without auth header to avoid loop
        const response = await axios.post(`${API_URL}/auth/refresh-token`, {}, {
          withCredentials: true
        });
        
        const { accessToken, user } = response.data;
        
        console.log('✅ Token refresh successful');
        
        // Store new token
        localStorage.setItem('accessToken', accessToken);
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
        }

        // Update current request
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        
        processQueue(null, accessToken);
        
        return api(originalRequest);
        
      } catch (refreshError) {
        console.error('❌ Token refresh failed:', refreshError);
        
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');
        
        processQueue(refreshError, null);
        
        window.location.href = '/login';
        
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

// API functions with better error handling
export const getReferralDashboard = () => {
  console.log('📊 Fetching referral dashboard...');
  return api.get('/referral/dashboard');
};

export const getWallet = () => {
  console.log('💰 Fetching wallet data...');
  return api.get('/wallet');
};

export const convertCoinsToDivine = () => {
  console.log('🔄 Converting coins to divine...');
  return api.post('/wallet/convert-to-divine');
};

export const useDivineCoin = () => {
  console.log('💎 Using divine coin...');
  return api.post('/wallet/use-divine-coin');
};

export const getCurrentUser = () => {
  console.log('👤 Getting current user...');
  return api.get('/auth/me');
};

export default api;
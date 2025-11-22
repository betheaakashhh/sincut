// services/api.js - FIXED VERSION
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_BASE_URL_API || 'https://sincut-razorpay.vercel.app/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const response = await api.post('/auth/refresh-token');
        const { accessToken } = response.data;
        
        localStorage.setItem('accessToken', accessToken);
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        
        return api(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem('accessToken');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

// CORRECTED API ENDPOINTS - Match backend routes
export const getReferralDashboard = () => {
  return api.get('/referral/dashboard'); // This matches backend /dashboard route
};

export const getWallet = () => {
  return api.get('/referral/wallet'); // Add /referral prefix to match backend
};

export const convertCoinsToDivine = () => {
  return api.post('/referral/convert'); // Fixed typo: 'conver' → 'convert'
};

export const useDivineCoin = () => {
  return api.post('/referral/use-divine');
};

export const rewardReferralPayment = (userId) => {
  return api.post('/referral/reward-payment', { userId }); // Add /referral prefix
};

export const getMe = () => {
  return api.get('/auth/me');
};

export default api;
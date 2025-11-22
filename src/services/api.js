// services/api.js - COMPLETE FIXED VERSION
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_BASE_URL_API || 'https://sincut-razorpay.vercel.app/api';

// Create main API instance
const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

// Store refresh token request to prevent multiple calls
let refreshTokenRequest = null;

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle token refresh - FIXED VERSION
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If it's a 401 error and not already retrying AND not a refresh token request
    if (error.response?.status === 401 && 
        !originalRequest._retry && 
        !originalRequest.url.includes('/auth/refresh-token')) {
      
      originalRequest._retry = true;

      try {
        // If we don't have a refresh token request in progress, create one
        if (!refreshTokenRequest) {
          refreshTokenRequest = axios.post(`${API_BASE_URL}/auth/refresh-token`, {}, {
            withCredentials: true
          });
        }

        const response = await refreshTokenRequest;
        const { accessToken } = response.data;
        
        // Store new token
        localStorage.setItem('accessToken', accessToken);
        
        // Update the original request with new token
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        
        // Reset refresh token request
        refreshTokenRequest = null;
        
        // Retry the original request
        return api(originalRequest);
        
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError);
        
        // Clear tokens and redirect to login
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
        
        // Reset refresh token request
        refreshTokenRequest = null;
        
        // Redirect to login page
        if (window.location.pathname !== '/login') {
          window.location.href = '/login';
        }
        
        return Promise.reject(refreshError);
      }
    }

    // If it's a 401 from refresh token endpoint itself, clear everything
    if (error.response?.status === 401 && originalRequest.url.includes('/auth/refresh-token')) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
      refreshTokenRequest = null;
      
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);

// API functions
export const getReferralDashboard = () => {
  return api.get('/referral/dashboard');
};

export const getWallet = () => {
  return api.get('/referral/wallet');
};

export const convertCoinsToDivine = () => {
  return api.post('/referral/convert');
};

export const useDivineCoin = () => {
  return api.post('/referral/use-divine');
};

export const rewardReferralPayment = (userId) => {
  return api.post('/referral/reward-payment', { userId });
};

export const getMe = () => {
  return api.get('/auth/me');
};

// Manual logout function
export const logout = async () => {
  try {
    await api.post('/auth/logout');
  } catch (error) {
    console.error('Logout error:', error);
  } finally {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    window.location.href = '/login';
  }
};

export default api;
// services/api.js - UPDATED FULLY STABLE VERSION
import axios from "axios";

// FIXED: Use correct environment variable
const API_URL =
  import.meta.env.VITE_BASE_URL_API ||
  "https://sincut-razorpay.vercel.app/api";

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

// ----------------------
// ⭐ REQUEST INTERCEPTOR
// ----------------------
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");

    // ⭐ Bug 7 FIX: Never attach token while refreshing
    if (config.url.includes("/auth/refresh-token")) {
      config.headers["Authorization"] = "";
      return config;
    }

    // ⭐ Add token normally
    if (token && token !== "null" && token !== "undefined") {
      config.headers.Authorization = `Bearer ${token}`;
      console.log("🔐 Adding token to request");
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ----------------------
// ⭐ RESPONSE INTERCEPTOR
// ----------------------
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, newToken = null) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve(newToken);
  });
  failedQueue = [];
};

api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    // Handle 401 (Unauthorized)
    if (error.response?.status === 401 && !originalRequest._retry) {
      // If refresh is already in-progress → queue this request
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((newToken) => {
            if (!newToken) throw "⚠ No token received after refresh";
            // ⭐ Bug 8: Always attach new token to queued requests
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            return api(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      // Start refresh process
      originalRequest._retry = true;
      isRefreshing = true;

      try {
        console.log("🔄 Attempting to refresh token...");

        // ⭐ Bug 6 FIX — disable old Authorization header
        const refreshRes = await axios.post(
          `${API_URL}/auth/refresh-token`,
          {},
          {
            withCredentials: true,
            headers: { Authorization: "" },
          }
        );

        const { accessToken, user } = refreshRes.data;
        if (!accessToken) throw "No token returned from refresh";

        console.log("✅ Token refresh successful");

        // Save new token + user
        localStorage.setItem("accessToken", accessToken);
        if (user) localStorage.setItem("user", JSON.stringify(user));

        // ⭐ Retry original request with new token
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;

        // ⭐ Bug 8 FIX — release queued requests
        processQueue(null, accessToken);

        return api(originalRequest);
      } catch (refreshError) {
        console.error("❌ Token refresh failed:", refreshError);

        // Reject all queued requests
        processQueue(refreshError, null);

        // Clear auth + redirect
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");

        window.location.href = "/login";
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

// ----------------------
// EXPORT API FUNCTIONS
// ----------------------

export const getReferralDashboard = () => {
  console.log("📊 Fetching referral dashboard...");
  return api.get("/referral/dashboard");
};

export const getWallet = () => {
  console.log("💰 Fetching wallet data...");
  return api.get("/wallet");
};

export const convertCoinsToDivine = () => {
  console.log("🔄 Converting coins to divine...");
  return api.post("/wallet/convert-to-divine");
};

export const useDivineCoin = () => {
  console.log("💎 Using divine coin...");
  return api.post("/wallet/use-divine-coin");
};

export const getCurrentUser = () => {
  console.log("👤 Getting current user...");
  return api.get("/auth/me");
};

export default api;

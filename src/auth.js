// src/auth.js
import { useEffect, useState } from "react";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "https://sincut-razorpay.vercel.app";


export const getCurrentUser = async () => {
  try {
    const res = await fetch(`${API_BASE}/api/auth/me`, {
      method: "GET",
      credentials: "include", // Send the jid cookie
      headers: {
        "Content-Type": "application/json"
      }
    });

    if (!res.ok) return null;

    return await res.json();
  } catch (err) {
    console.error("Failed to get current user:", err);
    return null;
  }
};

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const u = await getCurrentUser();
      setUser(u);
      setLoading(false);
    })();
  }, []);

  return { user, loading };
};

export const useAuthToken = () => {
  return null; 
};

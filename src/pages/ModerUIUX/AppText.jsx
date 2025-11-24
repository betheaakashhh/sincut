import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Apptest.css';

import PaymentButton from '../PaymentButton/PaymentButton';
import ThankfulPage from '../PaymentSuccess/ThankfulPage';

const REACT_BACKEND_URL =
  import.meta.env.VITE_API_BASE_URL || 'https://sincut-razorpay.vercel.app';

const AppTest = () => {
  // existing AppTest state
  const [prompt, setPrompt] = useState(
    "Anime portrait of a mysterious man with crimson neon aura, eyes glowing faint red, dark shadows across face, expression calm but dangerous, subtle flame particles floating around."
  );

  // hero / confession states (merged)
  const [heroText, setHeroText] = useState('');
  const [isWriting, setIsWriting] = useState(false);
  const [characterCount, setCharacterCount] = useState(0);
  const [userCountry, setUserCountry] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showThankful, setShowThankful] = useState(false);
  const [paidAmount, setPaidAmount] = useState(0);

  // navbar auth/profile states (keep as before)
  const [showMenu, setShowMenu] = useState(false);
  const [user, setUser] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  const navigate = useNavigate();

  // responsive username hide logic
  useEffect(() => {
    const checkScreenSize = () => setIsMobile(window.innerWidth <= 768);
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // get logged-in user
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) return;
    fetch(`${REACT_BACKEND_URL}/api/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => setUser(data))
      .catch(() => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');
      });
  }, []);

  // detect country for payment logic
  useEffect(() => {
    const fetchUserCountry = async () => {
      try {
        const res = await fetch('https://ipapi.co/json/');
        const data = await res.json();
        setUserCountry(data.country);
      } catch (err) {
        console.error('Country detection failed', err);
        setUserCountry('US'); // fallback
      }
    };
    fetchUserCountry();
  }, []);

  // textarea handling merged with App's prompt field: We'll treat heroText as the confession
  useEffect(() => {
    // keep prompt in-sync with heroText if you want both to reflect same content
    // currently keep them independent; if you want prompt to reflect confession, uncomment:
    // setPrompt(heroText);
  }, [heroText]);

  const handleTextChange = (e) => {
    const text = e.target.value;
    setHeroText(text);
    setCharacterCount(text.length);
    setIsWriting(text.length > 0);
  };

  // payment lifecycle
  const handleBeforePay = () => {
    if (!heroText.trim()) {
      alert('Please write your confession before proceeding.');
      return false;
    }
    setIsProcessing(true);

    // simulate quick processing UI until PaymentButton triggers Razorpay
    setTimeout(() => {
      // keep processing until actual payment completes
      setIsProcessing(false);
    }, 1200);

    return true;
  };

  const handlePaymentSuccess = (amount, response) => {
    console.log('Payment successful:', response);
    setPaidAmount(amount || 0);
    setShowThankful(true);
    // optional: send confession + receipt to your backend
    try {
      const token = localStorage.getItem('accessToken');
      fetch(`${REACT_BACKEND_URL}/api/confessions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token ? `Bearer ${token}` : undefined,
        },
        credentials: 'include',
        body: JSON.stringify({
          confession: heroText,
          paidAmount: amount,
          paymentResponse: response,
          country: userCountry,
          createdAt: new Date().toISOString(),
        }),
      }).catch((err) => console.warn('Confession save failed', err));
    } catch (err) {
      console.warn('Confession backend call failed', err);
    }

    // reset after success
    setHeroText('');
    setCharacterCount(0);
    setIsWriting(false);
  };

  const handleLogout = async () => {
    try {
      await fetch(`${REACT_BACKEND_URL}/api/auth/logout`, {
        method: 'POST',
        credentials: 'include',
      });
    } catch (err) {
      console.error('Logout failed:', err);
    } finally {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('user');
      navigate('/');
    }
  };

  const gotoDashboard = () => {
    const token = localStorage.getItem('accessToken');
    const userData = localStorage.getItem('user');
    if (!token || !userData) return navigate('/login');
    navigate('/dashboard');
  };

  const gotoAccountSetting = () => {
    const token = localStorage.getItem('accessToken');
    const userData = localStorage.getItem('user');
    if (!token || !userData) return navigate('/login');
    navigate('/accountsetting');
  };

  return (
    <div className="app-container">
      {/* Navbar */}
      <nav className="navbar">
        <div className="nav-inner">
          <div className="nav-left">
            <div className="logo-circle">
              <span>★</span>
            </div>
            <span className="logo-text">
              Sinful<span className="logo-accent">Aura</span>
            </span>
          </div>

          {/* PROFILE SECTION (replaces 'POWERED BY GEMINI') */}
          <div className="snct-profile-section">
            {user ? (
              <div className="snct-user-menu">
                <div
                  className="snct-user-trigger"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowMenu(!showMenu);
                  }}
                >
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/847/847969.png"
                    alt="profile"
                    className="snct-profile-photo"
                  />
                  {!isMobile && (
                    <span className="snct-username">
                      {user.name || user.email?.split('@')[0]}
                    </span>
                  )}
                </div>

                {showMenu && (
                  <div className="snct-dropdown-menu">
                    <div className="snct-menu-item snct-dashboard-item" onClick={gotoDashboard}>
                      Dashboard
                    </div>
                    <div className="snct-menu-divider" />
                    <div className="snct-menu-item snct-account-item" onClick={gotoAccountSetting}>
                      Account Setting
                    </div>
                    <div className="snct-menu-divider" />
                    <div className="snct-menu-item snct-logout-item" onClick={handleLogout}>
                      Logout
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button className="snct-login-btn" onClick={() => navigate('/login')}>
                {isMobile ? 'Login' : 'Sign In'}
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <main className="main-content full-width-layout">
        <h1 className="title">
          Manifest your <span className="title-accent">darkest visions.</span>
        </h1>
        <p className="subtitle">
          Generate ultra-high fidelity portraits and scenes using the advanced Gemini model.
        </p>

        {/* Confession area (merged functionality) */}
        <div className={`modern-textarea-container ${isWriting ? 'writing-active' : ''}`}>
          <div className="textarea-glow-effect" />
          <div className="dynamic-border" />
          <div className="sparkle-container">
            <div className="sparkle s1" />
            <div className="sparkle s2" />
            <div className="sparkle s3" />
          </div>

          <textarea
            className="modern-textarea prompt-input full-width-textarea"
            placeholder="Write your confession here... Let your heart speak freely"
            value={heroText}
            onChange={handleTextChange}
            rows={6}
            maxLength={1000}
          />

          <div className="character-feedback">
            <div className="character-counter">{characterCount} / 1000 characters</div>
            {characterCount > 0 && (
              <div className="writing-feedback">
                {characterCount < 100
                  ? 'Begin your healing journey...'
                  : characterCount < 400
                  ? 'The divine is listening to your heart...'
                  : characterCount < 700
                  ? 'Your honesty brings you closer to peace...'
                  : 'You are being cleansed with every word...'}
              </div>
            )}
          </div>

          {isWriting && (
            <div className="typing-animation">
              <div className="glow-dot dot-1" />
              <div className="glow-dot dot-2" />
              <div className="glow-dot dot-3" />
            </div>
          )}
        </div>

        {/* Progress */}
        {characterCount > 0 && (
          <div className="progress-indicator">
            <div className="progress-track">
              <div
                className="progress-fill"
                style={{ width: `${Math.min(100, (characterCount / 1000) * 100)}%` }}
              />
            </div>
            <div className="progress-label">
              {characterCount < 200 ? 'Burden Lifting...' : characterCount < 500 ? 'Soul Cleansing...' : 'Almost Free...'}
            </div>
          </div>
        )}

        {/* Payment / Confess Button area — using your existing PaymentButton (Option A) */}
        <div className="hero-action-section">
          {isProcessing ? (
            <div className="processing-overlay">
              <div className="processing-spinner" />
              <p>Processing your confession...</p>
            </div>
          ) : userCountry === null ? (
            <div className="payment-loading">
              <div className="loading-spinner" />
              <p>Connecting to divine redemption...</p>
            </div>
          ) : (
            <div className="payment-integration">
              <PaymentButton
                baseAmount={1}
                userCountry={userCountry}
                onBeforePay={handleBeforePay}
                onPaymentSuccess={handlePaymentSuccess}
              />
            </div>
          )}
        </div>
      </main>

      {/* THANKFUL modal */}
      {showThankful && (
        <div className="thankful-modal-overlay">
          <div className="thankful-modal-content">
            <ThankfulPage amount={paidAmount} onClose={() => setShowThankful(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default AppTest;

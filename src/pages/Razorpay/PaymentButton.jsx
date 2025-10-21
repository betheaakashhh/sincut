import React, { useState, useEffect } from "react";
import "./payment.css";

function PaymentButton({ onBeforePay, onPaymentSuccess }) {
  const [loading, setLoading] = useState(false);
  const [country, setCountry] = useState("IN"); // Default India
  const [currency, setCurrency] = useState("INR");
  const [locationAvailable, setLocationAvailable] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState("razorpay");
  const [showManualSelection, setShowManualSelection] = useState(false);
  const [amount, setAmount] = useState(11); // Default amount for India

  // 🔹 Currency conversion rates (you can update these dynamically)
  const currencyRates = {
    INR: 11,  // $1 = ₹11
    USD: 1,   // Base currency
    EUR: 0.85,
    GBP: 0.75,
    CAD: 1.25,
    AUD: 1.35
  };

  // 🔹 Currency symbols
  const currencySymbols = {
    INR: '₹',
    USD: '$',
    EUR: '€',
    GBP: '£',
    CAD: 'C$',
    AUD: 'A$'
  };

  // 🔹 Try to auto-detect country from IP
  useEffect(() => {
    const detectCountry = async () => {
      try {
        setLoading(true);
        const res = await fetch("https://ipapi.co/json/");
        const data = await res.json();
        if (data && data.country_code) {
          const countryCode = data.country_code;
          setCountry(countryCode);
          
          // Auto-set payment method and currency based on country
          if (countryCode === "IN") {
            setPaymentMethod("razorpay");
            setCurrency("INR");
            setAmount(11); // ₹11 for India
          } else {
            setPaymentMethod("paypal");
            setCurrency("USD");
            setAmount(1); // $1 for international
          }
          setLocationAvailable(true);
          setShowManualSelection(false);
        } else {
          setLocationAvailable(false);
          setShowManualSelection(true);
        }
      } catch (err) {
        console.error("Location detection failed:", err);
        setLocationAvailable(false);
        setShowManualSelection(true);
      } finally {
        setLoading(false);
      }
    };
    detectCountry();
  }, []);

  // 🔹 Handle manual country change
  const handleCountryChange = (selectedCountry) => {
    setCountry(selectedCountry);
    if (selectedCountry === "IN") {
      setPaymentMethod("razorpay");
      setCurrency("INR");
      setAmount(11); // ₹11 for India
    } else {
      setPaymentMethod("paypal");
      setCurrency("USD");
      setAmount(1); // $1 for international
    }
    setShowManualSelection(false);
  };

  // 🔹 Handle currency change for international users
  const handleCurrencyChange = (newCurrency) => {
    setCurrency(newCurrency);
    // Convert $1 to the selected currency
    setAmount(currencyRates[newCurrency] || 1);
  };

  // 🔹 Handle Razorpay Payment
  const handleRazorpayPayment = async () => {
    if (onBeforePay && onBeforePay() === false) return;

    try {
      setLoading(true);
      document.body.style.overflow = "hidden";

      const res = await fetch(`https://sincut-razorpay.vercel.app/create-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          amount: amount * 100, // Convert to paise
          currency: currency
        }),
      });

      const orderData = await res.json();
      if (!res.ok || !orderData.id) {
        alert("Something went wrong while creating order.");
        setLoading(false);
        document.body.style.overflow = "auto";
        return;
      }

      if (!window.Razorpay) {
        alert("Razorpay SDK not loaded.");
        setLoading(false);
        document.body.style.overflow = "auto";
        return;
      }

      await new Promise((r) => setTimeout(r, 1000));

      const options = {
        key: "rzp_test_RUEOHvHC3GJJUO",
        amount: orderData.amount,
        currency: currency,
        name: "Cut Your Sin",
        description: "Donation to redeem your guilt",
        order_id: orderData.id,
        handler: function (response) {
          console.log("✅ Payment success:", response);
          if (onPaymentSuccess) {
            onPaymentSuccess(amount, response);
          }
          document.body.style.overflow = "auto";
          setLoading(false);
        },
        modal: {
          ondismiss: function () {
            document.body.style.overflow = "auto";
            setLoading(false);
          },
        },
        theme: { color: "#F37254" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Payment Failed:", err);
      alert("Something went wrong while starting payment.");
    } finally {
      setLoading(false);
      document.body.style.overflow = "auto";
    }
  };

  // 🔹 Handle PayPal Payment
  const handlePayPalPayment = async () => {
    if (onBeforePay && onBeforePay() === false) return;

    try {
      setLoading(true);
      
      // Create PayPal order
      const res = await fetch(`https://sincut-razorpay.vercel.app/create-paypal-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          amount: amount,
          currency: currency
        }),
      });

      const orderData = await res.json();
      if (!res.ok || !orderData.id) {
        alert("Something went wrong while creating PayPal order.");
        setLoading(false);
        return;
      }

      // Redirect to PayPal approval URL
      if (orderData.links && orderData.links[1] && orderData.links[1].href) {
        window.location.href = orderData.links[1].href;
      } else {
        alert("PayPal order creation failed.");
      }
    } catch (err) {
      console.error("PayPal Payment Failed:", err);
      alert("Something went wrong with PayPal payment.");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Main payment handler
  const handlePayment = () => {
    if (paymentMethod === "razorpay") {
      handleRazorpayPayment();
    } else {
      handlePayPalPayment();
    }
  };

  // 🔹 Get payment button text
  const getButtonText = () => {
    if (loading) return "";
    
    const symbol = currencySymbols[currency] || '$';
    return `Donate ${symbol}${amount}`;
  };

  // 🔹 Get equivalent amount in other currencies
  const getEquivalentAmount = () => {
    if (currency === "INR") {
      return `(Equivalent to $1 USD)`;
    } else {
      const inrAmount = (amount / currencyRates[currency] * 11).toFixed(2);
      return `(Equivalent to ₹${inrAmount} INR)`;
    }
  };
    useEffect(() => {
    const detectCountry = async () => {
      try {
        setLoading(true);
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 seconds

        const res = await fetch("https://ipapi.co/json/", {
          signal: controller.signal
        });
        clearTimeout(timeoutId);

        const data = await res.json();
        if (data && data.country_code) {
          const countryCode = data.country_code;
          setCountry(countryCode);
          
          if (countryCode === "IN") {
            setPaymentMethod("razorpay");
            setCurrency("INR");
            setAmount(11);
          } else {
            setPaymentMethod("paypal");
            setCurrency("USD");
            setAmount(1);
          }
          setLocationAvailable(true);
          setShowManualSelection(false);
        } else {
          setLocationAvailable(false);
          setShowManualSelection(true);
        }
      } catch (err) {
        console.error("Location detection failed:", err);
        setLocationAvailable(false);
        setShowManualSelection(true);
      } finally {
        setLoading(false);
      }
    };
    detectCountry();
  }, []);

  return (
    <div className="payment-button-container">
      {/* 🌍 Manual Country Selection Modal */}
      {showManualSelection && (
        <div className="country-selection-modal">
          <div className="country-modal-content">
            <h3>🌍 Select Your Country</h3>
            <p>We couldn't detect your location automatically. Please select your country to proceed with payment.</p>
            
            <div className="country-options">
              <button 
                className={`country-option ${country === "IN" ? "selected" : ""}`}
                onClick={() => handleCountryChange("IN")}
              >
                <span className="flag">🇮🇳</span>
                <span className="country-name">India</span>
                <span className="payment-info">Razorpay (₹11)</span>
                <span className="equivalent-amount">Equivalent to $1</span>
              </button>
              
              <button 
                className={`country-option ${country !== "IN" ? "selected" : ""}`}
                onClick={() => handleCountryChange("US")}
              >
                <span className="flag">🇺🇸</span>
                <span className="country-name">International</span>
                <span className="payment-info">PayPal ($1)</span>
                <span className="equivalent-amount">Equivalent to ₹11</span>
              </button>
            </div>

            <div className="country-dropdown-alt">
              <label>Or select specific country:</label>
              <select
                value={country}
                onChange={(e) => handleCountryChange(e.target.value)}
                className="country-dropdown"
              >
                <option value="IN">India</option>
                <option value="US">United States</option>
                <option value="GB">United Kingdom</option>
                <option value="CA">Canada</option>
                <option value="AU">Australia</option>
                <option value="DE">Germany</option>
                <option value="FR">France</option>
                <option value="Other">Other Countries</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* 🔄 Loading State */}
      {loading && locationAvailable && (
        <div className="payment-loading">
          <div className="loading-spinner"></div>
          <p>Detecting your location...</p>
        </div>
      )}

      {/* ✅ Payment Interface */}
      {!showManualSelection && locationAvailable && (
        <>
          {/* Payment Method Indicator */}
          <div className="payment-method-indicator">
            <button 
              className="change-country-btn"
              onClick={() => setShowManualSelection(true)}
              title="Change country"
            >
              <span className="payment-icon">
                {paymentMethod === "razorpay" ? "🇮🇳" : "🌍"}
              </span>
              <span className="payment-text">
                {paymentMethod === "razorpay" 
                  ? "Paying from India" 
                  : `Paying from ${country}`}
              </span>
              <span className="change-text">Change</span>
            </button>
          </div>

          {/* Currency Selection for International Users */}
          {paymentMethod === "paypal" && (
            <div className="currency-selection">
              <label>Select Currency:</label>
              <select
                value={currency}
                onChange={(e) => handleCurrencyChange(e.target.value)}
                className="currency-dropdown"
              >
                <option value="USD">USD ($1)</option>
                <option value="EUR">EUR (€0.85)</option>
                <option value="GBP">GBP (£0.75)</option>
                <option value="CAD">CAD (C$1.25)</option>
                <option value="AUD">AUD (A$1.35)</option>
              </select>
            </div>
          )}

          {/* Main Payment Button */}
          <button
            onClick={handlePayment}
            className={`confess-btn ${loading ? "loading" : ""} ${paymentMethod}`}
            disabled={loading}
          >
            {loading ? (
              <div className="spinner"></div>
            ) : (
              <>
                {getButtonText()}
              </>
            )}
          </button>

          {/* Equivalent Amount Display */}
          <div className="equivalent-display">
            {getEquivalentAmount()}
          </div>

          {/* Payment Method Notice */}
          <div className="payment-notice">
            {paymentMethod === "razorpay" 
              ? "Supports UPI, Cards, NetBanking & Wallet"
              : "Supports PayPal, Cards & Local Payment Methods"
            }
          </div>
        </>
      )}
    </div>
  );
}

export default PaymentButton;
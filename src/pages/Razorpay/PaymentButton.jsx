import React, { useState, useEffect } from "react";
import "./payment.css";

function PaymentButton({ onBeforePay, onPaymentSuccess }) {
  const [loading, setLoading] = useState(true); // Start with loading true
  const [country, setCountry] = useState(null);
  const [currency, setCurrency] = useState("INR");
  const [amount, setAmount] = useState(11);
  const [paymentMethod, setPaymentMethod] = useState("razorpay");
  const [showManualSelection, setShowManualSelection] = useState(false);
  const [detectionCompleted, setDetectionCompleted] = useState(false); // New state to track detection completion

  // 🔹 Simple country detection with fallback
  useEffect(() => {
    const detectCountry = async () => {
      try {
        setLoading(true);
        const res = await fetch("https://ipapi.co/json/");
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
          setDetectionCompleted(true);
        } else {
          // If API works but no country code, show manual selection
          setShowManualSelection(true);
          setDetectionCompleted(true);
        }
      } catch (err) {
        console.error("Country detection failed:", err);
        // On error, show manual selection AFTER detection is complete
        setShowManualSelection(true);
        setDetectionCompleted(true);
      } finally {
        setLoading(false);
      }
    };

    detectCountry();
  }, []);

  // 🔹 Handle manual country selection
  const handleCountrySelect = (selectedCountry) => {
    setCountry(selectedCountry);
    
    if (selectedCountry === "IN") {
      setPaymentMethod("razorpay");
      setCurrency("INR");
      setAmount(11);
    } else {
      setPaymentMethod("paypal");
      setCurrency("USD");
      setAmount(1);
    }
    
    setShowManualSelection(false);
  };

  // 🔹 Handle Razorpay Payment
  const handleRazorpayPayment = async () => {
    if (onBeforePay && onBeforePay() === false) return;

    try {
      setLoading(true);
      document.body.style.overflow = "hidden";

      // For Razorpay, amount should be in paise (₹11 = 1100 paise)
      const amountInPaise = amount * 100;

      const res = await fetch(`https://sincut-razorpay.vercel.app/create-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          amount: amountInPaise,
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

      const options = {
        key: "rzp_test_RUEOHvHC3GJJUO",
        amount: orderData.amount,
        currency: orderData.currency || "INR",
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
        prefill: {
          name: "User",
          email: "user@example.com",
          contact: "+919876543210"
        },
        theme: { color: "#F37254" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Payment Failed:", err);
      alert("Something went wrong while starting payment.");
      setLoading(false);
      document.body.style.overflow = "auto";
    }
  };

  // 🔹 Handle PayPal Payment
  const handlePayPalPayment = async () => {
    if (onBeforePay && onBeforePay() === false) return;

    try {
      setLoading(true);
      
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
    
    if (paymentMethod === "razorpay") {
      return `Donate ₹${amount}`;
    } else {
      return `Donate $${amount}`;
    }
  };

  // 🔹 Get equivalent amount
  const getEquivalentAmount = () => {
    if (paymentMethod === "razorpay") {
      return `(Equivalent to $1 USD)`;
    } else {
      return `(Equivalent to ₹11 INR)`;
    }
  };

  // Show loading while detecting country
  if (loading && !detectionCompleted) {
    return (
      <div className="payment-loading">
        <div className="loading-spinner"></div>
        <p>Detecting your location...</p>
      </div>
    );
  }

  // Show manual country selection ONLY if detection failed
  if (showManualSelection) {
    return (
      <div className="country-selection-modal">
        <div className="country-modal-content">
          <h3>🌍 Select Your Country</h3>
          <p>We couldn't detect your location automatically. Please select your country to proceed with payment.</p>
          
          <div className="country-options">
            <button 
              className="country-option"
              onClick={() => handleCountrySelect("IN")}
            >
              <span className="flag">🇮🇳</span>
              <span className="country-name">India</span>
              <span className="payment-info">Pay ₹11 (Fixed amount)</span>
              <span className="equivalent-amount">Equivalent to $1</span>
            </button>
            
            <button 
              className="country-option"
              onClick={() => handleCountrySelect("US")}
            >
              <span className="flag">🌍</span>
              <span className="country-name">International</span>
              <span className="payment-info">Pay $1 via PayPal</span>
              <span className="equivalent-amount">Equivalent to ₹11</span>
            </button>
          </div>

          <div className="country-dropdown-alt">
            <label>Or select specific country:</label>
            <select
              onChange={(e) => handleCountrySelect(e.target.value)}
              className="country-dropdown"
              defaultValue=""
            >
              <option value="" disabled>Select country</option>
              <option value="IN">India</option>
              <option value="US">United States</option>
              <option value="GB">United Kingdom</option>
              <option value="CA">Canada</option>
              <option value="AU">Australia</option>
              <option value="Other">Other Countries</option>
            </select>
          </div>
        </div>
      </div>
    );
  }

  // Show payment button when country is detected or manually selected
  return (
    <div className="payment-button-container">
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
              : "International Payment"}
          </span>
          <span className="change-text">Change</span>
        </button>
      </div>

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
    </div>
  );
}

export default PaymentButton;
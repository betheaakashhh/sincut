import React, { useState, useEffect } from "react";
import "./payment.css";

function PaymentButton({ amount = 1, onBeforePay, onPaymentSuccess }) {
  const [loading, setLoading] = useState(false);
  const [country, setCountry] = useState("IN"); // Default India
  const [currency, setCurrency] = useState("INR");
  const [locationAvailable, setLocationAvailable] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState("razorpay");
  const [showManualSelection, setShowManualSelection] = useState(false);

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
          
          // Auto-set payment method based on country
          if (countryCode === "IN") {
            setPaymentMethod("razorpay");
            setCurrency("INR");
          } else {
            setPaymentMethod("paypal");
            setCurrency("USD");
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
    } else {
      setPaymentMethod("paypal");
      setCurrency("USD");
    }
    setShowManualSelection(false);
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
        body: JSON.stringify({ amount }),
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
    
    if (paymentMethod === "razorpay") {
      return `Donate ${currency === "INR" ? `₹${amount}` : `$${amount}`}`;
    } else {
      return `Donate $${amount}`;
    }
  };

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
                <span className="payment-info">Razorpay (₹{amount})</span>
              </button>
              
              <button 
                className={`country-option ${country !== "IN" ? "selected" : ""}`}
                onClick={() => handleCountryChange("US")}
              >
                <span className="flag">🌍</span>
                <span className="country-name">International</span>
                <span className="payment-info">PayPal (${amount})</span>
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
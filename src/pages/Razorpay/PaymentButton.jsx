import React, { useState, useEffect } from "react";
import "./payment.css";

function PaymentButton({ amount = 1, onBeforePay, onPaymentSuccess }) {
  const [loading, setLoading] = useState(false);
  const [country, setCountry] = useState("IN"); // Default India
  const [currency, setCurrency] = useState("INR");
  const [locationAvailable, setLocationAvailable] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState("razorpay"); // 'razorpay' or 'paypal'

  // 🔹 Try to auto-detect country from IP
  useEffect(() => {
    const detectCountry = async () => {
      try {
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
        } else {
          setLocationAvailable(false);
        }
      } catch (err) {
        console.error("Location detection failed:", err);
        setLocationAvailable(false);
      }
    };
    detectCountry();
  }, []);

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
      {/* 🌍 Location detection and manual selection */}
      {!locationAvailable && (
        <div className="manual-country-select">
          <p>🌎 Couldn't detect your location automatically.</p>
          <label>
            Select your country:{" "}
            <select
              value={country}
              onChange={(e) => {
                const selected = e.target.value;
                setCountry(selected);
                setCurrency(selected === "IN" ? "INR" : "USD");
                setPaymentMethod(selected === "IN" ? "razorpay" : "paypal");
              }}
              className="country-dropdown"
            >
              <option value="IN">India</option>
              <option value="US">United States</option>
              <option value="GB">United Kingdom</option>
              <option value="CA">Canada</option>
              <option value="AU">Australia</option>
              <option value="Other">Other</option>
            </select>
          </label>
        </div>
      )}

      {/* Payment Method Indicator */}
      <div className="payment-method-indicator">
        <span className="payment-icon">
          {paymentMethod === "razorpay" ? "🇮🇳" : "🌍"}
        </span>
        <span className="payment-text">
          {paymentMethod === "razorpay" 
            ? "Secure payment via Razorpay" 
            : "International payment via PayPal"}
        </span>
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
    </div>
  );
}

export default PaymentButton;
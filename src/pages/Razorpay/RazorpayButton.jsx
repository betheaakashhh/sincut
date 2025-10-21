import React, { useState, useEffect } from "react";
import "./razor.css";

function RazorpayButton({ amount = 1, onBeforePay, onPaymentSuccess }) {
  const [loading, setLoading] = useState(false);
  const [country, setCountry] = useState("IN"); // Default India
  const [currency, setCurrency] = useState("INR");
  const [locationAvailable, setLocationAvailable] = useState(true);

  // 🔹 Try to auto-detect country from IP
  useEffect(() => {
    const detectCountry = async () => {
      try {
        const res = await fetch("https://ipapi.co/json/");
        const data = await res.json();
        if (data && data.country_code) {
          setCountry(data.country_code);
          setCurrency(data.country_code === "IN" ? "INR" : "USD");
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

  // 🔹 Handle payment
  const handlePayment = async () => {
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

  return (
    <div className="razorpay-button-container">
      {/* 🌍 If location unavailable → show manual country dropdown */}
      {!locationAvailable && (
        <div className="manual-country-select">
          <p>🌎 Couldn’t detect your location automatically.</p>
          <label>
            Select your country:{" "}
            <select
              value={country}
              onChange={(e) => {
                const selected = e.target.value;
                setCountry(selected);
                setCurrency(selected === "IN" ? "INR" : "USD");
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

      <button
        onClick={handlePayment}
        className={`confess-btn ${loading ? "loading" : ""}`}
        disabled={loading}
      >
        {loading ? (
          <div className="spinner"></div>
        ) : (
          <>
            Donate {currency === "INR" ? `₹${amount}` : `$1`}
          </>
        )}
      </button>
    </div>
  );
}

export default RazorpayButton;

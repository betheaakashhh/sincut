import React, { useState } from "react";
import "./razor.css";

function RazorpayButton({ amount = 1, onBeforePay, onPaymentSuccess }) {
  const [loading, setLoading] = useState(false);

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

      // Ensure Razorpay SDK is loaded
      if (typeof window.Razorpay === "undefined") {
        alert("Razorpay SDK not loaded. Please refresh and try again.");
        setLoading(false);
        document.body.style.overflow = "auto";
        return;
      }

      const options = {
        key: "rzp_test_RUEOHvHC3GJJUO",
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Cut Your Sin",
        description: "Donation to redeem your guilt",
        order_id: orderData.id,
        handler: function (response) {
          console.log("✅ Payment success:", response);
          alert("Payment Successful 🎉");

          // 🔥 Trigger parent popup
          if (typeof onPaymentSuccess === "function") {
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
      console.error("❌ Payment Failed:", err);
      alert("Something went wrong during payment.");
    } finally {
      setLoading(false);
      document.body.style.overflow = "auto";
    }
  };

  return (
    <button
      onClick={handlePayment}
      className={`confess-btn ${loading ? "loading" : ""}`}
      disabled={loading}
    >
      {loading ? <div className="spinner"></div> : <>Donate ₹{amount}</>}
    </button>
  );
}

export default RazorpayButton;

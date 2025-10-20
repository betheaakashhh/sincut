import React, { useState } from "react";
import "./razor.css";

function RazorpayButton({ amount = 1, onBeforePay, onPaymentSuccess }) {
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    if (onBeforePay && onBeforePay() === false) {
      console.log("Payment cancelled by validation");
      return;
    }

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
        alert("Something went wrong. Could not create a payment order.");
        setLoading(false);
        document.body.style.overflow = "auto";
        return;
      }

      if (!window.Razorpay) {
        alert("Razorpay SDK not loaded.");
        return;
      }

      await new Promise((resolve) => setTimeout(resolve, 1500));

      const options = {
        key: "rzp_test_RUEOHvHC3GJJUO",
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Cut Your Sin",
        description: "Donation to redeem your guilt",
        order_id: orderData.id,
        handler: function (response) {
          console.log("Payment success:", response);
          alert("Payment Successful: " + response.razorpay_payment_id);

          // ✅ Call parent function with amount
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

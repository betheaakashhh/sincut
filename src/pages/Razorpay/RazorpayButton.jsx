import React from "react";
import "./razor.css";

function RazorpayButton({ amount = 1, onBeforePay }) {
  const BACKEND_URL = "https://sincut-razorpay.vercel.app"; // make sure this is correct

  const handlePayment = async () => {
    // 1️⃣ Run parent validation first
    if (onBeforePay && onBeforePay() === false) {
      console.log("Payment cancelled by validation");
      return;
    }

    try {
      console.log("Fetching backend order...");
      const res = await fetch(`https://sincut-razorpay.vercel.app/create-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount }),
      });

      const orderData = await res.json();
      console.log("Order data received:", orderData);

      if (!window.Razorpay) {
        alert("Razorpay SDK is not loaded.");
        return;
      }

      const options = {
        key: "YOUR_PUBLIC_KEY", // replace with real Razorpay key
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Cut Your Sin",
        description: "Donation to redeem your guilt",
        order_id: orderData.id,
        handler: function (response) {
          alert("Payment Successful: " + response.razorpay_payment_id);
        },
        theme: { color: "#F37254" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Payment Failed:", err);
      alert("Something went wrong while starting payment.");
    }
  };

  return (
    <button onClick={handlePayment} className="confess-btn" style={{ position: "relative", zIndex: 9999 }}>
      Donate ₹{amount}
    </button>
  );
}

export default RazorpayButton;

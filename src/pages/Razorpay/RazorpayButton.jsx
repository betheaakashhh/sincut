import React from "react";
import "./razor.css";

function RazorpayButton({ amount = 1 }) {
  const handlePayment = async () => {
    try {
      const res = await fetch("http://localhost:5000/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount }),
      });

      const orderData = await res.json();

      const options = {
        key: "YOUR_PUBLIC_KEY", // public key only
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Cut Your Sin",
        description: "Donation to redeem your guilt",
        order_id: orderData.id,
        handler: function (response) {
          alert("Payment Successful: " + response.razorpay_payment_id);
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
    }
  };

  return <button onClick={handlePayment} className="confess-btn">Donate ₹1</button>;
}

export default RazorpayButton;

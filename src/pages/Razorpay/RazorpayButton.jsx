import React from "react";
import "./razor.css";

function RazorpayButton({ amount = 1, onClick }) {
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
  const handlePayment = async () => {
    try {
      console.log("fetching of backend data is initialised");
      const res = await fetch("https://sincut-razorpay.vercel.app/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount }),
      });

      const orderData = await res.json();
console.log("order received", order data); 
if(!window.Razorpay){
 alert("Razorpay SDK is not loaded");
 return;
};

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
      console.error("Payment Failed" ,err);
    }
  };
 const handleClick = () =>{
   if(onClick) onClick(handlePayment);
   else handlePayment();
};

  return <button onClick={handleClick} className="confess-btn">Donate ₹{amount}</button>;
}

export default RazorpayButton;

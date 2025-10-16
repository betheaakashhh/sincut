import React ,{useState} from "react";
import "./razor.css";

function RazorpayButton({ amount = 1, onBeforePay }) { 
  const [loading, setLoading] = useState(false);
  

  const handlePayment = async () => {
    // 1️⃣ Run parent validation first
    if (onBeforePay && onBeforePay() === false) {
      console.log("Payment cancelled by validation");
      return;
    }

    try {
      setLoading(true);
      document.body.style.overflow =  "hidden"; //disable scroll while processing
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

      // small wait for better UX for 1.5 sec
      await new Promise((resolve) => setTimeout(resolve,1500));

      const options = {
        key: "rzp_test_RUEOHvHC3GJJUO", // replace with real Razorpay key
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Cut Your Sin",
        description: "Donation to redeem your guilt",
        order_id: orderData.id,
        handler: function (response) {
          alert("Payment Successful: " + response.razorpay_payment_id);
        },
        modal:{
          ondismiss: function(){
            //re-enable scroll if payment window is closed
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
    } finally{
      //re enable scroll and hide loader
      setLoading(false);
      document.body.style.overflow = "auto";
    }
  };

  return (
    <button
      onClick={handlePayment} 
      className={`confess-btn ${loading ? "loading": ""}`}
      disabled = {loading}
      style={{position: "relative",zIndex: 9999}}
      >
      {loading ? <div className="spinner"></div> : <>Donate ₹{amount}</>}
    </button>
  );
}

export default RazorpayButton;

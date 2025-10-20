import React, { useState, useEffect } from "react";
import "./confess.css";
import RazorpayButton from "../Razorpay/RazorpayButton";
import ThankFull from "../PaymentSuccess/ThankFull";

const ConfessSection = () => {
  const [sinText, setSinText] = useState("");
  const [userCountry, setUserCountry] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [paidAmount, setPaidAmount] = useState(0);

  const handleBeforePay = () => {
    if (!sinText.trim()) {
      alert("Please write your confession before donating.");
      return false;
    }
    alert("GOD BLESS YOU CHILD 🙏 Thank you!");
    setSinText("");
    return true;
  };

  const handlePaymentSuccess = (amount) => {
    console.log("✅ Triggering popup with amount:", amount);
    setPaidAmount(amount);
    setShowPopup(true);
  };

  useEffect(() => {
    const fetchUserCountry = async () => {
      try {
        const res = await fetch("https://ipapi.co/json/");
        const data = await res.json();
        setUserCountry(data.country);
      } catch (err) {
        console.error("Country detection failed", err);
      }
    };
    fetchUserCountry();
  }, []);

  return (
    <div className="divine-confess-section">
      <div className="confess-container">
        <h2 className="confess-title">Confess Your Sin</h2>
        <p className="divine-subtitle">Release Your Burden, Embrace Redemption</p>

        <textarea
          className="divine-textarea"
          placeholder="Write your confession here..."
          value={sinText}
          onChange={(e) => setSinText(e.target.value)}
          rows={6}
        ></textarea>

        {userCountry === null ? (
          <p>Detecting your country...</p>
        ) : userCountry === "IN" ? (
          <>
            <RazorpayButton
              amount={100}
              onBeforePay={handleBeforePay}
              onPaymentSuccess={handlePaymentSuccess}
            />
            {showPopup && (
              <ThankFull
                amount={paidAmount}
                onClose={() => setShowPopup(false)}
              />
            )}
          </>
        ) : (
          <p>🌍 Stripe integration coming soon</p>
        )}
      </div>
    </div>
  );
};

export default ConfessSection;

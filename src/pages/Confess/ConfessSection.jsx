import React, { useState, useEffect } from "react";
import "./confess.css";
import RazorpayButton from "../Razorpay/RazorpayButton";
import ThankFull from "../PaymentSuccess/ThankFull";

const ConfessSection = () => {
  const [sinText, setSinText] = useState("");
  const [userCountry, setUserCountry] = useState(null);
  const [isWriting, setIsWriting] = useState(false);
  const [characterCount, setCharacterCount] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [paidAmount, setPaidAmount] = useState(0);

  const handleBeforePay = () => {
    if (!sinText.trim()) {
      alert("Please write your sin before donating.");
      return false;
    }
    alert("GOD BLESS YOU CHILD, Thank you!");
    setSinText("");
    setCharacterCount(0);
    return true;
  };

  const handlePaymentSuccess = (amount) => {
    console.log("✅ Showing ThankFull popup with amount:", amount);
    setPaidAmount(amount);
    setShowPopup(true);
  };

  const handleTextChange = (e) => {
    const text = e.target.value;
    setSinText(text);
    setCharacterCount(text.length);
    setIsWriting(text.length > 0);
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
      {/* Page Content */}
      <div className="confess-container">
        <h2 className="confess-title">Confess Your Sin</h2>
        <p className="divine-subtitle">Release Your Burden, Embrace Redemption</p>

        <textarea
          className="divine-textarea"
          placeholder="Write your confession here..."
          value={sinText}
          onChange={handleTextChange}
          rows={6}
        ></textarea>

        <div className="character-count">{characterCount} / 500</div>

        {userCountry === null ? (
          <p>Detecting your country...</p>
        ) : userCountry === "IN" ? (
          <div className="razorpay-container">
            <RazorpayButton
              amount={100}
              onBeforePay={handleBeforePay}
              onPaymentSuccess={handlePaymentSuccess}
            />
            {showPopup && (
              <ThankFull amount={paidAmount} onClose={() => setShowPopup(false)} />
            )}
          </div>
        ) : (
          <p>International Payment Coming Soon 🌍</p>
        )}
      </div>
    </div>
  );
};

export default ConfessSection;

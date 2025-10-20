import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // ✅ import navigation
import "./confess.css";
import RazorpayButton from "../Razorpay/RazorpayButton";

const ConfessSection = () => {
  const [sinText, setSinText] = useState("");
  const [userCountry, setUserCountry] = useState(null);
  const [isWriting, setIsWriting] = useState(false);
  const [characterCount, setCharacterCount] = useState(0);
  const navigate = useNavigate(); // ✅ initialize navigate

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

  const handlePaymentSuccess = (response) => {
    console.log("Payment successful:", response);
    alert("✨ Payment Successful! Your karma is now cleansed ✨");
    navigate("/thanks", { state: { amount: 100 } }); // ✅ navigate with amount data
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
      <div className="confess-container">
        <h2 className="confess-title">Confess Your Sin</h2>

        <textarea
          className="divine-textarea"
          placeholder="Write your confession here..."
          value={sinText}
          onChange={handleTextChange}
          rows={6}
        ></textarea>

        {userCountry === "IN" && (
          <RazorpayButton
            amount={100}
            onBeforePay={handleBeforePay}
            onPaymentSuccess={handlePaymentSuccess} // ✅ triggers navigation
          />
        )}
      </div>
    </div>
  );
};

export default ConfessSection;

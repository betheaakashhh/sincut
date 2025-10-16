import React, { useState, useEffect } from "react";
import "./confess.css";
import RazorpayButton from "../Razorpay/RazorpayButton";

const ConfessSection = () => {
  const [sinText, setSinText] = useState("");
  const [userCountry, setUserCountry] = useState(null);

  // This runs when Razorpay button asks permission to continue payment
  const handleBeforePay = () => {
    if (!sinText.trim()) {
      alert("Please write your sin before donating.");
      return false; // stop payment
    }
    alert("GOD BLESS YOU CHILD, Thank you!");
    setSinText(""); // clear text after valid submission
    return true; // allow RazorpayButton to proceed
  };

  useEffect(() => {
    const fetchUserCountry = async () => {
      try {
        const res = await fetch("https://ipapi.co/json/");
        const data = await res.json();
        console.log("Detected country:", data.country);
        setUserCountry(data.country);
      } catch (err) {
        console.error("Country detection failed", err);
      }
    };
    fetchUserCountry();
  }, []);

  return (
    <div className="container confess-section">
      <div className="confess-heading">
        <span className="line"></span>
        <h2>Confess Your Sin</h2>
        <span className="line"></span>
      </div>

      <p className="confess-description">
        Your confession is sacred and safe. What you write here will never be stored,
        shared, or used. Release your guilt, and let kindness begin.
      </p>

      <textarea
        className="confess-textarea"
        placeholder="Write your confession here..."
        value={sinText}
        onChange={(e) => setSinText(e.target.value)}
      ></textarea>

      {userCountry === null ? (
        <p>Loading payment options...</p>
      ) : userCountry === "IN" ? (
        <RazorpayButton amount={100} onBeforePay={handleBeforePay} />
      ) : (
        <p>Stripe payment for international users (not shown here)</p>
      )}
    </div>
  );
};

export default ConfessSection;

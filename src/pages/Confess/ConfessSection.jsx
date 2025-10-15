import React, { useState } from "react";
import "./confess.css";
import RazorpayButton from "../Razorpay/RazorpayButton";
import { useEffect } from "react";
const ConfessSection = ({ onDonate }) => {
  const [sinText, setSinText] = useState("");
  const [userCountry, setUserCountry] = useState(null);

  const handleDonate = () => {
      if (!sinText.trim()) {
        alert("Please write your sin before donating.");
        return;
      }
      // Here you can send sinText to your backend or database later
      alert(`GOD BLESS YOU CHILD,Thank you!`);
      onDonate(); // trigger Razorpay or donation flow
      setSinText(""); // clear textarea
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
    <div className=" container confess-section">
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
        <RazorpayButton amount={100} onClick={handleDonate}/>
      ) : (
        <p>Stripe payment for international users (not shown here)</p>
      )}
    </div>
  );
};

export default ConfessSection;

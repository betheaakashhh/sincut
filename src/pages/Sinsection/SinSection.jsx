import React, { useEffect,useState } from "react";
import "./sinSection.css";
import RazorpayButton from "../Razorpay/RazorpayButton";
import StripeButtonWrapper from "../Stripe/StripeButtonWrapper";

function SinSection({ onDonate }) {
  const [sinText, setSinText] = useState("");
  const [userCountry, setUserCountry] = useState(null);

  
  const handleDonate = () => {
    if (!sinText.trim()) {
      alert("Please write your sin before donating.");
      return;
    }
    // Here you can send sinText to your backend or database later
    alert(`Your sin: "${sinText}" has been recorded. Thank you!`);
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
    <div id="sin-section" className="sin-section">
      <h2>Write the sin you want to cut</h2>
      <textarea
        placeholder="I Confessing my sin to let it go..."
        value={sinText}
        onChange={(e) => setSinText(e.target.value)}
      />
      <p className="sin-note">
        Your confession is completely private. Nothing you write here will ever
        be posted, shared, or used against you — this space exists solely for
        your reflection and redemption.
      </p>
      {userCountry === null ? (
        <p>Loading payment options...</p>
      ) : userCountry === "IN" ? (
        <RazorpayButton amount={100} />
      ) : (
        <p>Stripe payment for international users (not shown here)</p>
      )}
    </div>
  );
}

export default SinSection;

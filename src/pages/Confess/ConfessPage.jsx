import React, { useState } from "react";
import PaymentButton from "../PaymentButton/PaymentButton"; 
import "./confessPage.css";

function ConfessPage() {
  const [confessionText, setConfessionText] = useState("");
  const [category, setCategory] = useState("general");
  const [visibility, setVisibility] = useState("public");
  const [submitting, setSubmitting] = useState(false);
  const [successModal, setSuccessModal] = useState(false);

  const maxChars = 1500;

  // -------------------------
  // 🔥 Verify after payment
  // -------------------------
  const handlePaymentSuccess = async (amount, response) => {
    if (!response?.razorpay_payment_id) {
      alert("Payment success but missing payment details!");
      return;
    }
    const REACT_APP_API = Import.meta.env.REACT_APP_BACKEND_URL || "http://localhost:5000";

    try {
      setSubmitting(true);

      const verifyRes = await fetch(
        `${REACT_APP_API}/api/confession/verify`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          body: JSON.stringify({
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
            text: confessionText,
            visibility,
            type: category,
          }),
        }
      );

      const data = await verifyRes.json();

      if (!data.success) {
        alert("Payment verified, but confession not saved.");
        setSubmitting(false);
        return;
      }

      // Show success modal
      setSuccessModal(true);
      setConfessionText("");

    } catch (err) {
      console.error(err);
      alert("Verification failed.");
    }

    setSubmitting(false);
  };

  return (
    <div className="confess-page">
      {/* Success Modal */}
      {successModal && (
        <div className="success-modal">
          <div className="success-box">
            <h2>🙏 Confession Submitted</h2>
            <p>Your confession has been posted successfully.</p>
            <button onClick={() => setSuccessModal(false)}>Close</button>
          </div>
        </div>
      )}

      <h1 className="confess-title">Write Your Confession</h1>

      <div className="confess-card">
        {/* Textarea */}
        <textarea
          className="confess-input"
          placeholder="Share what's weighing on your heart..."
          value={confessionText}
          onChange={(e) => setConfessionText(e.target.value)}
          maxLength={maxChars}
        />

        {/* Character count */}
        <div className="confess-counter">
          {confessionText.length} / {maxChars}
        </div>

        {/* Category & Visibility */}
        <div className="confess-options">
          <div className="confess-select-group">
            <label>Confession Type</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="general">General</option>
              <option value="love">Love</option>
              <option value="guilt">Guilt</option>
              <option value="secret">Secret</option>
              <option value="embarrassing">Embarrassing</option>
              <option value="regret">Regret</option>
              <option value="relationship">Relationship</option>
            </select>
          </div>

          <div className="confess-select-group">
            <label>Visibility</label>
            <select
              value={visibility}
              onChange={(e) => setVisibility(e.target.value)}
            >
              <option value="public">Public (Anonymous)</option>
              <option value="private">Private Only</option>
            </select>
          </div>
        </div>

        {/* Payment Button */}
        <PaymentButton
          baseAmount={1}
          userCountry={"IN"} // You can auto detect or store from user profile
          onBeforePay={() => {
            if (!confessionText.trim()) {
              alert("Please write your confession before paying.");
              return false;
            }
            return true;
          }}
          onPaymentSuccess={handlePaymentSuccess}
        />
      </div>

      {/* Submitting loader */}
      {submitting && (
        <div className="submitting-overlay">
          <div className="spinner"></div>
          <p>Submitting your confession...</p>
        </div>
      )}
    </div>
  );
}

export default ConfessPage;

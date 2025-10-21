import React, { useState, useEffect } from "react";
import "./payment.css";

function PaymentButton({ baseAmount = 1, userCountry = "US", onBeforePay, onPaymentSuccess }) {
  const [loading, setLoading] = useState(false);
  const [country, setCountry] = useState("IN");
  const [currency, setCurrency] = useState("INR");
  const [convertedAmount, setConvertedAmount] = useState(baseAmount);
  const [locationAvailable, setLocationAvailable] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState("razorpay");
  const [showManualSelection, setShowManualSelection] = useState(false);
  const [exchangeRates, setExchangeRates] = useState(null);

  // 🔹 Fetch exchange rates
  useEffect(() => {
    const fetchExchangeRates = async () => {
      try {
        const response = await fetch(
          "https://api.exchangerate-api.com/v4/latest/USD"
        );
        const data = await response.json();
        setExchangeRates(data.rates);
      } catch (error) {
        console.error("Failed to fetch exchange rates:", error);
        // Fallback rates if API fails
        setExchangeRates({
          INR: 83.25,
          EUR: 0.92,
          GBP: 0.79,
          CAD: 1.35,
          AUD: 1.52,
          JPY: 150.25,
        });
      }
    };
    fetchExchangeRates();
  }, []);

  // 🔹 Auto-detect country and set payment method
  useEffect(() => {
    const initializePayment = () => {
      if (userCountry === "IN") {
        setCountry("IN");
        setPaymentMethod("razorpay");
        setCurrency("INR");
        // For India, use fixed amount of 3 rupees instead of converting
        setConvertedAmount(0.03);
      } else {
        setCountry(userCountry);
        setPaymentMethod("paypal");
        
        // Determine currency based on country
        let localCurrency = "USD";
        let amount = baseAmount;
        
        if (exchangeRates) {
          switch (userCountry) {
            case "GB": localCurrency = "GBP"; break;
            case "EU": case "DE": case "FR": case "IT": localCurrency = "EUR"; break;
            case "CA": localCurrency = "CAD"; break;
            case "AU": localCurrency = "AUD"; break;
            case "JP": localCurrency = "JPY"; break;
            default: localCurrency = "USD";
          }
          
          // Convert amount based on exchange rates
          if (exchangeRates[localCurrency]) {
            amount = baseAmount * exchangeRates[localCurrency];
          }
        }
        
        setCurrency(localCurrency);
        setConvertedAmount(parseFloat(amount.toFixed(2)));
      }
      setLocationAvailable(true);
      setShowManualSelection(false);
    };

    if (userCountry) {
      initializePayment();
    }
  }, [userCountry, exchangeRates, baseAmount]);

  // 🔹 Handle manual country change
  const handleCountryChange = (selectedCountry) => {
    setCountry(selectedCountry);
    
    if (selectedCountry === "IN") {
      setPaymentMethod("razorpay");
      setCurrency("INR");
      setConvertedAmount(0.03); // Fixed amount for India
    } else {
      setPaymentMethod("paypal");
      
      let localCurrency = "USD";
      let amount = baseAmount;
      
      if (exchangeRates) {
        switch (selectedCountry) {
          case "GB": localCurrency = "GBP"; break;
          case "EU": case "DE": case "FR": case "IT": localCurrency = "EUR"; break;
          case "CA": localCurrency = "CAD"; break;
          case "AU": localCurrency = "AUD"; break;
          case "JP": localCurrency = "JPY"; break;
          default: localCurrency = "USD";
        }
        
        if (exchangeRates[localCurrency]) {
          amount = baseAmount * exchangeRates[localCurrency];
        }
      }
      
      setCurrency(localCurrency);
      setConvertedAmount(parseFloat(amount.toFixed(2)));
    }
    setShowManualSelection(false);
  };

  // 🔹 Format currency display
  const formatCurrency = (amount, currencyCode) => {
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currencyCode,
      minimumFractionDigits: currencyCode === 'JPY' ? 0 : 2,
      maximumFractionDigits: currencyCode === 'JPY' ? 0 : 2,
    });
    
    return formatter.format(amount);
  };

  // 🔹 Get currency symbol
  const getCurrencySymbol = (currencyCode) => {
    const symbols = {
      USD: '$',
      INR: '₹',
      EUR: '€',
      GBP: '£',
      CAD: 'CA$',
      AUD: 'A$',
      JPY: '¥'
    };
    return symbols[currencyCode] || currencyCode;
  };

  // 🔹 Handle Razorpay Payment
  const handleRazorpayPayment = async () => {
    if (onBeforePay && onBeforePay() === false) return;

    try {
      setLoading(true);
      document.body.style.overflow = "hidden";

      // Convert amount to paise for Razorpay (amount in smallest currency unit)
      const amountInPaise = Math.round(convertedAmount * 100);

      const res = await fetch(`https://sincut-razorpay.vercel.app/create-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          amount: amountInPaise,
          currency: currency
        }),
      });

      const orderData = await res.json();
      if (!res.ok || !orderData.id) {
        alert("Something went wrong while creating order.");
        setLoading(false);
        document.body.style.overflow = "auto";
        return;
      }

      if (!window.Razorpay) {
        alert("Razorpay SDK not loaded.");
        setLoading(false);
        document.body.style.overflow = "auto";
        return;
      }

      await new Promise((r) => setTimeout(r, 1000));

      const options = {
        key: "rzp_test_RUEOHvHC3GJJUO",
        amount: orderData.amount,
        currency: currency,
        name: "Cut Your Sin",
        description: "Donation to redeem your guilt",
        order_id: orderData.id,
        handler: function (response) {
          console.log("✅ Payment success:", response);
          if (onPaymentSuccess) {
            onPaymentSuccess(convertedAmount, response);
          }
          document.body.style.overflow = "auto";
          setLoading(false);
        },
        modal: {
          ondismiss: function () {
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
    } finally {
      setLoading(false);
      document.body.style.overflow = "auto";
    }
  };

  // 🔹 Handle PayPal Payment
  const handlePayPalPayment = async () => {
    if (onBeforePay && onBeforePay() === false) return;

    try {
      setLoading(true);
      
      const res = await fetch(`https://sincut-razorpay.vercel.app/create-paypal-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          amount: convertedAmount,
          currency: currency
        }),
      });

      const orderData = await res.json();
      if (!res.ok || !orderData.id) {
        alert("Something went wrong while creating PayPal order.");
        setLoading(false);
        return;
      }

      if (orderData.links && orderData.links[1] && orderData.links[1].href) {
        window.location.href = orderData.links[1].href;
      } else {
        alert("PayPal order creation failed.");
      }
    } catch (err) {
      console.error("PayPal Payment Failed:", err);
      alert("Something went wrong with PayPal payment.");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Main payment handler
  const handlePayment = () => {
    if (paymentMethod === "razorpay") {
      handleRazorpayPayment();
    } else {
      handlePayPalPayment();
    }
  };

  // 🔹 Get payment button text
  const getButtonText = () => {
    if (loading) return "";
    
    if (paymentMethod === "razorpay") {
      return `Donate ${formatCurrency(convertedAmount, currency)}`;
    } else {
      return `Donate ${formatCurrency(convertedAmount, currency)}`;
    }
  };

  // 🔹 Get country name from code
  const getCountryName = (countryCode) => {
    const countryNames = {
      IN: "India",
      US: "United States",
      GB: "United Kingdom",
      CA: "Canada",
      AU: "Australia",
      DE: "Germany",
      FR: "France",
      JP: "Japan",
      EU: "European Union"
    };
    return countryNames[countryCode] || "International";
  };

  return (
    <div className="payment-button-container">
      {/* 🌍 Manual Country Selection Modal */}
      {showManualSelection && (
        <div className="country-selection-modal">
          <div className="country-modal-content">
            <h3>🌍 Select Your Country</h3>
            <p>Choose your country for localized payment options and currency.</p>
            
            <div className="country-options">
              <button 
                className={`country-option ${country === "IN" ? "selected" : ""}`}
                onClick={() => handleCountryChange("IN")}
              >
                <span className="flag">🇮🇳</span>
                <span className="country-name">India</span>
                <span className="payment-info">Razorpay (₹3 fixed)</span>
                
              </button>
              
              <button 
                className={`country-option ${country !== "IN" ? "selected" : ""}`}
                onClick={() => handleCountryChange("US")}
              >
                <span className="flag">🇺🇸</span>
                <span className="country-name">United States</span>
                <span className="payment-info">PayPal ({formatCurrency(convertedAmount, 'USD')})</span>
              </button>
            </div>

            <div className="country-dropdown-alt">
              <label>Or select specific country:</label>
              <select
                value={country}
                onChange={(e) => handleCountryChange(e.target.value)}
                className="country-dropdown"
              >
                <option value="IN">India (₹3 fixed)</option>
                <option value="US">United States ({formatCurrency(baseAmount * (exchangeRates?.USD || 1), 'USD')})</option>
                <option value="GB">United Kingdom ({formatCurrency(baseAmount * (exchangeRates?.GBP || 0.79), 'GBP')})</option>
                <option value="CA">Canada ({formatCurrency(baseAmount * (exchangeRates?.CAD || 1.35), 'CAD')})</option>
                <option value="AU">Australia ({formatCurrency(baseAmount * (exchangeRates?.AUD || 1.52), 'AUD')})</option>
                <option value="DE">Germany ({formatCurrency(baseAmount * (exchangeRates?.EUR || 0.92), 'EUR')})</option>
                <option value="FR">France ({formatCurrency(baseAmount * (exchangeRates?.EUR || 0.92), 'EUR')})</option>
                <option value="JP">Japan ({formatCurrency(baseAmount * (exchangeRates?.JPY || 150.25), 'JPY')})</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* ✅ Payment Interface */}
      {!showManualSelection && locationAvailable && (
        <>
          {/* Payment Method Indicator */}
          <div className="payment-method-indicator">
            <button 
              className="change-country-btn"
              onClick={() => setShowManualSelection(true)}
              title="Change country"
            >
              <span className="payment-icon">
                {country === "IN" ? "🇮🇳" : 
                 country === "US" ? "🇺🇸" :
                 country === "GB" ? "🇬🇧" :
                 country === "CA" ? "🇨🇦" :
                 country === "AU" ? "🇦🇺" :
                 country === "DE" ? "🇩🇪" :
                 country === "FR" ? "🇫🇷" :
                 country === "JP" ? "🇯🇵" : "🌍"}
              </span>
              <span className="payment-text">
                Paying from {getCountryName(country)}
              </span>
              <span className="change-text">Change</span>
            </button>
          </div>

          {/* Amount Display */}
          {/* <div className="converted-amount-display">
            <span className="base-amount">Base: ${baseAmount}</span>
            <span className="converted-amount">
              Your amount: {formatCurrency(convertedAmount, currency)}
            </span>
          </div> */}

          {/* Main Payment Button */}
          <button
            onClick={handlePayment}
            className={`confess-btn ${loading ? "loading" : ""} ${paymentMethod}`}
            disabled={loading}
          >
            {loading ? (
              <div className="spinner"></div>
            ) : (
              <>
                {getButtonText()}
              </>
            )}
          </button>

          {/* Payment Method Notice */}
          <div className="payment-notice">
  {paymentMethod === "razorpay" ? (
    <>
      Supports UPI, Cards, NetBanking & Wallet
      <br />
      <span className="payment-warning">
        Note: The amount shown as ₹0.03 actually means ₹3.00 due to a technical rounding issue
      </span>
    </>
  ) : (
    <>Supports PayPal, Cards & Local Payment Methods ({currency})</>
  )}
</div>
        </>
      )}
    </div>
  );
}

export default PaymentButton;

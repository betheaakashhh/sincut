import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

const stripePromise = loadStripe("YOUR_STRIPE_PUBLISHABLE_KEY");

function StripeCheckout({ amountUSD = 1 }) {
  const stripe = useStripe();
  const elements = useElements();

  const handlePayment = async () => {
    if (!stripe || !elements) return;
    // Normally create PaymentIntent on backend
    alert("Stripe payment flow goes here for $1"); 
  };

  return (
    <div>
      <CardElement />
      <button onClick={handlePayment}>Donate $1</button>
    </div>
  );
}

export default function StripeButtonWrapper(props) {
  return (
    <Elements stripe={stripePromise}>
      <StripeCheckout {...props} />
    </Elements>
  );
}

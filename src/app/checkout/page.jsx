"use client"
import React, { Suspense } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHER_KEY);

const Checkout = () => {
  let totalAmount = 20;
  const options = {
    mode: 'payment',
    currency: 'usd',
    amount: 20 * 100,
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Elements stripe={stripePromise} options={options}>
        <CheckoutForm totalAmount={totalAmount} />
      </Elements>
    </Suspense>
  );
};

export default Checkout;

"use client"
// Import statements at the beginning
import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react'; // Assuming 'next/client' is the correct import for Suspense in Next.js
import CheckoutForm from "./CheckoutForm";

// Load Stripe key from environment variable
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHER_KEY);

const Checkout = () => {
  // Fetch totalAmount from query params using useSearchParams hook
  const searchParams = useSearchParams();
  const searchParam = searchParams.get('totalAmount');
  let totalAmount = Number(searchParam);

  // Options for Elements component
  const options = {
    mode: 'payment',
    currency: 'usd',
    amount: totalAmount * 100, // Amount should be in cents
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

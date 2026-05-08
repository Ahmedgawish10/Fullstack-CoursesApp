"use client"
import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useSearchParams } from 'next/navigation';
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const AccepetPayment = () => {
  const searchParams = useSearchParams();
  const searchParam = searchParams.get('totalAmount');
  let totalAmount = Number(searchParam);

  const options = {
    mode: 'payment',
    currency: 'usd',
    amount: totalAmount * 100,
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm totalAmount={totalAmount} />
    </Elements>
  );
};

export default AccepetPayment;

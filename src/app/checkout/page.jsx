"use client"
// Import necessary dependencies
import React, { useEffect, useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';
import { useSearchParams } from 'next/navigation'; // Ensure correct import based on your project setup

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHER_KEY);

const Checkout = () => {
  const [totalAmount, setTotalAmount] = useState(0);
  const searchParams = useSearchParams(); // Retrieve search parameters

  useEffect(() => {
    const searchParam = searchParams.get('totalAmount');
    if (searchParam) {
      setTotalAmount(Number(searchParam));
    }
  }, [searchParams]);

  const options = {
    mode: 'payment', // Ensure mode is set to 'payment'
    currency: 'usd',
    amount: totalAmount > 0 ? totalAmount * 100 : 100, // Ensure amount is greater than 0, default to 100 cents if totalAmount is invalid
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm totalAmount={totalAmount} />
    </Elements>
  );
};

export default Checkout;

"use client"
import React, { useEffect, useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';
import { useRouter } from 'next/navigation'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHER_KEY);

const Checkout = () => {
  const [totalAmount, setTotalAmount] = useState(0);
  const router = useRouter(); // Replace with `next/router` if using Next.js 12+

  useEffect(() => {
    const { totalAmount } = router.query; // Fetch query parameter 'totalAmount'
    if (totalAmount) {
      setTotalAmount(Number(totalAmount));
    }
  }, [router.query]);

  const options = {
    currency: 'usd',
    amount: totalAmount * 100, // Stripe expects amount in cents
  };

  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm totalAmount={totalAmount} options={options} />
    </Elements>
  );
};

export default Checkout;

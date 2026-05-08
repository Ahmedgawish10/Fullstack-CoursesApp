"use client"
import React, { Suspense } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useSearchParams } from 'next/navigation';
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const DEFAULT_TOTAL = 20;

function CheckoutContent() {
  const searchParams = useSearchParams();
  const raw = searchParams.get('totalAmount');
  const parsed = raw != null ? parseFloat(raw) : NaN;
  const totalAmount =
    Number.isFinite(parsed) && parsed > 0 ? parsed : DEFAULT_TOTAL;
  const amountInCents = Math.round(totalAmount * 100);

  const options = {
    mode: 'payment',
    currency: 'usd',
    amount: amountInCents,
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm totalAmount={totalAmount} />
    </Elements>
  );
}

const Checkout = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CheckoutContent />
    </Suspense>
  );
};

export default Checkout;

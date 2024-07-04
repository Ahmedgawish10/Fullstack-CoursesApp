"use client"
import React from 'react';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHER_KEY);
import CheckoutForm from "./CheckoutForm";
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'

const Checkout = () => {
 const searchParams = useSearchParams()
  const x = useRouter()

  const searchParam = searchParams.get('totalAmount')
    let totalAmount=Number(searchParam)
      const options = {
          mode:'payment',
          currency:'usd',
          amount:+`${+totalAmount*100}`,

  };
  return (
          <React.Suspense fallback={<div>Loading...</div>}>

  <Elements stripe={stripePromise} options={options}>
      <CheckoutForm totalAmount={totalAmount}/>
    </Elements>  
        </React.Suspense>
    

 
  );
};

export default Checkout;
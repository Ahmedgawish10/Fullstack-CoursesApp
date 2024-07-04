"use client"
import React from 'react';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHER_KEY);
import CheckoutForm from "./CheckoutForm";

const Checkout = () => {
   const url = window.location.href;
    console.log(url);
    const getsSlectedUrl=  url?.split("?")
    const totalAmount = getsSlectedUrl.find(param => param.startsWith('totalAmount=')).split('=')[1];

    
    
    
    
    
    
      const options = {
          mode:'payment',
          currency:'usd',
          amount:+`${+totalAmount*100}`,

  };
  return (

  <Elements stripe={stripePromise} options={options}>
      <CheckoutForm totalAmount={totalAmount}/>
    </Elements>  
    

 
  );
};

export default Checkout;
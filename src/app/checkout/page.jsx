"use client"
// Import statements at the beginning
import React from 'react';
import AccepetPayment from "./AccepetPayment"

import { Suspense } from 'react'; // Assuming 'next/client' is the correct import for Suspense in Next.js

const CheckoutAccepts = () => {
  

  return (
      <Suspense fallback={<div>Loading...</div>}>
              <AccepetPayment/>

      </Suspense>

  );
};

export default CheckoutAccepts;

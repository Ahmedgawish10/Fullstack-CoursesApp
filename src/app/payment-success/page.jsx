import React from 'react';
import "./payment.css"
import Link from 'next/link';

const PaymentSuccess = () => {
  return (
     <div className="   payment-card text-center h-[90vh]">
        <div className="circle text-center">
            <i className="checkmark text-center">✓</i>
        </div>
        <h1 className="success-title">Payment Success</h1> 
        <p className="success-msg">We sent an email confirmation  with your order via gmail  </p>
         <div className="mt-[2rem]">
             
                   <Link href="/" className="button-89 ">Go Home</Link>
    
         </div>

    </div>
  );
};

export default PaymentSuccess;
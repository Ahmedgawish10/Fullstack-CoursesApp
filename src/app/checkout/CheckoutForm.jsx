import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import { useState } from 'react';
import { useSelector } from 'react-redux'
import { useUser } from '@clerk/nextjs';
import OrderApis from "../_Utils/OrderApis";
import CartApis from "../_Utils/CartApis";

const CheckoutForm = ({ totalAmount }) => {
  const [loading, setLoading] = useState(false);
  const [errormessage, setErrorMessage] = useState()
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useUser();
  const cart = useSelector((state) => { return state.cart })

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    try {
      setLoading(true);
      const { error: submitError } = await elements.submit();
      if (submitError) {
        throw new Error(submitError.message);
      }

      const res = await fetch('/api/create-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: totalAmount,
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to create payment intent');
      }

      const clientSecret = await res.json();
      const result = await stripe.confirmPayment({
        clientSecret,
        elements,
        confirmParams: {
          return_url: "https://fullstack-courses-app-3vdz-3c6vmh0y4-ahmedgawish.vercel.app/payment-success",
        },
      });

      if (result.error) {
        throw new Error(result.error.message);
      }

      createOrder();
    } catch (error) {
      console.error('Error during payment confirmation:', error.message);
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  const createOrder = () => {
    let productsId = [];
    cart.forEach((item) => {
      productsId.push(item?.attributes?.courseId);
    });
    const data = {
      data: {
        userName: user.fullName,
        email: user.primaryEmailAddress.emailAddress,
        amount: totalAmount,
        courses: productsId
      }
    };
    OrderApis.createOrder(data).then((res) => {
      cart.forEach((course) => {
        CartApis.deleteCourse(course?.id);
      })
    }).catch((error) => {
      console.error('Error creating order:', error);
    });
  };

  const stripeReady = Boolean(stripe && elements);
  const formattedTotal = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(totalAmount);

  return (
    <form onSubmit={handleSubmit}>
      <div className="w-[90%] lg:w-[40%] 2xl:w-[40%] mx-auto mt-[3rem] mb-10">
        <PaymentElement />
        {stripeReady ? (
          <button
            type="submit"
            disabled={loading}
            className="bg-black text-white border rounded px-4 py-2 mt-5 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Processing…' : `Pay ${formattedTotal}`}
          </button>
        ) : (
          <div
            className="mt-6 mb-10 flex min-h-[280px] w-full flex-col items-center justify-center gap-6 rounded-xl px-6 py-10"
            role="status"
            aria-live="polite"
            aria-busy="true"
          >
            <div className="relative flex h-14 w-14 items-center justify-center">
              <span className="absolute inset-0 rounded-full border-2 border-neutral-200" />
              <span className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-black border-r-neutral-400" />
            </div>
            <div className="w-full max-w-md space-y-3">
              <div className="mx-auto h-2 w-40 rounded-full bg-neutral-300/80 animate-pulse" />
              <div className="h-12 w-full rounded-lg bg-neutral-200/90 animate-pulse" />
              <div className="h-12 w-full rounded-lg bg-neutral-200/90 animate-pulse [animation-delay:150ms]" />
              <div className="flex gap-3">
                <div className="h-12 flex-1 rounded-lg bg-neutral-200/80 animate-pulse [animation-delay:300ms]" />
                <div className="h-12 w-28 rounded-lg bg-neutral-200/80 animate-pulse [animation-delay:300ms]" />
              </div>
            </div>
            <p className="text-center text-sm font-medium text-[#000]">
              Securing checkout…
            </p>
            <p className="text-center text-xs text-[#000]">
              Payment fields will appear here in a moment
            </p>
          </div>
        )}
      </div>
    </form>
  );
};

export default CheckoutForm;

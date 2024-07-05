import {useStripe, useElements, PaymentElement} from '@stripe/react-stripe-js';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useUser } from '@clerk/nextjs';
import OrderApis from "../_Utils/OrderApis";
import CartApis from "../_Utils/CartApis";

const CheckoutForm = ({totalAmount}) => {
     const [loading, setLoading] = useState(false);
	 const [errormessage, setErrorMessage] = useState()
     const stripe = useStripe();
     const elements = useElements();
     const {user}=useUser();
     const cart= useSelector((state)=>{return state.cart})
     
//       console.log(cart,user);
    
 const handleSubmit = async (event) => {
  event.preventDefault();

  if (!stripe || !elements) {
    return;
  }
  //createOrder

  //trigger form validation
  try {
       createOrder()
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
			//`Elements` instance that was used to create the Payment Element
			clientSecret,
			elements,
			confirmParams: {
				return_url: "http://localhost:3000/payment-success",
			},
		});

    if (result.error) {
      throw new Error(result.error.message);
    } else {
      console.log('Payment confirmed successfully:', result);
      // Handle success, redirect user if needed
    }


      
  } catch (error) {
    console.error('Error during payment confirmation:', error.message);
    // Handle and display error message to user
    setErrorMessage(error.message);
  } finally {
    setLoading(false); // Ensure loading state is reset
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
//createOrder func
    OrderApis.createOrder(data).then((res) => {
                 cart.forEach((course) => {
                CartApis.deleteCourse(course?.id);
    })}).catch((error) => {
            console.error('Error creating order:', error);
        });
};
        

        
        
   
    
    
  return (
    <form onSubmit={handleSubmit}>
     <div className="w-[90%] mx-auto mt-[3rem] xl:w-[70%]">
           <PaymentElement />
          <button className="bg-black text-white border rounded px-4 py-2 mt-5">Pay</button>
     </div>
    </form>
  );
};

export default CheckoutForm;
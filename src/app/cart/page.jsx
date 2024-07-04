"use client" 
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart } from "../_redux/CartSlice";
import { toast } from 'react-hot-toast';
import Link from 'next/link';
import "./style_cart.css";
import { useRouter } from 'next/navigation'

const Cart = () => {
          const router = useRouter()

  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000); 
  };

  const deleteCourseCart = (id) => {
    toast.loading('Removing course...', { duration: 1000 });
    dispatch(removeFromCart(id));
  };

  // Calculate subtotal, discount, and total
  const calculateSubtotal = () => {
    let subtotal = 0;
    cart.forEach(item => {
//        console.log(item?.attributes?.courses?.data[0]?.attributes);
      subtotal += item?.attributes?.courses?.data[0]?.attributes?.price; 
    });
    return subtotal;
  };
const calculateDiscountSubtotal = () => {
    let totalDiscountedPrice = 0;
    cart.forEach(item => {
        const price = item?.attributes?.courses?.data[0]?.attributes?.price;
        const discountPercentage = item?.attributes?.courses?.data[0]?.attributes?.discount;

        const discountDecimal = discountPercentage / 100;
        const discountedPrice = price * (1 - discountDecimal);

        totalDiscountedPrice += discountedPrice;
    });
    return totalDiscountedPrice.toFixed(2); 
};

    
                    
  const subtotal = calculateSubtotal();
  const  subtotalDiscount= calculateDiscountSubtotal();

  return (
    <div className='flex flex-col loading'>
      {isLoading ? (
        <div className="text-center py-4 mt-[4rem] flex justify-center">
          <p className="text-4xl loader"></p>
        </div>
      ) : (
        <section>
          <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
            <div className="mx-auto max-w-3xl">
              <header className="text-center">
 {cart.length > 0 && (
            <h1 className="text-xl font-bold text-gray-900 sm:text-3xl">Your Cart</h1>
          )}
              </header>

              <div className="mt-8 section-cartitems">
                {cart.length === 0 ? (
                  <div className="text-center py-4">
                    <p className="mb-5">Your cart is empty.</p>
                    <Link href="/" className="button-89 ">Go Home</Link>
                  </div>
                ) : (
                  cart.map((item, index) => (
                    <div key={index} className="">
                      <ul className="space-y-4 mb-3">
                        <li className="flex items-center gap-4">
                          <img
                            src={item?.attributes?.courses?.data[0]?.attributes?.images?.data?.attributes?.url}
                            alt=""
                            className="size-16 rounded object-cover"
                          />

                          <div>
                            <h3 className="text-sm text-gray-900">{item?.attributes?.courses?.data[0]?.attributes?.title}</h3>

                            <dl className="mt-0.5 space-y-px text-[10px] text-gray-600">
                              <div>
                                <dt className="inline">Category: {item?.attributes?.courses?.data[0]?.attributes?.category}</dt><br/>
                                <dd className="inline">Discount: %{item?.attributes?.courses?.data[0]?.attributes?.discount}</dd>
                              </div>

                              <div>
                                <dt className="inline">Instructor:</dt>
                                <dd className="inline">{item?.attributes?.courses?.data[0]?.attributes?.Author}</dd>
                              </div>
                            </dl>
                          </div>

                          <div className="flex flex-1 items-center justify-end gap-2">
                            <div>${item?.attributes?.courses?.data[0]?.attributes?.price}</div>

                            <button className="text-gray-600 transition hover:text-red-600" onClick={() => deleteCourseCart(item?.id)}>
                              <span className="sr-only">Remove item</span>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="h-4 w-4"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                />
                              </svg>
                            </button>
                          </div>
                        </li>
                      </ul>
                    </div>
                  ))
                )}

                {cart.length > 0 && (
                  <div className="mt-8 flex justify-start border-t border-gray-100 pt-8">
                    <div className="w-screen  space-y-4">
                      <dl className="space-y-0.5 text-sm text-gray-700">
                        <div className="flex justify-between">
                          <dt>Subtotal</dt>
                          <dd>£{subtotal}</dd>
                        </div>

                        <div className="flex justify-between">
                          <dt>Subtotal After Discount</dt>
                          <dd>£{subtotalDiscount}</dd>
                        </div>

                      </dl>

                      <div className="flex justify-end">
                        <span className="inline-flex items-center justify-center rounded-full bg-indigo-100 px-2.5 py-0.5 text-indigo-700">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="-ms-1 me-1.5 h-4 w-4"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z"
                            />
                          </svg>
                          <p className="whitespace-nowrap text-xs">2 Discounts Applied</p>
                        </span>
                      </div>

                      <div className="flex justify-end">
                        <div 
                          className="cursor-pointer block rounded bg-gray-700 px-5 py-3 text-sm text-gray-100 transition hover:bg-gray-600 "
                        >
                         <a href={`/checkout?totalAmount=${subtotalDiscount}`}>
                             Checkout
                         </a>
                          
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Cart;

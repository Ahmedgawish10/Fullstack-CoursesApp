"use client";

import React, { useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import Image from "next/image";
import { IoMdCart } from "react-icons/io";
import { TbCategory2 } from "react-icons/tb";
import { removeFromCart } from "../_redux/CartSlice";
import { toast } from "react-hot-toast";
import "./style_cart.css";

function getCourseFromCartItem(item) {
  return item?.attributes?.courses?.data?.[0];
}

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const deleteCourseCart = (id) => {
    toast.loading("Removing course...", { duration: 1000 });
    dispatch(removeFromCart(id));
  };

  const { subtotal, subtotalAfterDiscount, discountedItemCount } = useMemo(() => {
    let sum = 0;
    let discountedSum = 0;
    let withDiscount = 0;

    cart.forEach((item) => {
      const course = getCourseFromCartItem(item);
      const price = Number(course?.attributes?.price) || 0;
      const discountPct = Number(course?.attributes?.discount) || 0;
      sum += price;
      discountedSum += price * (1 - discountPct / 100);
      if (discountPct > 0) withDiscount += 1;
    });

    return {
      subtotal: sum,
      subtotalAfterDiscount: discountedSum.toFixed(2),
      discountedItemCount: withDiscount,
    };
  }, [cart]);

  return (
    <div className="flex flex-col">
      <section className="border-b border-emerald-100/80 bg-gradient-to-b from-emerald-50/40 to-transparent">
          <div className="mx-auto max-w-screen-xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
            <header className="text-center">
              {cart.length > 0 ? (
                <>
                  <div className="mx-auto mb-3 flex justify-center">
                    <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-4 py-1.5 text-sm font-medium text-emerald-800 shadow-sm">
                      <IoMdCart className="text-emerald-600" aria-hidden />
                      {cart.length}{" "}
                      {cart.length === 1 ? "course" : "courses"} in cart
                    </span>
                  </div>
                  <h1 className="text-cde-headline-mobile font-bold text-slate-900 sm:text-cde-headline-lg">
                    Your Cart
                  </h1>
                  <p className="mx-auto mt-2 max-w-lg text-sm text-slate-600">
                    Review your courses and proceed to checkout when you are ready.
                  </p>
                </>
              ) : null}
            </header>

            <div className="mt-10">
              {cart.length === 0 ? (
                <div className="mx-auto max-w-md rounded-2xl border border-dashed border-emerald-300 bg-white/80 px-6 py-12 text-center">
                  <IoMdCart className="mx-auto mb-4 text-5xl text-emerald-500/60" aria-hidden />
                  <p className="text-lg font-semibold text-slate-900">
                    Your cart is empty
                  </p>
                  <p className="mt-2 text-sm text-slate-600">
                    Add courses from the catalog to see them here.
                  </p>
                  <Link href="/" className="button-89 mt-8 inline-block">
                    Browse courses
                  </Link>
                </div>
              ) : (
                <>
                  <ul className="mx-auto grid max-w-4xl gap-5">
                    {cart.map((item) => {
                      const course = getCourseFromCartItem(item);
                      const attrs = course?.attributes;
                      const imageUrl =
                        attrs?.images?.data?.[0]?.attributes?.url;
                      const courseId = course?.id;
                      const discountPct = Number(attrs?.discount) || 0;

                      return (
                        <li key={item.id}>
                          <article className="overflow-hidden rounded-xl border border-emerald-200 bg-white shadow-sm transition-all duration-300 hover:shadow-md lg:flex lg:items-stretch lg:gap-0">
                            <Link
                              href={`/course-details/${courseId}`}
                              className="relative block shrink-0 lg:w-52 xl:w-60"
                            >
                              {imageUrl ? (
                                <Image
                                  src={imageUrl}
                                  alt={attrs?.title ?? "Course"}
                                  width={320}
                                  height={200}
                                  className="h-44 w-full object-cover sm:h-48 lg:h-full lg:min-h-[160px]"
                                />
                              ) : (
                                <div className="flex h-44 w-full items-center justify-center bg-neutral-200 text-sm text-neutral-500 sm:h-48 lg:h-full lg:min-h-[160px]">
                                  No image
                                </div>
                              )}
                            </Link>

                            <div className="flex flex-1 flex-col justify-between gap-4 p-4 sm:p-5">
                              <div>
                                <Link
                                  href={`/course-details/${courseId}`}
                                  className="group"
                                >
                                  <h2 className="line-clamp-2 text-base font-semibold text-slate-900 transition-colors group-hover:text-emerald-700 sm:text-lg">
                                    {attrs?.title}
                                  </h2>
                                </Link>

                                <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-slate-600">
                                  <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-1 font-medium text-slate-700">
                                    <TbCategory2
                                      className="text-emerald-600"
                                      aria-hidden
                                    />
                                    {attrs?.category}
                                  </span>
                                  {discountPct > 0 ? (
                                    <span className="rounded-full bg-emerald-100 px-2.5 py-1 font-medium text-emerald-800">
                                      {discountPct}% off
                                    </span>
                                  ) : null}
                                  <span className="text-slate-400">·</span>
                                  <span>
                                    <span className="font-medium text-slate-500">
                                      Instructor:
                                    </span>{" "}
                                    {attrs?.Author}
                                  </span>
                                </div>
                              </div>

                              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-emerald-100 pt-4">
                                <div>
                                  <p className="text-lg font-bold text-emerald-800">
                                    ${attrs?.price}
                                  </p>
                                  {discountPct > 0 ? (
                                    <p className="text-xs text-slate-500">
                                      After discount: $
                                      {(
                                        (Number(attrs?.price) || 0) *
                                        (1 - discountPct / 100)
                                      ).toFixed(2)}
                                    </p>
                                  ) : null}
                                </div>
                                <button
                                  type="button"
                                  className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 bg-white px-3 py-2 text-sm font-medium text-red-700 transition hover:bg-red-50"
                                  onClick={() => deleteCourseCart(item?.id)}
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="h-4 w-4"
                                    aria-hidden
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                    />
                                  </svg>
                                  Remove
                                </button>
                              </div>
                            </div>
                          </article>
                        </li>
                      );
                    })}
                  </ul>

                  <div className="mx-auto mt-10 max-w-4xl space-y-6">
                    <div className="rounded-xl border border-emerald-200 bg-white p-5 shadow-sm sm:p-6">
                      <dl className="space-y-3 text-sm text-slate-700">
                        <div className="flex justify-between gap-4">
                          <dt className="font-medium text-slate-600">
                            Subtotal
                          </dt>
                          <dd className="font-semibold text-slate-900">
                            ${subtotal.toFixed(2)}
                          </dd>
                        </div>
                        <div className="flex justify-between gap-4 border-t border-emerald-100 pt-3">
                          <dt className="font-medium text-slate-600">
                            Total after discounts
                          </dt>
                          <dd className="text-lg font-bold text-emerald-800">
                            ${subtotalAfterDiscount}
                          </dd>
                        </div>
                      </dl>

                      {discountedItemCount > 0 ? (
                        <div className="mt-4 flex justify-start">
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-800">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className="h-4 w-4"
                              aria-hidden
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z"
                              />
                            </svg>
                            {discountedItemCount}{" "}
                            {discountedItemCount === 1
                              ? "promo applied"
                              : "promos applied"}
                          </span>
                        </div>
                      ) : null}

                      <div className="mt-6 flex flex-col items-stretch gap-3 sm:flex-row sm:justify-end">
                        <Link
                          href={`/checkout?totalAmount=${subtotalAfterDiscount}`}
                          className="inline-flex items-center justify-center rounded-lg bg-emerald-700 px-6 py-3 text-center text-sm font-semibold text-white transition hover:bg-emerald-800"
                        >
                          Checkout
                        </Link>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </section>
    </div>
  );
};

export default Cart;

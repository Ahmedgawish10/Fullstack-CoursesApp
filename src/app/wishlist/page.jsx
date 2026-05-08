"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { FaRegHeart } from "react-icons/fa";
import { IoMdCart } from "react-icons/io";
import { TbCategory2 } from "react-icons/tb";
import WishlistApis from "../_Utils/WishlistApis";
import { removeFromWishlist, setWishlist } from "../_redux/WishlistSlice";
import { useAddToCart } from "../_hooks/useAddToCart";

function getCourseFromWishlistItem(item) {
  return item?.attributes?.courses?.data?.[0];
}

export default function WishlistPage() {
  const { user } = useUser();
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist);
  const [isLoading, setIsLoading] = useState(true);
  const handleAddToCart = useAddToCart();

  useEffect(() => {
    if (!user) {
      setIsLoading(false);
      return;
    }

    WishlistApis.getWishlist(user.primaryEmailAddress.emailAddress)
      .then((res) => dispatch(setWishlist(res.data.data)))
      .finally(() => setIsLoading(false));
  }, [user, dispatch]);

  const deleteWishlistItem = (id) => {
    toast.loading("Removing course...", { duration: 1000 });
    dispatch(removeFromWishlist(id));
  };

  const totalValue = useMemo(() => {
    let sum = 0;
    wishlist.forEach((item) => {
      const price = getCourseFromWishlistItem(item)?.attributes?.price;
      if (typeof price === "number") sum += price;
    });
    return sum;
  }, [wishlist]);

  if (!isLoading && !user) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center px-4 py-16">
        <div className="max-w-md rounded-2xl border border-emerald-200 bg-white/90 p-8 text-center shadow-sm">
          <FaRegHeart className="mx-auto mb-4 text-5xl text-emerald-600/80" aria-hidden />
          <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">
            Sign in to see your wishlist
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            Save courses you love and come back to them anytime.
          </p>
          <Link
            href="/sign-in"
            className="button-89 mt-6 inline-block"
          >
            Sign in
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {isLoading ? (
        <div className="mt-[4rem] flex justify-center py-4 text-center">
          <p className="loader text-4xl"></p>
        </div>
      ) : (
        <section className="border-b border-emerald-100/80 bg-gradient-to-b from-emerald-50/40 to-transparent">
          <div className="mx-auto max-w-screen-xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
            <header className="text-center">
              {wishlist.length > 0 ? (
                <>
                  <div className="mx-auto mb-3 flex justify-center">
                    <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-4 py-1.5 text-sm font-medium text-emerald-800 shadow-sm">
                      <FaRegHeart className="text-emerald-600" aria-hidden />
                      {wishlist.length}{" "}
                      {wishlist.length === 1 ? "course" : "courses"} saved
                    </span>
                  </div>
                  <h1 className="text-cde-headline-mobile font-bold text-slate-900 sm:text-cde-headline-lg">
                    Your Wishlist
                  </h1>
                  <p className="mx-auto mt-2 max-w-lg text-sm text-slate-600">
                    Courses you have hearted—open details or move them to your cart when you are ready.
                  </p>
                </>
              ) : null}
            </header>

            <div className="mt-10">
              {wishlist.length === 0 ? (
                <div className="mx-auto max-w-md rounded-2xl border border-dashed border-emerald-300 bg-white/80 px-6 py-12 text-center">
                  <FaRegHeart className="mx-auto mb-4 text-5xl text-emerald-500/60" aria-hidden />
                  <p className="text-lg font-semibold text-slate-900">
                    Your wishlist is empty
                  </p>
                  <p className="mt-2 text-sm text-slate-600">
                    Explore courses and tap the heart to save them here.
                  </p>
                  <Link href="/" className="button-89 mt-8 inline-block">
                    Browse courses
                  </Link>
                </div>
              ) : (
                <>
                  <ul className="mx-auto grid max-w-4xl gap-5">
                    {wishlist.map((item) => {
                      const course = getCourseFromWishlistItem(item);
                      const attrs = course?.attributes;
                      const imageUrl =
                        attrs?.images?.data?.[0]?.attributes?.url;
                      const courseId = course?.id;

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
                                <p className="text-lg font-bold text-emerald-800">
                                  ${attrs?.price}
                                </p>
                                <div className="flex flex-wrap items-center gap-2">
                                  {attrs?.discount ? (
                                    <button
                                      type="button"
                                      className="button-85 inline-flex items-center gap-2 px-4 py-2 text-sm"
                                      onClick={() =>
                                        course && handleAddToCart(course)
                                      }
                                    >
                                      <IoMdCart className="text-xl" aria-hidden />
                                      Add to cart
                                    </button>
                                  ) : (
                                    <Link
                                      href={`/course-details/${courseId}`}
                                      className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-700"
                                    >
                                      View course
                                    </Link>
                                  )}
                                  <button
                                    type="button"
                                    className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 bg-white px-3 py-2 text-sm font-medium text-red-700 transition hover:bg-red-50"
                                    onClick={() => deleteWishlistItem(item?.id)}
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
                            </div>
                          </article>
                        </li>
                      );
                    })}
                  </ul>

                  <div className="mx-auto mt-10 max-w-4xl rounded-xl border border-emerald-200 bg-emerald-50/50 px-5 py-4 sm:flex sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-700">
                        Wishlist total
                      </p>
                      <p className="text-xs text-slate-500">
                        Sum of listed prices (checkout may apply discounts).
                      </p>
                    </div>
                    <p className="mt-2 text-2xl font-bold text-emerald-800 sm:mt-0">
                      ${totalValue.toFixed(2)}
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

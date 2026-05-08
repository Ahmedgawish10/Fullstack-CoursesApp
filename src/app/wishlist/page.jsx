"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import WishlistApis from "../_Utils/WishlistApis";
import { removeFromWishlist, setWishlist } from "../_redux/WishlistSlice";
import Image from "next/image";
export default function WishlistPage() {
  const { user } = useUser();
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist);
  const [isLoading, setIsLoading] = useState(true);

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

  return (
    <div className="flex flex-col">
      {isLoading ? (
        <div className="text-center py-4 mt-[4rem] flex justify-center">
          <p className="text-4xl loader"></p>
        </div>
      ) : (
        <section>
          <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
            <div className="mx-auto max-w-3xl">
              <header className="text-center">
                {wishlist.length > 0 && (
                  <h1 className="text-xl font-bold text-gray-900 sm:text-3xl">
                    Your Wishlist
                  </h1>
                )}
              </header>

              <div className="mt-8">
                {wishlist.length === 0 ? (
                  <div className="text-center py-4">
                    <p className="mb-5">Your wishlist is empty.</p>
                    <Link href="/" className="button-89">
                      Go Home
                    </Link>
                  </div>
                ) : (
                  wishlist.map((item, index) => (
                    <div key={index}>
                      <ul className="space-y-4 mb-3">
                        <li className="flex items-center gap-4">
                          <Image src={item?.attributes?.courses?.data?.[0]?.attributes?.images?.data?.[0]?.attributes?.url} alt={item?.attributes?.courses?.data?.[0]?.attributes?.title} width={64} height={64} className="size-16 rounded object-cover" />

                          <div>
                            <h3 className="text-sm text-gray-900">
                              {item?.attributes?.courses?.data?.[0]?.attributes
                                ?.title}
                            </h3>

                            <dl className="mt-0.5 space-y-px text-[10px] text-gray-600">
                              <div>
                                <dt className="inline">
                                  Category:{" "}
                                  {
                                    item?.attributes?.courses?.data?.[0]
                                      ?.attributes?.category
                                  }
                                </dt>
                              </div>

                              <div>
                                <dt className="inline">Instructor:</dt>{" "}
                                <dd className="inline">
                                  {
                                    item?.attributes?.courses?.data?.[0]
                                      ?.attributes?.Author
                                  }
                                </dd>
                              </div>
                            </dl>
                          </div>

                          <div className="flex flex-1 items-center justify-end gap-2">
                            <div>
                              $
                              {
                                item?.attributes?.courses?.data?.[0]?.attributes
                                  ?.price
                              }
                            </div>

                            <button
                              className="text-gray-600 transition hover:text-red-600"
                              onClick={() => deleteWishlistItem(item?.id)}
                            >
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
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

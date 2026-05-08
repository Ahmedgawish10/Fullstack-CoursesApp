"use client"
import React from 'react';
import Image from 'next/image';
import { FaUserCheck, FaRegHeart } from "react-icons/fa";
import { RiMenuFold2Line } from "react-icons/ri";
import { IoMdCart, IoIosEye } from "react-icons/io";
import { ImFire } from "react-icons/im";
import Skeleton from "../../_components/Skeleton";
import { useAddToWishlist } from "../../_hooks/useAddToWishlist";
import { useAddToCart } from "../../_hooks/useAddToCart";

function AboutCourse({ SingleCourseDetails }) {
  const handleAddToWishlist = useAddToWishlist();
  const handleAddToCart = useAddToCart();
  const imageUrl = SingleCourseDetails?.attributes?.images?.data?.[0]?.attributes?.url;
  const title = SingleCourseDetails?.attributes?.title ?? 'Course';

  return (
    <div>
      {SingleCourseDetails?.id ? (
        <div className="about_course mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-10">
          <div className="overflow-hidden rounded-xl border border-emerald-200 bg-white/90 shadow-sm lg:mt-0">
            <div className="img">
              <div className="course-overlay flex-col gap-4">
                <div className="flex items-center">
                  <button
                    type="button"
                    className="rounded-full p-1 text-2xl text-white transition-colors hover:text-fuchsia-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                    aria-label={`Add ${title} to wishlist`}
                    onClick={() => handleAddToWishlist(SingleCourseDetails)}
                  >
                    <FaRegHeart className="heart" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    className="rounded-full p-1 text-3xl text-white transition-colors hover:text-fuchsia-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                    aria-label={`Preview ${title}`}
                  >
                    <IoIosEye className="eye" aria-hidden="true" />
                  </button>
                </div>
                {SingleCourseDetails.attributes?.discount ? (
                  <button
                    className="button-85 mt-2 flex items-center"
                    type="button"
                    onClick={() => handleAddToCart(SingleCourseDetails)}
                  >
                    <span>
                      <IoMdCart className="me-2 text-2xl" aria-hidden="true" />
                    </span>
                    <span>Add to Cart</span>
                  </button>
                ) : (
                  <button className="button-85 mt-2 flex items-center" type="button">
                    <span>
                      <ImFire className="me-2 text-2xl" aria-hidden="true" />
                    </span>
                    <span>Content of Course</span>
                  </button>
                )}
              </div>
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  width={800}
                  height={420}
                  className="w-full object-cover"
                  alt={title}
                  priority
                />
              ) : (
                <div className="flex min-h-[280px] w-full items-center justify-center bg-neutral-200 text-sm text-neutral-500 lg:min-h-[320px]">
                  No image
                </div>
              )}
            </div>
          </div>

          <div className="content flex flex-col justify-center">
            <div className="course_info space-y-3 lg:mt-0">
              <h1 className="course_title text-2xl font-semibold leading-tight text-slate-900 sm:text-3xl">
                {SingleCourseDetails?.attributes?.title}
              </h1>
              <div className="course_category flex items-center gap-2 text-sm text-slate-500">
                <span aria-hidden="true"><RiMenuFold2Line /></span>
                <span>{SingleCourseDetails?.attributes?.category}</span>
              </div>
              <div className="course_description max-w-prose text-sm leading-relaxed text-slate-600 sm:text-[15px]">
                {SingleCourseDetails?.attributes?.description}
              </div>
              <div className="course_description flex items-center gap-2 text-xs font-medium text-slate-500 sm:text-sm">
                <FaUserCheck className="text-lg text-emerald-600" aria-hidden="true" />
                <span>{SingleCourseDetails?.attributes?.Author}</span>
              </div>

              {SingleCourseDetails?.attributes?.discount ? (
                <div className="border-t border-emerald-100 pt-4">
                  <p className="text-lg font-semibold text-slate-900">
                    $ {SingleCourseDetails?.attributes?.price}
                  </p>
                  <button
                    className="button-85 mt-3 flex items-center"
                    type="button"
                    onClick={() => handleAddToCart(SingleCourseDetails)}
                  >
                    <span>
                      <IoMdCart className="me-2 text-2xl" aria-hidden="true" />
                    </span>
                    <span>Add to Cart</span>
                  </button>
                </div>
              ) : (
                <div className="border-t border-emerald-100 pt-4">
                  <button className="button-85 flex items-center" type="button">
                    <span>
                      <ImFire className="me-2 text-2xl" aria-hidden="true" />
                    </span>
                    <span>Free Now</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-10">
          <Skeleton />
        </div>
      )}
    </div>
  );
}

export default AboutCourse;

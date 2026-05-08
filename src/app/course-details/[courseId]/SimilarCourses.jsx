"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { IoIosEye, IoMdCart } from "react-icons/io";
import { FaRegHeart } from "react-icons/fa";
import { ImFire } from "react-icons/im";
import { TbCategory2 } from "react-icons/tb";
import { RiStarSLine } from "react-icons/ri";
import Image from 'next/image';
import { useAddToWishlist } from "../../_hooks/useAddToWishlist";
import { useAddToCart } from "../../_hooks/useAddToCart";

function SimilarCourses({ similarCourses }) {
  const router = useRouter();
  const handleAddToWishlist = useAddToWishlist();
  const handleAddToCart = useAddToCart();

  const handleViewCourse = (productId) => {
    router.push(`/course-details/${productId}`);
  };

  if (!similarCourses?.length) {
    return (
      <p className="mt-4 text-sm text-slate-500" role="status">
        No similar courses to show yet.
      </p>
    );
  }

  return (
    <div className="card_courses container_courses mt-4 grid grid-cols-1 gap-5 p-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {similarCourses.map((course) => (
        <article
          className="card_box overflow-hidden rounded-xl border border-emerald-200 bg-white/90 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg focus-within:ring-2 focus-within:ring-emerald-500/70"
          key={course.id}
        >
          <div className="img">
            <div className="course-overlay flex-col gap-4">
              <div className="flex items-center">
                <button
                  type="button"
                  className="rounded-full p-1 text-2xl text-white transition-colors hover:text-fuchsia-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  aria-label={`Add ${course?.attributes?.title ?? 'course'} to wishlist`}
                  onClick={() => handleAddToWishlist(course)}
                >
                  <FaRegHeart className="heart" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  className="rounded-full p-1 text-3xl text-white transition-colors hover:text-fuchsia-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  aria-label={`Preview ${course?.attributes?.title ?? 'course'}`}
                  onClick={() => handleViewCourse(course.id)}
                >
                  <IoIosEye className="eye" aria-hidden="true" />
                </button>
              </div>
              {course.attributes.discount ? (
                <button
                  className="button-85 mt-2 flex items-center"
                  type="button"
                  onClick={() => handleAddToCart(course)}
                >
                  <span>
                    <IoMdCart className="me-2 text-2xl" aria-hidden="true" />
                  </span>
                  <span>Add to Cart</span>
                </button>
              ) : (
                <button
                  className="button-85 mt-2 flex items-center"
                  type="button"
                  onClick={() => handleViewCourse(course.id)}
                >
                  <span>
                    <ImFire className="me-2 text-2xl" aria-hidden="true" />
                  </span>
                  <span>Free Now</span>
                </button>
              )}
            </div>
            <button
              type="button"
              className="block w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
              aria-label={`Go to ${course?.attributes?.title ?? 'course'} details`}
              onClick={() => handleViewCourse(course.id)}
            >
              {course?.attributes?.images?.data?.[0]?.attributes?.url ? (
                <Image
                  src={course.attributes.images.data[0].attributes.url}
                  width={200}
                  height={300}
                  className="h-[220px] w-full object-cover transition duration-500 hover:scale-110"
                  alt={course?.attributes?.title ?? 'Course image'}
                />
              ) : (
                <div className="flex h-[220px] w-full items-center justify-center bg-neutral-200 text-sm text-neutral-500">
                  No image
                </div>
              )}
            </button>
          </div>
          <div
            className="content cursor-pointer p-3"
            onClick={() => handleViewCourse(course.id)}
          >
            <h4 className="course_name line-clamp-2 text-base font-semibold text-slate-900">
              {course?.attributes?.title}
            </h4>
            <div className="course_category mt-2 flex items-center justify-between gap-2 text-xs">
              <div className="left flex items-center gap-2 text-slate-500">
                <p aria-hidden="true"><TbCategory2 /></p>
                <p>{course?.attributes?.category}</p>
              </div>
              <div className="right text-black-800">
                {course.attributes.discount ? (
                  <div className="rounded-full bg-emerald-100 px-2 py-1 font-medium text-emerald-700">
                    {course.attributes.discount}% Promo
                  </div>
                ) : (
                  <div className="rounded-full bg-emerald-100 px-2 py-1 font-medium text-emerald-700">
                    Free
                  </div>
                )}
              </div>
            </div>
            <p className="owner-course mb-1 mt-2 text-xs text-slate-500">{course?.attributes?.Author}</p>
            <div className="ratings flex items-center justify-between gap-2 pb-2 text-xs">
              <span className="icons flex items-center gap-1 text-slate-600" aria-label={`Rating ${course.attributes.rating} out of 5`}>
                {course?.attributes?.rating >= 4 ? (
                  <div className="flex text-yellow-500" aria-hidden="true">
                    <RiStarSLine />
                    <RiStarSLine />
                    <RiStarSLine />
                    <RiStarSLine />
                  </div>
                ) : (
                  <div className="flex text-yellow-500" aria-hidden="true">
                    <RiStarSLine />
                    <RiStarSLine />
                    <RiStarSLine />
                  </div>
                )}
                ({course.attributes.rating % 1 === 0 ? course.attributes.rating + '.0' : course.attributes.rating})
              </span>
              <button
                type="button"
                className="rounded-md px-2 py-1 text-xs font-medium text-emerald-700 transition-colors hover:bg-emerald-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                onClick={(e) => {
                  e.stopPropagation();
                  handleViewCourse(course.id);
                }}
              >
                Details
              </button>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

export default SimilarCourses;

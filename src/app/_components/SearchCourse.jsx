"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { FaRegHeart, FaSearch } from "react-icons/fa";
import { IoIosEye, IoMdCart } from "react-icons/io";
import { TbCategory2 } from "react-icons/tb";
import { RiStarSLine } from "react-icons/ri";
import { ImFire } from "react-icons/im";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAddToWishlist } from "../_hooks/useAddToWishlist";
import { useAddToCart } from "../_hooks/useAddToCart";

const SearchCourse = ({ courseName, setCourseName }) => {
  const [searchedCourse, setSearchedCourse] = useState([]);
  const [courseExsist, setCourseExsist] = useState(false);
  const router = useRouter();
  const handleAddToWishlist = useAddToWishlist();
  const handleAddToCart = useAddToCart();

  const open = Boolean(courseName && String(courseName).trim() !== "");

  const handleViewCourse = (productId) => {
    router.push(`/course-details/${productId}`);
  };

  const closeSearch = useCallback(() => {
    setCourseName("");
  }, [setCourseName]);

  useEffect(() => {
    const GetAllCourses = localStorage.getItem("allCourses");
    if (!GetAllCourses) {
      setSearchedCourse([]);
      setCourseExsist(false);
      return;
    }
    const parsedAllCourses = JSON.parse(GetAllCourses);
    const q = String(courseName || "").trim().toLowerCase();
    if (q === "") {
      setSearchedCourse([]);
      setCourseExsist(false);
      return;
    }
    const filteredCourseTitles = parsedAllCourses.filter((course) =>
      course?.attributes?.title?.toLowerCase().includes(q)
    );
    setSearchedCourse(filteredCourseTitles);
    setCourseExsist(filteredCourseTitles.length > 0);
  }, [courseName]);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") closeSearch();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, closeSearch]);

  if (!open) return null;

  return (
    <section
      className="search-course fixed inset-0 top-16 z-[100] flex flex-col bg-slate-900/55 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-label="Search results"
    >
      <div className="flex shrink-0 items-center justify-between border-b border-emerald-200/30 bg-white/90 px-4 py-3 shadow-sm">
        <p className="text-sm font-medium text-slate-800">
          Results for{" "}
          <span className="font-semibold text-emerald-700">&ldquo;{String(courseName).trim()}&rdquo;</span>
        </p>
        <button
          type="button"
          onClick={closeSearch}
          className="rounded-lg px-3 py-1.5 text-sm font-medium text-slate-600 transition hover:bg-emerald-50 hover:text-emerald-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
        >
          Close
        </button>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
        <div className="cont-search mx-auto w-[min(100%,72rem)] px-4 py-6 pb-24">
          {courseExsist ? (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {searchedCourse.map((course) => (
                <article
                  className="card_box overflow-hidden rounded-xl border border-emerald-200 bg-white shadow-lg shadow-slate-900/10 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl focus-within:ring-2 focus-within:ring-emerald-500/70"
                  key={course.id}
                >
                  <div className="img">
                    <div className="course-overlay flex-col gap-4">
                      <div className="flex items-center">
                        <button
                          type="button"
                          className="rounded-full p-1 text-2xl text-white transition-colors hover:text-fuchsia-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                          aria-label={`Add ${course?.attributes?.title ?? "course"} to wishlist`}
                          onClick={() => handleAddToWishlist(course)}
                        >
                          <FaRegHeart className="heart" aria-hidden="true" />
                        </button>
                        <button
                          type="button"
                          className="rounded-full p-1 text-3xl text-white transition-colors hover:text-fuchsia-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                          aria-label={`Open ${course?.attributes?.title ?? "course"}`}
                          onClick={() => {
                            handleViewCourse(course.id);
                            closeSearch();
                          }}
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
                      aria-label={`Go to ${course?.attributes?.title ?? "course"} details`}
                      onClick={() => {
                        handleViewCourse(course.id);
                        closeSearch();
                      }}
                    >
                      {course?.attributes?.images?.data?.[0]?.attributes?.url ? (
                        <Image
                          src={course.attributes.images.data[0].attributes.url}
                          width={400}
                          height={300}
                          className="h-[220px] w-full object-cover transition duration-500 hover:scale-110"
                          alt={course?.attributes?.title ?? "Course image"}
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
                    onClick={() => {
                      handleViewCourse(course.id);
                      closeSearch();
                    }}
                  >
                    <h4 className="course_name line-clamp-2 text-base font-semibold text-slate-900">
                      {course?.attributes?.title}
                    </h4>
                    <div className="course_category mt-2 flex items-center justify-between gap-2 text-xs">
                      <div className="left flex items-center gap-2 text-slate-500">
                        <p aria-hidden="true">
                          <TbCategory2 />
                        </p>
                        <p>{course?.attributes?.category}</p>
                      </div>
                      <div className="right">
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
                    <div className="ratings flex items-center justify-between gap-2 pb-1 text-xs">
                      <span
                        className="icons flex items-center gap-1 text-slate-600"
                        aria-label={`Rating ${course.attributes.rating} out of 5`}
                      >
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
                        (
                        {course.attributes.rating % 1 === 0
                          ? course.attributes.rating + ".0"
                          : course.attributes.rating}
                        )
                      </span>
                      <button
                        type="button"
                        className="rounded-md px-2 py-1 text-xs font-medium text-emerald-700 transition-colors hover:bg-emerald-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleViewCourse(course.id);
                          closeSearch();
                        }}
                      >
                        Details
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="mx-auto flex max-w-md flex-col items-center rounded-2xl px-6 py-10 text-center">
              <div
                className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-600"
                aria-hidden="true"
              >
                <FaSearch className="text-2xl" />
              </div>
              <h3 className="text-lg font-semibold text-slate-100">No courses match</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-100">
                Try another keyword or browse all courses from the home page.
              </p>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={closeSearch}
                  className="rounded-lg border border-emerald-200 bg-white px-4 py-2 text-sm font-medium text-emerald-800 transition hover:bg-emerald-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                >
                  Clear search
                </button>
                <Link
                  href="/"
                  className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
                  onClick={closeSearch}
                >
                  Go home
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default SearchCourse;

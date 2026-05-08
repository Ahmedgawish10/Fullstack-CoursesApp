"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useAddToWishlist } from "../../_hooks/useAddToWishlist";

function SimilarCourses({ similarCourses }) {
  const router = useRouter();
  const handleAddToWishlist = useAddToWishlist();

  const handleViewCourse = (productId) => {
    router.push(`/course-details/${productId}`);
  };

  const formatRating = (r) => {
    if (r == null) return "—";
    return typeof r === "number" && r % 1 === 0 ? `${r}.0` : String(r);
  };

  if (!similarCourses?.length) {
    return (
      <p className="mt-2 text-cde-label-sm text-cde-on-surface-variant" role="status">
        No similar courses to show yet.
      </p>
    );
  }

  return (
    <div className="mt-4 grid grid-cols-1 gap-cde-gutter sm:grid-cols-2 lg:grid-cols-4">
      {similarCourses.map((course) => (
        <article
          className="group overflow-hidden rounded-xl border border-cde-outline-variant bg-white transition-all hover:shadow-lg"
          key={course.id}
        >
          <button
            type="button"
            className="relative block h-40 w-full overflow-hidden text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cde-primary"
            onClick={() => handleViewCourse(course.id)}
            aria-label={`Open ${course?.attributes?.title ?? "course"}`}
          >
            {course?.attributes?.images?.data?.[0]?.attributes?.url ? (
              <Image
                src={course.attributes.images.data[0].attributes.url}
                width={400}
                height={220}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                alt={course?.attributes?.title ?? "Course image"}
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-cde-surface-container text-cde-label-sm text-cde-on-surface-variant">
                No image
              </div>
            )}
            <span
              role="button"
              tabIndex={-1}
              className="absolute right-2 top-2 inline-flex size-9 items-center justify-center rounded-full bg-white/90 text-cde-primary shadow-sm backdrop-blur-sm transition hover:bg-white"
              onClick={(e) => {
                e.stopPropagation();
                handleAddToWishlist(course);
              }}
              onKeyDown={(e) => e.stopPropagation()}
              aria-label={`Add ${course?.attributes?.title ?? "course"} to wishlist`}
            >
              <span className="material-symbols-outlined text-xl">favorite</span>
            </span>
          </button>
          <div
            className="cursor-pointer space-y-2 p-4"
            onClick={() => handleViewCourse(course.id)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleViewCourse(course.id);
              }
            }}
            role="link"
            tabIndex={0}
          >
            <h3 className="line-clamp-1 text-cde-title-md text-cde-on-surface">
              {course?.attributes?.title}
            </h3>
            <p className="text-cde-label-sm text-cde-on-surface-variant">
              {course?.attributes?.Author ?? course?.attributes?.category}
            </p>
            <div className="flex items-center gap-1 text-cde-tertiary">
              <span className="font-bold">{formatRating(course.attributes.rating)}</span>
              <span
                className="material-symbols-outlined text-xs"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                star
              </span>
            </div>
            <p className="text-cde-title-md text-cde-on-background">
              {course.attributes.discount ? (
                <>
                  $
                  {Math.round(
                    course.attributes.price *
                      (1 - Number(course.attributes.discount) / 100) *
                      100
                  ) / 100}
                </>
              ) : course.attributes.price > 0 ? (
                <>${course.attributes.price}</>
              ) : (
                <>Free</>
              )}
            </p>
          </div>
        </article>
      ))}
    </div>
  );
}

export default SimilarCourses;

"use client";
import React, { useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Skeleton from "../../_components/Skeleton";
import { useAddToWishlist } from "../../_hooks/useAddToWishlist";
import { useAddToCart } from "../../_hooks/useAddToCart";

function learnBullets(text, category, title) {
  const fromDesc = String(text || "")
    .split("\n")
    .map((s) => s.trim())
    .filter((s) => s.length > 8);
  const pad = [
    `Covers ${category || "the main topics"}.`,
    `Based on: ${title}.`,
    "On-demand lessons.",
    "Learn at your pace.",
  ];
  return [...fromDesc, ...pad].slice(0, 4);
}

function AboutCourse({ SingleCourseDetails }) {
  const router = useRouter();
  const handleAddToWishlist = useAddToWishlist();
  const handleAddToCart = useAddToCart();

  const a = SingleCourseDetails?.attributes ?? {};
  const imageUrl = a.images?.data?.[0]?.attributes?.url;
  const title = a.title ?? "Course";
  const category = a.category ?? "";
  const author = a.Author ?? "";
  const disc = Number(a.discount);
  const hasDiscount = disc > 0;
  const listPrice = Number.isFinite(Number(a.price)) && Number(a.price) >= 0 ? Number(a.price) : null;
  const salePrice =
    hasDiscount && listPrice != null ? Math.round(listPrice * (1 - disc / 100) * 100) / 100 : listPrice;

  const description = a.description ?? "";
  const rating = a.rating;
  const learnBulletsList = learnBullets(description, category, title);

  const onBuyNow = useCallback(() => {
    if (!SingleCourseDetails?.id) return;
    handleAddToCart(SingleCourseDetails);
    router.push("/cart");
  }, [SingleCourseDetails, handleAddToCart, router]);

  const onShare = async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    try {
      if (navigator.share) await navigator.share({ title, url });
      else await navigator.clipboard.writeText(url);
    } catch {
      /* cancelled or unsupported */
    }
  };

  return (
    <div>
      {SingleCourseDetails?.id ? (
        <div className="mt-8 grid grid-cols-1 gap-cde-gutter md:grid-cols-12">
          <div className="space-y-8 md:col-span-8">
            <div className="overflow-hidden rounded-xl border border-cde-outline-variant bg-white">
              <div className="relative h-[240px] w-full sm:h-[320px] md:h-[400px]">
                {imageUrl ? (
                  <Image
                    src={imageUrl}
                    fill
                    className="object-fill"
                    alt={title}
                    sizes="(max-width: 768px) 100vw, 66vw"
                    priority
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-cde-surface-container text-cde-label-sm text-cde-on-surface-variant">
                    No image
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {category ? (
                  <span className="rounded-full bg-cde-primary-container px-3 py-1 text-cde-label-sm text-cde-on-primary-container">
                    {category}
                  </span>
                ) : null}
                {hasDiscount ? (
                  <span className="rounded-full bg-cde-secondary-container px-3 py-1 text-cde-label-sm text-cde-on-secondary-container">
                    {disc}% off
                  </span>
                ) : (
                  <span className="rounded-full bg-cde-secondary-container px-3 py-1 text-cde-label-sm text-cde-on-secondary-container">
                    Popular
                  </span>
                )}
              </div>
              <h1 className="text-cde-headline-mobile text-cde-on-background md:text-cde-display-xl">
                {title}
              </h1>
              <p className="text-cde-body-md leading-relaxed text-cde-on-surface-variant">
                {description}
              </p>
              {author ? (
                <p className="text-cde-label-sm text-cde-on-surface-variant">
                  Instructor: <span className="text-cde-on-surface">{author}</span>
                </p>
              ) : null}
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="rounded-xl border border-cde-outline-variant bg-white p-6 shadow-sm transition-all hover:shadow-md">
                <span className="material-symbols-outlined mb-2 text-2xl text-cde-primary">
                  timer
                </span>
                <h4 className="text-cde-title-md text-cde-on-surface">Self-paced</h4>
                <p className="text-cde-label-sm text-cde-on-surface-variant">On-demand video</p>
              </div>
              <div className="rounded-xl border border-cde-outline-variant bg-white p-6 shadow-sm transition-all hover:shadow-md">
                <span className="material-symbols-outlined mb-2 text-2xl text-cde-primary">
                  assignment
                </span>
                <h4 className="text-cde-title-md text-cde-on-surface">
                  {category || "Full curriculum"}
                </h4>
                <p className="text-cde-label-sm text-cde-on-surface-variant">Structured modules</p>
              </div>
              <div className="rounded-xl border border-cde-outline-variant bg-white p-6 shadow-sm transition-all hover:shadow-md">
                <span className="material-symbols-outlined mb-2 text-2xl text-cde-primary">
                  verified
                </span>
                <h4 className="text-cde-title-md text-cde-on-surface">Certificate</h4>
                <p className="text-cde-label-sm text-cde-on-surface-variant">
                  {rating != null
                    ? `Rated ${typeof rating === "number" && rating % 1 === 0 ? `${rating}.0` : rating} by learners`
                    : "Complete the course to earn recognition"}
                </p>
              </div>
            </div>

            <div className="space-y-6 pt-4">
              <h2 className="border-l-4 border-cde-primary pl-4 text-cde-headline-mobile text-cde-on-surface md:text-cde-headline-lg">
                What you&apos;ll learn
              </h2>
              <ul className="grid grid-cols-1 gap-x-8 gap-y-4 md:grid-cols-2">
                {learnBulletsList.map((line, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span
                      className="material-symbols-outlined shrink-0 text-xl text-cde-primary"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      check_circle
                    </span>
                    <span className="text-cde-body-md text-cde-on-surface">{line}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="md:col-span-4">
            <div className="max-md:static space-y-6 rounded-xl border border-cde-outline-variant bg-white p-6 shadow-md md:sticky md:top-[100px]">
              <div className="space-y-2">
                {hasDiscount && listPrice !== null ? (
                  <>
                    <div className="flex items-baseline gap-2">
                      <span className="text-cde-display-xl text-cde-on-background">
                        ${salePrice}
                      </span>
                      <span className="text-cde-body-md text-cde-on-surface-variant line-through">
                        ${listPrice}
                      </span>
                    </div>
                    <p className="text-cde-label-sm text-cde-error">
                      {disc}% off — limited-time price
                    </p>
                  </>
                ) : listPrice !== null && listPrice > 0 ? (
                  <div className="flex items-baseline gap-2">
                    <span className="text-cde-display-xl text-cde-on-background">
                      ${listPrice}
                    </span>
                  </div>
                ) : (
                  <div className="flex items-baseline gap-2">
                    <span className="text-cde-display-xl text-cde-on-background">Free</span>
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-3">
                {hasDiscount || (listPrice !== null && listPrice > 0) ? (
                  <>
                    <button
                      type="button"
                      className="w-full rounded-lg bg-cde-primary py-4 text-cde-title-md text-cde-on-primary shadow-sm transition-transform duration-150 active:scale-95"
                      onClick={() => handleAddToCart(SingleCourseDetails)}
                    >
                      Add to Cart
                    </button>
                    <button
                      type="button"
                      className="w-full rounded-lg bg-cde-tertiary-container py-4 text-cde-title-md text-cde-on-tertiary-container shadow-sm transition-transform duration-150 active:scale-95"
                      onClick={onBuyNow}
                    >
                      Buy Now
                    </button>
                  </>
                ) : (
                  <Link
                    href="/dashboard"
                    className="block w-full rounded-lg bg-cde-primary py-4 text-center text-cde-title-md text-cde-on-primary shadow-sm transition-transform duration-150 active:scale-95"
                  >
                    Go to course
                  </Link>
                )}
              </div>

              <div className="space-y-4 border-t border-cde-outline-variant pt-4">
                <p className="text-cde-title-md text-cde-on-surface">This course includes:</p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-cde-on-surface-variant">
                    <span className="material-symbols-outlined text-sm">all_inclusive</span>
                    <span className="text-cde-label-sm">Full lifetime access</span>
                  </div>
                  <div className="flex items-center gap-3 text-cde-on-surface-variant">
                    <span className="material-symbols-outlined text-sm">devices</span>
                    <span className="text-cde-label-sm">Access on mobile and desktop</span>
                  </div>
                  <div className="flex items-center gap-3 text-cde-on-surface-variant">
                    <span className="material-symbols-outlined text-sm">description</span>
                    <span className="text-cde-label-sm">Downloadable resources where available</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap justify-center gap-4 pt-2 sm:gap-6">
                <button
                  type="button"
                  className="flex items-center gap-1 text-cde-label-sm text-cde-primary hover:underline"
                  onClick={() => handleAddToWishlist(SingleCourseDetails)}
                >
                  <span className="material-symbols-outlined text-sm">favorite</span>
                  Wishlist
                </button>
                <button
                  type="button"
                  className="flex items-center gap-1 text-cde-label-sm text-cde-primary hover:underline"
                  onClick={onShare}
                >
                  <span className="material-symbols-outlined text-sm">share</span>
                  Share
                </button>
                <button
                  type="button"
                  className="flex items-center gap-1 text-cde-label-sm text-cde-primary hover:underline"
                  onClick={onShare}
                >
                  <span className="material-symbols-outlined text-sm">card_giftcard</span>
                  Gift
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-10">
          <Skeleton variant="detail" />
        </div>
      )}
    </div>
  );
}

export default AboutCourse;

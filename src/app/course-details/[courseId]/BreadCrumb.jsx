import React from 'react';
import Link from 'next/link';

function BreadCrumb() {
  return (
    <nav aria-label="Breadcrumb" className="flex flex-wrap">
      <ol className="flex overflow-hidden rounded-lg border border-emerald-200 bg-white/90 text-slate-600 shadow-sm">
        <li className="flex items-center">
          <Link
            href="/"
            className="flex h-10 items-center gap-1.5 bg-emerald-50 px-4 transition hover:bg-emerald-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-emerald-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>

            <span className="ms-1.5 text-xs font-medium text-slate-800">Home</span>
          </Link>
        </li>

        <li className="relative flex items-center">
          <span
            className="absolute inset-y-0 -start-px h-10 w-4 bg-emerald-50 [clip-path:_polygon(0_0,_0%_100%,_100%_50%)] rtl:rotate-180"
            aria-hidden="true"
          />

          <span className="flex h-10 items-center bg-white pe-4 ps-8 text-xs font-medium text-slate-700">
            Course Details
          </span>
        </li>
      </ol>
    </nav>
  );
}

export default BreadCrumb;

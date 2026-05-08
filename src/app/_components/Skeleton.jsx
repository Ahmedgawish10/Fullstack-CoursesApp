import React from 'react';

function CardSkeleton() {
  return (
    <article
      className="course-card-skeleton overflow-hidden rounded-xl border border-emerald-200/70"
      aria-hidden="true"
    >
      <div className="skeleton h-[220px] w-full rounded-none" />
      <div className="space-y-3 p-3">
        <div className="skeleton h-[18px] w-[92%] rounded-md" />
        <div className="flex items-center justify-between gap-2">
          <div className="skeleton h-[13px] w-[42%] rounded-md" />
          <div className="skeleton h-[22px] w-[68px] rounded-full" />
        </div>
        <div className="skeleton h-[11px] w-[36%] rounded-md" />
        <div className="flex items-center justify-between gap-2 pb-0.5 pt-1">
          <div className="skeleton h-[12px] w-24 rounded-md" />
          <div className="skeleton h-7 w-[52px] rounded-md" />
        </div>
      </div>
    </article>
  );
}

function DetailSkeleton() {
  return (
    <div className="space-y-8" aria-hidden="true">
      <div className="overflow-hidden rounded-xl border border-slate-200/90 bg-white shadow-sm">
        <div className="skeleton min-h-[240px] w-full sm:min-h-[320px] md:min-h-[400px]" />
      </div>
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          <div className="skeleton h-7 w-24 rounded-full" />
          <div className="skeleton h-7 w-20 rounded-full" />
        </div>
        <div className="skeleton h-10 max-w-2xl rounded-lg" />
        <div className="space-y-2.5">
          <div className="skeleton h-4 w-full rounded-md" />
          <div className="skeleton h-4 w-full rounded-md" />
          <div className="skeleton h-4 w-[90%] rounded-md" />
          <div className="skeleton h-4 w-[65%] rounded-md" />
        </div>
        <div className="skeleton h-4 w-48 rounded-md" />
      </div>
    </div>
  );
}

function BlockSkeleton() {
  return (
    <div className="skeleton h-[300px] w-full rounded-xl" aria-hidden="true" />
  );
}

/**
 * @param {'card' | 'detail' | 'block'} [variant='card'] — card grid, course detail page, or plain block
 */
function Skeleton({ variant = 'card' }) {
  if (variant === 'detail') return <DetailSkeleton />;
  if (variant === 'block') return <BlockSkeleton />;
  return <CardSkeleton />;
}

export default Skeleton;

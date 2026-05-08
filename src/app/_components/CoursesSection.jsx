"use client";

import React, { useEffect, useState } from 'react';
import CoursesList from './CoursesList';
import CoursesApis from "../_Utils/CoursesApis";
import Skeleton from './Skeleton';
import Link from 'next/link';
import "./style.css"

function CoursesSection() {
  const [lang, setLang] = useState("en");
  const [allCourses, setAllCourses] = useState([]);

  useEffect(() => {
    console.log(process.env.NEXT_PUBLIC_BASE_API_URL);
    const getAllCourses = async () => {
      try {
        const response = await CoursesApis.AllCourses(lang);
        console.log(response);
        setAllCourses(response?.data?.data)
        localStorage.setItem("allCourses", JSON.stringify(response?.data?.data))
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };
    getAllCourses();
  }, [lang]);

  return (
    <section className="courses_list container mx-auto mb-[5rem] sm:p-6" id="courses" aria-labelledby="courses-title">
      <div className="mt-2 flex items-center justify-between">
        <h2 id="courses-title" className="text-xl font-semibold text-slate-900 sm:text-2xl">Available Courses</h2>
        {allCourses?.length !== 0 ? (
          <Link
            href="/all-courses"
            className="rounded-md px-3 py-2 text-sm font-medium text-teal-700 transition-colors hover:bg-teal-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
            aria-label="View all available courses"
          >
            View All
          </Link>
        ) : null}
      </div>
      {allCourses.length === 0 ? (
        <div className="skeleton-media mt-4 grid gap-3" aria-live="polite" aria-busy="true">
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </div>
      ) : (
        <div className="mt-4 grid gap-3">
          <CoursesList allCourses={allCourses} />
        </div>
      )}
    </section>
  );
}

export default CoursesSection;

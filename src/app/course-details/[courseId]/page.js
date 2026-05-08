"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import CoursesApis from "../../_Utils/CoursesApis";
import BreadCrumb from "./BreadCrumb";
import AboutCourse from "./AboutCourse";
import SimilarCourses from "./SimilarCourses";
import "../../_components/style.css";
import "./CourseDetail.css";

function page({ params }) {
  const [SingleCourseDetails, setSingleCourseDetails] = useState("0");
  const [similarCourses, setSimilarCourses] = useState([]);

  useEffect(() => {
    const id = params?.courseId;
    if (!id) return;

    const load = async () => {
      try {
        const res = await CoursesApis.SingleCourse(id);
        const product = res?.data?.data;
        setSingleCourseDetails(product ?? "0");

        const cat = product?.attributes?.category;
        if (!cat) {
          setSimilarCourses([]);
          return;
        }

        const similarRes = await CoursesApis.getCoursesByCategory(cat);
        setSimilarCourses(similarRes?.data?.data ?? []);
      } catch (error) {
        console.error(error);
      }
    };

    load();
  }, [params?.courseId]);

  const categoryLabel = SingleCourseDetails?.attributes?.category;

  return (
    <div className="course-detail-page mx-auto mb-16 mt-16 max-w-[1280px] px-5 text-cde-on-surface md:px-16">
      <BreadCrumb />
      <AboutCourse SingleCourseDetails={SingleCourseDetails} />
      <section className="mt-16 space-y-8 sm:mt-20" aria-labelledby="similar-courses-heading">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <h2
            id="similar-courses-heading"
            className="text-cde-headline-mobile text-cde-on-surface md:text-cde-headline-lg"
          >
            Similar Courses
          </h2>
          {categoryLabel ? (
            <Link
              href="/"
              className="text-cde-label-sm text-cde-primary hover:underline"
            >
              Explore more in {categoryLabel}
            </Link>
          ) : (
            <Link href="/" className="text-cde-label-sm text-cde-primary hover:underline">
              View all courses
            </Link>
          )}
        </div>
        <SimilarCourses
          similarCourses={similarCourses}
          currentCourseId={SingleCourseDetails?.id}
        />
      </section>
    </div>
  );
}

export default page;

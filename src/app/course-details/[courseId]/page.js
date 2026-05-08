"use client"
import React, { useState, useEffect } from 'react'
import CoursesApis from "../../_Utils/CoursesApis"
import BreadCrumb from './BreadCrumb';
import AboutCourse from './AboutCourse';
import SimilarCourses from './SimilarCourses';
import "../../_components/style.css";
import "./CourseDetail.css";

function page({ params }) {
  const [SingleCourseDetails, setSingleCourseDetails] = useState("0");
  const [similarCourses, setSimilarCourses] = useState([]);

  useEffect(() => {
    const getAllCourses = async () => {
      try {
        const response = await CoursesApis.SingleCourse(params.courseId);
        setSingleCourseDetails(response.data.data);
        getCoursesByCategory(response?.data?.data)
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };
    getAllCourses();
  }, []);

  const getCoursesByCategory = (product) => {
    CoursesApis.getCoursesByCategory(product?.attributes?.category).then((res) => {
      setSimilarCourses(res.data.data)
    })
  }

  return (
    <div className="course-detail-page container mx-auto mb-16 mt-16 max-w-6xl px-4 sm:px-6">
      <BreadCrumb />
      <AboutCourse SingleCourseDetails={SingleCourseDetails} />
      <section className="mt-12 sm:mt-16" aria-labelledby="similar-courses-heading">
        <h2 id="similar-courses-heading" className="text-xl font-semibold text-slate-900 sm:text-2xl">
          Similar Courses
        </h2>
        <SimilarCourses similarCourses={similarCourses} />
      </section>
    </div>
  )
}

export default page

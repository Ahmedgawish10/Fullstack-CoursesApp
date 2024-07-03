"use client"
import React,{ useState, useEffect } from 'react';
import { FaUserCheck, FaRegHeart } from "react-icons/fa";
import { RiMenuFold2Line } from "react-icons/ri";
import { IoMdCart, IoIosEye } from "react-icons/io";
import { ImFire } from "react-icons/im";
import Skeleton   from "../../_components/Skeleton";
import CoursesApis from "../../_Utils/CoursesApis";

function AboutCourse({ SingleCourseDetails }) {

  // console.log(SingleCourseDetails)

  // useEffect(() => {
  //   const getAllCourses = async () => {
  //     try {
  //       const response = await CoursesApis.getCoursesByCategory("Front-End");
  //       setProductByCategory(response.data.data);
  //       console.log(response?.data?.data);
  //     } catch (error) {
  //       console.error('Error fetching courses:', error);
  //     }
  //   };
  //   getAllCourses();
  // }, []);
        



  return (
    <div>
      {SingleCourseDetails?.id?(
      <div className="about_course mt-[4rem] grid grid-cols-1 custom-md:grid-cols-2 gap-4 ">
        {/* Course Image */}
        <div className="img">
          <div className="course-overlay flex-col">
            <div className="flex items-center">
              <FaRegHeart className="text-2xl hover:cursor-pointer mb-2 me-2 text-[#fff] heart" />
              <IoIosEye className="text-3xl hover:cursor-pointer mb-2 text-[#fff] eye" />
            </div>
            {SingleCourseDetails.attributes?.discount ? (
              <button className="button-85 flex mt-5" role="button">
                <span>
                  <IoMdCart className="text-2xl hover:cursor-pointer me-2" />
                </span>
                <span>Add to Cart</span>
              </button>
            ) : (
              <button className="button-85 flex mt-5" role="button">
                <span>
                  <ImFire className="text-2xl hover:cursor-pointer me-2" />
                </span>
                <span>Content of Course</span>
              </button>
            )}
          </div>
          {SingleCourseDetails.attributes?.images.data.attributes.url && (
            <img src={SingleCourseDetails?.attributes?.images?.data?.attributes?.url} className="w-[100%] h-[400px]" alt="Course Image"/>
          )}
        </div>
        {/* Course Info */}
        <div className="content">
          <div className="course_info mt-[3rem]">
            <div className="course_title text-[20px]">{SingleCourseDetails?.attributes?.title}</div>
            <div className="course_category text-gray-500 text-[16px] flex items-center space-x-1">
              <span><RiMenuFold2Line /></span>
              <span>{SingleCourseDetails?.attributes?.category}</span>
            </div>
            <div className="course_description text-[13px] pt-3">
              {SingleCourseDetails?.attributes?.description}
            </div>
            <div className="course_description text-[12px] text-gray-500 pt-3 font-medium flex items-center space-x-1">
              <span>
                <FaUserCheck className="text-[#B9921F] text-[18px]" />
              </span>
              <span>
                {SingleCourseDetails?.attributes?.Author}
              </span>
            </div>
            {SingleCourseDetails?.attributes?.discount ? (
              <div>
                <div className="pt-[1rem]">$ {SingleCourseDetails?.attributes?.price}</div>
                <button className="button-85 flex mt-2" role="button">
                  <span>
                    <IoMdCart className="text-2xl hover:cursor-pointer me-2" />
                  </span>
                  <span>Add to Cart</span>
                </button>
              </div>
            ) : (
              <button className="button-85 flex mt-5" role="button">
                <span>
                  <ImFire className="text-2xl hover:cursor-pointer me-2" />
                </span>
                <span>Free Now</span>
              </button>
            )}
          </div>
        </div>

      </div>
      
    
    ):(
               <div className="mt-[4rem]">
                <Skeleton/>
               </div>

      )}
    </div>
  );
}

export default AboutCourse;

"use client";

import React, { useEffect, useState } from 'react';
import CoursesList from './CoursesList';
import CoursesApis from "../_Utils/CoursesApis";
import PaginationControls from './PaginationControls';

import Skeleton from './Skeleton';
import Link from 'next/link';
import { usePathname } from 'next/navigation'
import { useRouter, useSearchParams } from 'next/navigation'
import "./style.css"

function CoursesSection() {
  const router = usePathname();
  const [lang, setLang] = useState("en");

  const handleLangChange = (e) => {
    const lang1 = e.target.value;
    setLang(lang1)
    console.log(lang)
   // window.location.href = `/?lang=${lang}`;
    
  };

  const [allCourses, setAllCourses] = useState([]);
//          const searchParams =useSearchParams()  ; 


  useEffect(() => {
    const getAllCourses = async () => {
      try {
            const response = await CoursesApis.AllCourses(lang);
                setAllCourses(response?.data?.data)
                   localStorage.setItem("allCourses",JSON.stringify(response?.data?.data))              
                    } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };
    getAllCourses();
  }, [lang]);
                    
  

//  const entries = allCourses.slice(start, end)
//        console.log(page);
  return (
    <div className='courses_list mb-[5rem]' style={{ width: "90%", marginLeft: "auto", marginRight: "auto" }} id="courses">
      <div className="flex justify-between mt-5">
        <h3 className="mb-[5px] mt-[10px]">Available Courses</h3>
        <h3 className="mb-[5px] mt-[10px] text-teal-600">{allCourses?.length !== 0 ?
         <Link href="/all-courses">
          <h3 className="mb-[12px] text-teal-600 cursor-pointer">View All</h3>
        </Link>
        :""}</h3>
      </div>
      {allCourses.length === 0 ? (
        <div className="grid gap-3 skeleton-media ">
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />

        </div>
      ) : (
        <div className="grid gap-3">
          <CoursesList allCourses={allCourses} />
        </div>
      )}
    </div>
  );
}

export default CoursesSection;

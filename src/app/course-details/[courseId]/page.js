"use client"
import React,{useState,useEffect} from 'react'
import CoursesApis   from "../../_Utils/CoursesApis"
import BreadCrumb from './BreadCrumb';
import AboutCourse from './AboutCourse';
import SimilarCourses from './SimilarCourses';

import "./CourseDetail.css";
function page({params}) {


const [SingleCourseDetails,setSingleCourseDetails]=useState("0");
const [similarCourses, setSimilarCourses] = useState([]);

    useEffect(() => {
        const getAllCourses = async () => {
          try {
            const response = await CoursesApis.SingleCourse(params.courseId);
            setSingleCourseDetails(response.data.data);
            getCoursesByCategory(response?.data?.data)
            // console.log(response?.data?.data);
          } catch (error) {
            console.error('Error fetching courses:', error);
          }
        };
        getAllCourses();
      }, []);

      const getCoursesByCategory =  (product) => {
          CoursesApis.getCoursesByCategory(product?.attributes?.category).then((res)=>{
            //  console.log(res.data.data);
            setSimilarCourses(res.data.data)

          })
        } 
  

 
  return (
    <div className="w-[90%] mx-auto mt-[3rem]  mt-[64px]">

      <BreadCrumb/>

      <AboutCourse SingleCourseDetails={SingleCourseDetails}/>
      
      <div className="mt-[4rem]">

         <h2>Similar Courses </h2>
      <SimilarCourses  similarCourses={similarCourses}/> 

      </div>



    
    
    </div>
  )
}

export default page


"use client"
import React,{useState,useEffect} from 'react'
import { FaRegHeart } from "react-icons/fa";
import { IoIosEye, IoMdCart } from "react-icons/io";
import { TbCategory2 } from "react-icons/tb";
import { RiStarSLine } from "react-icons/ri";
import { ImFire } from "react-icons/im";
import { toast } from 'react-hot-toast';
import Link from 'next/link';
import CoursesApis from "../_Utils/CoursesApis";
import CartApis from "../_Utils/CartApis";
import { useUser } from '@clerk/nextjs';
import { useSelector, useDispatch } from 'react-redux'
import { addToCart } from "../_redux/CartSlice";
import { getcount } from "../_redux/CartSlice";
import { useRouter } from 'next/navigation';

const ComponentA = ({ courseName,setCourseName }) => {
  const [searchedCourse, setSearchedCourse] = useState([]);
  const [courseExsist,setCourseExsist] = useState(false);
 const router = useRouter();
  const { user } = useUser();
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleClick = (productId) => {
    router.push(`/course-details/${productId}`);
  };

  const handleAddToCart = (course) => {   
    const existingItem = cart.find(myCourse => myCourse.attributes.courseId === course?.id);
    if (existingItem) {
   toast.loading(`Your ${course?.attributes?.title} already in Cart`,{duration:2000}); 
    } else {
   if(user){
   toast.success(`Your ${course?.attributes?.title} added to Cart`); 
      const addToCartData = {
        data: {
          userName: user.fullName,
          email: user.primaryEmailAddress.emailAddress,
          courses: [course?.id],
          courseId: course?.id
        }
      };
      dispatch(addToCart(addToCartData));
}else{
   toast.error(`Your Are not Logged in`); 
    return null;
}
    }
  };
    
    
    
    
   useEffect(()=>{
const GetAllCourses = localStorage.getItem('allCourses');
if (GetAllCourses) {
  const parsedAllCourses = JSON.parse(GetAllCourses);
     if(!courseName==''){
       const filteredCourseTitles = parsedAllCourses
        .filter(course => course?.attributes?.title?.toLowerCase().includes(courseName)) 
                setSearchedCourse(filteredCourseTitles)
                if(filteredCourseTitles.length==0){
                 setCourseExsist(false);
                }else{
                  setCourseExsist(true);
                }
                }else{
                setSearchedCourse([]);
                setCourseExsist(false);

                
                }
    
} else {
  console.log('No data found in localStorage');
}    
   },[courseName])
    
  return (
    <section className={!courseName==""?" search-course fixed  top-[64px] text-white w-[98vw] h-[100vh] bg-[#000] overflow-y-auto":"hidden"}>
              <div className="cont-search  w-[90%] m-auto  z-10 mb-[150px] xl:w-[60%]">
{courseExsist?(
   <>
     {searchedCourse.map((course) => (
        <div className="card_box  p-2 border border-[#33dd9f] mt-[3rem]" key={course.id} >
          {/* course image */}
          <div className="img">
            <div className="course-overlay flex-col">
              <div className="flex items-center">
                <FaRegHeart
                  className="text-2xl hover:cursor-pointer mb-2 me-2 text-[#fff] heart"
                  onClick={() => { handleClick(course.id) }}
                />
                <IoIosEye
                  className="text-3xl hover:cursor-pointer mb-2 text-[#fff] eye"
                  onClick={() => { handleClick(course.id);setCourseName("") }}
                />
              </div>
              {course.attributes.discount ? (
                <button className="button-85 flex mt-5" role="button" onClick={() => handleAddToCart(course)}>
                  <span>
                    <IoMdCart className="text-2xl hover:cursor-pointer me-2" />
                  </span>
                  <span >Add to Cart</span>
                </button>
              ) : (
                <button className="button-85 flex mt-5" role="button" onClick={() => { handleClick(course.id) }}>
                  <span>
                    <ImFire className="text-2xl hover:cursor-pointer me-2" />
                  </span>
                  <span>Free Now</span>
                </button>
              )}
            </div>
            <img
              src={course?.attributes?.images?.data?.attributes?.url}
         
              className="transform hover:scale-150 transition duration-300 w-[100%] h-[300px]"
              alt="Course Image"
            />
          </div>
          <div className="content hover:cursor-pointer bg-[#29261b78]" onClick={() => { handleClick(course.id) }}>
            {/* title course */}
            <div className="course_name ps-2 pt-3 line-clamp-1">
              {course?.attributes?.title}
            </div>
            {/* category */}
            <div className="course_category flex justify-between items-center gap-2 ps-2 pe-2 text-xs">
              <div className="left flex items-center gap-2 pt-1 pb-1 text-gray-500">
                <p><TbCategory2 /></p>
                <p>{course?.attributes?.category}</p>
              </div>
              <div className="right ps-e text-black-800">
                <div className="bg-[#29261b78] p-1 ">
                  {course.attributes.discount ? course.attributes.discount + '%' : ""} 
                  <span>free</span>
                </div>
              </div>
            </div>
            <div className="text-gray-500 text-xs ps-2 owner-course mb-1">{course?.attributes?.Author}</div>
            {/* ratings */}
            <div className="ratings flex justify-between items-center gap-2 ps-2 pe-2 text-xs pb-5">
              <span className="icons flex items-center gap-1">
                {course?.attributes?.rating >= 4 ? (
                  <div className="flex text-yellow-500">
                    <RiStarSLine />
                    <RiStarSLine />
                    <RiStarSLine />
                    <RiStarSLine />
                  </div>
                ) : (
                  <div className="flex text-yellow-500">
                    <RiStarSLine />
                    <RiStarSLine />
                    <RiStarSLine />
                  </div>
                )}
                ({course.attributes.rating % 1 === 0 ? course.attributes.rating + '.0' : course.attributes.rating})
              </span>
            </div>
          </div>
        </div>
      ))}
           
    
    
    
    </>
    
    
    
    
):(
  <div className="text-center py-4">
                    <p className="mb-5">Course not found.</p>
                    <Link href="/" className="button-89 " onClick={()=>setCourseName("")}>Go Home</Link>
                  </div>

)}
             </div>

            
                
        </section>
  );
};

export default ComponentA;
                
                
                
                
                
                
                
                
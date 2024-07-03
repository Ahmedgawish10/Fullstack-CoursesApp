import React from 'react'
import { useRouter } from 'next/navigation';
import { IoIosEye, IoMdCart } from "react-icons/io";
import { FaRegHeart } from "react-icons/fa";
import { ImFire } from "react-icons/im";
import { TbCategory2 } from "react-icons/tb";
import { RiStarSLine } from "react-icons/ri";
import Image from 'next/image';

function SimilarCourses({similarCourses}) {
   console.log(similarCourses)

    const handleClick = (productId) => {
        router.push(`/course-details/${productId}`);
      };
  return (
    <div className='card_courses grid grid-cols-1  md:grid-cols-2 gap-3 p-2 container_courses pb-[5rem]'> 
           
     {similarCourses.map((course) => (
        <div className="card_box p-2 border border-[#33dd9f]" key={course.id}>
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
                  onClick={() => { handleClick(course.id) }}
                />
              </div>
              {course.attributes.discount ? (
                <button className="button-85 flex mt-5" role="button">
                  <span>
                    <IoMdCart className="text-2xl hover:cursor-pointer me-2" />
                  </span>
                  <span>Add to Cart</span>
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
            <Image
              src={course?.attributes?.images?.data?.attributes?.url}
              width={200}
              height={300}
              className="transform hover:scale-150 transition duration-300"
              alt="Course Image"
              priority={true}
            />
          </div>
          <div className="content hover:cursor-pointer" onClick={() => { handleClick(course.id) }}>
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
                <div className="bg-green-300 p-1 ">
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
      ))}      </div>
  )
}

export default SimilarCourses
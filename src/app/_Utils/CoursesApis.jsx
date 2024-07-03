
import axiosFront from "./axiosFront";

const AllCourses=(lang)=>axiosFront.get(`/courses?locale=${'en'}&populate=*`)
// http://localhost:1337/api/courses?locale=ar&populate=*
const SingleCourse=(i)=>axiosFront.get(`/courses/${i}/?populate=*`)

 const getCoursesByCategory=(category)=>axiosFront.get(`/courses?filters[category][$eq]=${category}&populate=*`)

const Lang = (locale = 'en') => {
    return axiosFront.get(`/courses/?locale=${locale}&populate=*`);
  };

export default {
    AllCourses,
    SingleCourse,
    Lang,
    getCoursesByCategory
}
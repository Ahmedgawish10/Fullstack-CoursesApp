import axiosFront from "./axiosFront";

const AllCourses = (locale = "en") =>
  axiosFront.get(`/courses`, { params: { locale, populate: "*" } });
const SingleCourse = (i) =>
  axiosFront.get(`/courses/${i}`, {
    params: { populate: "*", locale: "en" },
  });

const getCoursesByCategory = (category) =>
  axiosFront.get(`/courses`, {
    params: {
      locale: "en",
      populate: "*",
      "filters[category][$eq]": category,
    },
  });

const Lang = (locale = "en") => {
  return axiosFront.get(`/courses/?locale=${locale}&populate=*`);
};

const createCourse = (payload) => axiosFront.post("/courses", payload);

const uploadCourseImage = (formData) =>
  axiosFront.post("/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export default {
  AllCourses,
  SingleCourse,
  Lang,
  getCoursesByCategory,
  createCourse,
  uploadCourseImage,
};

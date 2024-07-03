"use client";
import React from "react";

import CardCourse from "./CardCourse"

function CoursesList({ allCourses }) {
    return (
      
             <CardCourse  allCourses={allCourses} />

    );
}

export default CoursesList;

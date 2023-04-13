import Link from "next/link";
import React from "react";

const CourseCard = ({ course }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img src={course.image} alt={course.title} className="h-48 w-full object-cover" />
      <div className="px-4 py-2">
        <h2 className="text-lg text-black font-bold mb-2">{course.title}</h2>
        <p className="text-gray-600 mb-4">{course.instructor}</p>
        <div className="flex items-center justify-between">
          <p className="text-gray-700 font-bold">${course.price}</p>
          <Link href="/Coursedetail">
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
          View Courses
          </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;

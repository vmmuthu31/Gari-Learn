import React from "react";
import CourseCard from "./components/CourseCard";
import Header from "./components/Header";

const courses = [
  {
    id: 1,
    title: "Introduction to Blockchain",
    instructor: "Gyan",
    subject: "Blockchain",
    price: 50,
    href: "/JoinClass",
    image: "https://blogger.googleusercontent.com/img/a/AVvXsEhQMke_x7-AtkveJlVApKPWJtYG2BQf7RxjF_R7Tl0gt4lfx9yLcRuKlrfmyZ5e3cJDSrnW9oP1Ov2x65ySOU-6d5HFNb4lbWIkhfqe1DqTS4KUbqHh7a1GdK_m_4yBHlXAT35_DiRRczyvtWiVHWqlO9WDRtEODUAssXirMe5ogMA79KpQ76-R4iKt",
  },
  {
    id: 2,
    title: "Machine Learning for Beginners",
    instructor: "Smith",
    subject: "Artificial Intelligence",
    price: 75,
    href: "/JoinClass2",
    image: "https://source.unsplash.com/random/400x250",
  },
  // Add more courses as needed
];

const CourseCatalog = () => {
  return (
    <>
    <Header />
    <div className="container px-20 mx-auto py-32">
      <h1 className="text-3xl font-bold mb-8">Browse Courses</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
    </>
  );
};

export default CourseCatalog;

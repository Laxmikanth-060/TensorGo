import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./ActiveCourses.css";
import getRegisteredCourseByUserId from "../../../utils/getRegisteredCoursesByUserId.js";

const ActiveCourses = ({ userId }) => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchRegisteredCourses = async () => {
      try {
        const registeredCourses = await getRegisteredCourseByUserId(userId);
        // console.log(registeredCourses);

        setCourses(
          registeredCourses.filter(
            (course) => course != null || course != undefined
          )
        );
      } catch (error) {
        console.error("Error fetching registered courses:", error);
      }
    };

    if (userId) {
      fetchRegisteredCourses();
    }
  }, [userId]);

  if (courses.length === 0) {
    return <p className="active-courses__no-courses">No active courses.</p>;
  }
  return (
    <div className="active-courses-container">
      <h2 className="active-courses-header">Active Courses</h2>
      <ul className="active-courses-list">
        {courses.map((course) => (
          <Link
            to={`/p/course/${course?._id}`}
            key={course?._id}
            className="active-course-card"
          >
            <img
              src={course.coverImage}
              alt={course.title + " Image"}
              className="active-course-image"
            />
            <h3 className="active-course-title">{course.title}</h3>
            <p className="active-course-description">
              {course.description.substring(0, 100)}...
            </p>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default ActiveCourses;

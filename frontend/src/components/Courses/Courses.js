import React, { useState, useEffect, useCallback } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./Courses.module.css";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import CourseCard from "./CourseCard";
import getAllCourses from "../../utils/getAllCourses";

const RecommendedCourses = ({ courses, enrolledCourses }) => {
  // Sort courses by enrollmentsCount in descending order
  const sortedCourses = courses.sort(
    (a, b) => b.enrollmentsCount - a.enrollmentsCount
  );
  const filteredCourses = sortedCourses.filter(
    (course) => !enrolledCourses.includes(course._id)
  );

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <FaArrowRight className={styles.arrow} />,
    prevArrow: <FaArrowLeft className={styles.arrow} />,
    centerMode: true,
    centerPadding: "25px",
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className={styles.recommendedCoursesContainer}>
      <h2 className={styles.sectionHeading}>Recommended for you</h2>
      <Slider {...settings} className={styles.carouselContainer}>
        {filteredCourses.map((eachCourse) => {
          return (
            <Link
              to={`/courses/${eachCourse._id}`}
              className={styles.courseCardLinkContainer}
              key={eachCourse._id}
              marketingCourses={filteredCourses}
            >
              <CourseCard courseDetails={eachCourse} />
            </Link>
          );
        })}
      </Slider>
    </div>
  );
};

const Courses = () => {
  const [coursesList, setCoursesList] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filteredCoursesList, setFilteredCoursesList] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      const courses = await getAllCourses();
      setCoursesList(courses);
      setEnrolledCourses([6, 3]);
    };
    fetchCourses();
  }, []);

  const filterData = useCallback(() => {
    const filteredList = coursesList.filter((eachCourse) =>
      eachCourse.title.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredCoursesList(filteredList);
  }, [coursesList, searchText]);

  useEffect(() => {
    filterData();
  }, [coursesList, searchText, filterData]);

  return (
    <div className={styles.coursesBgContainer}>
      <div className={styles.coursesBannerContainer}>
        <div className={styles.coursesBannerSearchContainer}>
          <input
            type="search"
            placeholder="Search your favourite Course..."
            className={styles.courseBannerSearch}
            onChange={(e) => setSearchText(e.target.value)}
            value={searchText}
          />
          <button
            className={`${styles.courseBannerSearchButton} d-md-none`}
            type="button"
            onClick={filterData}
          >
            <IoSearch />
          </button>
          <button
            className={`${styles.courseBannerSearchButton} d-none d-md-block`}
            type="button"
            onClick={filterData}
          >
            Search
          </button>
        </div>
      </div>
      <div className={styles.coursesMiddleContainer}>
        <ul className={styles.coursesContainer}>
          {filteredCoursesList.map((eachCourse) => (
            <Link
              to={`/courses/${eachCourse._id}`}
              className={styles.courseCardLinkContainer}
              key={eachCourse._id}
            >
              <CourseCard courseDetails={eachCourse} />
            </Link>
          ))}
        </ul>
        <div
          className={`${styles.knowAboutLearningPlatformContainer} d-flex flex-column align-items-center flex-md-row`}
        >
          <div className={styles.knowAboutLeftContainer}>
            <h1 className={styles.instructorsHighlightsHeading}>
              Know about Learning Platform
            </h1>
            <ul className={styles.instructorsHighlightsItems}>
              <li>Top instructors from around world</li>
              <li>Top courses from our team</li>
            </ul>
            <Link to="/">
              <button className={styles.startLearningNowButton} type="button">
                Start learning now
              </button>
            </Link>
          </div>
          <div className={styles.knowAboutImageContainer}>
            <img
              src="https://i.ibb.co/805RL6P/instructors.png"
              alt="top instructors"
              className={styles.instructorsHighlightsImage}
            />
          </div>
        </div>
        {coursesList && (
          <RecommendedCourses
            courses={coursesList}
            enrolledCourses={enrolledCourses}
          />
        )}
      </div>
    </div>
  );
};

export default Courses;

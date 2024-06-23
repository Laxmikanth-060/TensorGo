import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./Courses.module.css";
import CoursesData from "../../utils/CoursesData";
import { IoMdTime } from "react-icons/io";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { MdOutlineStarOutline, MdStarHalf, MdStarRate } from "react-icons/md";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Link } from "react-router-dom";

const CourseCard = (props) => {
  const { courseDetails } = props;
  const {
    courseImageUrl,
    duration,
    name,
    description,
    instructorName,
    instructorPhotoUrl,
    price,
    discountInPercentage,
    rating,
  } = courseDetails;

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(<MdStarRate key={`full${i}`} />); // Full star
    }

    if (halfStar) {
      stars.push(<MdStarHalf key="half" />); // Half star
    }

    for (let i = 0; i < emptyStars; i++) {
      stars.push(<MdOutlineStarOutline key={`empty${i}`} />); // Empty star
    }

    return stars;
  };

  return (
    <li className={styles.courseCard}>
      <img
        src={courseImageUrl}
        alt={name + " Image"}
        className={styles.courseCardImageUrl}
      />
      <div className={styles.coursesRatingDurationContainer}>
        <div className={styles.courseCardRatingContainer}>
          <div className={styles.courseCardStars}>{renderStars(rating)}</div>
          <p className={styles.courseCardRatingText}>{rating}</p>
        </div>
        <div className={styles.coursesDurationContainer}>
          <IoMdTime />
          <p className={styles.courseDurationText}>
            {duration % 30 === 0
              ? `${duration / 30} Months`
              : `${duration} Days`}
          </p>
        </div>
      </div>
      <h1 className={styles.courseName}>{name}</h1>
      <p className={styles.courseDescription}>{description}</p>
      <div className={styles.courseCardFooterContainer}>
        <div className={styles.courseCardInstructorContainer}>
          <img
            src={instructorPhotoUrl}
            alt="Instructor"
            className={styles.courseCardInstructorImage}
          />
          <p className={styles.courseCardInstructorName}>{instructorName}</p>
        </div>
        <div className={styles.courseCardPriceContainer}>
          {discountInPercentage === 0 ? (
            <h1 className={styles.courseCardDiscountPrice}>&#8377;{price}</h1>
          ) : (
            <div className={styles.courseCardPriceContainer}>
              <h1 className={styles.courseCardRegularPrice}>&#8377;{price}</h1>
              <h1 className={styles.courseCardDiscountPrice}>
                &#8377;
                {price - (price * discountInPercentage) / 100}
              </h1>
            </div>
          )}
        </div>
      </div>
    </li>
  );
};

const RecommendedCourses = ({ courses, enrolledCourses }) => {
  // Sort courses by enrollmentsCount in descending order
  const sortedCourses = courses.sort(
    (a, b) => b.enrollmentsCount - a.enrollmentsCount
  );
  const filteredCourses = sortedCourses.filter(
    (course) => !enrolledCourses.includes(course.id)
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
              to={`/courses/${eachCourse.id}`}
              className={styles.courseCardLinkContainer}
              key={eachCourse.id}
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
  const [filteredCoursesList, setfilteredCoursesList] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  useEffect(() => {
    const courses = CoursesData();
    setCoursesList(courses);
    setEnrolledCourses([6, 3]);
  }, [coursesList]);

  const filterData = () => {
    const filteredList = coursesList.filter((eachCourse) =>
      eachCourse.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setfilteredCoursesList(filteredList);
  };

  useEffect(() => {
    filterData();
  }, [coursesList, searchText]);

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
              to={`/courses/${eachCourse.id}`}
              className={styles.courseCardLinkContainer}
              key={`${eachCourse._id}`}
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

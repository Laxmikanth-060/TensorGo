import React, { useState, useEffect, useContext } from "react";
import "./CoursePage.css";
import axios from "axios";
import getCourseById from "../../utils/getCourseById";
import { useParams, Link, useNavigate } from "react-router-dom";
import ReactPlayer from "react-player";
import Loader from "../shared/Loader";
import {
  MdDelete,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdOndemandVideo,
  MdOutlineVideoLibrary,
} from "react-icons/md";
import { UserContext } from "../../context/UserContext";
import getRegisteredCourseByUserId from "../../utils/getRegisteredCoursesByUserId.js";
import RippleButton from "../../utils/Buttons/RippleButton";
import CourseReviewComponent from "./CourseReviewComponent";

const CoursePage = () => {
  const url = "http://localhost:1234";
  const { courseId } = useParams();
  const { user } = useContext(UserContext);
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [courseData, setCourseData] = useState([]);
  const [currentVideo, setCurrentVideo] = useState("");
  const [modules, setModules] = useState([]);
  const [price, setPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [rating, setRating] = useState(0);
  const [activeModule, setActiveModule] = useState(null);
  const [isRegistered, setIsRegistered] = useState(false);
  const [driveFolderId, setDriveFolderId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the course data
    const fetchCourseData = async () => {
      const courseData = await getCourseById(courseId);
      // console.log(courseData);
      if (courseData) {
        setCourseData(courseData);
        setModules(courseData.modules);
        setPrice(courseData.pricingInfo?.price);
        setDiscount(courseData.pricingInfo?.discount);
        setTitle(courseData.title);
        setDescription(courseData.description);
        setCoverImage(courseData.coverImage);
        setRating(courseData.rating);
        setCurrentVideo(courseData?.modules[0]?.videosList[0]?.videoUrl);
        setDriveFolderId(courseData.driveFolderId);
      }
      // console.log(courseData);
    };
    fetchCourseData();
    const fetchRegisteredCourses = async () => {
      if (user) {
        try {
          const registeredCourses = await getRegisteredCourseByUserId(user._id);
          const isUserRegistered = registeredCourses.some(
            (course) => String(course._id) === String(courseId)
          );
          setIsRegistered(isUserRegistered);
        } catch (error) {
          console.error("Error fetching registered courses:", error);
        }
      }
    };
    fetchRegisteredCourses();
    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          `${url}/courses/${courseId}/getreviews`,
          {
            withCredentials: true,
          }
        );
        setReviews(response.data);
        if (response.data.length > 0) {
          const total = response.data.length;
          const avgRating =
            response.data.reduce((acc, review) => acc + review.rating, 0) /
            total;
          setTotalReviews(total);
          setAverageRating(avgRating);
        }
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };
    fetchReviews();
  }, [courseId, user]);

  const renderStars = (rating) => {
    return [...Array(5)].map((_star, index) => (
      <span key={index} className={`star ${rating > index ? "filled" : ""}`}>
        ★
      </span>
    ));
  };

  const toggleModule = (idx) => {
    setActiveModule(activeModule === idx ? null : idx);
  };

  // const deleteCourse = async () => {
  //   try {
  //     // console.log("Hoi");

  //     const response = await axios.delete(
  //       `${process.env.REACT_APP_BACKEND_URL}/courses/delete/${courseId}`
  //     );
  //     alert("Course deleted successfully!");
  //     navigate("/courses");
  //   } catch (e) {
  //     alert("Unable to delete the course. Try again later!");
  //   }
  // };
  const deleteCourse = async () => {
    try {
      //console.log("The drive id is :", driveFolderId);
      const driveResponse = await axios.delete(
        `${process.env.REACT_APP_BACKEND_URL}/gDrive/delete-folder/${driveFolderId}`
      );
      const response = await axios.delete(
        `${process.env.REACT_APP_BACKEND_URL}/courses/delete/${courseId}`
      );
      alert("Course deleted successfully!");
      navigate("/courses")
    } catch (e) {
      alert("Unable to delete the course!");
    }
  };

  if (courseData.length === 0) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  return (
    <div className="course-page">
      <div className="course-banner">
        <img src={coverImage} alt="course-banner" />
      </div>

      <div className="course-bottom-container">
        <div className="course-header">
          <div className="course-info">
            <h1>{title}</h1>
            <p>Instructor: Abhilash Sandupatla</p>
          </div>
          <div className="rating">
            {totalReviews > 0 ? (
              <div className="average-rating">
                {renderStars(Math.round(averageRating))}
                <span className="average-rating-number">
                  {averageRating.toFixed(1)} / 5
                  <p style={{ color: "grey" }}>({totalReviews} Ratings)</p>
                </span>
              </div>
            ) : (
              " "
            )}
          </div>
        </div>
        <hr />
        <div className="content-container">
          <div className="main-content">
            <h2>What You'll Learn</h2>
            <p>{description}</p>
          </div>

          <div className="pricing-sidebar">
            {isRegistered ? (
              <>
                <Link to={`/p/course/${courseId}`}>
                  <RippleButton className="go-to-course-btn">
                    Go to Course
                  </RippleButton>
                </Link>
                <br />
                <Link to={`/course/${courseId}/review`}>
                  <RippleButton className="review-btn">
                    Review This Course
                  </RippleButton>
                </Link>
              </>
            ) : (
              <>
                {discount === 0 ? (
                  <h3 className="discounted-price">&#8377;{price}</h3>
                ) : (
                  <div className="discount-price-container">
                    <h3 className="discounted-price">
                      &#8377;
                      {price - (discount || 0)}
                    </h3>
                    <h3 className="regular-price">&#8377;{price}</h3>
                  </div>
                )}
                <Link to={`/enroll/${courseId}`}>
                  <RippleButton className="enroll-btn">Enroll Now</RippleButton>
                </Link>
              </>
            )}
            <div className="course-details">
              <p>No. of Modules: {modules.length}</p>
              <p>Lifetime Access</p>
            </div>
            {user && user.isSuperAdmin === true && (
              <RippleButton
                className="delete-course-button"
                onClick={deleteCourse}
              >
                Delete Course <MdDelete />
              </RippleButton>
            )}
          </div>
        </div>

        <hr />
        <div>
          <h3 className="preview-heading">Preview This Course</h3>
          <div className="course-preview">
            <div className="video-preview">
              <h4 className="preview-heading">Sample Video</h4>
              <ReactPlayer
                style={{ width: "100%", height: "auto" }}
                width="100%"
                height="auto"
                url={`http://localhost:1234/gDrive/file/${currentVideo}`}
                controls={true}
                config={{
                  file: { attributes: { controlsList: "nodownload" } },
                }}
              />
            </div>

            <div className="module-preview">
              <h4 className="preview-heading">Modules Overview</h4>
              {modules.length > 0 ? (
                <ul className="module-overview-list">
                  {modules.map((module, idx) => (
                    <li
                      key={idx}
                      className={`module-item ${
                        activeModule === idx ? "active" : ""
                      }`}
                    >
                      <div
                        className="module-header"
                        onClick={() => toggleModule(idx)}
                      >
                        <div>
                          <MdOutlineVideoLibrary />{" "}
                          <span className="module-name">
                            {module.moduleName}
                          </span>
                        </div>
                        <span
                          className={`toggle-icon ${
                            activeModule === idx ? "expanded" : ""
                          }`}
                        >
                          {activeModule === idx ? (
                            <MdKeyboardArrowUp />
                          ) : (
                            <MdKeyboardArrowDown />
                          )}
                        </span>
                      </div>
                      {activeModule === idx && (
                        <ul className="video-list">
                          {module.videosList.map((video, index) => (
                            <li key={index} className="video-title">
                              <MdOndemandVideo /> {video.videoName}
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
        {/* <div className="course-review-container">
          <h1>Reviews</h1>
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <div key={review._id} className="review-card">
                <div className="review-user">
                  <img
                    src={review.user.profileImg} // Assume the user has a profile picture field
                    alt={`${review.user.username}'s profile`}
                    className="profile-picture"
                  />
                  <h5 style={{ marginTop: "4px" }}>{review.user.username}</h5>
                </div>
                <div>
                  <p className="reviewStars">{renderStars(review.rating)}</p>
                  <p className="review-text">{review.review}</p>
                </div>
              </div>
            ))
          ) : (
            <p>No Reviews & Ratings...</p>
          )}
        </div> */}
        <CourseReviewComponent reviews={reviews} />
        <div className="register-prompt">
          <h2>Not Registered Yet?</h2>
          <p>Sign up now to access full course modules and videos!</p>
          <Link to={`/enroll/${courseId}`}>
            {/* <button className="register-btn">Register Now</button> */}
            <RippleButton className="register-btn">Register Now</RippleButton>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CoursePage;

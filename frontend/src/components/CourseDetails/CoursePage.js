import React, { useState, useEffect } from "react";
import "./CoursePage.css";
import axios from "axios";
import getCourseById from "../../utils/getCourseById";
import { useParams, Link } from "react-router-dom";
import ReactPlayer from "react-player";
import Loader from "../shared/Loader";
import {
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdOndemandVideo,
  MdOutlineVideoLibrary,
} from "react-icons/md";
import RippleButton from "../../utils/Buttons/RippleButton";
import CourseReviewComponent from "./CourseReviewComponent";

const CoursePage = () => {
  const url = "http://localhost:1234";
  const { courseId } = useParams();
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
  const [rating, setRating] = useState(0);
  const [activeModule, setActiveModule] = useState(null);

  useEffect(() => {
    const fetchCourseData = async () => {
      const courseData = await getCourseById(courseId);
      if (courseData) {
        console.log(courseData);
        setCourseData(courseData);
        setModules(courseData.modules);
        setPrice(courseData.pricingInfo?.price);
        setTitle(courseData.title);
        setDescription(courseData.description);
        setCoverImage(courseData.coverImage);
        setRating(courseData.rating);
        setCurrentVideo(courseData?.modules[0].videosList[0].videoUrl);
      }
    };
    fetchCourseData();

    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          `${url}/courses/${courseId}/getreviews`,
          {
            withCredentials: true,
          }
        );
        setReviews(response.data); // Set the reviews data to state
        console.log(response.data); // Log the fetched reviews

        // Calculate total reviews and average rating
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

    fetchReviews(); // Call the fetch function
  }, [courseId]);

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
            <p className="discounted-price">₹{price}</p>
            <Link to={`/enroll/${courseId}`}>
              {/* <button className="enroll-btn">Enroll Now</button> */}
              <RippleButton className="enroll-btn">Enroll Now</RippleButton>
            </Link>
            <div className="course-details">
              <p>No. of Modules: {modules.length}</p>
              <p>Lifetime Access</p>
            </div>
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
                controls={[
                  "play-large",
                  "play",
                  "progress",
                  "current-time",
                  "mute",
                  "volume",
                  "captions",
                  "fullscreen",
                  "speed",
                ]}
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

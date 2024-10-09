import React, { useContext, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { UserContext } from "../../context/UserContext.js";
import "./CourseReviews.css";
import RippleButton from "../../utils/Buttons/RippleButton.js";

const CourseReviews = () => {
  const { courseId } = useParams();
  const { user } = useContext(UserContext);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Attempt to submit the review
      await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/courses/reviews`,
        {
          user,
          courseId,
          rating,
          review,
        },
        {
          withCredentials: true,
        }
      );
      setSubmitted(true); // Set submitted to true on successful submission
      setErrorMessage(""); // Clear any previous error message
    } catch (error) {
      // If the user has already submitted a review, show an error message
      if (error.response && error.response.status === 400) {
        setErrorMessage("You have already submitted a review for this course.");
      } else {
        setErrorMessage("Error submitting the review, please try again later.");
      }
      setSubmitted(false); // Reset submitted in case of error
    }
  };

  return (
    <div className="review-container-bg">
      <div className="review-container">
        <h1 className="review-title">Course Review</h1>

        {errorMessage && <div className="error-message">{errorMessage}</div>}
        {submitted && !errorMessage && (
          <div className="success-message">Review submitted successfully!</div>
        )}

        {!submitted && !errorMessage && (
          <form onSubmit={handleSubmit} className="review-form">
            <div className="rating-container">
              <label className="form-label">Rating</label>
              <div className="stars">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={`star ${rating >= star ? "filled" : ""}`}
                    onClick={() => setRating(star)}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>

            <div className="review-input">
              <label className="form-label">Review</label>
              <textarea
                className="textarea"
                value={review}
                onChange={(e) => setReview(e.target.value)}
                placeholder="Write your review..."
                rows="4"
                required
              />
            </div>

            {/* <button type="submit" className="submit-btn">Submit Review</button> */}
            <RippleButton type="submit" className="submit-btn">
              Submit Review
            </RippleButton>
          </form>
        )}
      </div>
    </div>
  );
};

export default CourseReviews;

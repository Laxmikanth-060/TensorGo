import "./CourseReviewComponent.css";
const CourseReviewComponent = (props) => {
  const { reviews } = props;
  // console.log(reviews);
  const ratingsSummary = createRatingSummary(reviews);
  const totalReviews = ratingsSummary.reduce((acc, count) => acc + count, 0); // Sum of all ratings
  // console.log("totalreviews :", totalReviews);
  const calculateBarWidth = (count) => {
    if (totalReviews == 0) return 0;
    return (count / totalReviews) * 100;
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_star, index) => (
      <span key={index} className={`star ${rating > index ? "filled" : ""}`}>
        ★
      </span>
    ));
  };

  return (
    <div className="course-review-container">
      {/* Left side: Rating Summary */}
      <div className="review-container-left">
        <h3>Ratings Summary</h3>
        <div>
          {ratingsSummary.map((count, index) => (
            <div key={index} className="rating-bar-container">
              <span className="left">{5 - index} star </span>
              <div className="rating-bar">
                <div
                  className="rating-bar-progression"
                  style={{
                    width: calculateBarWidth(count) + "%",
                  }}
                ></div>
              </div>
              <span className="right">
                {Math.round(calculateBarWidth(count))}%
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Right side: Reviews */}
      <div className="review-container-right">
        <h3>Top Reviews</h3>
        {reviews.length > 0 ? (
          reviews.slice(0, 5).map((review) => (
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
      </div>
    </div>
  );
};
export default CourseReviewComponent;
const createRatingSummary = (reviews) => {
  const ratingsSummary = [0, 0, 0, 0, 0]; // Index 0: 5 stars, Index 1: 4 stars, ..., Index 4: 1 star
  reviews.forEach((review) => {
    const rating = review.rating;
    if (rating >= 1 && rating <= 5) {
      ratingsSummary[5 - rating]++; // Subtract rating from 5 to align with index (5 stars -> index 0)
    }
  });
  return ratingsSummary;
};

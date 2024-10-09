import { MdOutlineStarOutline, MdStarHalf, MdStarRate } from "react-icons/md";
// import { IoMdTime } from "react-icons/io";
import styles from "./Courses.module.css";
import { useState, useEffect } from "react";
import { getAverageRating } from "../../utils/getAverageRating";

const CourseCard = (props) => {
  const { courseDetails } = props;
  const {
    _id,
    title,
    description,
    thumbnailImage,
    pricingInfo,
    modules,
    instructorName,
  } = courseDetails;
  const { price, discount } = pricingInfo;
  const [rating, setRating] = useState(0);

  useEffect(() => {
    const fetchRating = async () => {
      try {
        const averageRating = await getAverageRating(_id);
        // console.log(averageRating);
        setRating(averageRating);
      } catch (error) {
        console.error("Error fetching average rating:", error);
      }
    };

    fetchRating();
  }, [_id]);

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    const stars = [];
    if (rating == 0) return stars;
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
        src={thumbnailImage}
        alt={title + " Image"}
        className={styles.courseCardImageUrl}
      />

      <h1 className={styles.courseName}>{title}</h1>
      <p className={styles.courseDescription}>
        {description.substring(0, 200)}...
      </p>
      <div className={styles.coursesRatingDurationContainer}>
        <div className={styles.courseCardRatingContainer}>
          <div className={styles.courseCardStars}>{renderStars(rating)}</div>
          <p className={styles.courseCardRatingText}>
            {rating != 0 ? rating.toFixed(1) : ""}
          </p>
        </div>
        <div className={styles.coursesDurationContainer}>
          <p className={styles.courseDurationText}>
            No.of Modules: {modules.length}
          </p>
        </div>
      </div>
      <div className={styles.courseCardFooterContainer}>
        <div className={styles.courseCardInstructorContainer}>
          {/*<img
              src={instructorImage}
              alt="Instructor"
              className={styles.courseCardInstructorImage}
            />
            */}
          <p className={styles.courseCardInstructorName}>{instructorName}</p>
        </div>
        <div className={styles.courseCardPriceContainer}>
          {discount === 0 ? (
            <h1 className={styles.courseCardDiscountPrice}>&#8377;{price}</h1>
          ) : (
            <div className={styles.courseCardPriceContainer}>
              <h1 className={styles.courseCardRegularPrice}>&#8377;{price}</h1>
              <h1 className={styles.courseCardDiscountPrice}>
                &#8377;
                {price - (discount || 0)}
              </h1>
            </div>
          )}
        </div>
      </div>
    </li>
  );
};

export default CourseCard;

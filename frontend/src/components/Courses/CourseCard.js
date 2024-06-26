import { MdOutlineStarOutline, MdStarHalf, MdStarRate } from "react-icons/md";
import { IoMdTime } from "react-icons/io";
import styles from "./Courses.module.css";


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

export default CourseCard;
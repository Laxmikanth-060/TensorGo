import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import "./PromotionModal.css";
import { FaTimes } from "react-icons/fa";
import CourseCard from "../../components/Courses/CourseCard";
const PromotionModal = () => {
  const [showModal, setShowModal] = useState(false);
  const courseDetails = {
    _id: "fjakh",
    title: "python",
    description: "ahhsdflsdf",
    thumbnailImage: "",
    pricingInfo: { discount: 0, price: 100 },
    modules: [],
    instructorName: "",
  };
  useEffect(() => {
    // Check if the modal has already been shown
    const modalShown = Cookies.get("promoModalShown");
    if (!modalShown) {
      // Show the modal after 5 seconds if it hasn't been shown before
      const timer = setTimeout(() => {
        setShowModal(true);
        Cookies.set("promoModalShown", "true", { expires: 1 });
      }, 5000);

      // Clear the timer if the component unmounts
      return () => clearTimeout(timer);
    }
  }, []);

  const handleCloseModal = () => {
    setShowModal(false);
  };
  if (showModal) {
    return (
      <div className="promotion-model">
        <div className="promotion-model-content">
          <div className="promotion-model-close-container">
            <button onClick={handleCloseModal}>
              <FaTimes />
            </button>
          </div>
          <a
            href={`/course/${courseDetails._id}/overview`}
            onClick={handleCloseModal}
          >
            <CourseCard courseDetails={courseDetails} />
          </a>
        </div>
      </div>
    );
  } else {
    return <></>;
  }
};

export default PromotionModal;

import React, { useState } from "react";
import styles from "./CreateCourseMain.module.css";
import CourseInformation from "./forms/CourseInformation";
import PricingInformation from "./forms/PricingInformation";
import CourseMaterials from "./forms/CourseMaterials";

const CreateCourseMain = () => {
  const [page, setPage] = useState(1);
  const [formData, setFormData] = useState({
    courseInfo: {
      title: "",
      category: "",
      level: "",
      description: "",
      coverImage: null,
    },
    courseMaterials: [
      {
        moduleName: "",
        videosList: [
          {
            videoName: "",
            description: "",
            videoFile: null,
            expanded: true,
          },
        ],
      },
    ],
    pricingInfo: {
      price: 0,
      upiId: '',
    }
  });

  const updateFormData = (section, data) => {
    setFormData((prevData) => ({
      ...prevData,
      [section]: data,
    }));
  };

  return (
    <div className={styles.CreateCourseMainContainer}>
      <h3 className={styles.mainTitle}>Create Course</h3>

      <div>
        {page === 1 ? (
          <CourseInformation
            data={formData.courseInfo}
            updateData={(data) => updateFormData('courseInfo', data)}
          />
        ) : page === 2 ? (
          <CourseMaterials
            data={formData.courseMaterials}
            updateData={(data) => updateFormData('courseMaterials', data)}
          />
        ) : (
          <PricingInformation
            data={formData.pricingInfo}
            updateData={(data) => updateFormData('pricingInfo', data)}
          />
        )}
      </div>
      <div className={styles.buttonsNav}>
        {page !== 1 ? (
          <button
            className={styles.backButton}
            onClick={() => {
              setPage((prev) => prev - 1);
            }}
          >
            Back
          </button>
        ) : null}

        {page !== 3 ? (
          <button
            className={styles.nextButton}
            onClick={() => {
              setPage((prev) => prev + 1);
            }}
          >
            Next
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default CreateCourseMain;

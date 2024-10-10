import React, { useState } from "react";
import styles from "./CreateCourseMain.module.css";
import CourseInformation from "./forms/CourseInformation";
import PricingInformation from "./forms/PricingInformation";
import CourseMaterials from "./forms/CourseMaterials";
import RippleButton from "../../utils/Buttons/RippleButton";
import {useNavigate } from "react-router-dom";

const CreateCourseMain = () => {
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    courseInfo: {
      id: "",
      driveFolderId:"",
      title: "",
      category: "",
      level: "",
      description: "",
      coverImage: null,
      thumbnailImage: "",
      duration: 0,
      price: 0,
      publishedDate: "",
      rating: 0,
    },
    courseMaterials: [
      {
        moduleName: "",
        videosList: [
          {
            id: "",
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
      upiId: "",
    },
  });
  const [errors, setErrors] = useState({});

  const updateFormData = (section, data) => {
    setFormData((prevData) => ({
      ...prevData,
      [section]: data,
    }));
  };

  const validateCourseInfo = () => {
    const newErrors = {};
    if (!formData.courseInfo.title) {
      newErrors.title = "Title is required";
    }
    if (!formData.courseInfo.category) {
      newErrors.category = "Category is required";
    }
    if (!formData.courseInfo.level) {
      newErrors.level = "Level is required";
    }
    if (!formData.courseInfo.description) {
      newErrors.description = "Description is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmitAll = async () => {
    try {
      //console.log(formData)
      const response = await fetch(
        "http://localhost:1234/courses/create-with-details",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await response.json();
      navigate("/courses")
      //console.log("Submission successful:", data);
      // Handle successful submission (e.g., show a success message, redirect)
    } catch (error) {
      console.error("Submission failed:", error);
      // Handle error (e.g., show an error message)
    }
  };

  const handleCreateCourseFolder = async () => {
    const title = formData.courseInfo.title;
    if (title) {
      try {
        const response = await fetch(
          "http://localhost:1234/gDrive/create-folder",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ title }),
          }
        );
        const data = await response.json();
        console.log("Created folder ID: ", data.folderId);
        setFormData((prevFormData) => ({
          ...prevFormData,
          courseInfo: {
            ...prevFormData.courseInfo,
            id: data.folderId,
            driveFolderId:data.folderId,
          },
        }));
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("Folder name is required.");
    }
  };

  const handleNextButton = () => {
    if (page === 1) {
      if (validateCourseInfo()) {
        handleCreateCourseFolder();
        setPage((prev) => prev + 1);
      } else {
        alert("Please enter all the fields!");
      }
    } else {
      setPage((prev) => prev + 1);
    }
  };

  return (
    <div className={styles.CreateCourseMainContainer}>
      <h3 className={styles.mainTitle}>Create Course</h3>
      <div className={styles.pageNumberContainer}>
        <div className={styles.pageNumber}>Page {page}/3</div>
      </div>
      <div>
        {page === 1 ? (
          <CourseInformation
            data={formData.courseInfo}
            updateData={(data) => updateFormData("courseInfo", data)}
            errors={errors}
          />
        ) : page === 2 ? (
          <CourseMaterials
            data={formData.courseMaterials}
            updateData={(data) => updateFormData("courseMaterials", data)}
            courseId={formData.courseInfo.id}
          />
        ) : (
          <PricingInformation
            data={formData.pricingInfo}
            updateData={(data) => updateFormData("pricingInfo", data)}
          />
        )}
      </div>
      <div className={styles.buttonsNav}>
        {page !== 1 && (
          // <button
          //   className={styles.backButton}
          //   onClick={() => setPage((prev) => prev - 1)}
          // >
          //   Back
          // </button>
          <RippleButton
            className={styles.backButton}
            onClick={() => setPage((prev) => prev - 1)}
          >
            Back
          </RippleButton>
        )}
        {page !== 3 ? (
          // <button
          //   className={styles.nextButton}
          //   onClick={handleNextButton}
          // >
          //   Next
          // </button>
          <RippleButton
            className={styles.nextButton}
            onClick={handleNextButton}
          >
            Next
          </RippleButton>
        ) : (
          // <button
          //   className={styles.submitButton}
          //   onClick={handleSubmitAll}
          // >
          //   Submit
          // </button>
          <RippleButton
            className={styles.submitButton}
            onClick={handleSubmitAll}
          >
            Submit
          </RippleButton>
        )}
      </div>
    </div>
  );
};

export default CreateCourseMain;

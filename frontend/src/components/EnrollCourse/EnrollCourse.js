import React, { useEffect, useState } from 'react';
import './EnrollCourse.css';
import { useParams, useNavigate } from 'react-router-dom';

const url = "http://localhost:1234";

const EnrollCourse = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [course, setCourse] = useState(null); 
  const { courseId } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await fetch(`${url}/courses/${courseId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch course details');
        }
        const data = await response.json();
        setCourse(data); // Store the course data
      } catch (error) {
        console.error('Error fetching course:', error);
        setModalMessage("Failed to load course details.");
        setShowModal(true);
      }
    };

    fetchCourse();
  }, [courseId]);

  const handleEnroll = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${url}/courses/enroll`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ courseId }),
        credentials: "include",
      });

      const result = await response.json();
      console.log(result);

      if (response.ok) {
        setModalMessage("Enrollment Successful! You have successfully enrolled in the Complete Web Development Bootcamp.");
      } else if (response.status === 400) {
        setModalMessage("You are already enrolled in this course.");
      } else {
        setModalMessage(result.message || "An error occurred.");
      }

      setShowModal(true);

      setTimeout(() => {
        navigate(-1); 
      }, 2000);
    } catch (error) {
      console.error('Error enrolling in course:', error);
      setModalMessage("An unexpected error occurred. Please try again.");
      setShowModal(true);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="enroll-page">
      <h1>Enroll in the Course</h1>
      {course ? (
        <div className="enroll-container">
          <img src={course.thumbnailImage} alt={course.title} />
          <h2>{course.title}</h2>
          <p>Price: 
          <span className="discounted-price">${course.pricingInfo.price - (course.pricingInfo.discount || 0)}</span> 
          {course.pricingInfo.discount > 0 && (
            <span className="original-price">${course.pricingInfo.price}</span>
          )}
        </p>
          <p>Lifetime Access</p>
          <hr />
          <button type="button" className="enroll-btn" onClick={handleEnroll}>Complete Enrollment</button>
        </div>
      ) : (
        <p>Loading course details...</p> // Show loading message until course details are fetched
      )}

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <h4>{modalMessage.includes("Successful") ? "Enrollment Successful!" : "OOPs!"}</h4>
            <p>{modalMessage}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default EnrollCourse;

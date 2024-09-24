import React, { useState } from 'react';
import './EnrollCourse.css';
import { useParams, useNavigate } from 'react-router-dom';

const url = "http://localhost:1234";

const EnrollCourse = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const { courseId } = useParams();
  const navigate = useNavigate();

  const handleEnroll = async () => {
    try {
      const token = localStorage.getItem('token'); // Retrieve your JWT token
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
        navigate(-1); // Go back to the previous page
      }, 3000);
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
      <div className="enroll-container">
        <h2>Complete Web Development Bootcamp</h2>
        <p>Instructor: Abhilash Sandupatla</p>
        <p>Price: <span className="discounted-price">$14.99</span> <span className="original-price">$199.99</span></p>
        <p>Duration: 45 hours</p>
        <p>Lifetime Access</p>
        <hr />
        <button type="button" className="enroll-btn" onClick={handleEnroll}>Complete Enrollment</button>
      </div>

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

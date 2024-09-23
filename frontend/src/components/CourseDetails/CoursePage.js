import React from 'react';
import './CoursePage.css';

const CoursePage = () => {
  return (
    <div className="course-page">
        <div className="course-banner">
          <img
            src="https://img-c.udemycdn.com/course/750x422/951684_9c1a_2.jpg"
            alt="course-banner"
          />
        </div>
      <div className='course-bottom-container'>
      <div className="course-header">
        <div className="course-info">
          <h1>Complete Web Development Bootcamp</h1>
          <p>Instructor: Angela Yu</p>
          <div className="rating">
            ⭐⭐⭐⭐⭐ 4.8/5 (120,000 ratings)
          </div>
        </div>
      </div>
        <hr/>
      <div className="content-container">
        <div className="main-content">
          <h2>What You'll Learn</h2>
          <ul className="learning-points">
            <li>Master front-end technologies (HTML, CSS, JavaScript)</li>
            <li>Build backend services using Node.js and Express</li>
            <li>Understand databases like MongoDB</li>
            <li>Deploy your web applications</li>
          </ul>

          <h3>Curriculum</h3>
          <ul>
            <li>Introduction to HTML, CSS, and JavaScript</li>
            <li>Backend with Node.js</li>
            <li>Frontend with React.js</li>
          </ul>
        </div>

        <div className="sidebar">
          <div className="pricing">
            <p className="discounted-price">$14.99</p>
            <p className="original-price">$199.99</p>
            <p className="discount-info">Special Offer: 92% Off!</p>
            <button className="enroll-btn">Enroll Now</button>
          </div>
          <div className="course-details">
            <p>Duration: 45 hours</p>
            <p>Lifetime Access</p>
          </div>
        </div>
      </div>
        <hr/>
        <div>
        <h3>Preview This Course</h3>
          <div className="course-preview">
            <div className="video-preview">
              <h4>Sample Video</h4>
              <iframe
                width="100%"
                height="200"
                src="https://www.youtube.com/watch?v=ERCMXc8x7mc&t=11s"
                title="Sample Video"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            </div>

            <div className="module-preview">
              <h4>Modules Overview</h4>
              <ul>
                <li>Module 1: Introduction to Web Development</li>
                <li>Module 2: HTML5 & CSS3</li>
                <li>Module 3: JavaScript Basics</li>
                <li>Module 4: React.js Essentials</li>
              </ul>
            </div>
          </div>
        </div>
      <div className="register-prompt">
        <h2>Not Registered Yet?</h2>
        <p>Sign up now to access full course modules and videos!</p>
        <button className="register-btn">Register Now</button>
      </div>
      </div>
    </div>
  );
};

export default CoursePage;

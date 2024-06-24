import React, { useEffect, useState } from "react";
import "./CourseDetails.css";
import { useLocation,Link } from "react-router-dom";
import CoursesData from "../../utils/CoursesData"
import {FaWhatsapp, FaInstagram, FaTwitter} from "react-icons/fa"
import CourseCard from "../Courses/CourseCard";
import styles from "../Courses/Courses.module.css"
import { FaStar } from "react-icons/fa6";


const CourseDetails = () => {
  const [course, setCourse] = useState(null); 
  const [coursesList,setCoursesList] = useState([])
  const location = useLocation();
  const id = location.pathname.split('/')[2];

  useEffect(() => {
    const courseData = CoursesData();
    const marketingCourses = courseData
    .filter((course) => course.id.toString() !== id)
    .slice(0, 3);
    setCoursesList(marketingCourses);
    const requiredCourse = courseData.find(course => course.id.toString() === id);

    if (requiredCourse) {
      setCourse(requiredCourse);
    }
  }, [id]);

  if (!course) {
    return <div>Loading...</div>; 
    }

  return (
    <div className="courseDetails">
      <div className="courseDetails-banner-image">
        <img src="https://as2.ftcdn.net/v2/jpg/02/45/08/01/1000_F_245080107_golTKP2zTGtOtpcUgcXRK84Pu7cWAiGh.jpg" alt={course.name} />
      </div>
      <div className="course-overview">
        <div className="course-feedback">
            <div className="course-feedback-upper">
                  <div className="feedback-box">
                    <p>4 out 5 stars</p>
                    <p className="stars"> <FaStar /> <FaStar /> <FaStar /> <FaStar /></p>
                    <p>Top Rating</p>
                  </div>
                  <div className="feedback-stars">
                    <p>5 stars</p>
                    <p>4 stars</p>
                    <p>3 stars</p>
                    <p>2 stars</p>
                    <p>1 stars</p>
                  </div>
                  <div className="feedback-progress">
                    <p><progress id="file" value="92" max="100"></progress></p>
                    <p><progress id="file" value="80" max="100"></progress></p>
                    <p><progress id="file" value="72" max="100"></progress></p>
                    <p><progress id="file" value="42" max="100"></progress></p>
                    <p><progress id="file" value="32" max="100"></progress></p>

                  </div>
            </div>
            <div className="course-feedback-lower">
                <div className="userprofile"> 
                    <div>
                        <img src="https://cdn.vectorstock.com/i/500p/17/61/male-avatar-profile-picture-vector-10211761.jpg" alt="" />
                    </div>
                    <div>
                        <h4>Name</h4>
                        <p className="stars"> <FaStar /> <FaStar /> <FaStar /></p>
                    </div>
                </div>
                <div>
                  <p>It is very excited to share that I am working with WorkMomentum</p>
                  <hr></hr>
                </div>
            </div>
        </div>
        <div className="course-details">
          <div className="course-discount">
            <p>&#8377;{course.price-(course.discountInPercentage*course.price)/100}</p>
            <p><span className="discount-offer">&#8377;{course.price}</span>  {course.discountInPercentage}% Off</p>
            <button>Buy Now</button>
          </div>
          <hr></hr>
          <div>
            <h4>This Course Includes</h4>
            <div className="course-includes"><FaInstagram size={25}/><span>Money Back Guarantee</span></div>
            <div className="course-includes"><FaWhatsapp size={25}/><span>Access on all devices</span></div>
            <div className="course-includes"><FaTwitter size={25}/><span>Certification of Completion</span></div>
            <div className="course-includes"><FaInstagram size={25}/><span>32 Modules</span></div>

          </div>
          <hr></hr>
          <div>
            <h4>Training 5 or more people</h4>
            <p>class launched then a year ago and it is still running succesfully Pushpa - The Rise</p>
          </div>
          <hr></hr>
          <div>
            <h4>Share this course</h4>
            <FaWhatsapp className="share-icons" size={50}/>
            <FaInstagram className="share-icons"  size={50}/>
            <FaTwitter className="share-icons"  size={50}/>
          </div>
        </div>
      </div>
      <div className="marketing-articles">
        <p className="marketing-heading">Marketing Articles</p>
        <ul className={styles.coursesContainer}>
            {coursesList && coursesList.map((eachCourse) => (
              <Link
                className={styles.courseCardLinkContainer}
                key={`${eachCourse._id}`}
              >
                <CourseCard  courseDetails={eachCourse} />
              </Link>
            ))}
          </ul>
      </div>
      <div className="physical-classroom">
            <div className="physical-classroom-text">
                <p>Everything you can do in a physical classroom, <span>you can do with TOTC</span></p>
                <p>TOTC’s school management software helps traditional and online schools manage scheduling, attendance, payments and virtual classrooms all in one secure cloud-based system.</p>
                <p>Learn more</p>
            </div>
            <div className="physical-classroom-image">
              <img src="https://img.freepik.com/free-photo/confident-teacher-explaining-lesson-pupils_74855-9751.jpg" alt="" />
            </div>
      </div>
      <div className="education">
        <h3>Top Education Offers and Deals are listed here</h3>
      <div className="top-education">
            <div className="top-education-card">
                <div className="top-education-card-offer-box">50%</div>
                <p>FOR INSTRUCTORS</p>
                <p>Abhi Trainings software management
                  software helps traditional and 
                  online schools manage scheduling
                </p>
            </div>
            <div className="top-education-card">
                <div className="top-education-card-offer-box">50%</div>
                <p>FOR INSTRUCTORS</p>
                <p>Abhi Trainings software management
                  software helps traditional and 
                  online schools manage scheduling
                </p>
            </div>
            <div className="top-education-card">
                <div className="top-education-card-offer-box">50%</div>
                <p>FOR INSTRUCTORS</p>
                <p>Abhi Trainings software management
                  software helps traditional and 
                  online schools manage scheduling
                </p>
            </div>
            
      </div>
      </div>
    </div>
  );
};

export default CourseDetails;

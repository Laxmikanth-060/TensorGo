import React from "react";
import Hero from "../Hero/Hero";
import styles from "./LandingPage.module.css";

const OurSuccess = () => {
  return (
    <div className={styles.OurSuccessComponent}>
      <div className={styles.OurSuccessHeadingPara}>
        <h1>
          Our <span>Success</span>
        </h1>
        <p>
          Abhi Trainings has revolutionized education with its unparalleled
          success in empowering learners worldwide through innovative and
          accessible online platforms.
        </p>
      </div>
      <div className={styles.OurSuccessStats}>
        <ul className={styles.OurSuccessStatsList}>
          <li>
            <div className={styles.OurSuccessStatsNumberText}>
              <h2>15+</h2>
              <p>Courses</p>
            </div>
          </li>

          <li>
            <div className={styles.OurSuccessStatsNumberText}>
              <h2>1000+</h2>
              <p>Students</p>
            </div>
          </li>

          <li>
            <div className={styles.OurSuccessStatsNumberText}>
              <h2>20+</h2>
              <p>Instructors</p>
            </div>
          </li>

          <li>
            <div className={styles.OurSuccessStatsNumberText}>
              <h2>5+</h2>
              <p>Years of Experience</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

const WhatIstensorgo = () => {
  return (
    <div className={styles.WhatIstensorgoComponent}>
      <div className={styles.WhatIstensorgoHeadingPara}>
        <h1>
          What is <span>Abhi Trainings?</span>
        </h1>
        <p>
          Abhi Trainings is a platform that allows educators to create online
          classes whereby they can store the course materials online; manage
          assignments, quizzes and exams; monitor due dates; grade results and
          provide students with feedback all in one place.
        </p>
      </div>

      <div className={styles.ForStudentsForTeacher}>
        <div className={styles.ForStudents}>
          <img src="./assets/student.jpg" alt="For Students" />
          <div className={styles.OverlayText}>For Students</div>
          <button className={styles.ButtonOverlay} onClick={() => console.log('For Students clicked')}>
            Enroll now
          </button>
        </div>
        <div className={styles.ForTeacher}>
          <img src="./assets/teacher.webp" alt="For Teachers" />
          <div className={styles.OverlayText}>For Instructors</div>
          <button className={styles.ButtonOverlay} onClick={() => console.log('For Teachers clicked')}>
            Enroll now
          </button>
        </div>
      </div>
    </div>
  );
};
const CourseContentComp = () => {
  const courseContent = [
    { title: "Linux", imgSrc: "assets/img/linux.webp" },
    { title: "Shell Scripting", imgSrc: "assets/img/shell.webp" },
    { title: "AWS Cloud", imgSrc: "assets/img/aws.webp" },
    { title: "Git & Github", imgSrc: "assets/img/git.webp" },
    { title: "Terraform", imgSrc: "assets/img/terra.webp" },
    { title: "Jenkins", imgSrc: "assets/img/jenkin.webp" },
    { title: "Ansible", imgSrc: "assets/img/ansible.webp" },
    { title: "Docker", imgSrc: "assets/img/docker (2).webp" },
    { title: "Kubernetes", imgSrc: "assets/img/kuber.webp" },
    { title: "Helm Charts", imgSrc: "assets/img/helm.webp" },
    { title: "Prometheus & Grafana", imgSrc: "assets/img/promth.webp" },
    { title: "Real Time Project", imgSrc: "assets/img/project.webp" }
  ];

  return (
    <section
      id="courseDetails"
      className="tp-category-area bg-bottom grey-bg pt-110 pb-80 wow fadeInUp"
      data-wow-duration="1.5s"
      data-wow-delay=".4s"
      style={{
        backgroundImage: "url(assets/img/bg/shape-bg-1.png)",
        visibility: "visible",
        animationDuration: "1.5s",
        animationDelay: "0.4s",
        animationName: "fadeInUp",
      }}
    >
      <div className="container">
        <div className="row text-center">
          <div className="col-lg-12">
            <div className="section-title mb-40">
              <h2 className="tp-section-title">Course Content</h2>
            </div>
          </div>
        </div>
        <div className="row">
          {courseContent.map((course, index) => (
            <div key={index} className="col-xl-3 col-lg-4 col-md-6">
              <div className="tp-cat-item mb-40 d-flex align-items-center">
                <div className="tp-category-icon mr-15">
                  <img src={course.imgSrc} alt={`${course.title}-img`} />
                </div>
                <h4 className="tp-category-title">{course.title}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const LandingPage = () => {
  return (
    <div>
      <Hero />
      <OurSuccess />
      <WhatIstensorgo />
      {/* <CourseContentComp/> */}
    </div>
  );
};

export default LandingPage;

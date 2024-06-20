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

const WhatIsAbhiTrainings = () => {
  return (
  <div className={styles.WhatIsAbhiTrainingsComponent}>

  </div>
  );
};

const LandingPage = () => {
  return (
    <div>
      <Hero />
      <OurSuccess />
      <WhatIsAbhiTrainings/>
    </div>
  );
};

export default LandingPage;

import React from "react";
import styles from "./Hero.module.css";
import RippleButton from "../../utils/Buttons/RippleButton";

const Hero = () => {
  return (
    <div className={styles.heroContainer}>
      <div className={styles.heroTitle}>
        <h1 className={styles.heroHeading}>
          Experience the simplicity of studying online with{" "}
          <span>Abhi Trainings</span>
        </h1>
        <p className={styles.heroSubheading}>
          Abhi Trainings is an interesting platform that will teach you in a
          more interactive way
        </p>
        {/* <button className={styles.heroButton}>Join for free</button> */}
        <RippleButton className={styles.heroButton}>Join for free</RippleButton>
      </div>
      <div className={styles.heroImageContainer}>
        <img
          src="./assets/hero-image.png"
          alt="Hero"
          className={styles.heroImage}
        />
      </div>
    </div>
  );
};

export default Hero;

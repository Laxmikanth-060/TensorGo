import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./NotFound.module.css";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.nf_container}>
      <div className={styles.nf_illustration}>
        <img
          src="assets/img/page_not_found.png"
          alt="Page Not Found"
          className={styles.nf_image}
        />
      </div>
      <h1 className={styles.nf_title}>404 - Page Not Found</h1>
      <p className={styles.nf_message}>
        Sorry, the page you are looking for does not exist.
      </p>
      <button className={styles.nf_button} onClick={() => navigate("/")}>
        Go to Home
      </button>
    </div>
  );
};

export default NotFound;

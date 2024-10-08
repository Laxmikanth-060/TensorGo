import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./NotAuthorized.module.css"; 

const NotAuthorized = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.na_container}>
      <div className={styles.na_illustration}>
        <img
          src="assets/img/access_denied.png" 
          alt="Access Denied"
          className={styles.na_image}
        />
      </div>
      <h1 className={styles.na_title}>Access Denied</h1>
      <p className={styles.na_message}>
        Oops! You don’t have permission to access this page.
      </p>
      <button className={styles.na_button} onClick={() => navigate("/")}>
        Go to Home
      </button>
    </div>
  );
};

export default NotAuthorized;

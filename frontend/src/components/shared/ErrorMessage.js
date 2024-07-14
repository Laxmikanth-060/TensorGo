import React from "react";
import styles from "./ErrorMessage.module.css";
import { AiOutlineCloseCircle } from "react-icons/ai"; // Import the error icon

const ErrorMessage = ({ children }) => {
  return (
    <div className={styles.error}>
      <AiOutlineCloseCircle className={styles.errorIcon} />
      <p className={styles.errorText}>{children}</p>
    </div>
  );
};

export default ErrorMessage;

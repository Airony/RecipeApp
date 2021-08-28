import React from "react";
import styles from "../styles/error.module.scss";

const ErrorMessage = ({ preMessage, error }) => {
  return (
    <div className={styles.errorContainer}>
      <p className={styles.errorMessage}>
        {preMessage} {error.message || "Server error, please try again later."}
      </p>
    </div>
  );
};

export default ErrorMessage;

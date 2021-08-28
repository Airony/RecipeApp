import React, { useState } from "react";
import sharedStyles from "../styles/sharedStyles.module.scss";
import styles from "../styles/textarea.module.scss";

const TextArea = ({ placeholder, maxLength, onSubmit }) => {
  const [Input, setInput] = useState("");

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(Input);
      }}
    >
      <textarea
        placeholder={placeholder}
        value={Input}
        onChange={handleInputChange}
        className={styles.textArea}
        maxLength={maxLength}
      ></textarea>
      <input
        type="submit"
        className={`${sharedStyles.button} ${sharedStyles.buttonPrimary} ${styles.submitButton}`}
        disabled={Input.length > 0 ? false : true}
      ></input>
    </form>
  );
};

export default TextArea;

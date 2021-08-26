import React, { useState } from "react";
import styles from "../styles/textarea.module.scss";

const TextArea = ({ placeholder, maxLength }) => {
  const [Input, setInput] = useState("");

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  return (
    <form>
      <textarea
        placeholder={placeholder}
        value={Input}
        onChange={handleInputChange}
        className={styles.textArea}
        maxLength={maxLength}
      ></textarea>
      <input
        type="submit"
        className={`button button-primary ${styles.submitButton}`}
        disabled={Input.length > 0 ? false : true}
      ></input>
    </form>
  );
};

export default TextArea;

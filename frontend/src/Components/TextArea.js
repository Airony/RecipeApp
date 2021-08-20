import React, { useState } from "react";
import "../styles/textarea.scss";

const TextArea = ({ placeholder, maxLength }) => {
  const [Input, setInput] = useState("");

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  return (
    <form className="textarea-form">
      <textarea
        placeholder={placeholder}
        value={Input}
        onChange={handleInputChange}
        className={Input.length > 0 ? "textarea-expanded" : ""}
        maxLength={maxLength}
      ></textarea>
      <input
        type="submit"
        className="button button-primary"
        disabled={Input.length > 0 ? false : true}
      ></input>
    </form>
  );
};

export default TextArea;

import axios from "axios";
import React, { useState } from "react";
import sharedStyles from "../styles/sharedStyles.module.scss";

const LoginScreen = () => {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("quoi");
    let res = await axios.post("/api/users/login", {
      email: Email,
      password: Password,
    });
    console.log(res);
  };

  const inputStyle = {
    background: "#ccc",
    "font-size": "1rem",
    margin: "10px",
    padding: "10px",
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="Email"
        style={inputStyle}
        placeholder="Email"
        onChange={handleEmailChange}
      />
      <input
        type="text"
        name="Password"
        style={inputStyle}
        placeholder="Password"
        onChange={handlePasswordChange}
      />
      <input
        type="submit"
        name="Password"
        className={`${sharedStyles.button} ${sharedStyles.buttonPrimary}`}
      />
    </form>
  );
};

export default LoginScreen;

import PrimaryHeader from "./Components/PrimaryHeader";
import "./app.scss";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import SecondaryHeader from "./Components/SecondaryHeader";

const App = (props) => {
  return (
    <Router>
      <PrimaryHeader></PrimaryHeader>
      <SecondaryHeader></SecondaryHeader>
    </Router>
  );
};

export default App;

import PrimaryHeader from "./Components/PrimaryHeader";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import SecondaryHeader from "./Components/SecondaryHeader";
import "./styles/sharedStyles.scss";

const App = (props) => {
  return (
    <Router>
      <PrimaryHeader></PrimaryHeader>
      <SecondaryHeader></SecondaryHeader>
    </Router>
  );
};

export default App;

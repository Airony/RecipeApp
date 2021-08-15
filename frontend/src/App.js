import PrimaryHeader from "./Components/PrimaryHeader";
import "./app.scss";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

const App = (props) => {
  return (
    <Router>
      <PrimaryHeader></PrimaryHeader>
    </Router>
  );
};

export default App;

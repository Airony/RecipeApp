import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrimaryHeader from "./Components/PrimaryHeader";
import SecondaryHeader from "./Components/SecondaryHeader";
import RecipeScreen from "./Screens/RecipeScreen";

const App = (props) => {
  return (
    <Router>
      <PrimaryHeader></PrimaryHeader>
      <SecondaryHeader></SecondaryHeader>
      <Switch>
        <Route path="/recipes/:id">
          <RecipeScreen></RecipeScreen>
        </Route>
      </Switch>
    </Router>
  );
};

export default App;

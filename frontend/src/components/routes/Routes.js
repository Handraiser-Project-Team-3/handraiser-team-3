import React from "react";
import { Route, Switch } from "react-router-dom";
import { Login } from "../login/Login";
import Navigation from "../navigation/NavBar";
import MentorsView from "../users/MentorsView";
import { MentorClassView } from "../users/mentors-class-view/MentorClassView";
export const Routes = props => {
  const { accessToken } = props;
  const component = {
    mentor: MentorsView,
    clasroom: MentorsView
  };
  return (
    <Switch>
      <Route
        exact
        path="/"
        render={() =>
          accessToken === "" ? (
            <Login data={props} />
          ) : (
            <Navigation data={props} component={component} />
          )
        }
      />
      <Route
        exact
        path="/classroom"
        render={() => <Navigation data={props} component={component} />}
      />
    </Switch>
  );
};
import React from "react";
import { Route, Switch } from "react-router-dom";
import { Login } from "../login/Login";
import Navigation from "../navigation/NavBar";
import { Admin } from "../users/Admin";
import { MentorClassView } from "../users/mentors-class-view/MentorClassView";
import { Classroom } from "../users/students-class-view/ClassSelection";
import MentorsView from "../users/MentorsView";

export const Routes = props => {
  const { accessToken, user } = props;
  const userDetails = user ? user : {};
  const { account_type_id } = userDetails;
  return (
    <Switch>
      <Route
        exact
        path="/"
        render={() =>
          accessToken === "" ? (
            <Login data={props} />
          ) : (
              <Navigation
                data={props}
                component={
                  account_type_id === 1
                    ? Admin
                    : account_type_id === 2
                      ? MentorClassView
                      : Classroom
                }
              />
            )
        }
      />
      <Route
        path={`/classroom/:classname`}
        render={props => (
          <Navigation {...props} data={props} component={MentorsView} />
        )}
      />
    </Switch>
  );
};

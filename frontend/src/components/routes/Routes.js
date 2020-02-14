import React from "react";
import { Route, Switch } from "react-router-dom";
import { Login } from "../login/Login";
import Navigation from "../navigation/NavBar";
import { Admin } from "../users/admin/Admin";
import { ClassView } from "../users/classroom/ClassView";
import Classroom from "../users/classroom/Classroom";
import PageNotFound from "../users/reusables/PageNotFound";

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
                component={account_type_id === 1 ? Admin : ClassView}
              />
            )
        }
      />
      <Route
        path={`/classroom/:id`}
        render={history =>
          accessToken === "" ? (
            <Login data={props} />
          ) : (
              <Navigation
                {...history}
                data={props}
                component={account_type_id !== 1 ? Classroom : PageNotFound}
              />
            )}
      />
      <Route path={`*`} component={PageNotFound} />
    </Switch>
  );
};

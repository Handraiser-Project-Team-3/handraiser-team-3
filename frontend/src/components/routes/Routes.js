import React from "react";
import { Route, Switch } from "react-router-dom";
import { Login } from "../login/Login";
import Navigation from "../navigation/NavBar";
import MentorsView from "../users/MentorsView";

export const Routes = props => {
  const { accessToken } = props;
  return (
    <Switch>
      <Route
      exact
      path="/"
      render={() =>
        accessToken === "" ? (
          <Login data={props} />
        ) : (
          <Navigation data={props} />
        )
      }
    />
    <Route path="/classroom" render={()=>
     <MentorsView data={props}/>
    }/>
    </Switch>
  );
};

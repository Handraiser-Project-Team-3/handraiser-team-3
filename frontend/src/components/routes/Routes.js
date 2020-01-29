import React from "react";
import { Switch, Route } from "react-router-dom";
import { Login } from "../login/Login";
import { Admin } from "../users/Admin";
import { Mentors } from "../users/Mentors";
import { Students } from "../users/Students";
import { Classroom } from "../users/mentors-class-view/MentorClassView";

export const Routes = props => {
	return (
		<Switch>
			<Route exact path="/" render={() => <Login data={props} />} />
			<Route path="/admin" render={() => <Admin data={props} />} />
			<Route path="/mentors" render={() => <Mentors data={props} />} />
			<Route path="/student" render={() => <Students data={props} />} />
			<Route path="/class" render={() => <Classroom data={props} />} />
		</Switch>
	);
};

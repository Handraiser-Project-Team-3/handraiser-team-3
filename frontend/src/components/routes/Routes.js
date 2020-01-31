import React from "react";
import { Route } from "react-router-dom";
import { Login } from "../login/Login";
import Navigation from "../navigation/NavBar";

export const Routes = props => {
	const { accessToken } = props;
	return (
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
	);
};

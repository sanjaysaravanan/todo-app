import React from "react";
import { Route, Redirect } from "react-router-dom";

import { isUserLoggedIn } from "./AuthenticationService";

function AuthenticatedRoute(props) {
	if (isUserLoggedIn()) return <Route {...props} />;
	else return <Redirect to="/login" />;
}

export default AuthenticatedRoute;

import React, { useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserLogged } from "../../state/actions";

function AuthenticatedRoute({ component: Component, ...rest }) {
	const dispatch = useDispatch();
	const { isAuthenticated, email } = useSelector(state => ({
		isAuthenticated: state.auth.isAuthenticated,
		email: state.auth.email
	}));
	console.log(isAuthenticated);
	useEffect(() => {
		if (isAuthenticated) {
			dispatch(getUserLogged(email));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isAuthenticated]);

	return (
		<Route
			{...rest}
			render={props =>
				isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
			}
		/>
	);
}

export default AuthenticatedRoute;

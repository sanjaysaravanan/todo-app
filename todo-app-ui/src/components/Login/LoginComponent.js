import React, { useState } from "react";
import { Redirect } from "react-router-dom";

import { registerSuccess } from "../AuthenticatedRoute/AuthenticationService";

function LoginComponent() {
	const [userName, setUserName] = useState("sanjaysaravanan");
	const [password, setPassword] = useState("");
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [hasLoginFailed, setHasLoginFailed] = useState(false);

	const handleUserNameChange = event => {
		const { value } = event.target;
		setUserName(value);
	};

	const handlePasowrdChange = event => {
		const { value } = event.target;
		setPassword(value);
	};

	const loginClicked = () => {
		if (userName === "sanjaysaravanan" && password === "password") {
			setIsLoggedIn(true);
			registerSuccess(userName, password);
			setHasLoginFailed(false);
		} else {
			setIsLoggedIn(false);
			setHasLoginFailed(true);
		}
	};

	return (
		<div>
			<h1>Login</h1>
			<div className="container">
				{hasLoginFailed && (
					<div className="alert alert-warning">Invalid Credentials...</div>
				)}
				{isLoggedIn && <Redirect to="/" />}
				User Name:{" "}
				<input
					type="text"
					name="username"
					value={userName}
					onChange={handleUserNameChange}
				/>
				Password:{" "}
				<input
					type="password"
					name="password"
					value={password}
					onChange={handlePasowrdChange}
				/>
				<button className="btn btn-success" onClick={loginClicked}>
					Login
				</button>
			</div>
		</div>
	);
}

export default LoginComponent;

import React from "react";

import { Link } from "react-router-dom";

export default function LogoutComponent() {
	return (
		<>
			<h1>You are logged out Successfully ...</h1>
			<div className="container">
				Thank you for using the Applicatiion !...
				<Link to="/login">Click Here</Link>
			</div>
		</>
	);
}

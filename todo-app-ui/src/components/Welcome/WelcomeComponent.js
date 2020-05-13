import React from "react";
import { Link } from "react-router-dom";

import Header from "../Header/HeaderComponent";
import classes from "./Welcome.module.css";

export default function WelcomeComponent(props) {
	return (
		<div className={classes.welcomeRoot}>
			<Header tab="home" />
			<h1>Welcome !!!</h1>
			<div className="container">
				<h3>Welcome To ToDo Application, {props.match.params.name}</h3>
				<h4>
					Manage Your ToDos <Link to="/todos">Here</Link>
				</h4>
			</div>
		</div>
	);
}

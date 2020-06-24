import React from "react";
import { Route, Switch } from "react-router-dom";

import ListToDo from "../../containers/ListTodo/ListToDo";
import WelcomeComponent from "../../components/Welcome/WelcomeComponent";
import ErrorComponent from "../../components/AuthenticatedRoute/ErrorComponent";

export default function() {
	return (
		<div className="ToDoApp">
			<Switch>
				<Route exact path="/" component={WelcomeComponent} />
				<Route exact path="/todos" component={ListToDo} />
				<Route path="*" component={ErrorComponent} />
			</Switch>
		</div>
	);
}

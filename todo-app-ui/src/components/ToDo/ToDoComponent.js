import React, { useState, useEffect } from "react";
import moment from "moment";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useHistory } from "react-router-dom";

import {
	getTodoById,
	updateTodo,
	createTodo
} from "../../api/todo/ToDoDataService";
import { getLoggedInUser } from "../AuthenticatedRoute/AuthenticationService";

export default function ToDoComponent(props) {
	const [id, setId] = useState(props.match.params.id);
	const [description, setDescription] = useState("Learn Forms");
	const [targetDate, setTargetDate] = useState(
		moment(new Date()).format("YYYY-MM-DD")
	);
	const [isCompleted, setIsCompleted] = useState(false);
	const history = useHistory();

	const setStateFromApi = data => {
		setId(data.id);
		setDescription(data.description);
		setTargetDate(moment(data.targetDate).format("YYYY-MM-DD"));
		setIsCompleted(data.isCompleted);
	};

	useEffect(() => {
		let userName = getLoggedInUser();
		if (id === "-1") {
			return;
		} else
			getTodoById(userName, id).then(res => {
				setStateFromApi(res);
			});
	}, [id]);

	const todo = (values, userName) => {
		return {
			id: id,
			username: userName,
			description: values.description,
			targetDate: values.targetDate,
			done: values.isCompleted
		};
	};

	const onSubmit = values => {
		let userName = getLoggedInUser();
		if (id === "-1") {
			createTodo(userName, todo(values, userName));
		} else updateTodo(userName, id, todo(values, userName));
		history.goBack();
	};

	const validate = values => {
		let errors = {};
		if (!values.description) {
			errors.description = "Enter a Description";
		} else if (values.description.length < 5) {
			errors.description = "Enter atlest 5 Characters in Description";
		}

		if (!moment(values.targetDate).isValid()) {
			errors.targetDate = "Enter a valid Target Date";
		}

		return errors;
	};

	return (
		<div>
			<h1>ToDo</h1>
			<div className="container">
				<Formik
					initialValues={{
						description,
						targetDate,
						isCompleted
					}}
					onSubmit={onSubmit}
					validateOnChange={false}
					validateOnBlur={false}
					validate={validate}
					enableReinitialize={true}
				>
					{props => (
						<Form>
							<ErrorMessage
								name="description"
								component="div"
								className="alert alert-warning"
							/>
							<ErrorMessage
								name="targetDate"
								component="div"
								className="alert alert-warning"
							/>
							<fieldset className="form-group">
								<label>Description</label>
								<Field
									className="form-control"
									type="text"
									name="description"
								/>
							</fieldset>
							<fieldset className="form-group">
								<label>Target Date</label>
								<Field className="form-control" type="date" name="targetDate" />
							</fieldset>
							<fieldset className="form-group">
								<label>Completed</label>
								<Field
									className="form-control"
									type="checkbox"
									name="isCompleted"
								/>
							</fieldset>
							<button className="btn btn-success" type="submit">
								Save
							</button>
						</Form>
					)}
				</Formik>
			</div>
		</div>
	);
}

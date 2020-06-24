import React, { useEffect, forwardRef } from "react";

import MaterialTable from "material-table";
import { Container } from "@material-ui/core";
import uuid from "react-uuid";
import { useDispatch, useSelector } from "react-redux";
import {
	Edit,
	DeleteOutline,
	Search,
	ViewColumn,
	Add,
	Clear,
	FirstPage,
	LastPage,
	ChevronRight,
	ChevronLeft,
	Remove,
	FilterList,
	ArrowUpward,
	Check
} from "@material-ui/icons";

import Header from "../../components/Header/HeaderComponent";
import classes from "./ListTodo.module.css";
import { retrieveAllTodos } from "../../api/todo/ToDoDataService";
import { addTodo, deleteTodo, editTodo } from "../../state/actions";

export default function MaterialTableDemo() {
	const dispatch = useDispatch();
	const { email } = useSelector(({ auth }) => auth);
	// const { todos = [] } = useSelector(({ todo }) => ({ todos: todo.result }));
	const [state, setState] = React.useState({
		columns: [
			{
				title: "Description",
				field: "description",
				sorting: false,
				filtering: false,
				initialEditValue: "Enter something"
			},
			{
				title: "Target Date",
				field: "targetDate",
				type: "date",
				searchable: false,
				filtering: false
			},
			{
				title: "Completed",
				field: "completed",
				type: "boolean",
				sorting: false,
				searchable: false,
				filtering: false
			}
		],
		data: []
	});

	useEffect(() => {
		loadTodos(email);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	function loadTodos(email) {
		retrieveAllTodos(email)
			.then(res => {
				const { result } = res;
				setState({
					...state,
					data: result
				});
			})
			.catch(er => console.log(er));
	}

	function createTodo(data) {
		dispatch(addTodo(email, data));
	}

	function updateTodo(todoId, data) {
		dispatch(editTodo(email, todoId, data));
	}

	function eraseTodo(todoId) {
		dispatch(deleteTodo(email, todoId));
	}

	return (
		<>
			<Header tab="todos" />
			<Container className={classes.divTodos}>
				<MaterialTable
					title="ToDo List"
					columns={state.columns}
					data={state.data}
					icons={{
						Edit: () => <Edit />,
						Delete: () => <DeleteOutline />,
						Search: () => <Search />,
						ResetSearch: () => <Clear />,
						Clear: () => <Clear />,
						Add: () => <Add />,
						FirstPage: () => <FirstPage />,
						LastPage: () => <LastPage />,
						NextPage: () => <ChevronRight />,
						PreviousPage: () => <ChevronLeft />,
						ViewColumn: () => <ViewColumn />,
						ThirdStateCheck: () => <Remove />,
						Filter: () => <FilterList />,
						SortArrow: forwardRef((props, ref) => (
							<ArrowUpward {...props} ref={ref} />
						)),
						Check: () => <Check />
					}}
					options={{
						actionsColumnIndex: -1,
						headerStyle: {
							backgroundColor: "#008cff",
							color: "#FFF",
							fontSize: 20
						},
						searchFieldStyle: {
							fontSize: 20
						},
						rowStyle: {
							backgroundColor: "#f2f2f2"
						},
						showTitle: true
					}}
					editable={{
						onRowAdd: newData =>
							new Promise(resolve => {
								setTimeout(() => {
									resolve();
									setState(prevState => {
										const data = [...prevState.data];
										newData["todoId"] = uuid();
										newData["completed"] = newData.hasOwnProperty("completed")
											? newData.completed
											: false;
										data.push(newData);
										createTodo(newData);
										return { ...prevState, data };
									});
								}, 600);
							}),
						onRowUpdate: (newData, oldData) =>
							new Promise(resolve => {
								setTimeout(() => {
									resolve();
									if (oldData) {
										setState(prevState => {
											const data = [...prevState.data];
											data[data.indexOf(oldData)] = newData;
											console.log(newData);
											updateTodo(newData["todoId"], newData);
											return { ...prevState, data };
										});
									}
								}, 600);
							}),
						onRowDelete: oldData =>
							new Promise(resolve => {
								setTimeout(() => {
									resolve();
									setState(prevState => {
										const data = [...prevState.data];
										data.splice(data.indexOf(oldData), 1);
										eraseTodo(oldData.todoId);
										return { ...prevState, data };
									});
								}, 600);
							})
					}}
				/>
			</Container>
		</>
	);
}

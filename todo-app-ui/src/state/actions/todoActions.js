import {
	ADD_TODO,
	EDIT_TODO,
	DELETE_TODO,
	GET_TODOS,
	TODO_ERROR
} from "./actionTypes";
import {
	throwNotificationDisplay,
	hideGlobalLoading,
	displayGlobalLoading
} from "./notifyActions";
import { todos } from "../../api";

export function getTodos(email) {
	return async function(dispatch) {
		try {
			dispatch(displayGlobalLoading);
			const data = await todos.retrieveAllTodos(email);
			dispatch({ type: GET_TODOS, payload: { email, ...data } });
		} catch (error) {
			dispatch({
				type: TODO_ERROR,
				payload: { error: error?.response.errorMsg }
			});
			dispatch(
				throwNotificationDisplay(
					error?.response?.message || "error in getting todos",
					"error"
				)
			);
		} finally {
			dispatch(hideGlobalLoading);
		}
	};
}

export function addTodo(email, todo) {
	return async function(dispatch) {
		try {
			dispatch(displayGlobalLoading);
			const data = await todos.createTodo(email, todo);
			dispatch({
				type: ADD_TODO,
				payload: { action: "ADD_TODO", email, todo, data }
			});
		} catch (error) {
			dispatch({
				type: TODO_ERROR,
				payload: { error: error?.response.errorMsg }
			});
			dispatch(
				throwNotificationDisplay(
					error?.response?.message || "error in getting todos",
					"error"
				)
			);
		} finally {
			dispatch(hideGlobalLoading);
		}
	};
}

export function editTodo(email, todoId, todo) {
	return async function(dispatch) {
		try {
			dispatch(displayGlobalLoading);
			const data = await todos.updateTodo(email, todoId, todo);
			dispatch({
				type: EDIT_TODO,
				payload: { action: "EDIT_TODO", email, todo, data }
			});
		} catch (error) {
			dispatch({
				type: TODO_ERROR,
				payload: { error: error?.response.errorMsg }
			});
			dispatch(
				throwNotificationDisplay(
					error?.response?.message || "error in getting todos",
					"error"
				)
			);
		} finally {
			dispatch(hideGlobalLoading);
		}
	};
}

export function deleteTodo(email, todoId) {
	return async function(dispatch) {
		try {
			dispatch(displayGlobalLoading);
			const data = await todos.deleteTodo(email, todoId);
			dispatch({
				type: DELETE_TODO,
				payload: { action: "DELETE_TODO", email, todoId, data }
			});
		} catch (error) {
			dispatch({
				type: TODO_ERROR,
				payload: { error: error?.response.errorMsg }
			});
			dispatch(
				throwNotificationDisplay(
					error?.response?.message || "error in getting todos",
					"error"
				)
			);
		} finally {
			dispatch(hideGlobalLoading);
		}
	};
}

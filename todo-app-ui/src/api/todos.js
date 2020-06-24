import { userInstance } from "../axios.config";

export const retrieveAllTodos = email => {
	return userInstance.get(`/todos/${email}`);
};

export const deleteTodo = (email, todoId) => {
	return userInstance.delete(`/todos/${email}/${todoId}`);
};

export const getTodoById = (name, id) => {
	return userInstance.get(`/api/users/${name}/todos/${id}`);
};

export const updateTodo = (email, todoId, todo) => {
	return userInstance.put(`/todos/${email}/${todoId}`, todo);
};

export const createTodo = (email, todo) => {
	return userInstance.post(`/todos/${email}`, todo);
};

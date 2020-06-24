import {
	ADD_TODO,
	EDIT_TODO,
	DELETE_TODO,
	TODO_LOADING,
	GET_TODOS,
	TODO_ERROR
} from "../actions/actionTypes";

export default function todoReducer(state = { todoAction: {} }, action) {
	switch (action.type) {
		case TODO_LOADING:
			return {
				...state,
				isLoading: true
			};
		case GET_TODOS:
			return {
				...state,
				...action.payload,
				isLoading: false
			};
		case ADD_TODO:
			return {
				...state,
				todoAction: { ...action.payload },
				isLoading: false
			};
		case EDIT_TODO:
			return {
				...state,
				todoAction: { ...action.payload },
				isLoading: false
			};
		case DELETE_TODO:
			return {
				...state,
				todoAction: { ...action.payload },
				isLoading: false
			};
		case TODO_ERROR:
			return {
				...state,
				todoAction: { error: action.payload },
				isLoading: false
			};
		default:
			return state;
	}
}

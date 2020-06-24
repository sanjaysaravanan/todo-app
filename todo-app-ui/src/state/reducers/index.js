import { combineReducers } from "redux";
import authReducer from "./authReducers";
import notifyReducer from "./notifyReducers";
import userReducer from "./userReducer";
import todoReducer from "./todosReducer";
const reducers = combineReducers({
	state: (state = {}) => state,
	auth: authReducer,
	notify: notifyReducer,
	user: userReducer,
	todo: todoReducer
});
const rootReducer = (state, action) => {
	if (action.type === "LOGOUT_SUCCESS") {
		state = undefined;
	}
	return reducers(state, action);
};
export default rootReducer;

import { userInstance } from "../axios.config";

export const loginUser = payload => {
	return userInstance.post("/users/login", payload);
};

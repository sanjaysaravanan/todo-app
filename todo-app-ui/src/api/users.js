import { userInstance } from "../axios.config";

export const createUser = payload => {
	return userInstance.post("/users/create-user", payload);
};

export const getUser = email => {
	return userInstance.get(`/users/${email}`);
};

export const deleteUser = email => {
	return userInstance.delete(`/users/${email}`);
};

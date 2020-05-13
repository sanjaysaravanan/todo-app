import { userInstance } from "../../axios.config";

export const HelloBeanPathService = name => {
	return userInstance.get(`/hello-world/path-variable/${name}`);
};

import { instance } from "./axios";
import { apiUrls } from "./apiUrls";

export const getUsuarios = async () => {
	const { data } = await instance.get(apiUrls.usuarios);
	return data;
};

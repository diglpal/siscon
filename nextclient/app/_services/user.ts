import { instance } from "./axios";
import { apiUrls } from "./apiUrls";

export const getUserInfo = async () => {
	const { data } = await instance.get(apiUrls.recuperarUsuario);
	return data;
};

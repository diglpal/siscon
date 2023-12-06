import { instance } from "./axios";
import { apiUrls } from "./apiUrls";
import { IUser } from "../_interfaces/IUser";

export const authGLPI = async ({
	login,
	password,
}: {
	login: string;
	password?: string;
}) => {
	const { data } = await instance.post(apiUrls.authGLPI, {
		username: login,
		password: password,
	});
	return data;
};

export const obterIncidenciasCentro = async ({
	user,
	centro,
}: {
	user: IUser;
	centro: string;
}) => {
	const { data } = await instance.post(apiUrls.obterIncidenciasCentro, {
		csrf_token: user.glpi_csrf_token,
		cookie: user.glpi_cookie,
		searchform_id: user.glpi_search_id,
		centro: centro,
	});

	return data.data;
};

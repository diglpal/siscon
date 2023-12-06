const axios = require("axios");
import Cookies from "js-cookie";

// Crea una instancia de Axios con la opción withCredentials configurada
export const instance = axios.create({
	withCredentials: true,
});

instance.interceptors.request.use(
	(config: { headers: { authorization: string } }) => {
		const token = Cookies.get("pld");
		if (token) {
			config.headers.authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error: any) => {
		Promise.reject(error);
	}
);

// Add a 401 response interceptor
instance.interceptors.response.use(
	function (response: any) {
		return response;
	},
	function (error: { response: { status: number } }) {
		if (error.response.status === 401) {
			Cookies.remove("pld");
			window.location.href = "/";
		} else if (error.response.status === 429) {
			window.location.href = "/429";
		} else {
			return Promise.reject(error);
		}
	}
);

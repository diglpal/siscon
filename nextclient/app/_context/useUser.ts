import { create } from "zustand";
import Cookies from "js-cookie";
import { IUser } from "../_interfaces/IUser";
import { getUserInfo } from "../_services/user";
import { deleteAllCookies, deleteGLPICookies } from "../_utils/deleteCookies";

interface UseClientState {
	user: IUser | null;
	logIn: (user: IUser) => void;
	logOut: () => void;
	getToken: () => string | undefined;
	getUser: () => Promise<IUser | null>;
	logInGLPI: (user: IUser) => void;
	logoutGLPI: (user: IUser) => void;
}

export const useUser = create<UseClientState>((set, get) => ({
	user: null,
	logIn: (user: IUser) => {
		Cookies.set("pld", user.token);
		Cookies.set("plg", user.grupo);
		set({ user: user });
	},
	logOut: () => {
		set({ user: null });
		deleteAllCookies();
	},
	getToken: () => {
		const token = Cookies.get("pld");
		return token;
	},
	getUser: async () => {
		const token = Cookies.get("pld");
		const glpi_csrf_token = Cookies.get("glpi_csrf");
		const glpi_search_id = Cookies.get("glpi_search_id");
		const glpi_cookie = Cookies.get("glpi_pld");
		const user = {} as IUser;
		if (token) {
			const userRec: IUser = await getUserInfo();
			if (userRec) {
				user.nome = userRec.nome;
				user.grupo = userRec.grupo;
				user.token = token;
				user.usuario = userRec.usuario;
				user.autenticado_glpi = userRec.autenticado_glpi;
				user.glpi_csrf_token = glpi_csrf_token;
				user.glpi_search_id = glpi_search_id;
			}
			if (glpi_cookie) user.glpi_cookie = JSON.parse(glpi_cookie);
			set({ user: user });
			return user;
		}
		return null;
	},
	logInGLPI: (user: IUser) => {
		Cookies.set("glpi_csrf", user.glpi_csrf_token || "");
		Cookies.set("glpi_search_id", user.glpi_search_id || "");
		Cookies.set("glpi_pld", JSON.stringify(user.glpi_cookie) || "");
		user.autenticado_glpi = true;
		set({ user: user });
	},
	logoutGLPI: (user: IUser) => {
		deleteGLPICookies();
		if (user) {
			user.glpi_cookie = undefined;
			user.glpi_csrf_token = undefined;
			user.glpi_search_id = undefined;
			user.autenticado_glpi = false;
			set({ user: user });
		}
	},
}));

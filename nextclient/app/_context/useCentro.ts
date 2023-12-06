import { create } from "zustand";
import { ICentro, IElectronica, ILan, IRack } from "../_interfaces/ICentro";
import {
	doPing,
	getCentro,
	obterElectronicaCentro,
	obterInfoSistemas,
} from "../_services/centros";
import { useUser } from "./useUser";
import { Perfil } from "../_utils/constants";
import { authGLPI, obterIncidenciasCentro } from "../_services/glpi";
import canDoGLPIRequests from "../_utils/canDoGLPIRequests";
import { AxiosError } from "axios";

interface UseCentroState {
	selectedCentro: ICentro | null;
	selectCentro: (centro: ICentro | null) => void;
	getInfoCentro: (centro: ICentro) => void;
	removeSelectedCentro: (centro: ICentro) => void;
	isLoading: boolean;
	setIsLoading: (value: boolean) => void;
	updateCentro: (centro: ICentro) => void;
	addLan: (lan: ILan) => void;
	updateLan: (lan: ILan) => void;
	deleteLan: (lan: ILan) => void;
	obterIncidenciasConexionGLPI: (centro: ICentro) => void;
	comprobarEstadoElectronicaCentro: (centro: ICentro) => void;
	addElectronica: (electronica: IElectronica) => void;
	updateElectronica: (electronica: IElectronica) => void;
	deleteElectronica: (electronica: IElectronica) => void;
	addRack: (rack: IRack) => void;
	updateRack: (oldRack: IRack, updatedRack: IRack) => void;
	deleteRack: (rack: IRack) => void;
}

export const useCentro = create<UseCentroState>((set, get) => ({
	selectedCentro: null,
	isLoading: false,
	setIsLoading: (value: boolean) => {
		set({ isLoading: value });
	},
	selectCentro: (centro: ICentro | null) => {
		set({ selectedCentro: centro });
	},
	getInfoCentro: async (centro: ICentro) => {
		set({ isLoading: true });
		const user = useUser.getState().user;
		centro = await getCentro(centro.id);
		if (
			!centro.infoSistemas &&
			user != null &&
			(user.grupo === Perfil.Admin || user.grupo === Perfil.Sistemas)
		)
			centro.infoSistemas = await obterInfoSistemas(centro.id);
		centro.avarias = await doPing(centro.id);
		if (user) {
			if (!canDoGLPIRequests(user) && user.autenticado_glpi) {
				const { data, error, message } = await authGLPI({
					login: user.usuario,
				});
				const loginGLPI = useUser.getState().logInGLPI;
				user.glpi_cookie = data.glpi_cookie;
				user.glpi_csrf_token = data.glpi_csrf_token;
				user.glpi_search_id = data.glpi_search_id;
				loginGLPI(user);
			}
			if (canDoGLPIRequests(user)) {
				try {
					centro.incidencias = await obterIncidenciasCentro({
						centro: centro.centro,
						user: user,
					});
				} catch (error) {
					const err = error as AxiosError;
					if (err.response?.status === 400) {
						const logoutGLPI = useUser.getState().logoutGLPI;
						logoutGLPI(user);
					}
				}
			}
		}

		set({ selectedCentro: centro });
		set({ isLoading: false });
	},
	removeSelectedCentro: (centro: ICentro) => {
		centro.avarias = [];
		set({ selectedCentro: null });
	},
	updateCentro: (centro: ICentro) => {
		set({ selectedCentro: centro });
	},
	addLan: (lan: ILan) => {
		const { selectedCentro } = get();
		if (selectedCentro) {
			const clonedLans = structuredClone(selectedCentro?.lans);
			clonedLans.push(lan);
			selectedCentro.lans = clonedLans;
			set({ selectedCentro: selectedCentro });
		}
	},
	updateLan: (lan: ILan) => {
		const { selectedCentro } = get();
		if (selectedCentro) {
			const clonedLans = structuredClone(selectedCentro?.lans);
			const lanIndex = clonedLans.findIndex((l) => l.id === lan.id);
			if (lanIndex > -1) clonedLans[lanIndex] = lan;
			selectedCentro.lans = clonedLans;
			set({ selectedCentro: selectedCentro });
		}
	},
	deleteLan: (lan: ILan) => {
		const { selectedCentro } = get();
		if (selectedCentro) {
			const clonedLans = structuredClone(selectedCentro?.lans);
			selectedCentro.lans = clonedLans.filter((l) => l.id !== lan.id);
			set({ selectedCentro: selectedCentro });
		}
	},
	obterIncidenciasConexionGLPI: async (centro: ICentro) => {
		set({ isLoading: true });
		const user = useUser.getState().user;
		const { selectedCentro } = get();
		if (
			user &&
			user.glpi_search_id &&
			user.glpi_csrf_token &&
			user.glpi_search_id &&
			selectedCentro
		) {
			const clonedCentro = structuredClone(selectedCentro);
			clonedCentro.incidencias = await obterIncidenciasCentro({
				centro: centro.centro,
				user: user,
			});

			set({ selectedCentro: clonedCentro });
			set({ isLoading: false });
		}
	},
	comprobarEstadoElectronicaCentro: async (centro: ICentro) => {
		const { selectedCentro } = get();
		if (selectedCentro) {
			set({ isLoading: true });
			const clonedCentro = structuredClone(selectedCentro);
			clonedCentro.electronica = await obterElectronicaCentro(centro.id);
			clonedCentro.electronicaComprobada = true;
			set({ selectedCentro: clonedCentro });
			set({ isLoading: false });
		}
	},
	addElectronica: (electronica: IElectronica) => {
		const { selectedCentro } = get();
		if (selectedCentro) {
			const clonedListado = structuredClone(selectedCentro.electronica);
			clonedListado.push(electronica);
			selectedCentro.electronica = clonedListado;
			set({ selectedCentro: selectedCentro });
		}
	},
	updateElectronica: (electronica: IElectronica) => {
		const { selectedCentro } = get();
		if (selectedCentro) {
			const clonedListado = structuredClone(selectedCentro.electronica);
			const index = clonedListado.findIndex(
				(x) => x.id === electronica.id
			);
			if (index > -1) clonedListado[index] = electronica;
			selectedCentro.electronica = clonedListado;
			set({ selectedCentro: selectedCentro });
		}
	},
	deleteElectronica: (electronica: IElectronica) => {
		const { selectedCentro } = get();
		if (selectedCentro) {
			const clonedLans = structuredClone(selectedCentro.electronica);
			selectedCentro.electronica = clonedLans.filter(
				(x) => x.id !== electronica.id
			);
			set({ selectedCentro: selectedCentro });
		}
	},
	addRack: (rack: IRack) => {
		const { selectedCentro } = get();
		if (selectedCentro) {
			const clonedListado = structuredClone(selectedCentro.racks);
			clonedListado.push(rack);
			selectedCentro.racks = clonedListado;
			set({ selectedCentro: selectedCentro });
		}
	},
	updateRack: (oldRack: IRack, updatedRack: IRack) => {
		const { selectedCentro } = get();
		if (selectedCentro) {
			const clonedListado = structuredClone(selectedCentro.racks);
			const index = clonedListado.findIndex(
				(x) => x.id === updatedRack.id
			);
			if (index > -1) clonedListado[index] = updatedRack;
			selectedCentro.racks = clonedListado;
			const clonedListElectronica = structuredClone(
				selectedCentro.electronica
			);
			for (var i = 0; i < clonedListElectronica.length; i++) {
				if (clonedListElectronica[i].ubicacion == oldRack.nome)
					clonedListElectronica[i].ubicacion = updatedRack.nome;
			}
			selectedCentro.electronica = clonedListElectronica;
			set({ selectedCentro: selectedCentro });
		}
	},
	deleteRack: (rack: IRack) => {
		const { selectedCentro } = get();
		if (selectedCentro) {
			const clonedList = structuredClone(selectedCentro.racks);
			selectedCentro.racks = clonedList.filter((x) => x.id !== rack.id);
			const clonedListElectronica = structuredClone(
				selectedCentro.electronica
			);
			for (var i = 0; i < clonedListElectronica.length; i++) {
				if (clonedListElectronica[i].ubicacion == rack.nome)
					clonedListElectronica[i].ubicacion = "";
			}
			selectedCentro.electronica = clonedListElectronica;
			set({ selectedCentro: selectedCentro });
		}
	},
}));

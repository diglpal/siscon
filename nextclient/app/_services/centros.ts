import { instance } from "./axios";
import { apiUrls } from "./apiUrls";
import {
	ICentro,
	IElectronica,
	IInfoSistemas,
	ILan,
	IRack,
} from "../_interfaces/ICentro";

export const escollerCentro = async (centroId: number) => {
	const { data } = await instance.get(apiUrls.centros + "/" + centroId);
	return data;
};

export const actualizarInfoCentro = async (centro: ICentro) => {
	const { data } = await instance.put(
		apiUrls.infoCentro + "/" + centro.id,
		centro
	);
	return data;
};

export const actualizarInfoSistemasCentro = async (
	centro: ICentro,
	infoSistemas: IInfoSistemas
) => {
	const { data } = await instance.put(
		apiUrls.infoSistemasCentro + "/" + centro.id,
		infoSistemas
	);
	return data;
};

export const buscarCentro = async (search: string) => {
	const { data } = await instance.post(apiUrls.prediccions, {
		centro: search,
	});
	return data;
};

export const getCentro = async (centroId: number) => {
	const { data } = await instance.get(apiUrls.centros + "/" + centroId);
	return data;
};

export const obterLansCentro = async (centroId: number) => {
	const { data } = await instance.get(apiUrls.lansCentro + "/" + centroId);
	return data;
};

export const engadirLanCentro = async (centroId: number, lan: ILan) => {
	const { data } = await instance.post(
		apiUrls.lansCentro + "/" + centroId,
		lan
	);
	return data;
};

export const actualizarLanCentro = async (lanId: number, lan: ILan) => {
	const { data } = await instance.put(apiUrls.lansCentro + "/" + lanId, lan);
	return data;
};

export const borrarLanCentro = async (lanId: number) => {
	const { data } = await instance.delete(apiUrls.lansCentro + "/" + lanId);
	return data;
};

export const doPing = async (centroId: number) => {
	const { data } = await instance.post(apiUrls.doPing + "/" + centroId);
	return data;
};

export const obterInfoSistemas = async (centroId: number) => {
	const { data } = await instance.get(
		apiUrls.infoSistemasCentro + "/" + centroId
	);
	return data;
};

export const obterElectronicaCentro = async (centroId: number) => {
	const { data } = await instance.get(
		apiUrls.electronicaCentro + "/" + centroId
	);
	return data;
};

export const engadirElectronicaCentro = async (
	centroId: number,
	electronica: IElectronica
) => {
	const { data } = await instance.post(
		apiUrls.electronicaCentro + "/" + centroId,
		electronica
	);
	return data;
};

export const actualizarElectronicaCentro = async (
	electronicaId: number,
	electronica: IElectronica
) => {
	const { data } = await instance.put(
		apiUrls.electronicaCentro + "/" + electronicaId,
		electronica
	);
	return data;
};

export const borrarElectronicaCentro = async (electronicaId: number) => {
	const { data } = await instance.delete(
		apiUrls.electronicaCentro + "/" + electronicaId
	);
	return data;
};

export const engadirRackCentro = async (centroId: number, rack: IRack) => {
	const { data } = await instance.post(
		apiUrls.racksCentro + "/" + centroId,
		rack
	);
	return data;
};

export const actualizarRackCentro = async (rackId: number, rack: IRack) => {
	const { data } = await instance.put(
		apiUrls.racksCentro + "/" + rackId,
		rack
	);
	return data;
};

export const borrarRackCentro = async (rackId: number) => {
	const { data } = await instance.delete(apiUrls.racksCentro + "/" + rackId);
	return data;
};

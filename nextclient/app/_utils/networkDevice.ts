import { TipoElectronica } from "./constants";

export function isSwitch(tipo: TipoElectronica) {
	if (
		tipo == TipoElectronica.SWITCH_ABALAR ||
		tipo == TipoElectronica.SWITCH_SIEGA ||
		tipo == TipoElectronica.SWITCH_SECUNDARIO
	)
		return true;
	return false;
}

export function isRackLocated(tipo: TipoElectronica) {
	if (isSwitch(tipo) || tipo == TipoElectronica.ROUTER) return true;
	else return false;
}

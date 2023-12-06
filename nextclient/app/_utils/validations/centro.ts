import { ICentro } from "@/app/_interfaces/ICentro";

export function isFormValided(centro: ICentro) {
	if (centro.centro.trim() !== "") return false;
	if (centro.sf.trim() !== "") return false;
	if (centro.concello.trim() !== "") return false;
}

import React, { useEffect } from "react";
import { useCentro } from "@/app/_context/useCentro";
import Electronica from "./Electronica";
import Estadisticas from "./Estadisticas";
import AvariasDetectadas from "./AvariasDetectadas";

export default function Network() {
	const selectedCentro = useCentro((state) => state.selectedCentro);
	const electronica = useCentro((state) => state.selectedCentro?.electronica);
	const comprobarEstadoElectronicaCentro = useCentro(
		(state) => state.comprobarEstadoElectronicaCentro
	);

	useEffect(() => {
		if (selectedCentro && !selectedCentro.electronicaComprobada)
			comprobarEstadoElectronicaCentro(selectedCentro);
	}, []);

	return (
		<div className="grid grid-cols-[500px_520px] grid-rows-[calc(500px+2rem)] gap-x-4">
			<div className="grid grid-rows-[150px_350px] gap-y-8">
				<Estadisticas electronica={electronica} />
				<AvariasDetectadas
					avarias={electronica?.filter((el) => el.estado !== "up")}
				/>
			</div>
			<Electronica
				electronica={electronica?.sort((a, b) =>
					a.ip.localeCompare(b.ip)
				)}
			/>
		</div>
	);
}

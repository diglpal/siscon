import React from "react";
import Centro from "./Centro";
import { useUser } from "@/app/_context/useUser";
import { Perfil } from "@/app/_utils/constants";
import ElectronicaPrincipal from "./ElectronicaPrincipal";
import GLPI from "./GLPI";
import InfoSistemas from "./InfoSistemas";
import LANsContainer from "../lan/LANsContainer";

export default function Resume() {
	const user = useUser((state) => state.user);
	return (
		<div className="grid grid-cols-[270px_1fr] grid-rows-[calc(500px+2rem)] gap-x-4">
			<Centro />
			{user?.grupo === Perfil.Sistemas || user?.grupo === Perfil.Admin ? (
				<div className="grid grid-cols-[400px_calc(350px-1rem)] grid-rows-[100px_1fr_1fr] gap-4">
					<div className="col-span-2">
						<InfoSistemas />
					</div>
					<div className="row-start-2">
						<LANsContainer />
					</div>
					<div className="row-start-3">
						<ElectronicaPrincipal />
					</div>
					<div className="row-start-2 row-span-2">
						<GLPI />
					</div>
				</div>
			) : (
				<div className="grid grid-cols-[400px_350px] grid-rows-[175px_175px_1fr] gap-4">
					<div className="row-start-1">
						<LANsContainer />
					</div>
					<div className="row-start-2">
						<ElectronicaPrincipal />
					</div>
					<div className="row-start-1 row-span-3">
						<GLPI />
					</div>
				</div>
			)}
		</div>
	);
}

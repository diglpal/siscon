import React from "react";
import { ILan } from "@/app/_interfaces/ICentro";
import "react-toastify/dist/ReactToastify.css";
import { TipoRede } from "@/app/_utils/constants";

interface Props {
	lan: ILan | null;
}

export default function LANFormView({ lan }: Props) {
	return (
		<div className="flex items-end justify-center gap-x-4">
			<div className="flex flex-col gap-y-2">
				<label htmlFor="rango" className="font-medium text-center">
					LAN
				</label>
				<input
					type="text"
					name="rango"
					value={lan?.rango}
					disabled
					className="w-40 border border-solid border-gray-300 h-8 rounded-md px-4 outline-none text-gray-500 font-medium"
				/>
			</div>
			<div className="flex flex-col gap-y-2">
				<label htmlFor="rede" className="font-medium text-center">
					Rede
				</label>
				<select
					name="rede"
					id="rede"
					defaultValue={lan?.rede}
					disabled
					className="border border-solid border-gray-300 rounded-md h-8 px-4 outline-none text-gray-500 font-medium"
				>
					<option value={TipoRede.SEN_DETERMINAR}>
						Sen determinar
					</option>
					<option value={TipoRede.PRINCIPAL}>Rede principal</option>
					<option value={TipoRede.SECUNDARIA}>Rede secundaria</option>
					<option value={TipoRede.EDU_XUNTA_GAL}>
						Rede edu.xunta.gal
					</option>
				</select>
			</div>
			<div className="flex flex-col gap-y-2">
				<label htmlFor="dhcp" className="font-medium text-center">
					DHCP
				</label>
				<select
					name="dhcp"
					id="dhcp"
					defaultValue={lan?.dhcp ? 1 : 0}
					disabled
					className="border border-solid border-gray-300 rounded-md h-8 px-4 outline-none text-gray-500 font-medium"
				>
					<option value={1}>Si</option>
					<option value={0}>Non</option>
				</select>
			</div>
		</div>
	);
}

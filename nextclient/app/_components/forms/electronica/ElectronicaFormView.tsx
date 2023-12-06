import { IElectronica } from "@/app/_interfaces/ICentro";
import { TipoElectronica } from "@/app/_utils/constants";
import React from "react";

interface Props {
	electronica: IElectronica | null;
}
export default function ElectronicaFormView({ electronica }: Props) {
	return (
		<div className="flex items-end justify-center gap-x-4">
			<div className="flex flex-col gap-y-2">
				<label htmlFor="ip" className="font-medium text-center">
					IP
				</label>
				<input
					type="text"
					name="ip"
					value={electronica?.ip}
					disabled
					className="w-40 border border-solid border-gray-300 h-8 rounded-md px-4 outline-none text-gray-500 font-medium"
				/>
			</div>
			<div className="flex flex-col gap-y-2">
				<label htmlFor="tipo" className="font-medium text-center">
					Tipo
				</label>
				<select
					name="tipo"
					disabled
					defaultValue={electronica?.tipo}
					className="border border-solid border-gray-300 rounded-md h-8 px-4 outline-none text-gray-500 font-medium"
				>
					<option value={""}>Sen determinar</option>
					<option value={TipoElectronica.ROUTER}>Router</option>
					<option value={TipoElectronica.SWITCH_ABALAR}>
						SW_Abalar
					</option>
					<option value={TipoElectronica.SWITCH_SIEGA}>
						SW_Siega
					</option>
					<option value={TipoElectronica.SWITCH_SECUNDARIO}>
						Switch
					</option>
					<option value={TipoElectronica.AP_SIEGA}>AP_Siega</option>
					<option value={TipoElectronica.AP_EDU_XUNTA_GAL}>
						AP edu.xunta.gal
					</option>
				</select>
			</div>
			<div className="flex flex-col gap-y-2">
				<label htmlFor="rede" className="font-medium text-center">
					Ubicación
				</label>
				<input
					type="text"
					name="ubicacion"
					maxLength={200}
					value={electronica?.ubicacion}
					disabled
					className="w-40 border border-solid border-gray-300 h-8 rounded-md px-4 outline-none text-gray-500 font-medium"
				/>
			</div>
		</div>
	);
}

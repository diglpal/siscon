import { IIncidencia } from "@/app/_interfaces/ICentro";
import { ESTADOS, PRIORIDADES } from "@/app/_utils/constants";
import React, { useEffect } from "react";
import tippy from "tippy.js";

interface Props {
	incidencia: IIncidencia;
}
export default function ItemGLPI({ incidencia }: Props) {
	function redirectToGLPI() {
		window.open(incidencia.url, "_blank");
	}

	useEffect(() => {
		tippy(`#t${incidencia.ticket}`, {
			content: incidencia.titulo,
			placement: "top",
		});
	});

	return (
		<tr
			className="flex items-center hover:bg-gray-200 cursor-pointer"
			id={`t${incidencia.ticket}`}
			onClick={redirectToGLPI}
		>
			<td className="px-2 py-2 w-2">
				<span
					className={`p-px rounded-full prioridade-span ${
						PRIORIDADES[
							incidencia.prioridade as keyof typeof PRIORIDADES
						]
					}`}
				></span>
			</td>
			<td className="px-2 py-2 whitespace-nowrap overflow-hidden text-ellipsis w-[85%]">
				{incidencia.titulo}
			</td>
			<td className="px-2 py-2 w-2">
				<span
					className={`estado-span  ${
						ESTADOS[incidencia.estado as keyof typeof ESTADOS]
					}`}
				></span>
			</td>
		</tr>
	);
}

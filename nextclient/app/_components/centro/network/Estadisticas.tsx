import React from "react";
import ContainerWrap from "../../container/ContainerWrap";
import { IElectronica } from "@/app/_interfaces/ICentro";
import { TipoElectronica } from "@/app/_utils/constants";
import CustomPieChart from "../../charts/CustomPieChart";
import { isSwitch } from "@/app/_utils/networkDevice";
import { useCentro } from "@/app/_context/useCentro";

interface Props {
	electronica: IElectronica[] | undefined;
}
export default function Estadisticas({ electronica }: Props) {
	const isLoading = useCentro((state) => state.isLoading);

	const xerais_down =
		electronica?.filter((el) => el.estado == "down").length || 0;
	const xerais_up =
		electronica?.filter((el) => el.estado == "up").length || 0;
	const switches_down =
		electronica?.filter(
			(el) => isSwitch(el.tipo as TipoElectronica) && el.estado == "down"
		).length || 0;
	const switches_up =
		electronica?.filter(
			(el) => isSwitch(el.tipo as TipoElectronica) && el.estado == "up"
		).length || 0;
	const aps_down =
		electronica?.filter(
			(el) =>
				el.tipo == TipoElectronica.AP_EDU_XUNTA_GAL &&
				el.estado == "down"
		).length || 0;
	const aps_up =
		electronica?.filter(
			(el) =>
				el.tipo == TipoElectronica.AP_EDU_XUNTA_GAL && el.estado == "up"
		).length || 0;

	return (
		<ContainerWrap>
			<ContainerWrap.Content className="h-full p-2">
				<div className="grid grid-cols-3 justify-center">
					{isLoading ? (
						<>
							{Array.apply(0, Array(3)).map((x, i) => {
								return (
									<div
										key={i}
										className="justify-self-center"
									>
										<div className="h-2 w-full bg-gray-300 animate-pulse rounded-full"></div>
										<div className="mt-4 h-[75px] w-[75px] rounded-full bg-gray-300 animate-pulse flex items-center justify-center">
											<div className="h-[20px] w-[20px] rounded-full bg-white"></div>
										</div>
									</div>
								);
							})}
						</>
					) : (
						<>
							{(xerais_down > 0 || xerais_up > 0) && (
								<div className="justify-self-center">
									<div className="font-medium text-center">
										Toda a electrónica
									</div>
									<CustomPieChart
										down={xerais_down}
										up={xerais_up}
									/>
								</div>
							)}

							{(switches_down > 0 || switches_up > 0) && (
								<div className="justify-self-center">
									<div className="font-medium text-center">
										Switches
									</div>
									<CustomPieChart
										down={switches_down}
										up={switches_up}
									/>
								</div>
							)}

							{(aps_down > 0 || aps_up > 0) && (
								<div className="justify-self-center">
									<div className="font-medium text-center">
										APs edu.xunta.gal
									</div>
									<CustomPieChart
										down={aps_down}
										up={aps_up}
									/>
								</div>
							)}
						</>
					)}
				</div>
			</ContainerWrap.Content>
		</ContainerWrap>
	);
}

import React from "react";
import { useCentro } from "@/app/_context/useCentro";
import ContainerWrap from "../../container/ContainerWrap";
import { IElectronica } from "@/app/_interfaces/ICentro";
import Dispositivo from "./NetworkDeviceItem";
import { ResultadosCargando } from "../../ResultadosCargando";
import NetworkDeviceItem from "./NetworkDeviceItem";

interface Props {
	avarias: IElectronica[] | undefined;
}
const AvariasDetectadas = ({ avarias }: Props) => {
	const isLoading = useCentro((state) => state.isLoading);
	return (
		<ContainerWrap>
			<ContainerWrap.Title title="Avarías detectadas" />
			<ContainerWrap.Content className="px-4 p-2 h-[calc(100%-2.5rem)]">
				<div className="grid grid-cols-3 grid-rows-3 gap-2 justify-between h-fit">
					{avarias &&
						avarias.map((device: IElectronica) => {
							return (
								<NetworkDeviceItem
									key={device.id}
									device={device}
									toggleAddingNewItem={() => {}}
									showButtons={false}
								/>
							);
						})}
					{isLoading && !avarias && (
						<div className="row-start-2 col-start-2">
							<div className="h-12 flex items-center justify-center">
								<img
									src="/icons/loading.gif"
									className="h-full"
								/>
							</div>
						</div>
					)}
					{!avarias ||
						(avarias.length < 1 && !isLoading && (
							<div className="col-span-3 text-center">
								Non se detectaron avarías
							</div>
						))}
				</div>
			</ContainerWrap.Content>
		</ContainerWrap>
	);
};

export default AvariasDetectadas;

import { useCentro } from "@/app/_context/useCentro";
import { IEdificio, IPlanta } from "@/app/_interfaces/ICentro";
import React, { useState } from "react";
import ContainerWrap from "../../container/ContainerWrap";

export default function BuildingPlansView() {
	const edificios = useCentro((state) => state.selectedCentro?.edificios);

	const [selectedPlanta, setSelectedPlanta] = useState(
		edificios && edificios[0].plantas[0]
	);

	const handleSelectPlanta = (planta: IPlanta) => {
		setSelectedPlanta(planta);
	};

	return (
		<div className="grid grid-cols-[350px_670px] grid-rows-[calc(500px+2rem)] gap-x-4">
			<ContainerWrap>
				<ContainerWrap.Content className="h-full flex items-center">
					<div className="flex flex-col gap-y-4 self-center px-8">
						{edificios &&
							edificios.map((edificio: IEdificio) => {
								return (
									<div key={`e${edificio.id}`}>
										<div className="text-left w-52 px-2 py-1 rounded-md font-medium">
											{edificio.nome}
										</div>

										<div className="pl-4 mt-2 flex flex-col gap-y-1">
											{edificio.plantas &&
												edificio.plantas.map(
													(planta: IPlanta) => {
														return (
															<button
																key={`p${planta.id}`}
																className={`text-left w-52 px-2 py-1 rounded-md hover:bg-gray-100 ${
																	selectedPlanta?.id ==
																	planta.id
																		? "bg-gray-200"
																		: ""
																} `}
																onClick={() =>
																	handleSelectPlanta(
																		planta
																	)
																}
															>
																{planta.nome}
															</button>
														);
													}
												)}
										</div>
									</div>
								);
							})}
					</div>
				</ContainerWrap.Content>
			</ContainerWrap>
			<div className="border border-gray-300 rounded-md overflow-hidden">
				<img
					className="w-full h-full object-cover"
					src={selectedPlanta?.plano_url}
					alt="Plano"
				/>
			</div>
		</div>
	);
}

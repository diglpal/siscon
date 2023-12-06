import React from "react";
import TableContainer from "../../container/TableContainer";
import { useCentro } from "@/app/_context/useCentro";
import { ResultadosTablaCargando } from "../../ResultadosCargando";
import ContainerWrap from "../../container/ContainerWrap";

const ElectronicaPrincipal = () => {
	const selectedCentro = useCentro((state) => state.selectedCentro);
	const isLoading = useCentro((state) => state.isLoading);

	return (
		<ContainerWrap>
			<ContainerWrap.Title title="Electrónica principal" />
			<ContainerWrap.Content>
				<TableContainer>
					<table className="rounded-xl w-full relative">
						<tbody>
							{isLoading && !selectedCentro?.avarias ? (
								<ResultadosTablaCargando
									rows={3}
									cols={3}
									height={5}
								/>
							) : (
								<></>
							)}
							{selectedCentro?.avarias &&
								selectedCentro?.avarias.map(
									(avaria: any, index: number) => {
										return (
											<tr
												key={index}
												className="font-medium"
											>
												<td className="py-2.5 px-2 w-2">
													{avaria.resultado ===
													"up" ? (
														<span className="p-px rounded-full bg-green-400"></span>
													) : (
														<span className="p-px rounded-full bg-red-400"></span>
													)}
												</td>
												<td className="py-2.5 px-2">
													{avaria.ip}
												</td>
												<td className="py-2.5 px-2 uppercase text-xs">
													{avaria.resultado}
												</td>
											</tr>
										);
									}
								)}
							{(!isLoading &&
								(!selectedCentro?.avarias ||
									selectedCentro.avarias.length < 1)) ?? (
								<tr>
									<td colSpan={3} className="text-center">
										Non se atoparon incidencias de conexión
										rexistradas
									</td>
								</tr>
							)}
						</tbody>
					</table>
				</TableContainer>
			</ContainerWrap.Content>
		</ContainerWrap>
	);
};

export default ElectronicaPrincipal;

import React, { useState } from "react";
import ContainerWrap from "../../container/ContainerWrap";
import { useCentro } from "@/app/_context/useCentro";
import ModalAuthGLPI from "../../modals/ModalAuthGLPI";
import { useUser } from "@/app/_context/useUser";
import TableContainer from "../../container/TableContainer";
import { IIncidencia } from "@/app/_interfaces/ICentro";
import { ResultadosTablaCargando } from "../../ResultadosCargando";
import ItemGLPI from "../../glpi/ItemGLPI";

export default function GLPI() {
	const selectedCentro = useCentro((state) => state.selectedCentro);
	const isLoading = useCentro((state) => state.isLoading);
	const user = useUser((state) => state.user);

	const [showModalAuthGLPI, setShowModalAuthGLPI] = useState<boolean>(false);

	const toggleModalAuthGLPI = () => {
		setShowModalAuthGLPI(!showModalAuthGLPI);
	};

	return (
		<>
			<ContainerWrap>
				<ContainerWrap.Title title="GLPI" />
				<ContainerWrap.Content className="h-[calc(100%-2.5rem)]">
					{!user || !user.autenticado_glpi ? (
						<div className="w-full h-full flex items-center justify-center">
							<button
								className="rounded-full bg-gray-200 hover:bg-gray-300 py-2 px-5"
								onClick={toggleModalAuthGLPI}
							>
								<div className="flex items-center gap-x-2">
									<div>
										<img
											className="h-4"
											src="/images/glpi.png"
											alt="glpi"
										/>
									</div>
									<div className="font-medium">
										Iniciar sesión
									</div>
								</div>
							</button>
						</div>
					) : (
						<TableContainer>
							<table className="w-full relative table-fixed">
								<tbody>
									{isLoading &&
									!selectedCentro?.incidencias ? (
										<ResultadosTablaCargando
											rows={15}
											cols={1}
											height={4}
										/>
									) : (
										<></>
									)}
									{selectedCentro?.incidencias &&
										selectedCentro?.incidencias.map(
											(
												incidencia: IIncidencia,
												index
											) => {
												return (
													<ItemGLPI
														key={incidencia.ticket}
														incidencia={incidencia}
													/>
												);
											}
										)}
								</tbody>
							</table>
						</TableContainer>
					)}
				</ContainerWrap.Content>
			</ContainerWrap>
			{showModalAuthGLPI ? (
				<ModalAuthGLPI handleCloseModal={toggleModalAuthGLPI} />
			) : (
				<></>
			)}
		</>
	);
}

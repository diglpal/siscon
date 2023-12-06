"use client";
import React, { useEffect, useState } from "react";
import { ResultadosTablaCargando } from "../_components/ResultadosCargando";
import { useCentro } from "../_context/useCentro";
import { ICentro } from "../_interfaces/ICentro";
import Header from "../_components/header/Header";
import { instance } from "../_services/axios";
import { apiUrls } from "../_services/apiUrls";
import { useUser } from "../_context/useUser";
import { redirect } from "next/navigation";
import ModalCentro from "../_components/modals/ModalCentro";

const Dashboard = () => {
	const user = useUser((state) => state.user);
	const getToken = useUser((state) => state.getToken);
	const getUser = useUser((state) => state.getUser);
	const selectedCentro = useCentro((state) => state.selectedCentro);
	const selectCentro = useCentro((state) => state.selectCentro);
	const removeSelectedCentro = useCentro(
		(state) => state.removeSelectedCentro
	);
	const [centros, setCentros] = useState<ICentro[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	const handleCloseModal = () => {
		if (selectedCentro) removeSelectedCentro(selectedCentro);
	};

	const getCentros = async () => {
		setIsLoading(true);
		const { data } = await instance.get(apiUrls.centros);
		setCentros(data);
		setIsLoading(false);
	};

	const handleGetUser = async () => {
		await getUser();
	};

	useEffect(() => {
		if (user) getCentros();
		if (!user) {
			const token = getToken();
			if (token) handleGetUser();
			else redirect("/");
		}
	}, [user]);

	return (
		<>
			<Header />
			<div className="px-20 mt-10">
				<div className="container-wrap rounded-md bg-container-background w-full overflow-auto relative shadow-lg h-[calc(100vh-(2.5rem+8rem))]">
					<table className="rounded-3xl w-full relative">
						<thead>
							<tr className="dashboard-header h-8 w-full [&>*]:bg-primary-color text-white">
								<th className="w-12"></th>
								<th className="text-left px-2 font-medium w-[25%]">
									Concello
								</th>
								<th className="text-left px-2 font-medium">
									Centro
								</th>
								<th className="text-left px-2 font-medium">
									TAP
								</th>
								<th className="text-left px-2 font-medium rounded-r-sm">
									TAR
								</th>
							</tr>
						</thead>
						<tbody>
							{isLoading ? (
								<ResultadosTablaCargando
									rows={19}
									cols={5}
									height={6}
								/>
							) : (
								<></>
							)}
							{!isLoading && centros.length > 0 ? (
								<>
									{centros &&
										centros.map(
											(centro: ICentro, index) => {
												return (
													<tr
														key={centro.id}
														onClick={() => {
															selectCentro(
																centro
															);
														}}
														className="cursor-pointer hover:bg-gray-100"
													>
														<td className="py-2 px-2">
															{index + 1}
														</td>
														<td className="py-2 px-2 whitespace-nowrap overflow-hidden text-ellipsis">
															{centro.concello}
														</td>
														<td className="py-2 px-2 whitespace-nowrap overflow-hidden text-ellipsis">
															{centro.centro}
														</td>
														<td className="py-2 px-2 whitespace-nowrap overflow-hidden text-ellipsis">
															{centro.tap}
														</td>
														<td className="py-2 px-2 whitespace-nowrap overflow-hidden text-ellipsis">
															{centro.tar}
														</td>
													</tr>
												);
											}
										)}
								</>
							) : (
								<></>
							)}
						</tbody>
					</table>
				</div>
			</div>
			{selectedCentro ? (
				<ModalCentro handleCloseModal={handleCloseModal} />
			) : (
				<></>
			)}
		</>
	);
};

export default Dashboard;

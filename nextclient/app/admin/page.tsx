"use client";
import React, { useEffect, useState } from "react";
import { ResultadosTablaCargando } from "../_components/ResultadosCargando";
import Header from "../_components/header/Header";
import { instance } from "../_services/axios";
import { apiUrls } from "../_services/apiUrls";
import { useUser } from "../_context/useUser";
import { redirect } from "next/navigation";
import { IUsuario } from "../_interfaces/IUsuario";
import ModalUsuario from "../_components/modals/ModalUsuario";
import EditIcon from "../_icons/EditIcon";
import TrashIcon from "../_icons/TrashIcon";
import LockIcon from "../_icons/LockIcon";
import ModalEliminarUsuario from "../_components/modals/ModalEliminarUsuario";
import ModalReestablecerContrasinal from "../_components/modals/ModalReestablecerContrasinal";
import { Perfil } from "../_utils/constants";

const Dashboard = () => {
	const user = useUser((state) => state.user);
	const getToken = useUser((state) => state.getToken);
	const getUser = useUser((state) => state.getUser);
	const [usuarios, setUsuarios] = useState<IUsuario[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	const [showModalEditar, setShowModalEditar] = useState(false);
	const [showModalEliminar, setShowModalEliminar] = useState(false);
	const [
		showModalReestablecerContrasinal,
		setShowModalReestablecerContrasinal,
	] = useState(false);
	const [modalUsuario, setModalUsuario] = useState<IUsuario | null>(null);

	const getUsuarios = async () => {
		setIsLoading(true);
		const { data } = await instance.get(apiUrls.usuarios);
		setUsuarios(data);
		setIsLoading(false);
	};

	const handleCloseModal = () => {
		setShowModalEditar(false);
		setShowModalEliminar(false);
		setShowModalReestablecerContrasinal(false);
		setModalUsuario(null);
	};

	const handleUsuarioModal = (usuario: IUsuario | null, modal: string) => {
		setModalUsuario(usuario);
		if (modal === "editar") setShowModalEditar(true);
		else if (modal === "contrasinal")
			setShowModalReestablecerContrasinal(true);
		else if (modal === "eliminar") setShowModalEliminar(true);
	};

	const handleGetUser = async () => {
		await getUser();
	};

	useEffect(() => {
		if (user) getUsuarios();
		if (!user) {
			const token = getToken();
			if (token) handleGetUser();
			else redirect("/");
		}
		if (user && user.grupo !== Perfil.Admin) redirect("/dashboard");
	}, [user]);

	return (
		<>
			<Header />
			<div className="px-14 mt-10">
				<div>
					<button
						className="flex items-center justify-center h-10 px-8 rounded-lg float-right mb-4 bg-primary-color text-white"
						onClick={() => handleUsuarioModal(null, "editar")}
					>
						<div className="flex items-center justify-center font-medium">
							Engadir usuario
						</div>
					</button>
				</div>
				<div className="container-wrap rounded-xl bg-container-background w-full overflow-auto relative shadow-lg h-[calc(100vh-(2.5rem+10rem))]">
					<table className="rounded-3xl w-full relative">
						<thead>
							<tr className="dashboard-header h-10 w-full [&>*]:bg-primary-color text-white">
								<th className="w-12"></th>
								<th className="text-left px-2 font-medium w-[25%]">
									Nome
								</th>
								<th className="text-left px-2 font-medium">
									Usuario
								</th>
								<th className="text-left px-2 font-medium">
									Grupo
								</th>
								<th className="text-center px-2 font-medium rounded-r-sm">
									Accións
								</th>
							</tr>
						</thead>
						<tbody>
							{isLoading ? (
								<ResultadosTablaCargando
									rows={18}
									cols={5}
									height={6}
								/>
							) : (
								<></>
							)}
							{!isLoading && usuarios?.length > 0 ? (
								<>
									{usuarios &&
										usuarios.map(
											(usuario: IUsuario, index) => {
												return (
													<tr key={usuario.id}>
														<td className="py-2.5 px-2">
															{index + 1}
														</td>
														<td className="py-2.5 px-2 whitespace-nowrap overflow-hidden text-ellipsis">
															{usuario.nome}
														</td>
														<td className="py-2.5 px-2 whitespace-nowrap overflow-hidden text-ellipsis">
															{usuario.usuario}
														</td>
														<td className="py-2.5 px-2 whitespace-nowrap overflow-hidden text-ellipsis">
															{usuario.grupo ===
															Perfil.N1 ? (
																"Técnico N1"
															) : (
																<></>
															)}
															{usuario.grupo ===
															Perfil.Sistemas ? (
																"Técnico N2 Sistemas"
															) : (
																<></>
															)}
															{usuario.grupo ===
															Perfil.Aplicacions ? (
																"Técnico N2 Aplicacións"
															) : (
																<></>
															)}
															{usuario.grupo ===
															Perfil.Admin ? (
																"Administrador"
															) : (
																<></>
															)}
														</td>
														<td className="py-2.5 px-2 flex gap-x-1 justify-center">
															<button
																title="Editar usuario"
																className="bg-primary-color p-2 text-white rounded-lg"
																onClick={() =>
																	handleUsuarioModal(
																		usuario,
																		"editar"
																	)
																}
															>
																<EditIcon
																	height={16}
																	width={16}
																	strokeWidth={
																		2
																	}
																/>
															</button>
															<button
																title="Reestablecer contrasinal"
																className="p-2 text-white rounded-lg"
																disabled={
																	!usuario.autenticado
																}
																style={{
																	backgroundColor:
																		usuario.autenticado
																			? "rgba(127, 114, 128)"
																			: "rgba(107, 114, 128, 0.3)",
																}}
																onClick={() =>
																	handleUsuarioModal(
																		usuario,
																		"contrasinal"
																	)
																}
															>
																<LockIcon
																	height={16}
																	width={16}
																	strokeWidth={
																		2
																	}
																/>
															</button>
															<button
																title="Eliminar usuario"
																className="bg-red-400 p-2 text-white rounded-lg"
																onClick={() =>
																	handleUsuarioModal(
																		usuario,
																		"eliminar"
																	)
																}
															>
																<TrashIcon
																	height={16}
																	width={16}
																	strokeWidth={
																		2
																	}
																/>
															</button>
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
			{showModalEditar ? (
				<ModalUsuario
					usuario={modalUsuario}
					handleCloseModal={handleCloseModal}
					setUsuarios={setUsuarios}
				/>
			) : (
				<></>
			)}
			{showModalEliminar ? (
				<ModalEliminarUsuario
					usuario={modalUsuario}
					handleCloseModal={handleCloseModal}
					setUsuarios={setUsuarios}
				/>
			) : (
				<></>
			)}
			{showModalReestablecerContrasinal ? (
				<ModalReestablecerContrasinal
					usuario={modalUsuario}
					handleCloseModal={handleCloseModal}
					setUsuarios={setUsuarios}
				/>
			) : (
				<></>
			)}
		</>
	);
};

export default Dashboard;

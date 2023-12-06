"use client";
import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import { useUser } from "@/app/_context/useUser";
import { authGLPI } from "@/app/_services/glpi";
import { useCentro } from "@/app/_context/useCentro";
import { AxiosError } from "axios";

interface Props {
	handleCloseModal: () => void;
}
export default function ModalAuthGLPI({ handleCloseModal }: Props) {
	const selectedCentro = useCentro((state) => state.selectedCentro);
	const obterIncidenciasConexionGLPICentro = useCentro(
		(state) => state.obterIncidenciasConexionGLPI
	);
	const user = useUser((state) => state.user);
	const getUser = useUser((state) => state.getUser);
	const loginGLPI = useUser((state) => state.logInGLPI);

	const [login, setLogin] = useState<string>();
	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(false);

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		setIsError(false);
		setIsLoading(true);
		const glpiPasswordInput = document.getElementById(
			"contrasinal"
		) as HTMLInputElement;
		const glpiPassword = glpiPasswordInput.value;
		try {
			const { data, error, message } = await authGLPI({
				login: user?.usuario || "",
				password: glpiPassword,
			});
			if (user && selectedCentro) {
				user.glpi_cookie = data.glpi_cookie;
				user.glpi_csrf_token = data.glpi_csrf_token;
				user.glpi_search_id = data.glpi_search_id;
				loginGLPI(user);
				obterIncidenciasConexionGLPICentro(selectedCentro);
			}
			handleCloseModal();
		} catch (error) {
			const err = error as AxiosError;
			if (err.response?.status === 400) {
				setIsError(true);
			}
		}
		setIsLoading(false);
	};

	useEffect(() => {
		if (user == null) getUser();
		if (user != null) setLogin(user.usuario);
	}, [user]);

	return (
		<Modal>
			<Modal.Title title="Iniciar sesión en GLPI" className="text-sm" />
			<Modal.Close
				handleCloseModal={handleCloseModal}
				height={18}
				width={18}
			/>
			<Modal.Content>
				<div className="w-96">
					<div className="mt-4">
						<div>
							<div className="flex justify-center">
								{!isLoading ? (
									<img
										className="h-16"
										src="/icons/profilecircle.png"
										alt=""
									/>
								) : (
									<img
										className="h-20"
										src="/icons/verificado.gif"
										alt=""
									/>
								)}
							</div>
							<div className="font-bold text-sm text-center">
								{user?.usuario}
							</div>
						</div>
						<div>
							<form onSubmit={handleSubmit}>
								<div className="flex flex-col mt-4">
									<label
										htmlFor="contrasinal"
										className="font-medium mb-1 uppercase"
									>
										Contrasinal
									</label>
									<input
										type="password"
										name="contrasinal"
										id="contrasinal"
										className={`border border-solid rounded-md h-10 px-4 outline-none ${
											isError
												? "border-red-400"
												: "border-slate-600"
										}`}
										autoFocus={true}
									/>
								</div>
								<div className="mt-4 w-full">
									<button
										type="submit"
										className="bg-slate-600 rounded-lg h-10 w-full px-10 text-white font-medium"
									>
										Iniciar sesión
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</Modal.Content>
		</Modal>
	);
}

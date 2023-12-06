"use client";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { useUser } from "./_context/useUser";
import { apiUrls } from "./_services/apiUrls";
import { instance } from "./_services/axios";
import UserIcon from "./_icons/UserIcon";
import WarningIcon from "./_icons/WarningIcon";
import LockIcon from "./_icons/LockIcon";
import GithubIcon from "./_icons/GithubIcon";
import { AxiosError } from "axios";
import Error from "./_components/errors/Error";
import CloseIcon from "./_icons/CloseIcon";
import RoundButtonIcon from "./_components/buttons/RoundButtonIcon";

export default function Home() {
	const user = useUser((state) => state.user);
	const logIn = useUser((state) => state.logIn);
	const getUser = useUser((state) => state.getUser);

	const [usuarioExiste, setUsuarioExiste] = useState(false);
	const [usuarioAutenticado, setUsuarioAutenticado] = useState(false);
	const [isError, setIsError] = useState("");
	const [error, setError] = useState("");

	const deleteUserInput = () => {
		const usernameInput = document.getElementById(
			"usuario"
		) as HTMLInputElement;
		usernameInput.value = "";
		setUsuarioExiste(false);
		setUsuarioAutenticado(false);
		setIsError("");
		setError("");
	};

	const handleUserForm = async (e: any) => {
		e.preventDefault();
		const usernameInput = document.getElementById(
			"usuario"
		) as HTMLInputElement;
		const username = usernameInput.value;
		try {
			const res = await instance.post(apiUrls.buscarUsuario, {
				username: username,
			});
			setUsuarioExiste(true);
			setIsError("");
			setUsuarioAutenticado(res.data.autenticado);
		} catch (error) {
			const err = error as AxiosError;
			if (err.response?.status === 404) {
				setUsuarioExiste(false);
				setIsError("username");
				setError("O usuario non está rexistrado");
			}
		}
	};

	const handleRegisterForm = async (e: any) => {
		e.preventDefault();
		const loginInput = document.getElementById(
			"usuario"
		) as HTMLInputElement;
		const novoContrasinalInput = document.getElementById(
			"novo-contrasinal"
		) as HTMLInputElement;
		const repetirNovoContrasinalInput = document.getElementById(
			"repetir-novo-contrasinal"
		) as HTMLInputElement;

		if (
			repetirNovoContrasinalInput.value !== "" &&
			repetirNovoContrasinalInput.value === novoContrasinalInput.value
		) {
			const { data } = await instance.post(apiUrls.login, {
				username: loginInput.value,
				password: novoContrasinalInput.value,
			});
			const { usuario, access_token } = data;
			if (access_token) {
				logIn({
					nome: usuario.nome,
					grupo: usuario.grupo,
					token: access_token,
					usuario: usuario.usuario,
				});
			}
		} else {
			setIsError("password");
			setError("Os contrasinais non coinciden");
		}
	};

	const handleLoginForm = async (e: any) => {
		e.preventDefault();
		const loginInput = document.getElementById(
			"usuario"
		) as HTMLInputElement;
		const contrasinalInput = document.getElementById(
			"contrasinal"
		) as HTMLInputElement;

		const { data } = await instance.post(apiUrls.login, {
			username: loginInput.value,
			password: contrasinalInput.value,
		});

		const { usuario, access_token } = data;
		if (access_token) {
			logIn({
				nome: usuario.nome,
				grupo: usuario.grupo,
				token: access_token,
				usuario: usuario.usuario,
				autenticado_glpi: usuario.autenticado_glpi,
			});
		} else {
			setIsError("password");
			setError("Contrasinal incorrecto");
		}
	};

	useEffect(() => {
		if (!user) getUser();
		if (user) redirect("/dashboard");
	}, [user]);

	return (
		<div className="w-full h-screen relative bg-[url('/images/wave.svg')] bg-no-repeat bg-cover bg-white">
			<div className="w-full h-full flex items-center justify-center">
				<div className="custom-shadow rounded-lg p-8 flex flex-col gap-y-8 min-h-[450px] bg-white">
					<div className="flex items-center gap-x-2">
						<div className="img">
							<img className="h-6" src="favicon.png" alt="" />
						</div>
						<div className="font-bold text-[11px]">SISCON</div>
					</div>
					<div className="w-full h-full flex flex-col items-center justify-center">
						<div className="text-center">
							<div className="text-2xl font-bold uppercase">
								Inicia sesión
							</div>
							<div className="flex flex-col mt-4 gap-y-2">
								<form
									autoComplete="off"
									onSubmit={handleUserForm}
								>
									<div>
										<div
											className="w-96 h-14 border border-solid border-black50 rounded-lg px-3"
											style={
												usuarioExiste
													? {
															backgroundColor:
																"#00000025",
													  }
													: {}
											}
										>
											<div className="flex items-center h-full gap-x-4">
												<UserIcon />
												<input
													className="bg-transparent outline-none font-bold"
													id="usuario"
													type="text"
													maxLength={20}
													placeholder="ue243319"
													ref={(input) =>
														!usuarioExiste &&
														input?.focus()
													}
													disabled={usuarioExiste}
												/>
												{usuarioExiste && (
													<div className="ml-auto">
														<RoundButtonIcon
															icon={
																<CloseIcon
																	height={16}
																	width={16}
																	strokeWidth={
																		2
																	}
																/>
															}
															action={
																deleteUserInput
															}
														/>
													</div>
												)}
											</div>
										</div>
										{isError === "username" && (
											<Error error={error} />
										)}
									</div>
								</form>
								{usuarioExiste && usuarioAutenticado && (
									<form onSubmit={handleLoginForm}>
										<div>
											<div className="w-96 h-14 border border-solid border-black50 rounded-lg px-3">
												<div className="flex items-center h-full gap-x-4">
													<LockIcon />
													<input
														className="bg-transparent outline-none font-bold"
														id="contrasinal"
														type="password"
														placeholder="**************"
														autoFocus={true}
													/>
												</div>
											</div>
											{isError === "password" && (
												<Error error={error} />
											)}
										</div>
									</form>
								)}
								{usuarioExiste && !usuarioAutenticado && (
									<form onSubmit={handleRegisterForm}>
										<div>
											<div className="flex flex-col gap-y-2">
												<div>
													<div className="w-96 h-14 border border-solid border-black50 rounded-lg px-3">
														<div className="flex items-center h-full gap-x-4">
															<LockIcon />
															<input
																className="bg-transparent outline-none font-bold"
																id="novo-contrasinal"
																type="password"
																placeholder="**************"
																autoFocus={true}
															/>
														</div>
													</div>
												</div>
												<div>
													<div className="w-96 h-14 border border-solid border-black50 rounded-lg px-3">
														<div className="flex items-center h-full gap-x-4">
															<LockIcon />
															<input
																className="bg-transparent outline-none font-bold"
																id="repetir-novo-contrasinal"
																type="password"
																placeholder="**************"
															/>
														</div>
													</div>
												</div>
											</div>

											{isError === "password" && (
												<Error error={error} />
											)}
											<input
												type="submit"
												style={{ display: "none" }}
											/>
										</div>
									</form>
								)}
							</div>
						</div>
					</div>
					<div className="mt-auto w-fit">
						<a
							href="https://github.com/diglpal"
							target="_blank"
							className="flex items-center gap-x-1"
						>
							<div>
								<GithubIcon height={16} width={16} />
							</div>
							<div className="font-bold text-[10px]">
								Desarrollado por David
							</div>
						</a>
					</div>
				</div>
			</div>
		</div>
	);
}

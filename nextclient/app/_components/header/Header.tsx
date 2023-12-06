"use client";
import React, { useEffect, useState } from "react";
import MenuUsuario from "./MenuUsuario";
import { useUser } from "@/app/_context/useUser";
import Link from "next/link";
import { Perfil } from "@/app/_utils/constants";
import Search from "./Search";

const Header = () => {
	const [iniciais, setIniciais] = useState("");
	const [showUserMenu, setShowUserMenu] = useState(false);

	const user = useUser((state) => state.user);

	useEffect(() => {
		const nome = user?.nome.split(" ");
		if (nome?.length != undefined && nome?.length > 1)
			setIniciais(nome[0].charAt(0) + nome[1].charAt(0));
		else {
			const letra1 = user?.nome.charAt(0);
			const letra2 = user?.nome.charAt(1);
			if (letra1 && letra2) setIniciais(letra1 + letra2);
		}
	}, [user]);

	return (
		<>
			<header className="bg-primary-color h-[40px]">
				<div className="grid grid-cols-3 items-center px-20 h-[40px]">
					<div className="text-xs flex items-center gap-x-14">
						<div className="flex items-center gap-x-1">
							<div>
								<img
									className="h-8"
									src="favicon_white.png"
									alt=""
								/>
							</div>
							<div className="font-bold text-white text-base">
								SISCON
							</div>
						</div>
						<div>
							<ul className="flex gap-x-4">
								<li>
									<Link
										className="text-white font-medium"
										href="/dashboard"
									>
										Dashboard
									</Link>
								</li>
								{user && user.grupo === Perfil.Admin ? (
									<li>
										<Link
											className="text-white font-medium"
											href="/admin"
										>
											Admin
										</Link>
									</li>
								) : (
									<></>
								)}
							</ul>
						</div>
					</div>
					<Search />
					<div className="ml-auto">
						<div className="flex items-center">
							<div className="font-medium text-white mr-4">
								{user ? (
									<>
										{user.nome}
										{user.grupo === Perfil.Admin &&
											" (Administrador)"}
										{user.grupo === Perfil.Sistemas &&
											" (Técnico Sistemas N2)"}
										{user.grupo === Perfil.Aplicacions &&
											" (Técnico Aplicacións N2)"}
										{user.grupo === Perfil.N1 &&
											" (Técnico N1)"}
									</>
								) : (
									<></>
								)}
							</div>
							<div>
								<button
									onClick={() =>
										setShowUserMenu(!showUserMenu)
									}
									className="h-8 w-8 bg-white rounded-md font-bold"
								>
									{iniciais}
								</button>
							</div>
						</div>
					</div>
				</div>
			</header>
			{showUserMenu ? <MenuUsuario /> : <></>}
		</>
	);
};

export default Header;

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { useUser } from "@/app/_context/useUser";
import LogOutIcon from "@/app/_icons/LogOutIcon";
import { Perfil } from "@/app/_utils/constants";

const MenuUsuario = () => {
	const user = useUser((state) => state.user);
	const logOut = useUser((state) => state.logOut);

	const userMenuRef = useRef<any>(null);

	const closeUserMenuRef = (e: any) => {
		if (userMenuRef.current && !userMenuRef.current.contains(e.target))
			userMenuRef.current.classList.add("hidden");
	};

	useEffect(() => {
		window.addEventListener("mousedown", closeUserMenuRef);
		return () => {
			window.removeEventListener("mousedown", closeUserMenuRef);
		};
	}, []);

	return (
		<div className="absolute top-12 right-14 z-50 px-6" ref={userMenuRef}>
			<div className="bg-white p-4 w-72 h-32 shadow-md rounded-lg">
				<div className="h-full flex flex-col justify-between">
					<div>
						<div className="uppercase text-sm font-bold text-gray-700">
							{user?.nome}
						</div>
						<div className="text-xs uppercase font-bold text-gray-400">
							({user?.grupo === Perfil.N1 ? "Técnico N1" : <></>}
							{user?.grupo === Perfil.Sistemas ? (
								"Técnico N2 Sistemas"
							) : (
								<></>
							)}
							{user?.grupo === Perfil.Aplicacions ? (
								"Técnico N2 Aplicacións"
							) : (
								<></>
							)}
							{user?.grupo === Perfil.Admin ? (
								"Administrador"
							) : (
								<></>
							)}
							)
						</div>
					</div>
					<div>
						<ul>
							<li className="mt-4">
								<Link
									className=" flex items-center gap-x-2 bg-red-400 p-1 px-4 rounded-md w-fit text-white"
									href="/"
									onClick={(e) => {
										e.preventDefault();
										logOut();
									}}
								>
									<span>
										<LogOutIcon
											height={18}
											width={18}
											strokeWidth={2}
										/>
									</span>
									<span className="font-medium">
										Pechar sesión
									</span>
								</Link>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
};

export default MenuUsuario;

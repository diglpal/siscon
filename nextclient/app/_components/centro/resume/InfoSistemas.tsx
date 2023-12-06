"use client";
import React, { useState } from "react";
import ContainerWrap from "../../container/ContainerWrap";
import { useCentro } from "@/app/_context/useCentro";
import { useUser } from "@/app/_context/useUser";
import { Perfil } from "@/app/_utils/constants";
import PencilIcon from "@/app/_icons/PencilIcon";
import { IInfoSistemas } from "@/app/_interfaces/ICentro";
import CloseIcon from "@/app/_icons/CloseIcon";
import CheckIcon from "@/app/_icons/CheckIcon";
import { actualizarInfoSistemasCentro } from "@/app/_services/centros";

export default function InfoSistemas() {
	const user = useUser((state) => state.user);
	const selectedCentro = useCentro((state) => state.selectedCentro);
	const updateCentroState = useCentro((state) => state.updateCentro);

	const [edit, setEdit] = useState(false);
	const [updatedInfoSistemas, setUpdatedInfoSistemas] =
		useState<IInfoSistemas>({
			controladora: "",
			contrasinal_edu_xunta: "",
			contrasinal_siega: "",
		});

	const handleEdit = () => {
		if (selectedCentro) {
			setUpdatedInfoSistemas(selectedCentro?.infoSistemas);
			setEdit(true);
		}
	};

	const handleInputChange = (e: any) => {
		if (e.target.value !== "")
			setUpdatedInfoSistemas({
				...updatedInfoSistemas,
				[e.target.name]: e.target.value,
			});
		else
			setUpdatedInfoSistemas({
				...updatedInfoSistemas,
				[e.target.name]: "",
			});
	};

	const submitUpdateInfoSistemas = async (e: any) => {
		e.preventDefault();
		if (selectedCentro) {
			await actualizarInfoSistemasCentro(
				selectedCentro,
				updatedInfoSistemas
			);
			selectedCentro.infoSistemas = updatedInfoSistemas;
			updateCentroState(selectedCentro);
			setEdit(false);
		}
	};

	return (
		<ContainerWrap>
			<ContainerWrap.Title title="Información sistemas" />
			<ContainerWrap.Content className="px-8">
				{user?.grupo === Perfil.Sistemas ||
				user?.grupo === Perfil.Admin ? (
					<div className="absolute top-2 right-2 flex items-center gap-x-1">
						{!edit ? (
							<button
								className="bg-white rounded-full p-[2px] border border-gray-300 hover:scale-110"
								onClick={handleEdit}
							>
								<PencilIcon
									height={16}
									width={16}
									strokeWidth={2}
								/>
							</button>
						) : (
							<>
								<button
									className="bg-white rounded-full p-[2px] border border-gray-300 hover:scale-110"
									onClick={(e) => setEdit(false)}
								>
									<CloseIcon
										height={16}
										width={16}
										strokeWidth={2}
									/>
								</button>
								<button
									className="bg-white rounded-full p-[2px] border border-gray-300 hover:scale-110"
									onClick={submitUpdateInfoSistemas}
								>
									<CheckIcon
										height={16}
										width={16}
										strokeWidth={2}
									/>
								</button>
							</>
						)}
					</div>
				) : (
					<></>
				)}
				<div className="flex justify-between">
					<div className="flex flex-col gap-y-1 text-center">
						<div className="w-24 font-medium">Controladora</div>
						{!edit ? (
							<div className="font-medium text-gray-500">
								{selectedCentro?.infoSistemas?.controladora}
							</div>
						) : (
							<input
								className="border border-solid border-gray-300 rounded-md h-6 px-4 w-full"
								type="text"
								name="controladora"
								maxLength={50}
								value={updatedInfoSistemas.controladora}
								onChange={handleInputChange}
							/>
						)}
					</div>
					<div className="flex flex-col gap-y-1 text-center">
						<div className="w-24 font-medium">Conmutadores</div>
						{!edit ? (
							<div className="font-medium text-gray-500">
								{
									selectedCentro?.infoSistemas
										?.contrasinal_edu_xunta
								}
							</div>
						) : (
							<input
								className="border border-solid border-gray-300 rounded-md h-6 px-4 w-full"
								type="text"
								name="contrasinal_edu_xunta"
								maxLength={50}
								value={
									updatedInfoSistemas.contrasinal_edu_xunta
								}
								onChange={handleInputChange}
							/>
						)}
					</div>
					<div className="flex flex-col gap-y-1 text-center">
						<div className="w-24 font-medium">Siega</div>
						{!edit ? (
							<div className="font-medium text-gray-500">
								{
									selectedCentro?.infoSistemas
										?.contrasinal_siega
								}
							</div>
						) : (
							<input
								className="border border-solid border-gray-300 rounded-md h-6 px-4 w-full"
								type="text"
								name="contrasinal_siega"
								maxLength={50}
								value={updatedInfoSistemas.contrasinal_siega}
								onChange={handleInputChange}
							/>
						)}
					</div>
				</div>
			</ContainerWrap.Content>
		</ContainerWrap>
	);
}

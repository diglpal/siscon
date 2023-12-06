import React, { useState } from "react";
import { ICentro } from "@/app/_interfaces/ICentro";
import { useCentro } from "@/app/_context/useCentro";
import CloseIcon from "@/app/_icons/CloseIcon";
import CheckIcon from "@/app/_icons/CheckIcon";
import { actualizarInfoCentro } from "@/app/_services/centros";
import ContainerWrap from "../container/ContainerWrap";

interface Props {
	setEdit: React.Dispatch<React.SetStateAction<boolean>>;
}
const InfoCentroForm = ({ setEdit }: Props) => {
	const selectedCentro = useCentro((state) => state.selectedCentro);
	const updateCentroState = useCentro((state) => state.updateCentro);

	const [updatedCentro, setUpdatedCentro] = useState<ICentro>({
		id: selectedCentro?.id || 0,
		centro: selectedCentro?.centro || "",
		sf: selectedCentro?.sf || "",
		concello: selectedCentro?.concello || "",
		infoSistemas: {
			controladora: selectedCentro?.infoSistemas.controladora || "",
			contrasinal_siega:
				selectedCentro?.infoSistemas.contrasinal_siega || "",
			contrasinal_edu_xunta:
				selectedCentro?.infoSistemas.contrasinal_edu_xunta || "",
		},
		tap: selectedCentro?.tap || "",
		tar: selectedCentro?.tar || "",
		comentario: selectedCentro?.comentario || "",
		imaxe: selectedCentro?.imaxe || "",
		avarias: selectedCentro?.avarias || [],
		lans: selectedCentro?.lans || [],
		incidencias: selectedCentro?.incidencias || [],
		electronica: selectedCentro?.electronica || [],
		racks: selectedCentro?.racks || [],
		edificios: selectedCentro?.edificios || [],
		electronicaComprobada: selectedCentro?.electronicaComprobada || false,
	});

	const handleInputChange = (e: any) => {
		if (e.target.value !== "") {
			setUpdatedCentro({
				...updatedCentro,
				[e.target.name]: e.target.value,
			});
		} else {
			setUpdatedCentro({ ...updatedCentro, [e.target.name]: "" });
		}
	};

	const submitUpdatedCentro = async (e: any) => {
		e.preventDefault();
		await actualizarInfoCentro(updatedCentro);
		updateCentroState(updatedCentro);
		setEdit(false);
	};

	return (
		<ContainerWrap>
			<ContainerWrap.Content>
				<div className="absolute top-4 right-4 flex items-center gap-x-1">
					<button
						className="bg-white rounded-full p-[2px] border border-gray-300 hover:scale-110"
						onClick={(e) => setEdit(false)}
					>
						<CloseIcon height={16} width={16} strokeWidth={2} />
					</button>
					<button
						className="bg-white rounded-full p-[2px] border border-gray-300 hover:scale-110"
						onClick={submitUpdatedCentro}
					>
						<CheckIcon height={16} width={16} strokeWidth={2} />
					</button>
				</div>
				<form onSubmit={submitUpdatedCentro}>
					<div className="bg-white p-3 rounded-xl overflow-hidden">
						<div className="h-40">
							<img
								className="h-full w-full rounded-lg"
								src={
									selectedCentro?.imaxe ||
									"/images/scenary2.jpg"
								}
								alt=""
							/>
						</div>
						<div className="mt-8">
							<div className="flex flex-col gap-y-2 text-[11px]">
								<div className="flex justify-between items-center">
									<div className="w-24 font-medium">
										Centro
									</div>
									<div>
										<input
											className="border border-solid border-gray-300 rounded-md h-5 px-2 bg-gray-200"
											type="text"
											name="centro"
											maxLength={300}
											value={updatedCentro.centro}
											onChange={handleInputChange}
											disabled
										/>
									</div>
								</div>
								<div className="flex justify-between items-center">
									<div className="w-24 font-medium">ID</div>
									<div>
										<input
											className="border border-solid border-gray-300 rounded-md h-5 px-2 bg-gray-200"
											type="text"
											name="sf"
											maxLength={15}
											value={updatedCentro.sf}
											onChange={handleInputChange}
											disabled
										/>
									</div>
								</div>
								<div className="flex justify-between items-center">
									<div className="w-24 font-medium">
										Concello
									</div>
									<div>
										<input
											className="border border-solid border-gray-300 rounded-md h-5 px-2 bg-gray-200"
											type="text"
											name="concello"
											maxLength={100}
											value={updatedCentro.concello}
											onChange={handleInputChange}
											disabled
										/>
									</div>
								</div>
								<div className="flex justify-between items-center">
									<div className="w-24 font-medium">TAP</div>
									<div>
										<input
											className="border border-solid border-gray-300 rounded-md h-5 px-2"
											type="text"
											name="tap"
											maxLength={50}
											value={updatedCentro.tap}
											onChange={handleInputChange}
										/>
									</div>
								</div>
								<div className="flex justify-between items-center">
									<div className="w-24 font-medium">TAR</div>
									<div>
										<input
											className="border border-solid border-gray-300 rounded-md h-5 px-2"
											type="text"
											name="tar"
											maxLength={50}
											value={updatedCentro.tar}
											onChange={handleInputChange}
										/>
									</div>
								</div>
								<div className="mt-4 flex flex-col gap-y-2">
									<div className="font-medium whitespace-nowrap">
										Información adicional
									</div>
									<div>
										<textarea
											className="outline-none border border-solid border-gray-300 rounded-md p-2 resize-none w-full"
											name="comentario"
											id="comentario"
											maxLength={1000}
											rows={5}
											value={updatedCentro.comentario}
											onChange={handleInputChange}
										></textarea>
									</div>
								</div>
							</div>
						</div>
					</div>
				</form>
			</ContainerWrap.Content>
		</ContainerWrap>
	);
};

export default InfoCentroForm;

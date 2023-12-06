import { useCentro } from "@/app/_context/useCentro";
import CheckIcon from "@/app/_icons/CheckIcon";
import CloseIcon from "@/app/_icons/CloseIcon";
import PencilIcon from "@/app/_icons/PencilIcon";
import TrashIcon from "@/app/_icons/TrashIcon";
import { ILan } from "@/app/_interfaces/ICentro";
import {
	actualizarLanCentro,
	engadirLanCentro,
	borrarLanCentro,
} from "@/app/_services/centros";
import { Perfil, TipoRede } from "@/app/_utils/constants";
import { isValidLAN } from "@/app/_utils/validations/lan";
import React, { useState } from "react";
import { toast } from "react-toastify";
import ModalConfirmarAccion from "../../modals/ModalConfirmarAccion";
import { useUser } from "@/app/_context/useUser";

interface Props {
	lan: ILan | null;
	toggleAddingNewItem: () => void;
}
export default function LAN({ lan, toggleAddingNewItem }: Props) {
	const user = useUser((state) => state.user);
	const selectedCentro = useCentro((state) => state.selectedCentro);
	const [edit, setEdit] = useState(lan ? false : true);
	const initialState = {
		id: lan?.id || 0,
		centro_id: lan?.centro_id || selectedCentro?.id || 0,
		dhcp: lan?.dhcp || false,
		rango: lan?.rango || "",
		rede: lan?.rede || TipoRede.SEN_DETERMINAR,
	};

	const [updatedLan, setUpdatedLan] = useState<ILan>(initialState);
	const [showConfirmationModal, setShowConfirmationModal] = useState(false);
	const addLanState = useCentro((state) => state.addLan);
	const updateLanState = useCentro((state) => state.updateLan);
	const deleteLanState = useCentro((state) => state.deleteLan);

	const toggleEdit = () => {
		setEdit(!edit);
		setUpdatedLan(lan ? lan : initialState);
		if (!lan) toggleAddingNewItem();
	};

	const handleInputChange = (e: any) => {
		if (e.target.value !== "")
			setUpdatedLan({ ...updatedLan, [e.target.name]: e.target.value });
		else setUpdatedLan({ ...updatedLan, [e.target.name]: "" });
	};

	const handleDhcpChange = (e: any) => {
		if (e.target.value === "0")
			setUpdatedLan({ ...updatedLan, dhcp: false });
		else setUpdatedLan({ ...updatedLan, dhcp: true });
	};

	const submitUpdateLan = async (e: any) => {
		e.preventDefault();
		if (isValidLAN(updatedLan.rango)) {
			await actualizarLanCentro(updatedLan.id, updatedLan);
			updateLanState(updatedLan);
			toggleEdit();
		} else
			toast.warn("LAN inválida. Debe estar no formato xx.xx.xx.xx/xx.", {
				position: toast.POSITION.TOP_RIGHT,
			});
	};

	const submitEngadirLan = async (e: any) => {
		e.preventDefault();
		console.log("here");
		if (isValidLAN(updatedLan.rango)) {
			const data = await engadirLanCentro(
				updatedLan.centro_id,
				updatedLan
			);
			updatedLan.id = data.id;
			addLanState(updatedLan);
			toggleEdit();
		} else
			toast.warn("LAN inválida. Debe estar no formato xx.xx.xx.xx/xx.", {
				position: toast.POSITION.TOP_RIGHT,
			});
	};

	const submitBorrarLan = async () => {
		await borrarLanCentro(updatedLan.id);
		deleteLanState(updatedLan);
		toggleEdit();
	};

	return (
		<>
			<div className="font-medium group px-2">
				{!edit ? (
					<div className="grid grid-cols-[24px_1fr_1fr_64px_48px] items-center gap-x-1">
						<div>
							<span className="p-px rounded-full bg-gray-400"></span>
						</div>
						<div>{lan?.rango}</div>
						<div className="whitespace-nowrap text-ellipsis overflow-hidden">
							{lan?.rede}
						</div>
						<div>
							{lan?.dhcp ? (
								<span>DHCP</span>
							) : (
								<span>SEN DHCP</span>
							)}
						</div>
						{user &&
							(user.grupo == Perfil.Sistemas ||
								user.grupo == Perfil.Admin) && (
								<div className="opacity-0 group-hover:opacity-100 justify-self-end">
									<button
										className="bg-white rounded-full p-[2px] border border-gray-300 shadow-md hover:scale-110"
										onClick={toggleEdit}
									>
										<PencilIcon
											height={16}
											width={16}
											strokeWidth={2}
										/>
									</button>
								</div>
							)}
					</div>
				) : (
					<div className="grid grid-cols-[24px_96px_1fr_64px_48px] items-center gap-x-1">
						<div>
							{lan && (
								<button
									className="bg-white rounded-full p-[2px] border border-gray-300 shadow-md hover:scale-110"
									onClick={() =>
										setShowConfirmationModal(true)
									}
								>
									<TrashIcon
										height={16}
										width={16}
										strokeWidth={2}
									/>
								</button>
							)}
						</div>
						<div>
							<input
								type="text"
								name="rango"
								maxLength={18}
								value={updatedLan.rango}
								onChange={handleInputChange}
								className="w-full border border-solid border-gray-300 rounded-md px-1 outline-none"
							/>
						</div>
						<div>
							<select
								name="rede"
								defaultValue={
									updatedLan.rede || TipoRede.SEN_DETERMINAR
								}
								onChange={handleInputChange}
								className="w-full border border-solid border-gray-300 rounded-md px-2 outline-none"
							>
								<option value={TipoRede.SEN_DETERMINAR}>
									Sen determinar
								</option>
								<option value={TipoRede.PRINCIPAL}>
									Rede principal
								</option>
								<option value={TipoRede.SECUNDARIA}>
									Rede secundaria
								</option>
								<option value={TipoRede.EDU_XUNTA_GAL}>
									Rede edu.xunta.gal
								</option>
							</select>
						</div>
						<div>
							<select
								name="dhcp"
								defaultValue={updatedLan.dhcp ? 1 : 0}
								onChange={handleDhcpChange}
								className="border border-solid border-gray-300 rounded-md px-1 outline-none"
							>
								<option value={1}>Si</option>
								<option value={0}>Non</option>
							</select>
						</div>
						<div className="flex gap-x-1 items-center">
							<button
								className="bg-white rounded-full p-[2px] border border-gray-300 shadow-md hover:scale-110"
								onClick={toggleEdit}
							>
								<CloseIcon
									height={16}
									width={16}
									strokeWidth={2}
								/>
							</button>
							<button
								className="bg-white rounded-full p-[2px] border border-gray-300 shadow-md hover:scale-110"
								onClick={
									lan ? submitUpdateLan : submitEngadirLan
								}
							>
								<CheckIcon
									height={16}
									width={16}
									strokeWidth={2}
								/>
							</button>
						</div>
					</div>
				)}
			</div>
			{showConfirmationModal && (
				<ModalConfirmarAccion
					handleCloseModal={() => setShowConfirmationModal(false)}
					action={submitBorrarLan}
					modalText={"Está seguro de que desexa eliminar esta LAN?"}
					buttonText={"Confirmar"}
					className={"bg-red-400 hover:bg-red-500"}
				/>
			)}
		</>
	);
}

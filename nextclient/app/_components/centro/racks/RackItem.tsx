import AccessPointIcon from "@/app/_icons/AccesPointIcon";
import RouterIcon from "@/app/_icons/RouterIcon";
import { IRack } from "@/app/_interfaces/ICentro";
import {
	Perfil,
	TipoElectronica,
	TipoRack,
	TipoRede,
} from "@/app/_utils/constants";
import React, { useState } from "react";
import PencilIcon from "@/app/_icons/PencilIcon";
import TrashIcon from "@/app/_icons/TrashIcon";
import { useCentro } from "@/app/_context/useCentro";
import {
	actualizarRackCentro,
	engadirRackCentro,
	borrarRackCentro,
} from "@/app/_services/centros";
import CloseIcon from "@/app/_icons/CloseIcon";
import CheckIcon from "@/app/_icons/CheckIcon";
import ModalConfirmarAccion from "../../modals/ModalConfirmarAccion";
import AccessPointDownIcon from "@/app/_icons/AccesPointDownIcon";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { useUser } from "@/app/_context/useUser";

interface Props {
	rack: IRack | null;
	toggleAddingNewItem: () => void;
	selectedRack: IRack | null;
	setSelectedRack: React.Dispatch<React.SetStateAction<IRack | null>>;
	showButtons?: boolean;
}
export default function RackItem({
	rack,
	toggleAddingNewItem,
	selectedRack,
	setSelectedRack,
	showButtons,
}: Props) {
	const user = useUser((state) => state.user);
	const selectedCentro = useCentro((state) => state.selectedCentro);
	const addRackState = useCentro((state) => state.addRack);
	const updateRackState = useCentro((state) => state.updateRack);
	const deleteRackState = useCentro((state) => state.deleteRack);
	const [edit, setEdit] = useState(rack ? false : true);

	const initialState: IRack = {
		id: rack?.id || 0,
		centro_id: rack?.centro_id || selectedCentro?.id || 0,
		tipo: rack?.tipo || TipoElectronica.SEN_DETERMINAR,
		ubicacion: rack?.ubicacion || "",
		nome: rack?.nome || "",
	};

	const [isLoading, setIsLoading] = useState(false);
	const [updatedItem, setUpdatedItem] = useState<IRack>(initialState);
	const [showConfirmationModal, setShowConfirmationModal] = useState(false);

	const handleCloseItem = () => {
		if (rack) {
			const col = document.getElementById(rack.id.toString());
			if (col) col.style.animation = "outAnimation 0.2s ease-out";
		}
		setTimeout(toggleEdit, 200);
	};

	const toggleEdit = () => {
		setEdit(!edit);
		setUpdatedItem(rack ? rack : initialState);
		if (!rack) toggleAddingNewItem();
	};

	const handleInputChange = (e: any) => {
		if (e.target.value !== "")
			setUpdatedItem({
				...updatedItem,
				[e.target.name]: e.target.value,
			});
		else
			setUpdatedItem({
				...updatedItem,
				[e.target.name]: "",
			});
	};

	const submitUpdateItem = async (e: any) => {
		e.preventDefault();
		try {
			if (rack) {
				await actualizarRackCentro(updatedItem.id, updatedItem);
				updateRackState(rack, updatedItem);
				handleCloseItem();
			}
		} catch (error) {
			const err = error as AxiosError;
			if (err.response?.status === 302)
				toast.warn("Xa existe un rack con ese nome para este centro.", {
					position: toast.POSITION.TOP_RIGHT,
				});
		}
	};

	const submitEngadirItem = async (e: any) => {
		e.preventDefault();
		setIsLoading(true);
		if (updatedItem.nome.trim() === "") {
			toast.warn("Debe introducir o nome do rack.", {
				position: toast.POSITION.TOP_RIGHT,
			});
			setIsLoading(false);
			return;
		}
		try {
			const data = await engadirRackCentro(
				updatedItem.centro_id,
				updatedItem
			);
			updatedItem.id = data.id;
			addRackState(updatedItem);
			handleCloseItem();
		} catch (error) {
			const err = error as AxiosError;
			if (err.response?.status === 302)
				toast.warn("Xa existe un rack con ese nome para este centro.", {
					position: toast.POSITION.TOP_RIGHT,
				});
		}
		setIsLoading(false);
	};

	const submitBorrarItem = async (e: any) => {
		e.preventDefault();
		await borrarRackCentro(updatedItem.id);
		deleteRackState(updatedItem);
		toggleEdit();
	};

	function setElectronicaIcon(r: IRack) {
		if (r.tipo == TipoRack.ARMARIO)
			return <AccessPointIcon height={18} width={18} strokeWidth={2} />;
		else if (r.tipo == TipoRack.DE_PAREDE)
			return <RouterIcon height={18} width={18} strokeWidth={2} />;
		else
			return (
				<AccessPointDownIcon height={18} width={18} strokeWidth={2} />
			);
	}

	return (
		<>
			<div className="font-medium group px-2">
				{!edit ? (
					<div
						className="grid grid-cols-[4px_24px_1fr_1fr_1fr_48px] items-center gap-x-1 cursor-pointer"
						onClick={() => setSelectedRack(rack)}
					>
						<div>
							{selectedRack && selectedRack.id == rack?.id && (
								<span className="block h-1 w-1 bg-black rounded-full"></span>
							)}
						</div>
						<div>{rack && setElectronicaIcon(rack)}</div>
						<div>{rack?.nome}</div>
						<div className="whitespace-nowrap text-ellipsis overflow-hidden">
							{rack?.tipo}
						</div>
						<div>{rack?.ubicacion}</div>
						{user &&
							(user.grupo == Perfil.Sistemas ||
								user.grupo == Perfil.Admin) && (
								<div className="opacity-0 group-hover:opacity-100 flex items-center justify-end">
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
					<div className="grid grid-cols-[4px_24px_1fr_1fr_1fr_48px] items-center gap-x-1">
						<div></div>
						<div>
							{rack && (
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
								name="nome"
								placeholder="Rack 1"
								maxLength={50}
								value={updatedItem.nome}
								onChange={handleInputChange}
								className="w-full border border-solid border-gray-300 rounded-md px-1 outline-none"
							/>
						</div>
						<div>
							<select
								name="tipo"
								defaultValue={
									updatedItem.tipo || TipoRack.SEN_DETERMINAR
								}
								onChange={handleInputChange}
								className="w-full border border-solid border-gray-300 rounded-md px-2 outline-none"
							>
								<option value={TipoRack.SEN_DETERMINAR}>
									Sen determinar
								</option>
								<option value={TipoRack.ARMARIO}>
									Armario
								</option>
								<option value={TipoRack.DE_PAREDE}>
									De parede
								</option>
							</select>
						</div>
						<div>
							<input
								type="text"
								name="ubicacion"
								placeholder="Ubicación"
								maxLength={200}
								value={updatedItem.ubicacion}
								onChange={handleInputChange}
								className="w-full border border-solid border-gray-300 rounded-md px-1 outline-none"
							/>
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
								disabled={isLoading}
								onClick={
									rack ? submitUpdateItem : submitEngadirItem
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
					action={submitBorrarItem}
					modalText={"Está seguro de que desexa eliminar este rack?"}
					buttonText={"Confirmar"}
					className={"bg-red-400 hover:bg-red-500"}
				/>
			)}
		</>
	);
}

import React, { useState } from "react";
import { IElectronica } from "@/app/_interfaces/ICentro";
import { useCentro } from "@/app/_context/useCentro";
import SaveIcon from "@/app/_icons/SaveIcon";
import TrashIcon from "@/app/_icons/TrashIcon";
import { isValidIP } from "@/app/_utils/validations/lan";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ModalConfirmarAccion from "../../modals/ModalConfirmarAccion";
import { TipoElectronica } from "@/app/_utils/constants";
import {
	actualizarElectronicaCentro,
	borrarElectronicaCentro,
	engadirElectronicaCentro,
} from "@/app/_services/centros";

interface Props {
	electronica: IElectronica | null;
	handleCloseModal: () => void;
}

export default function ElectronicaForm({
	electronica,
	handleCloseModal,
}: Props) {
	const selectedCentro = useCentro((state) => state.selectedCentro);
	const addElectronicaState = useCentro((state) => state.addElectronica);
	const updateElectronicaState = useCentro(
		(state) => state.updateElectronica
	);
	const deleteElectronicaState = useCentro(
		(state) => state.deleteElectronica
	);

	const [
		modalConfirmarEliminarElectronica,
		setModalConfirmarEliminarElectronica,
	] = useState(false);

	const [updatedElectronica, setUpdatedElectronica] = useState<IElectronica>({
		id: electronica?.id || 0,
		centro_id: electronica?.centro_id || selectedCentro?.id || 0,
		nome: electronica?.nome || "",
		ip: electronica?.ip || "",
		modelo: electronica?.modelo || "",
		tipo: electronica?.tipo || "",
		ubicacion: electronica?.ubicacion || "",
		estado: electronica?.estado || "up",
	});

	const handleInputChange = (e: any) => {
		if (e.target.value !== "")
			setUpdatedElectronica({
				...updatedElectronica,
				[e.target.name]: e.target.value,
			});
		else
			setUpdatedElectronica({
				...updatedElectronica,
				[e.target.name]: "",
			});
	};

	const submitUpdateElectronica = async (e: any) => {
		e.preventDefault();
		if (isValidIP(updatedElectronica.ip)) {
			await actualizarElectronicaCentro(
				updatedElectronica.id,
				updatedElectronica
			);
			updateElectronicaState(updatedElectronica);
			handleCloseModal();
		} else
			toast.warn("IP inválida. Debe estar no formato xx.xx.xx.xx.", {
				position: toast.POSITION.TOP_RIGHT,
			});
	};

	const submitEngadirElectronica = async (e: any) => {
		e.preventDefault();
		if (isValidIP(updatedElectronica.ip)) {
			const data = await engadirElectronicaCentro(
				updatedElectronica.centro_id,
				updatedElectronica
			);
			updatedElectronica.id = data.id;
			addElectronicaState(updatedElectronica);
			handleCloseModal();
		} else
			toast.warn("IP inválida. Debe estar no formato xx.xx.xx.xx.", {
				position: toast.POSITION.TOP_RIGHT,
			});
	};

	const submitBorrarElectronica = async (e: any) => {
		e.preventDefault();
		await borrarElectronicaCentro(updatedElectronica.id);
		deleteElectronicaState(updatedElectronica);
		handleCloseModal();
	};

	function toggleModalConfirmacionEliminarElectronica() {
		setModalConfirmarEliminarElectronica(
			!modalConfirmarEliminarElectronica
		);
	}

	return (
		<>
			<form
				autoComplete="off"
				onSubmit={
					electronica
						? submitUpdateElectronica
						: submitEngadirElectronica
				}
			>
				<div className="flex items-end justify-center gap-x-4">
					<div>
						{electronica != undefined ? (
							<button
								type="button"
								className="bg-red-400 rounded-md h-8 px-1 text-white font-medium"
								onClick={() =>
									toggleModalConfirmacionEliminarElectronica()
								}
							>
								<TrashIcon height={16} strokeWidth={1.5} />
							</button>
						) : (
							<></>
						)}
					</div>
					<div className="flex flex-col gap-y-2">
						<label htmlFor="ip" className="font-medium text-center">
							IP
						</label>
						<input
							type="text"
							name="ip"
							maxLength={15}
							value={updatedElectronica.ip}
							onChange={handleInputChange}
							className="w-40 border border-solid border-gray-300 h-8 rounded-md px-4 outline-none"
						/>
					</div>
					<div className="flex flex-col gap-y-2">
						<label
							htmlFor="tipo"
							className="font-medium text-center"
						>
							Tipo
						</label>
						<select
							name="tipo"
							defaultValue={updatedElectronica.tipo || ""}
							onChange={handleInputChange}
							className="border border-solid border-gray-300 rounded-md h-8 px-4 outline-none"
						>
							<option value={""}>Sen determinar</option>
							<option value={TipoElectronica.ROUTER}>
								Router
							</option>
							<option value={TipoElectronica.SWITCH_ABALAR}>
								SW_Abalar
							</option>
							<option value={TipoElectronica.SWITCH_SIEGA}>
								SW_Siega
							</option>
							<option value={TipoElectronica.SWITCH_SECUNDARIO}>
								Switch
							</option>
							<option value={TipoElectronica.AP_SIEGA}>
								AP_Siega
							</option>
							<option value={TipoElectronica.AP_EDU_XUNTA_GAL}>
								AP edu.xunta.gal
							</option>
						</select>
					</div>
					<div className="flex flex-col gap-y-2">
						<label
							htmlFor="rede"
							className="font-medium text-center"
						>
							Ubicación
						</label>
						<input
							type="text"
							name="ubicacion"
							maxLength={200}
							value={updatedElectronica.ubicacion}
							onChange={handleInputChange}
							className="w-40 border border-solid border-gray-300 h-8 rounded-md px-4 outline-none"
						/>
					</div>
					<div>
						{electronica != undefined ? (
							<button
								onClick={submitUpdateElectronica}
								className="bg-primary-color rounded-md h-8 px-1 text-white font-medium"
							>
								<SaveIcon height={20} strokeWidth={1.5} />
							</button>
						) : (
							<button
								onClick={submitEngadirElectronica}
								className="bg-primary-color rounded-md h-8 px-1 text-white font-medium"
							>
								<SaveIcon height={20} strokeWidth={1.5} />
							</button>
						)}
					</div>
				</div>
				<ToastContainer />
			</form>
			{modalConfirmarEliminarElectronica ? (
				<ModalConfirmarAccion
					handleCloseModal={
						toggleModalConfirmacionEliminarElectronica
					}
					action={submitBorrarElectronica}
					modalText="Está seguro de que desexa eliminar este dispotivo?"
					buttonText="Eliminar"
					className="bg-red-400 hover:bg-red-500"
				/>
			) : (
				<></>
			)}
		</>
	);
}

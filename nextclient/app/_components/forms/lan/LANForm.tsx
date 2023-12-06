import React, { useState } from "react";
import { ILan } from "@/app/_interfaces/ICentro";
import {
	actualizarLanCentro,
	borrarLanCentro,
	engadirLanCentro,
} from "@/app/_services/centros";
import { useCentro } from "@/app/_context/useCentro";
import SaveIcon from "@/app/_icons/SaveIcon";
import TrashIcon from "@/app/_icons/TrashIcon";
import { isValidLAN } from "@/app/_utils/validations/lan";
import { toast, ToastContainer } from "react-toastify";
import ModalConfirmarAccion from "../../modals/ModalConfirmarAccion";
import { TipoRede } from "@/app/_utils/constants";
import { useUser } from "@/app/_context/useUser";

interface Props {
	lan: ILan | null;
	handleCloseModal: () => void;
}

export default function LANForm({ lan, handleCloseModal }: Props) {
	const user = useUser((state) => state.user);
	const selectedCentro = useCentro((state) => state.selectedCentro);
	const addLanState = useCentro((state) => state.addLan);
	const updateLanState = useCentro((state) => state.updateLan);
	const deleteLanState = useCentro((state) => state.deleteLan);

	const [modalConfirmarEliminarLan, setModalConfirmarEliminarLan] =
		useState(false);

	const [updatedLan, setUpdatedLan] = useState({
		id: lan?.id || 0,
		centro_id: lan?.centro_id || selectedCentro?.id || 0,
		rango: lan?.rango || "",
		rede: lan?.rede || TipoRede.SEN_DETERMINAR,
		dhcp: lan?.dhcp || false,
	});

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
			handleCloseModal();
		} else
			toast.warn("LAN inválida. Debe estar no formato xx.xx.xx.xx/xx.", {
				position: toast.POSITION.TOP_RIGHT,
			});
	};

	const submitEngadirLan = async (e: any) => {
		e.preventDefault();
		if (isValidLAN(updatedLan.rango)) {
			const data = await engadirLanCentro(
				updatedLan.centro_id,
				updatedLan
			);
			updatedLan.id = data.id;
			addLanState(updatedLan);
			handleCloseModal();
		} else
			toast.warn("LAN inválida. Debe estar no formato xx.xx.xx.xx/xx.", {
				position: toast.POSITION.TOP_RIGHT,
			});
	};

	const submitBorrarLan = async (e: any) => {
		e.preventDefault();
		await borrarLanCentro(updatedLan.id);
		deleteLanState(updatedLan);
		handleCloseModal();
	};

	function toggleModalConfirmacionEliminarLan() {
		setModalConfirmarEliminarLan(!modalConfirmarEliminarLan);
	}

	return (
		<>
			<form
				autoComplete="off"
				onSubmit={lan ? submitUpdateLan : submitEngadirLan}
			>
				<div className="flex items-end justify-center gap-x-4">
					<div>
						{lan != undefined ? (
							<button
								type="button"
								className="bg-red-400 rounded-md h-8 px-1 text-white font-medium"
								onClick={() =>
									toggleModalConfirmacionEliminarLan()
								}
							>
								<TrashIcon height={16} strokeWidth={1.5} />
							</button>
						) : (
							<></>
						)}
					</div>
					<div className="flex flex-col gap-y-2">
						<label
							htmlFor="rango"
							className="font-medium text-center"
						>
							LAN
						</label>
						<input
							type="text"
							name="rango"
							value={updatedLan.rango}
							onChange={handleInputChange}
							className="w-40 border border-solid border-gray-300 h-8 rounded-md px-4 outline-none"
						/>
					</div>
					<div className="flex flex-col gap-y-2">
						<label
							htmlFor="rede"
							className="font-medium text-center"
						>
							Rede
						</label>
						<select
							name="rede"
							id="rede"
							defaultValue={
								updatedLan.rede || TipoRede.SEN_DETERMINAR
							}
							onChange={handleInputChange}
							className="border border-solid border-gray-300 rounded-md h-8 px-4 outline-none"
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
					<div className="flex flex-col gap-y-2">
						<label
							htmlFor="dhcp"
							className="font-medium text-center"
						>
							DHCP
						</label>
						<select
							name="dhcp"
							id="dhcp"
							defaultValue={updatedLan.dhcp ? 1 : 0}
							onChange={handleDhcpChange}
							className="border border-solid border-gray-300 rounded-md h-8 px-4 outline-none"
						>
							<option value={1}>Si</option>
							<option value={0}>Non</option>
						</select>
					</div>
					<div>
						{lan != undefined ? (
							<button
								onClick={submitUpdateLan}
								className="bg-primary-color rounded-md h-8 px-1 text-white font-medium"
							>
								<SaveIcon height={20} strokeWidth={1.5} />
							</button>
						) : (
							<button
								onClick={submitEngadirLan}
								className="bg-primary-color rounded-md h-8 px-1 text-white font-medium"
							>
								<SaveIcon height={20} strokeWidth={1.5} />
							</button>
						)}
					</div>
				</div>
				<ToastContainer />
			</form>
			{modalConfirmarEliminarLan ? (
				<ModalConfirmarAccion
					handleCloseModal={toggleModalConfirmacionEliminarLan}
					action={submitBorrarLan}
					modalText="Está seguro de que desexa eliminar esta LAN?"
					buttonText="Eliminar"
					className="bg-red-400 hover:bg-red-500"
				/>
			) : (
				<></>
			)}
		</>
	);
}

import AccessPointDownIcon from "@/app/_icons/AccesPointDownIcon";
import AccessPointIcon from "@/app/_icons/AccesPointIcon";
import RouterDownIcon from "@/app/_icons/RouterDownIcon";
import RouterIcon from "@/app/_icons/RouterIcon";
import { IElectronica, IRack } from "@/app/_interfaces/ICentro";
import { Perfil, TipoElectronica } from "@/app/_utils/constants";
import React, { useEffect, useState } from "react";
import PencilIcon from "@/app/_icons/PencilIcon";
import TrashIcon from "@/app/_icons/TrashIcon";
import { useCentro } from "@/app/_context/useCentro";
import {
	actualizarElectronicaCentro,
	engadirElectronicaCentro,
	borrarElectronicaCentro,
} from "@/app/_services/centros";
import { isValidIP } from "@/app/_utils/validations/lan";
import { toast } from "react-toastify";
import CloseIcon from "@/app/_icons/CloseIcon";
import CheckIcon from "@/app/_icons/CheckIcon";
import { isRackLocated } from "@/app/_utils/networkDevice";
import LoaderIcon from "@/app/_icons/LoaderIcon";
import ModalConfirmarAccion from "../../modals/ModalConfirmarAccion";
import { useUser } from "@/app/_context/useUser";

interface Props {
	device: IElectronica | null;
	toggleAddingNewItem: () => void;
	showButtons?: boolean;
}
export default function NetworkDeviceItem({
	device,
	toggleAddingNewItem,
	showButtons,
}: Props) {
	const user = useUser((state) => state.user);
	const selectedCentro = useCentro((state) => state.selectedCentro);
	const racks = useCentro((state) => state.selectedCentro?.racks);
	const addElectronicaState = useCentro((state) => state.addElectronica);
	const updateElectronicaState = useCentro(
		(state) => state.updateElectronica
	);
	const deleteElectronicaState = useCentro(
		(state) => state.deleteElectronica
	);

	const isLoading = useCentro((state) => state.isLoading);

	const [edit, setEdit] = useState(device ? false : true);
	const [view, setView] = useState(false);
	const [animated, setAnimated] = useState(true);
	const [showConfirmationModal, setShowConfirmationModal] = useState(false);

	const initialState: IElectronica = {
		id: device?.id || 0,
		centro_id: device?.centro_id || selectedCentro?.id || 0,
		tipo: device?.tipo || TipoElectronica.SEN_DETERMINAR,
		ip: device?.ip || "",
		ubicacion: device?.ubicacion || "",
		modelo: device?.modelo || "",
		nome: device?.nome || "",
		estado: device?.estado,
	};
	const [updatedDevice, setUpdatedDevice] =
		useState<IElectronica>(initialState);

	const handleCloseNetworkDeviceItem = () => {
		if (device) {
			const col = document.getElementById(device.id.toString());
			if (col) col.style.animation = "outAnimation 0.2s ease-out";
		}
		setTimeout(toggleEdit, 200);
	};

	const handleView = (show: boolean) => {
		if (user?.grupo != Perfil.Admin && user?.grupo != Perfil.Sistemas)
			return;
		setView(show);
		setAnimated(show ? false : true);
	};

	const toggleEdit = (event?: any) => {
		setView(false);
		if (edit) setAnimated(true);
		setEdit(!edit);
		setUpdatedDevice(device ? device : initialState);
		if (!device) toggleAddingNewItem();
		if (event) event.stopPropagation();
	};

	const handleInputChange = (e: any) => {
		if (e.target.value !== "")
			setUpdatedDevice({
				...updatedDevice,
				[e.target.name]: e.target.value,
			});
		else
			setUpdatedDevice({
				...updatedDevice,
				[e.target.name]: "",
			});
	};

	const submitUpdateElectronica = async (e: any) => {
		e.preventDefault();
		if (isValidIP(updatedDevice.ip)) {
			await actualizarElectronicaCentro(updatedDevice.id, updatedDevice);
			updateElectronicaState(updatedDevice);
			handleCloseNetworkDeviceItem();
		} else
			toast.warn("IP inválida. Debe estar no formato xx.xx.xx.xx.", {
				position: toast.POSITION.TOP_RIGHT,
			});
	};

	const submitEngadirElectronica = async (e: any) => {
		e.preventDefault();
		if (isValidIP(updatedDevice.ip)) {
			const data = await engadirElectronicaCentro(
				updatedDevice.centro_id,
				updatedDevice
			);
			updatedDevice.id = data.id;
			addElectronicaState(updatedDevice);
			handleCloseNetworkDeviceItem();
		} else
			toast.warn("IP inválida. Debe estar no formato xx.xx.xx.xx.", {
				position: toast.POSITION.TOP_RIGHT,
			});
	};

	const submitBorrarElectronica = async (e: any) => {
		e.preventDefault();
		await borrarElectronicaCentro(updatedDevice.id);
		deleteElectronicaState(updatedDevice);
		toggleEdit();
	};

	function setElectronicaIcon(el: IElectronica) {
		if (
			el.tipo == TipoElectronica.AP_SIEGA ||
			el.tipo == TipoElectronica.AP_EDU_XUNTA_GAL
		)
			return el.estado == "up" ? (
				<AccessPointIcon height={18} width={18} strokeWidth={2} />
			) : (
				<AccessPointDownIcon height={18} width={18} strokeWidth={2} />
			);
		else
			return el.estado == "up" ? (
				<RouterIcon height={18} width={18} strokeWidth={2} />
			) : (
				<RouterDownIcon height={18} width={18} strokeWidth={2} />
			);
	}

	return (
		<>
			{view && (
				<div
					id={device?.id.toString()}
					className="border border-gray-400 p-2 rounded-md col-span-3"
					style={{ animation: "inAnimation 0.2s ease-in" }}
				>
					<div className="w-full grid grid-cols-[2px_24px_96px_1fr_1fr_48px] items-center gap-x-2">
						<div>
							{!isLoading && device?.estado == "up" && (
								<span className="p-px rounded-full bg-green-400"></span>
							)}
							{!isLoading && device?.estado == "down" && (
								<span className="p-px rounded-full bg-red-400"></span>
							)}
							{!isLoading && !device?.estado && (
								<span className="p-px rounded-full bg-gray-400"></span>
							)}
							{isLoading && (
								<span>
									<svg
										className="animate-spin h-5 w-5 mr-3 ..."
										viewBox="0 0 24 24"
									></svg>
								</span>
							)}
						</div>
						<div>{device && setElectronicaIcon(device)}</div>
						<div>
							<input
								type="text"
								name="ip"
								value={device?.ip}
								disabled
								className="w-full border border-solid border-gray-300 rounded-md px-2 outline-none"
							/>
						</div>
						<div>
							<select
								name="tipo"
								defaultValue={
									device?.tipo ||
									TipoElectronica.SEN_DETERMINAR
								}
								disabled
								className="w-full border border-solid border-gray-300 rounded-md px-2 outline-none"
							>
								<option value={TipoElectronica.SEN_DETERMINAR}>
									Sen determinar
								</option>
								<option value={TipoElectronica.ROUTER}>
									Router
								</option>
								<option value={TipoElectronica.SWITCH_ABALAR}>
									SW_Abalar
								</option>
								<option value={TipoElectronica.SWITCH_SIEGA}>
									SW_Siega
								</option>
								<option
									value={TipoElectronica.SWITCH_SECUNDARIO}
								>
									Switch
								</option>
								<option value={TipoElectronica.AP_SIEGA}>
									AP_Siega
								</option>
								<option
									value={TipoElectronica.AP_EDU_XUNTA_GAL}
								>
									AP edu.xunta.gal
								</option>
							</select>
						</div>
						<div>
							<input
								type="text"
								name="ubicacion"
								placeholder="Ubicación"
								maxLength={200}
								value={device?.ubicacion}
								disabled
								className="w-full border border-solid border-gray-300 rounded-md px-2 outline-none"
							/>
						</div>
						<div
							className={`flex gap-x-1 items-center ${
								showButtons === false ? "justify-end" : ""
							}`}
						>
							<button
								className="bg-white rounded-full p-[2px] border border-gray-300 shadow-md hover:scale-110 z-50"
								onClick={() => handleView(false)}
							>
								<CloseIcon
									height={16}
									width={16}
									strokeWidth={2}
								/>
							</button>
							{showButtons !== false && (
								<button
									className="bg-white rounded-full p-[2px] border border-gray-300 shadow-md hover:scale-110 z-50"
									onClick={toggleEdit}
								>
									<PencilIcon
										height={16}
										width={16}
										strokeWidth={2}
									/>
								</button>
							)}
						</div>
					</div>
				</div>
			)}
			{!edit && !view && (
				<div
					className="group border border-gray-200 hover:border-gray-400 p-2 rounded-md flex items-center cursor-pointer z-0"
					onClick={() => handleView(true)}
				>
					<div className="w-full flex items-center gap-x-2">
						<div>
							{!isLoading && device?.estado == "up" && (
								<span className="p-px rounded-full bg-green-400"></span>
							)}
							{!isLoading && device?.estado == "down" && (
								<span className="p-px rounded-full bg-red-400"></span>
							)}
							{!isLoading && !device?.estado && (
								<span className="p-px rounded-full bg-gray-400"></span>
							)}
							{isLoading && (
								<span className="text-black50">
									<LoaderIcon
										height={18}
										width={18}
										strokeWidth={2}
										classN="animate-spin"
									/>
								</span>
							)}
						</div>
						<div>{device && setElectronicaIcon(device)}</div>
						<div>{device?.ip}</div>
						{showButtons !== false &&
							user &&
							(user.grupo == Perfil.Sistemas ||
								user.grupo == Perfil.Admin) && (
								<div className="opacity-0 group-hover:opacity-100 flex-1 flex items-center justify-end z-50">
									<button
										className="bg-white rounded-full p-[2px] border border-gray-300 shadow-md hover:scale-110 z-50"
										onClick={(e) => toggleEdit(e)}
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
				</div>
			)}
			{edit && (
				<div
					id={device?.id.toString()}
					className="border border-gray-400 p-2 rounded-md col-span-3"
					style={
						animated
							? { animation: "inAnimation 0.2s ease-in" }
							: {}
					}
				>
					<div className="w-full grid grid-cols-[24px_96px_1fr_1fr_48px] items-center gap-x-2">
						{device ? (
							<button
								className="bg-white rounded-full p-[2px] border border-gray-300 shadow-md hover:scale-110 z-50"
								onClick={() => setShowConfirmationModal(true)}
							>
								<TrashIcon
									height={16}
									width={16}
									strokeWidth={2}
								/>
							</button>
						) : (
							<div>{setElectronicaIcon(updatedDevice)}</div>
						)}
						<div>
							<input
								type="text"
								name="ip"
								placeholder="10.10.10.10"
								maxLength={15}
								value={updatedDevice.ip}
								onChange={handleInputChange}
								className="w-full border border-solid border-gray-300 rounded-md px-2 outline-none"
							/>
						</div>
						<div>
							<select
								name="tipo"
								defaultValue={updatedDevice.tipo}
								onChange={handleInputChange}
								className="w-full border border-solid border-gray-300 rounded-md px-2 outline-none"
							>
								<option value={TipoElectronica.SEN_DETERMINAR}>
									Sen determinar
								</option>
								<option value={TipoElectronica.ROUTER}>
									Router
								</option>
								<option value={TipoElectronica.SWITCH_ABALAR}>
									SW_Abalar
								</option>
								<option value={TipoElectronica.SWITCH_SIEGA}>
									SW_Siega
								</option>
								<option
									value={TipoElectronica.SWITCH_SECUNDARIO}
								>
									Switch
								</option>
								<option value={TipoElectronica.AP_SIEGA}>
									AP_Siega
								</option>
								<option
									value={TipoElectronica.AP_EDU_XUNTA_GAL}
								>
									AP edu.xunta.gal
								</option>
							</select>
						</div>
						<div>
							{isRackLocated(
								updatedDevice?.tipo as TipoElectronica
							) ? (
								<select
									name="ubicacion"
									defaultValue={updatedDevice.ubicacion}
									onChange={handleInputChange}
									className="w-full border border-solid border-gray-300 rounded-md px-2 outline-none"
								>
									<option value="">Sen determinar</option>
									{racks &&
										racks.map((rack: IRack) => {
											return (
												<option
													key={rack.id}
													value={rack.nome}
												>
													{rack.nome}
												</option>
											);
										})}
								</select>
							) : (
								<input
									type="text"
									name="ubicacion"
									placeholder="Ubicación"
									maxLength={200}
									value={updatedDevice?.ubicacion}
									onChange={handleInputChange}
									className="w-full border border-solid border-gray-300 rounded-md px-2 outline-none"
								/>
							)}
						</div>
						<div className="flex gap-x-1 items-center">
							<button
								className="bg-white rounded-full p-[2px] border border-gray-300 shadow-md hover:scale-110 z-50"
								onClick={handleCloseNetworkDeviceItem}
							>
								<CloseIcon
									height={16}
									width={16}
									strokeWidth={2}
								/>
							</button>
							<button
								className="bg-white rounded-full p-[2px] border border-gray-300 shadow-md hover:scale-110 z-50"
								onClick={
									device
										? submitUpdateElectronica
										: submitEngadirElectronica
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
				</div>
			)}
			{showConfirmationModal && (
				<ModalConfirmarAccion
					handleCloseModal={() => setShowConfirmationModal(false)}
					action={submitBorrarElectronica}
					modalText={
						"Está seguro de que desexa eliminar este dispositivo?"
					}
					buttonText={"Confirmar"}
					className={"bg-red-400 hover:bg-red-500"}
				/>
			)}
		</>
	);
}

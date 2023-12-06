import React from "react";
import Modal from "./Modal";
import { IUsuario } from "@/app/_interfaces/IUsuario";
import { instance } from "@/app/_services/axios";
import { apiUrls } from "@/app/_services/apiUrls";
import { getUsuarios } from "@/app/_services/usuarios";

interface Props {
	usuario: IUsuario | null;
	handleCloseModal: () => void;
	setUsuarios: React.Dispatch<React.SetStateAction<IUsuario[]>>;
}

const ModalReestablecerContrasinal = ({
	usuario,
	handleCloseModal,
	setUsuarios,
}: Props) => {
	const submitReestablecerContrasinal = async () => {
		await instance.post(apiUrls.actualizarContrasinal, { id: usuario?.id });
		const data = await getUsuarios();
		setUsuarios(data);
		handleCloseModal();
	};

	return (
		<Modal className="w-[400px] 2xl:w-[400px]">
			<Modal.Title title={"Confirmar acción"} className="text-base" />
			<Modal.Close
				handleCloseModal={handleCloseModal}
				height={20}
				width={20}
			/>
			<Modal.Content>
				<div className="text-center">
					Está seguro de que desexa renovarlle o contrasinal ao
					usuario?
				</div>
				<div className="w-full flex gap-x-4 mt-8 justify-center">
					<button
						className="bg-gray-500 hover:bg-gray-600 px-10 py-2 rounded-md text-white"
						onClick={handleCloseModal}
					>
						Cancelar
					</button>
					<button
						className="bg-orange-400 hover:bg-orange-500 px-10 py-2 rounded-md text-white"
						onClick={submitReestablecerContrasinal}
					>
						Reestablecer
					</button>
				</div>
			</Modal.Content>
		</Modal>
	);
};

export default ModalReestablecerContrasinal;

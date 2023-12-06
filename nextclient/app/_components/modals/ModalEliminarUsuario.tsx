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

const ModalEliminarUsuario = ({
	usuario,
	handleCloseModal,
	setUsuarios,
}: Props) => {
	const eliminarUsuario = async () => {
		await instance.post(apiUrls.eliminarUsuario, { id: usuario?.id });
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
					Está seguro de que desexa eliminar ao usuario?
				</div>
				<div className="w-full flex gap-x-4 mt-8 justify-center">
					<button
						className="bg-gray-500 hover:bg-gray-600 px-10 py-2 rounded-md text-white"
						onClick={handleCloseModal}
					>
						Cancelar
					</button>
					<button
						className="bg-red-400 hover:bg-red-500 px-10 py-2 rounded-md text-white"
						onClick={eliminarUsuario}
					>
						Eliminar
					</button>
				</div>
			</Modal.Content>
		</Modal>
	);
};

export default ModalEliminarUsuario;

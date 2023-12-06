import React from "react";
import Modal from "./Modal";
import { IUsuario } from "@/app/_interfaces/IUsuario";
import UsuarioForm from "../forms/UsuarioForm";

interface Props {
	usuario: IUsuario | null;
	handleCloseModal: () => void;
	setUsuarios: React.Dispatch<React.SetStateAction<IUsuario[]>>;
}

const ModalUsuario = ({ usuario, handleCloseModal, setUsuarios }: Props) => {
	return (
		<Modal>
			<Modal.Title title={usuario?.nome || "Engadir novo usuario"} />
			<Modal.Close handleCloseModal={handleCloseModal} />
			<Modal.Content>
				<UsuarioForm
					usuario={usuario}
					handleCloseModal={handleCloseModal}
					setUsuarios={setUsuarios}
				/>
			</Modal.Content>
		</Modal>
	);
};

export default ModalUsuario;

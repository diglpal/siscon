import React from "react";
import Modal from "./Modal";
import LANForm from "../forms/lan/LANForm";
import { ILan } from "@/app/_interfaces/ICentro";
import { useUser } from "@/app/_context/useUser";
import { Perfil } from "@/app/_utils/constants";
import LANFormView from "../forms/lan/LANFormView";

interface Props {
	lan: ILan | null;
	handleCloseModal: () => void;
}

const ModalLAN = ({ lan, handleCloseModal }: Props) => {
	const user = useUser((state) => state.user);
	return (
		<Modal className="w-fit 2xl:w-fit">
			<Modal.Title
				title={lan?.rango || "Engadir nova lan"}
				className="text-sm"
			/>
			<Modal.Close
				handleCloseModal={handleCloseModal}
				height={20}
				width={20}
			/>
			<Modal.Content>
				{user?.grupo == Perfil.Sistemas ||
				user?.grupo == Perfil.Admin ? (
					<LANForm lan={lan} handleCloseModal={handleCloseModal} />
				) : (
					<LANFormView lan={lan} />
				)}
			</Modal.Content>
		</Modal>
	);
};

export default ModalLAN;

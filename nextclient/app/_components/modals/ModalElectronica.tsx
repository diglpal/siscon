import React from "react";
import Modal from "./Modal";
import { IElectronica } from "@/app/_interfaces/ICentro";
import ElectronicaForm from "../forms/electronica/ElectronicaForm";
import { useUser } from "@/app/_context/useUser";
import { Perfil } from "@/app/_utils/constants";
import ElectronicaFormView from "../forms/electronica/ElectronicaFormView";

interface Props {
	electronica: IElectronica | null;
	handleCloseModal: () => void;
}

const ModalElectronica = ({ electronica, handleCloseModal }: Props) => {
	const user = useUser((state) => state.user);
	return (
		<Modal className="w-fit 2xl:w-fit">
			<Modal.Title
				title={electronica?.ip || "Engadir nova electrónica"}
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
					<ElectronicaForm
						electronica={electronica}
						handleCloseModal={handleCloseModal}
					/>
				) : (
					<ElectronicaFormView electronica={electronica} />
				)}
			</Modal.Content>
		</Modal>
	);
};

export default ModalElectronica;

import React from "react";
import Modal from "./Modal";

interface Props {
	handleCloseModal: () => void;
	action: (e: any) => Promise<void>;
	modalText: string;
	buttonText: string;
	className?: string;
}

export default function ModalConfirmarAccion({
	handleCloseModal,
	action,
	modalText,
	buttonText,
	className,
}: Props) {
	return (
		<Modal className="w-[400px] 2xl:w-[400px]">
			<Modal.Title title={"Confirmar acción"} className="text-sm" />
			<Modal.Close
				handleCloseModal={handleCloseModal}
				height={20}
				width={20}
			/>
			<Modal.Content>
				<div className="text-center">{modalText}</div>
				<div className="w-full flex gap-x-4 mt-4 justify-center">
					<button
						className="bg-gray-500 hover:bg-gray-600 px-4 py-1 rounded-md text-white"
						onClick={handleCloseModal}
					>
						Cancelar
					</button>
					<button
						className={`px-4 py-1 rounded-md text-white ${className}`}
						type="button"
						onClick={action}
					>
						{buttonText}
					</button>
				</div>
			</Modal.Content>
		</Modal>
	);
}

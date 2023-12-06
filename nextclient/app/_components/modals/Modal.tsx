import React from "react";
import ModalTitle from "./ModalTitle";
import ModalContent from "./ModalContent";
import ModalClose from "./ModalClose";

interface Props {
	className?: string;
	children: any;
}
export default function Modal({ className, children }: Props) {
	return (
		<div className="modal w-screen h-screen fixed bg-modal-bg top-0 left-0 flex items-center justify-center z-50">
			<div
				className={`relative bg-white rounded-xl opacity-100 w-fit ${className}`}
			>
				{children}
			</div>
		</div>
	);
}

Modal.Title = ModalTitle;
Modal.Close = ModalClose;
Modal.Content = ModalContent;

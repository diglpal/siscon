import CloseIcon from "@/app/_icons/CloseIcon";
import React from "react";

interface Props {
	handleCloseModal: any;
	isLoading?: boolean;
	height?: number;
	width?: number;
}

export default function ModalClose({
	handleCloseModal,
	isLoading,
	height,
	width,
}: Props) {
	return (
		<div className="absolute z-50 top-4 right-4 flex items-center justify-center">
			<button
				className="z-50"
				onClick={handleCloseModal}
				disabled={isLoading}
			>
				<CloseIcon height={height} width={width} />
			</button>
		</div>
	);
}

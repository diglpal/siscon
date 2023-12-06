import React from "react";

interface Props {
	title: string;
	className?: string;
}
export default function ModalTitle({ title, className }: Props) {
	return (
		<div
			className={`font-medium text-lg text-center mt-4 uppercase ${className}`}
		>
			{title}
		</div>
	);
}

import React from "react";

interface Props {
	className?: string;
	children: any;
}
export default function ContainerContent({ className, children }: Props) {
	return (
		<div className={`overflow-auto remove-scrollbar ${className}`}>
			{children}
		</div>
	);
}

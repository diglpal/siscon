import React from "react";

interface Props {
	title: string;
}
export default function ContainerTitle({ title }: Props) {
	return (
		<div className="text-center h-10 flex justify-center items-center gap-x-2">
			<div className="tracking-wide font-medium text-sm">{title}</div>
		</div>
	);
}

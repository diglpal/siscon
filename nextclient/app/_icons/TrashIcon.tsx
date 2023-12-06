import React from "react";

interface Props {
	height?: number;
	width?: number;
	strokeWidth?: number;
	classN?: string;
}
const TrashIcon = ({
	height = 24,
	width = 24,
	strokeWidth = 1,
	classN,
}: Props) => {
	return (
		<svg
			className={classN}
			width={width}
			height={height}
			viewBox={`0 0 24 24`}
			strokeWidth={strokeWidth}
			stroke="currentColor"
			fill="none"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
			<path d="M4 7l16 0"></path>
			<path d="M10 11l0 6"></path>
			<path d="M14 11l0 6"></path>
			<path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"></path>
			<path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"></path>
		</svg>
	);
};

export default TrashIcon;

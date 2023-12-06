import React from "react";

interface Props {
	height?: number;
	width?: number;
	strokeWidth?: number;
	classN?: string;
}
const LockIcon = ({
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
			<path d="M5 13a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v6a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-6z"></path>
			<path d="M11 16a1 1 0 1 0 2 0a1 1 0 0 0 -2 0"></path>
			<path d="M8 11v-4a4 4 0 1 1 8 0v4"></path>
		</svg>
	);
};

export default LockIcon;

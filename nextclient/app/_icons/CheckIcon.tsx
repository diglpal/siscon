import React from "react";

interface Props {
	height?: number;
	width?: number;
	strokeWidth?: number;
	classN?: string;
}
export default function CheckIcon({
	height = 24,
	width = 24,
	strokeWidth = 1,
	classN,
}: Props) {
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
			<path stroke="none" d="M0 0h24v24H0z" fill="none" />
			<path d="M5 12l5 5l10 -10" />
		</svg>
	);
}

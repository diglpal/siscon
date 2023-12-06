import React from "react";

interface Props {
	icon: JSX.Element;
	action: () => void;
	className?: string;
}
export default function RoundButtonIcon({ icon, action, className }: Props) {
	return (
		<div className={`z-50 flex items-center justify-center ${className}`}>
			<button
				className="bg-white rounded-full p-[2px] border border-gray-300 shadow-md hover:scale-110"
				onClick={action}
			>
				{icon}
			</button>
		</div>
	);
}

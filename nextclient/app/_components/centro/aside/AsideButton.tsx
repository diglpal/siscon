import React from "react";
import tippy from "tippy.js";

interface Props {
	icon: JSX.Element;
	view: number;
	isLoading: boolean;
	choosedView: number;
	title?: string;
	handleChooseView: (view: number) => void;
}
export default function AsideButton({
	icon,
	view,
	isLoading,
	choosedView,
	title,
	handleChooseView,
}: Props) {
	tippy(`#${title}`, {
		content: title,
		placement: "right",
	});

	return (
		<button
			id={title}
			className={`rounded-lg flex items-center justify-center h-8 ${
				view === choosedView ? "bg-gray-200" : ""
			} ${!isLoading ? "hover:bg-gray-200" : ""} data-title:bg-red-500`}
			disabled={isLoading}
			onClick={() => handleChooseView(view)}
		>
			{icon}
		</button>
	);
}

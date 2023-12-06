import React from "react";
import ContainerTitle from "./ContainerTitle";
import ContainerContent from "./ContainerContent";

interface Props {
	height?: number;
	children: any;
}
export default function ContainerWrap({ height, children }: Props) {
	return (
		<div
			className="container-wrap rounded-xl bg-container-background w-full h-full overflow-auto relative shadow-lg border border-solid border-gray-300"
			style={{ height: height }}
		>
			{children}
		</div>
	);
}

ContainerWrap.Title = ContainerTitle;
ContainerWrap.Content = ContainerContent;

import React from "react";
import AsideButton from "./AsideButton";

interface Props {
	children: any;
}
export default function Aside({ children }: Props) {
	return <div className="flex flex-col gap-y-4 py-10">{children}</div>;
}

Aside.Button = AsideButton;

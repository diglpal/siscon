import React from "react";
import { SYSTEM_ICONS } from "../_utils/systemIcons";

interface Props {
	icon: string;
}

export default function IconRenderer({ icon }: Props) {
	if (icon in SYSTEM_ICONS)
		//@ts-ignore
		return <div>{SYSTEM_ICONS[icon]}</div>;
	else return <></>;
}

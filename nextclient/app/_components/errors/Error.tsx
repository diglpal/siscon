import WarningIcon from "@/app/_icons/WarningIcon";
import React from "react";

interface Props {
	error: string;
}
export default function Error({ error }: Props) {
	return (
		<div className="flex items-center self-start mt-2.5 ml-1 gap-x-1 text-red-500">
			<span>
				<WarningIcon height={18} width={18} />
			</span>
			<span className="font-bold">{error}</span>
		</div>
	);
}

import React, { useState } from "react";
import InfoCentro from "./InfoCentro";
import InfoCentroForm from "../../forms/InfoCentroForm";

export default function Centro() {
	const [edit, setEdit] = useState(false);

	return (
		<div>
			{!edit ? (
				<InfoCentro setEdit={setEdit} />
			) : (
				<InfoCentroForm setEdit={setEdit} />
			)}
		</div>
	);
}

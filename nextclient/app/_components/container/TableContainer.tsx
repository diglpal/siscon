import React from "react";

const TableContainer = ({ children }: any) => {
	return (
		<div className="overflow-auto remove-scrollbar bg-white">
			{children}
		</div>
	);
};

export default TableContainer;

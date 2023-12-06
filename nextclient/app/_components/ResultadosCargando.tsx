import React from "react";

interface Props {
	rows: number;
	cols: number;
	height: number;
}
export function ResultadosTablaCargando({ rows, cols, height }: Props) {
	return (
		<>
			{Array.apply(0, Array(rows)).map((x, i) => {
				return (
					<tr key={i}>
						{Array.apply(0, Array(cols)).map((x, i) => {
							return (
								<td key={i} className="py-1.5 px-2">
									<div
										className={`animate-pulse bg-gray-200 rounded-full h-${height}`}
									></div>
								</td>
							);
						})}
					</tr>
				);
			})}
		</>
	);
}

export function ResultadosCargando({ rows, cols, height }: Props) {
	return (
		<div className="px-2">
			{Array.apply(0, Array(rows)).map((x, i) => {
				return (
					<div key={i} className="flex justify-between">
						{Array.apply(0, Array(cols)).map((x, i) => {
							return (
								<div
									key={i}
									className="py-1 px-2 w-full h-full"
								>
									<div
										className={`animate-pulse bg-gray-200 rounded-full h-${height}`}
									></div>
								</div>
							);
						})}
					</div>
				);
			})}
		</div>
	);
}

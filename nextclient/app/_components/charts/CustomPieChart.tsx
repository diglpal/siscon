import { PieChart } from "@mui/x-charts";
import React from "react";

interface Props {
	down: number;
	up: number;
}
export default function CustomPieChart({ down, up }: Props) {
	return (
		<PieChart
			height={100}
			width={100}
			series={[
				{
					data: [
						{
							value: down,
							color: "#EB2B2B",
						},
						{
							value: up,
							color: "#25C044",
						},
					],
					innerRadius: 10,
					outerRadius: 36,
					paddingAngle: 5,
					cornerRadius: 5,
					startAngle: -90,
					endAngle: 360,
					cx: 50,
					cy: 50,
				},
			]}
		/>
	);
}

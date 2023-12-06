import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./_components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				"primary-color": "#2596BE",
				"primary-color-hover": "#02377db9",
				"secondary-color": "#c4c4c475",
				"tab-background": "#c4c4c440",
				"text-color": "#000",
				"table-header": "#c4c4c450",
				"table-body": "#fff",
				"container-background": "#fff",
				"button-bg": "#46749e",
				"cell-loading": "#c4c4c425",
				"modal-bg": "#00000050",
				black75: "#00000075",
				black50: "#00000050",
				black25: "#00000025",
				black10: "#00000010",
			},
		},
	},
	plugins: [],
};
export default config;

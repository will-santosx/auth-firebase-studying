/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				midnight: "#121063",
				light: "#E9E9E9",
			},
		},
	},
	plugins: [require("tailwindcss-animated")],
};

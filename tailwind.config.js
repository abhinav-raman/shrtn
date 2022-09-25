/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx}",
		"./src/components/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			transitionProperty: {
				width: "width",
			},
			fontFamily: {
				Josefin: ["Josefin Sans", ...defaultTheme.fontFamily.sans],
			},
		},
	},
	plugins: [],
	darkMode: "class",
};

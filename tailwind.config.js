/** @type {import('tailwindcss').Config} */
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
        josefin: ["Josefin Sans", "sans-serif"],
      }
		},
	},
	plugins: [],
  darkMode: "class"
};

/** @type {import('tailwindcss').Config} */
export default {
	content: [
	  "./index.html",
	  "./src/**/*.{js,ts,jsx,tsx}",
	],
	node:"jit",
	theme: {
	  extend: {
		screens:{
			"1000px":"1050px",
			"1100px":"1110px",
			"800px":"800px",
			"1300px":"1300px",
			"400px":"400px"
		},
		colors:{
			"secondary-100": "#F2EDE9",
			"secondary-200": "#161616",
			"secondary-300": "#88543C",
			"secondary-400": "#F2EDE9"
		}
	  },
	},
	plugins: [],
  }
import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

const config: Config = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				"gradient-conic":
					"conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
				"hero-pattern": "url('/hero.webp')",
			},
			fontFamily: {
				special: ["var(--font-specialElite)", ...fontFamily.sans],
				anton: ["var(--font-anton)", ...fontFamily.sans],
				roboto: ["var(--font-roboto)", ...fontFamily.sans],
			},
		},
	},
	plugins: [require("@tailwindcss/typography")],
};
export default config;

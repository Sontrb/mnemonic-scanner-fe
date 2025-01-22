import { defineConfig } from "windicss/helpers";
import plugin from "windicss/plugin";

export default defineConfig({
	extract: {
		include: [
			"**/*.{jsx,tsx,css}",
			"**/**/*.{jsx,tsx,css}",
			"**/**/**/*.{jsx,tsx,css}",
			"**/**/**/**/*.{jsx,tsx,css}",
		],
		exclude: ["node_modules", ".git", ".next"],
	},
	shortcuts: {
		"btn-green-500":
			"px-4 py-2 bg-green-500 flex items-center justify-center rounded-8px font-semibold font-sans text-14px leading-5",
		"btn-gray-25":
			"px-4 py-2 border-gray-25 bg-gray-25 flex items-center justify-center rounded-8px font-semibold font-sans text-14px text-gray-500 leading-5",
		title: "font-bold text-xl leading-7 text-gray-700",
		"page-container": "w-auto sm:w-760px mt-8 mx-auto bg-gray-0 rounded-xl p-5",
		"page-container-full": "w-auto sm:m-6 m-3 bg-gray-0 rounded-xl p-5",
	},
	darkMode: "class",
	theme: {
		extend: {
			screens: {
				"custom-410": "410px",
			},
			backgroundImage: {
				"download-card-desktop": "url('/images/bg-download-card.png')",
				downloadCardMobile: "url('/images/bg-download-card-mobile.png')",
				authen: 'url("/images/authen-bg.jpg")',
				authen: 'url("/images/authen-bg.jpg")',
				gradientPrimary: "linear-gradient(269deg, #1AF7A9 0%, #08CDDA 100%)",
			},
			fontFamily: {
				sans: ["var(--font-plus)"],
			},
			colors: {
				gray: {
					DEFAULT: "#101624",
					900: "#040404",
					800: "#001529",
					700: "#1e293b",
					600: "#9ea0a7",
					500: "#676767",
					400: "#999999",
					300: "#CFCFCF",
					200: "#E6E6E6",
					100: "#F0F0F0",
				},
				pink: {
					DEFAULT: "#E16EE5",
					900: "#541056",
					800: "#7E1782",
					700: "#A81FAD",
					600: "#DB52E0",
					500: "#E16EE5",
					400: "#E47DE8",
					300: "#EDA9EF",
					200: "#F6D4F7",
					100: "#FBE9FB",
				},
				purple: {
					DEFAULT: "#8F4DE5",
					900: "#2E0D59",
					800: "#451386",
					700: "#5C1AB2",
					600: "#7D30E1",
					500: "#8F4DE5",
					400: "#AB79EC",
					300: "#C7A6F2",
					200: "#E3D2F9",
					100: "#F1E9FC",
				},
				purpleMain: {
					DEFAULT: "#fd9900",
					500: "#fd9900",
				},
				txt: {
					button: "#040404",
					primary: "#FFF",
					secondary: "#6A6A6A",
					tertiary: "#A4A4A4",
					disable: "#E3E3E3",
				},
				surface: {
					bg: "#FFF",
					soft: "#F5F5F5",
					medium: "#E3E3E3",
					hard: "#929292",
					border: "#E3E3E3",
					buttonSecondary: "#F5F5F5",
					purple: "#FBE9FB",
					blue: "#F1E9FC",
					buttonSecondary: "#F5F5F5",
					buttonSecondary: "#F5F5F5",
					buttonSecondary: "#F5F5F5",
				},
				error: {
					DEFAULT: "#E34D4D",
					300: "#E34D4D",
				},
				hightlight: {
					DEFAULT: "#FFDE72",
					300: "#FFDE72",
				},
				base: {
					DEFAULT: "#33cc99",
					300: "#33cc99",
					light: "#33cc99",
				},
				cyanCustome: {
					DEFAULT: "#33cc99",
					light: "#33cc99",
				},
			},
			animation: {
				marquee: "marquee 25s linear infinite",
				marquee2: "marquee2 25s linear infinite",
				loading: "spin 1s linear infinite",
			},
			keyframes: {
				marquee: {
					"0%": { transform: "translateX(0%)" },
					"100%": { transform: "translateX(-100%)" },
				},
				marquee2: {
					"0%": { transform: "translateX(100%)" },
					"100%": { transform: "translateX(0%)" },
				},
				spin: {
					"100%": {
						transform: "rotate(-360deg)",
					},
				},
			},
			boxShadow: {
				DEFAULT: "0px 1px 3px 0px rgba(0, 0, 0, 0.10)",
			},
		},
	},
	plugins: [
		plugin(function ({ addComponents, theme }) {
			const screens = theme("screens", {});
			addComponents([
				{
					".container": { width: "100%" },
				},
				{
					[`@media (min-width: ${screens.sm})`]: {
						".container": {
							"max-width": "540px",
						},
					},
				},
				{
					[`@media (min-width: ${screens.md})`]: {
						".container": {
							"max-width": "720px",
						},
					},
				},
				{
					[`@media (min-width: ${screens.lg})`]: {
						".container": {
							"max-width": "960px",
						},
					},
				},
				{
					[`@media (min-width: ${screens.xl})`]: {
						".container": {
							"max-width": "1140px",
						},
					},
				},
				{
					[`@media (min-width: ${screens["2xl"]})`]: {
						".container": {
							"max-width": "1440px",
						},
					},
				},
			]);
		}),
		require("windicss/plugin/typography")({
			modifiers: ["DEFAULT", "sm", "lg", "red"],
		}),
		require("windicss/plugin/line-clamp"),
		require("windicss/plugin/aspect-ratio"),
	],
});

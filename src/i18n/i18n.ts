"use client";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationEN from "@/locales/en/translation.json";
import translationTh from "@/locales/th/translation.json";
// the translations
const resources = {
	en: {
		translation: translationEN,
	},
	th: {
		translation: translationTh,
	},
};

if (typeof window !== "undefined") {
	i18n
		// .use(Backend)
		.use(initReactI18next)
		.init({
			resources,
			fallbackLng: (code) => {
				let lang = "";
				try {
					lang =
						JSON.parse(JSON.parse((localStorage as any).getItem("persist:root") || "").system).language ||
						"en";
				} catch (e) {
					lang = "en";
				}
				return lang;
			},
			debug: true,
			interpolation: {
				escapeValue: false, // not needed for react as it escapes by default
			},
		});
}

export default i18n;

import { useSelector } from "react-redux";
import dtchStrings from "../constants/dtch.json";
import englishStrings from "../constants/en.json";
import esStrings from "../constants/esp.json";
import frStrings from "../constants/fr.json";
import iltStrings from "../constants/ital.json";
import krStrings from "../constants/kr.json";
import rusStrings from "../constants/rusion.json";

export const useLangStrings = () => {
	const { selectedLang } = useSelector((state) => state?.user);

	const textStrings =
		selectedLang === "en"
			? englishStrings
			: selectedLang === "es"
			? esStrings
			: selectedLang === "fr"
			? frStrings
			: selectedLang === "dtch"
			? dtchStrings
			: selectedLang === "ilt"
			? iltStrings
			: selectedLang === "rus"
			? rusStrings
			: selectedLang === "kr"
			? krStrings
			: englishStrings;
	return { textStrings };
};

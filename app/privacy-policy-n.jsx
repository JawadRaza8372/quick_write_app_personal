import { useRouter } from "expo-router";
import { Dimensions, StyleSheet, View } from "react-native";
import TermsRendror from "../components/TermsRendror";
import TermsTopBar from "../components/TermsTopBar";
import { useLangStrings } from "../hooks/useLangStrings";
import { useThemeColors } from "../hooks/useThemeColors";

const PrivacyPolicy = () => {
	const { textStrings } = useLangStrings();
	const colors = useThemeColors();
	const router = useRouter();
	const styles = StyleSheet.create({
		outerContainer: {
			width: "100%",
			flex: 1,
			backgroundColor: colors.mainBgColor,
			display: "flex",
			flexDirection: "column",
			gap: 15,
		},
		mainContainer: {
			width: Dimensions.get("screen").width - 60,
			alignSelf: "center",
			flex: 1,
		},
		textContainer: {
			backgroundColor: colors.langageBg,
			paddingHorizontal: 18,
			paddingVertical: 22,
			borderRadius: 10,
			width: "100%",
		},
		headingTxt: {
			fontSize: 14,
			fontWeight: "700",
			lineHeight: 22,
			color: colors.successDesc,
		},
		subHeadingTxt: {
			fontSize: 14,
			fontWeight: "400",
			lineHeight: 22,
			color: colors.successDesc,
		},
		sepratorView: {
			width: "100%",
			height: 20,
		},
	});
	return (
		<View style={styles.outerContainer}>
			<TermsTopBar title={textStrings.sidePrivacyLabel} />

			<TermsRendror data={textStrings.privacyPolicyArry} />
		</View>
	);
};

export default PrivacyPolicy;

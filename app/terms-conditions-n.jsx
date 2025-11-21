import { StyleSheet, View } from "react-native";
import TermsRendror from "../components/TermsRendror";
import TermsTopBar from "../components/TermsTopBar";
import { useLangStrings } from "../hooks/useLangStrings";
import { useThemeColors } from "../hooks/useThemeColors";

const TermConditions = () => {
	const colors = useThemeColors();
	const { textStrings } = useLangStrings();
	const styles = StyleSheet.create({
		outerContainer: {
			width: "100%",
			flex: 1,
			backgroundColor: colors.mainBgColor,
			display: "flex",
			flexDirection: "column",
			gap: 15,
		},
	});
	return (
		<View style={styles.outerContainer}>
			<TermsTopBar title={textStrings.termService} />
			<TermsRendror data={textStrings.termsArray} />
		</View>
	);
};

export default TermConditions;

import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import chatLogo from "../assets/images/chatbg.png";
import { useLangStrings } from "../hooks/useLangStrings";
import { useThemeColors } from "../hooks/useThemeColors";

const EmptyComp = () => {
	const { textStrings } = useLangStrings();
	const colors = useThemeColors();
	const styles = StyleSheet.create({
		mainContainer: {
			width: "100%",
			height: Dimensions.get("screen").height / 1.52,
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			flexDirection: "column",
		},
		chatLogoStyle: {
			width: "100%",
			resizeMode: "contain",
			height: Dimensions.get("screen").height / 5,
		},
		btnTxt: {
			fontSize: 14,
			fontWeight: "400",
			color: colors.backColor,
			textAlign: "center",
		},
	});
	return (
		<View style={styles.mainContainer}>
			<Image
				style={styles.chatLogoStyle}
				source={chatLogo}
			/>
			<Text style={styles.btnTxt}>{textStrings.noDataFound}</Text>
		</View>
	);
};

export default EmptyComp;

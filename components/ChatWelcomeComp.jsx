import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import logoImage from "../assets/images/logo.png";
import CustomButton from "../components/CustomButton";
import { useLangStrings } from "../hooks/useLangStrings";
import { useThemeColors } from "../hooks/useThemeColors";

const ChatWelcomeComp = ({ onPressFun }) => {
	const colors = useThemeColors();
	const { textStrings } = useLangStrings();
	const styles = StyleSheet.create({
		textHeadingStyle: {
			fontSize: 32,
			fontWeight: "700",
			textAlign: "center",
			color: colors.mainHeadingColor,
		},
		childContainer: {
			width: "100%",
			height: Dimensions.get("screen").height / 1.8,
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			gap: 15,
			flexDirection: "column",
		},
		logoImageStyle: {
			width: 130,
			height: 130,
			resizeMode: "contain",
		},
		descriptionTxt: {
			color: colors.successDesc,
			fontWeight: "400",
			fontSize: 14,
			lineHeight: 20,
			textAlign: "center",
			marginBottom: 10,
			width: "85%",
			alignSelf: "center",
		},
	});
	return (
		<View style={styles.childContainer}>
			<Image
				style={styles.logoImageStyle}
				source={logoImage}
			/>
			<Text style={styles.textHeadingStyle}>{textStrings.welcomeHeading}</Text>
			<Text style={styles.descriptionTxt}>
				{textStrings?.chatWelcomeDsecription}
			</Text>
			<CustomButton
				btnTitle={textStrings.startChatTxt}
				onPressFun={onPressFun}
			/>
		</View>
	);
};

export default ChatWelcomeComp;

const styles = StyleSheet.create({});

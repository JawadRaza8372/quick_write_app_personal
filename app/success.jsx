import { router, useLocalSearchParams } from "expo-router";
import { Image, StyleSheet, Text, View } from "react-native";
import NextIcon from "../assets/icons/NextIcon";
import logoImage from "../assets/images/logo.png";
import AuthLayout from "../components/AuthLayout";
import CustomButton from "../components/CustomButton";
import { useLangStrings } from "../hooks/useLangStrings";
import { useThemeColors } from "../hooks/useThemeColors";

const Success = () => {
	const { type } = useLocalSearchParams();
	const { textStrings } = useLangStrings();
	//payment
	const colors = useThemeColors();
	const styles = StyleSheet.create({
		textHeadingStyle: {
			fontSize: 32,
			fontWeight: "700",
			textAlign: "center",
			color: colors.mainHeadingColor,
		},
		childContainer: {
			width: "100%",
			height: "100%",
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
		},
	});
	return (
		<AuthLayout varient={"simple"}>
			<View style={styles.childContainer}>
				<Image
					style={styles.logoImageStyle}
					source={logoImage}
				/>
				<Text style={styles.textHeadingStyle}>
					{textStrings.successHeading}
				</Text>
				<Text style={styles.descriptionTxt}>
					{type === "payment"
						? textStrings.joinedSmarterAndFew
						: textStrings.paswwordChangedCongrats}
				</Text>
				<CustomButton
					btnTitle={textStrings.continue}
					BtnIcon={<NextIcon />}
					onPressFun={() => {
						if (type === "payment") {
							router.replace({ pathname: "/(drawer)" });
						} else {
							router.replace({ pathname: "/login" });
						}
					}}
				/>
			</View>
		</AuthLayout>
	);
};

export default Success;

import { router } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import NextIcon from "../assets/icons/NextIcon";
import logoImage from "../assets/images/logo.png";
import AuthLayout from "../components/AuthLayout";
import { useLangStrings } from "../hooks/useLangStrings";
import { useThemeColors } from "../hooks/useThemeColors";
const EmailVerified = () => {
	const { textStrings } = useLangStrings();
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
		mainBtn: {
			width: 49,
			height: 49,
			borderRadius: 10,
			borderWidth: 1,
			borderColor: colors.mainColor,
			backgroundColor: colors.mainColor,
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
		},
		descriptionTxt: {
			color: colors.successDesc,
			fontWeight: "400",
			fontSize: 14,
			lineHeight: 20,
			textAlign: "center",
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
					{textStrings.emailVerifiedHeading}
				</Text>
				<Text style={styles.descriptionTxt}>
					{textStrings.emailVerifiedDesc}
				</Text>
				<TouchableOpacity
					onPress={() => router.replace({ pathname: "/newPassword" })}
					style={styles.mainBtn}>
					<NextIcon />
				</TouchableOpacity>
			</View>
		</AuthLayout>
	);
};

export default EmailVerified;

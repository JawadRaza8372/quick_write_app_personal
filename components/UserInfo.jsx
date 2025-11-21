import { Image, ImageBackground, StyleSheet, Text, View } from "react-native";
import arrow from "../assets/images/tailless-arrow.png";
import userBg from "../assets/images/user-bg.png";

import { useThemeColors } from "../hooks/useThemeColors";
const UserInfo = ({ hideIcon, username, email }) => {
	const colors = useThemeColors();
	const styles = StyleSheet.create({
		mainBgImage: {
			width: "100%",
			height: 110,
			borderRadius: 12,
			overflow: "hidden",
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
		},
		mainContainer: {
			display: "flex",
			alignItems: "center",
			justifyContent: "flex-start",
			flexDirection: "row",
			margin: 15,
			gap: 15,
			height: "70%",
			flex: 1,
		},
		textContainer: {
			display: "flex",
			flexDirection: "column",
			height: "auto",
			flex: 1,
			gap: 1,
		},
		nameTxt: {
			fontSize: 20,
			fontWeight: "600",
			color: colors.darkColorOnly,
			textTransform: "capitalize",
		},
		emailTxt: {
			fontSize: 16,
			fontWeight: "400",
			color: colors.darkColorOnly,
			lineHeight: 22,
			textTransform: "lowercase",
		},
		arrowImage: {
			width: 20,
			height: 20,
			resizeMode: "contain",
		},
	});

	return (
		<ImageBackground
			style={styles.mainBgImage}
			source={userBg}>
			<View style={styles.mainContainer}>
				<View style={styles.textContainer}>
					<Text style={styles.nameTxt}>{username ?? ""}</Text>
					<Text style={styles.emailTxt}>{email ?? ""}</Text>
				</View>
				{!hideIcon ? (
					<Image
						source={arrow}
						style={styles.arrowImage}
					/>
				) : null}
			</View>
		</ImageBackground>
	);
};

export default UserInfo;

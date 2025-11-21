import { ActivityIndicator, Image, StyleSheet, View } from "react-native";
import logoImage from "../assets/images/logo.png";
import AuthLayout from "../components/AuthLayout";
import { useThemeColors } from "../hooks/useThemeColors";

const LoginSuccess = () => {
	const colors = useThemeColors();
	const styles = StyleSheet.create({
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
				<ActivityIndicator
					size={"large"}
					color={colors.mainColor}
				/>
			</View>
		</AuthLayout>
	);
};

export default LoginSuccess;

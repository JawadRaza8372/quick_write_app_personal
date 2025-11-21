import { router } from "expo-router";
import { useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import Toast from "react-native-toast-message";
import emailIcon from "../assets/images/email.png";
import headingEmailImage from "../assets/images/forgot-email.png";
import AuthLayout from "../components/AuthLayout";
import CustomButton from "../components/CustomButton";
import CustomInput from "../components/CustomInput";
import { useLangStrings } from "../hooks/useLangStrings";
import { useThemeColors } from "../hooks/useThemeColors";
import { forgotPasswordApi, isValidEmailFun } from "../services/endpoints";
const ForgotPassword = () => {
	const { textStrings } = useLangStrings();
	const colors = useThemeColors();
	const [formData, setformData] = useState({
		email: "",
	});
	const styles = StyleSheet.create({
		textHeadingStyle: {
			fontSize: 32,
			fontWeight: "700",
			textAlign: "center",
			color: colors.mainHeadingColor,
		},
		mainContainer: {
			width: "100%",
			height: "100%",
			display: "flex",
			alignItems: "center",
			justifyContent: "flex-start",
			flexDirection: "column",
			marginTop: 32,
		},
		logoImage: {
			resizeMode: "contain",
			height: "100%",
			width: "70%",
		},
		descriptionTxt: {
			fontSize: 14,
			fontWeight: "400",
			color: colors.successDesc,
			textAlign: "center",
			marginBottom: 10,
			marginTop: 16,
		},
		mainInputContainer: {
			width: "100%",
			display: "flex",
			alignItems: "center",
			justifyContent: "flex-start",
			flexDirection: "column",
			gap: 35,
		},
		backBtn: {
			height: "100%",
			width: 38,
			display: "flex",
			alignItems: "center",
			justifyContent: "flex-start",
			flexDirection: "row",
		},
		topHeaderView: {
			width: "100%",
			height: 38,
			display: "flex",
			alignItems: "center",
			justifyContent: "space-between",
			flexDirection: "row",
			marginTop: 24,
			marginBottom: 56,
		},
		iconImage: {
			width: 22,
			height: 22,
			resizeMode: "contain",
		},
		forgotEmailImageStyle: {
			width: "100%",
			resizeMode: "contain",
			height: 190,
			marginBottom: 17,
		},
	});
	const customForgotPasswordFun = async () => {
		try {
			if (!isValidEmailFun(formData.email)) {
				Toast.show({
					type: "error",
					text1: textStrings.inValidEmailMessage,
				});
				return;
			}
			const result = await forgotPasswordApi(formData.email);
			if (result) {
				console.log("Forgot password success code:", result?.code);
				router.replace({
					pathname: "/otpVerification",
					params: { dbCode: result?.code, email: formData.email },
				});
			}
		} catch (error) {
			console.log("forgot password failed: ", error);
			Toast.show({
				type: "error",
				text1: error ?? textStrings.forgotPasswordFailed,
			});
		}
	};
	return (
		<AuthLayout
			showTopBar={true}
			varient={"scroll-Forgot"}>
			<View style={styles.mainContainer}>
				<Text style={styles.textHeadingStyle}>
					{textStrings.forgotPasswordHeading}
				</Text>
				<Text style={styles.descriptionTxt}>
					{textStrings.forgotDescription}
				</Text>
				<Image
					style={styles.forgotEmailImageStyle}
					source={headingEmailImage}
				/>
				<View style={styles.mainInputContainer}>
					<CustomInput
						title={textStrings.email}
						value={formData.email}
						onChangeValue={(value) =>
							setformData({ ...formData, email: value })
						}
						placeHolderText={textStrings.enterEmail}
					/>

					<CustomButton
						btnTitle={textStrings.resetPassword}
						btnWidth={"100%"}
						isDisabled={formData.email.length < 5 ? true : false}
						BtnIcon={
							<Image
								style={styles.iconImage}
								source={emailIcon}
							/>
						}
						btnRadius={10}
						onPressFun={customForgotPasswordFun}
					/>
				</View>
			</View>
		</AuthLayout>
	);
};

export default ForgotPassword;

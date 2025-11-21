import { useRouter } from "expo-router";
import { useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import Toast from "react-native-toast-message";
import { useSelector } from "react-redux";
import longLogo from "../assets/images/side-name-logo.png";
import AuthLayout from "../components/AuthLayout";
import CustomButton from "../components/CustomButton";
import CustomInput from "../components/CustomInput";
import { useLangStrings } from "../hooks/useLangStrings";
import { useThemeColors } from "../hooks/useThemeColors";
import { isValidPasswordFun, resetPasswordApi } from "../services/endpoints";
const NewPassword = () => {
	const router = useRouter();
	const { textStrings } = useLangStrings();
	const { resetPasswordToken } = useSelector((state) => state?.user);
	const [formData, setformData] = useState({
		password: "",
		confirmPassword: "",
	});
	const colors = useThemeColors();
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
		},
		logoImage: {
			width: "90%",
			resizeMode: "contain",
			height: 35,
			marginTop: 24,
			marginBottom: 56,
		},

		descriptionTxt: {
			fontSize: 14,
			fontWeight: "400",
			color: colors.successDesc,
			textAlign: "center",
			marginBottom: 47,
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
	});
	const customResetPasswordFun = async () => {
		try {
			if (!isValidPasswordFun(formData.password)) {
				Toast.show({
					type: "error",
					text1: textStrings.passwordLengthMessage,
				});
				return;
			}
			if (!isValidPasswordFun(formData.confirmPassword)) {
				Toast.show({
					type: "error",
					text1: textStrings.confirmPasswordLengthMessage,
				});
				return;
			}
			if (formData.confirmPassword !== formData.password) {
				Toast.show({
					type: "error",
					text1: textStrings.bothFieldSamePassword,
				});
				return;
			}
			const result = await resetPasswordApi(
				formData.password,
				resetPasswordToken
			);
			if (result) {
				console.log("Reset Password success");
				Toast.show({
					type: "success",
					text1: textStrings.passwordResetSuccess,
				});
				setTimeout(() => {
					router.replace({
						pathname: "/success",
					});
				}, 800);
			}
		} catch (error) {
			console.log("Reset Password failed: ", error);
			Toast.show({
				type: "error",
				text1: error ?? textStrings.resetPasswordFailed,
			});
		}
	};
	return (
		<AuthLayout varient={"scroll-simple"}>
			<View style={styles.mainContainer}>
				<Image
					source={longLogo}
					style={styles.logoImage}
				/>
				<Text style={styles.textHeadingStyle}>
					{textStrings.setNewPasswordHeading}
				</Text>
				<Text style={styles.descriptionTxt}>Create a new password.</Text>
				<View style={styles.mainInputContainer}>
					<CustomInput
						title={textStrings.newPassword}
						isPasswordType={true}
						placeHolderText={textStrings.enterPassword}
						value={formData.password}
						onChangeValue={(value) =>
							setformData({ ...formData, password: value })
						}
					/>
					<CustomInput
						title={textStrings.confirmPassword}
						isPasswordType={true}
						placeHolderText={textStrings.reEnterPassword}
						value={formData.confirmPassword}
						onChangeValue={(value) =>
							setformData({ ...formData, confirmPassword: value })
						}
					/>
					<CustomButton
						btnTitle={textStrings.updatePassword}
						btnWidth={"100%"}
						btnRadius={10}
						isDisabled={
							formData.password.length < 4 ||
							formData.confirmPassword.length < 4
								? true
								: false
						}
						onPressFun={customResetPasswordFun}
					/>
				</View>
			</View>
		</AuthLayout>
	);
};

export default NewPassword;

import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";
import AuthLayout from "../components/AuthLayout";
import CustomButton from "../components/CustomButton";
import CustomInput from "../components/CustomInput";
import RedirecetWrapper from "../components/RedirectWrapper";
import SocialLogin from "../components/SocialLogin";
import { useLangStrings } from "../hooks/useLangStrings";
import { useThemeColors } from "../hooks/useThemeColors";
import {
	isValidEmailFun,
	isValidPasswordFun,
	isValidUsernameFun,
	parseDatabaseErrorMessage,
	registerApi,
} from "../services/endpoints";
const Register = () => {
	const { textStrings } = useLangStrings();
	const router = useRouter();
	const colors = useThemeColors();
	const [formData, setformData] = useState({
		email: "",
		password: "",
		username: "",
		confirmPassword: "",
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
			marginTop: 20,
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
		otherBottomTxt: {
			fontSize: 18,
			fontWeight: "400",
			color: colors.labelColor,
		},
		mainBottomTxt: {
			fontSize: 18,
			fontWeight: "500",
			color: colors.mainColor,
		},
		mainInputContainer: {
			width: "100%",
			display: "flex",
			alignItems: "center",
			justifyContent: "flex-start",
			flexDirection: "column",
			gap: 28,
		},
		bottomBtn: {
			marginBottom: 100,
		},
		socialIcon: {
			width: 24,
			height: 24,
			resizeMode: "contain",
		},

		sepratorView: {
			width: "100%",
			height: 1,
			backgroundColor: colors.inActiveSwitch,
			marginTop: 37,
			marginBottom: 26,
		},
	});
	const customRegisterFun = async () => {
		try {
			if (!isValidEmailFun(formData.email)) {
				Toast.show({
					type: "error",
					text1: textStrings.inValidEmailMessage,
				});
				return;
			}
			if (!isValidUsernameFun(formData.username)) {
				Toast.show({
					type: "error",
					text1: textStrings.usernameLengthMessage,
				});
				return;
			}
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
			const result = await registerApi(
				formData.username,
				formData.email,
				formData.password
			);
			if (result) {
				console.log("register success:", result);
				setformData({
					email: "",
					password: "",
					username: "",
					confirmPassword: "",
				});
				Toast.show({
					type: "success",
					text1: textStrings.registerSuccess,
				});
			}
		} catch (error) {
			console.log("register failed: ", error);
			Toast.show({
				type: "error",
				text1: error
					? parseDatabaseErrorMessage(error)
					: textStrings.registerFailed,
			});
		}
	};

	return (
		<RedirecetWrapper>
			<AuthLayout
				varient={"scroll-simple"}
				showTopBar={true}>
				<View style={styles.mainContainer}>
					<Text style={styles.textHeadingStyle}>
						{textStrings.createOnlineAccountHeading}
					</Text>
					<SocialLogin mt={34} />
					<View style={styles.sepratorView} />
					<View style={styles.mainInputContainer}>
						<CustomInput
							title={textStrings.email}
							placeHolderText={textStrings.enterEmail}
							value={formData.email}
							onChangeValue={(value) =>
								setformData({ ...formData, email: value })
							}
						/>
						<CustomInput
							title={textStrings.fullName}
							placeHolderText={textStrings.enterFullName}
							value={formData.username}
							onChangeValue={(value) =>
								setformData({ ...formData, username: value })
							}
						/>
						<CustomInput
							title={textStrings.password}
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
							btnTitle={textStrings.createYourAccount}
							btnWidth={"100%"}
							btnRadius={10}
							onPressFun={customRegisterFun}
							isDisabled={
								formData.email.length < 5 ||
								formData.password.length < 4 ||
								formData.confirmPassword.length < 4 ||
								!isValidUsernameFun(formData.username)
									? true
									: false
							}
						/>

						<TouchableOpacity
							style={styles.bottomBtn}
							onPress={() => router.replace({ pathname: "/login" })}>
							<Text style={styles.otherBottomTxt}>
								{textStrings.haveAnAccount}{" "}
								<Text style={styles.mainBottomTxt}>{textStrings.login}</Text>
							</Text>
						</TouchableOpacity>
					</View>
				</View>
			</AuthLayout>
		</RedirecetWrapper>
	);
};

export default Register;

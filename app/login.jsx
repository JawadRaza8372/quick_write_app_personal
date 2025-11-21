import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";
import { useDispatch } from "react-redux";
import AnimatedSwitch from "../components/AnimatedSwitch";
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
	loginApi,
} from "../services/endpoints";
import { saveUserTokenToStorage, setUser } from "../services/store/userSlice";

const Login = () => {
	const { textStrings } = useLangStrings();
	const colors = useThemeColors();
	const router = useRouter();

	const dispatch = useDispatch();
	const [formData, setformData] = useState({
		email: "",
		password: "",
		remeberMe: false,
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
		optionsMainView: {
			width: "100%",
			height: "auto",
			display: "flex",
			alignItems: "center",
			justifyContent: "space-between",
			flexDirection: "row",
			marginTop: -15,
		},
		rememberView: {
			display: "flex",
			alignItems: "center",
			justifyContent: "flex-start",
			flexDirection: "row",
			height: "auto",
			gap: 11,
		},
		rememberTxt: {
			fontWeight: "400",
			color: colors.rememberColor,
			fontSize: 14,
		},
		forgotTxt: {
			fontWeight: "500",
			color: colors.mainColor,
			fontSize: 14,
		},
		forgotBtn: {
			display: "flex",
			alignItems: "center",
			justifyContent: "flex-end",
			flexDirection: "row",
			height: "auto",
			flex: 1,
		},

		sepratorView: {
			width: "100%",
			height: 1,
			backgroundColor: colors.inActiveSwitch,
			marginVertical: 4,
		},
	});
	const customLoginFun = async () => {
		try {
			if (!isValidEmailFun(formData.email)) {
				Toast.show({
					type: "error",
					text1: textStrings.inValidEmailMessage,
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
			const result = await loginApi(formData.email, formData.password);
			if (result) {
				console.log("Login success:", result?.user);
				const { tokens, ...rest } = result?.user;
				dispatch(setUser({ user: rest }));
				await saveUserTokenToStorage(tokens?.accessToken, tokens?.refreshToken);
			}
		} catch (error) {
			console.log("login failed: ", error);
			Toast.show({
				type: "error",
				text1: error ?? textStrings.loginFailed,
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
						{textStrings.welcomeBackHeading}
					</Text>
					<Text style={styles.descriptionTxt}>{textStrings.loginDesc}</Text>
					<View style={styles.mainInputContainer}>
						<CustomInput
							title={textStrings.email}
							value={formData.email}
							onChangeValue={(value) =>
								setformData({ ...formData, email: value })
							}
							placeHolderText={textStrings.enterEmail}
						/>
						<CustomInput
							title={textStrings.password}
							isPasswordType={true}
							value={formData.password}
							onChangeValue={(value) =>
								setformData({ ...formData, password: value })
							}
							placeHolderText={textStrings.enterPassword}
						/>
						<View style={styles.optionsMainView}>
							<View style={styles.rememberView}>
								<AnimatedSwitch
									width={40}
									height={20}
									thumbSize={16}
									value={formData.remeberMe}
									onValueChange={(value) =>
										setformData({ ...formData, remeberMe: value })
									}
									activeColor={colors.mainColor}
								/>
								<Text style={styles.rememberTxt}>{textStrings.rememberMe}</Text>
							</View>
							<TouchableOpacity
								onPress={() => router.push({ pathname: "/forgot-password" })}
								style={styles.forgotBtn}>
								<Text style={styles.forgotTxt}>
									{textStrings.forgotPassword}
								</Text>
							</TouchableOpacity>
						</View>
						<CustomButton
							btnTitle={textStrings.login}
							btnWidth={"100%"}
							btnRadius={10}
							onPressFun={customLoginFun}
							isDisabled={
								formData.email.length < 5 || formData.password.length < 4
									? true
									: false
							}
						/>
						<View style={styles.sepratorView} />
						<SocialLogin />
						<TouchableOpacity
							style={styles.bottomBtn}
							onPress={() => router.replace({ pathname: "/register" })}>
							<Text style={styles.otherBottomTxt}>
								{textStrings.didnothaveAccount}{" "}
								<Text style={styles.mainBottomTxt}>{textStrings.register}</Text>
							</Text>
						</TouchableOpacity>
					</View>
				</View>
			</AuthLayout>
		</RedirecetWrapper>
	);
};

export default Login;

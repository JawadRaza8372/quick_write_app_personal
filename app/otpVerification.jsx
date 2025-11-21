import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
	Dimensions,
	Image,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import {
	CodeField,
	Cursor,
	useBlurOnFulfill,
	useClearByFocusCell,
} from "react-native-confirmation-code-field";
import Toast from "react-native-toast-message";
import { useDispatch } from "react-redux";
import BackIcon from "../assets/icons/BackIcon";
import longLogo from "../assets/images/side-name-logo.png";
import AuthLayout from "../components/AuthLayout";
import CustomButton from "../components/CustomButton";
import { useLangStrings } from "../hooks/useLangStrings";
import { useThemeColors } from "../hooks/useThemeColors";
import {
	forgotPasswordApi,
	isValidEmailFun,
	verifyOtpApi,
} from "../services/endpoints";
import { setResetPasswordToken } from "../services/store/userSlice";
const OtpVerification = () => {
	const { textStrings } = useLangStrings();
	const { dbCode: initialDbCode, email } = useLocalSearchParams();
	const dispatch = useDispatch();
	const [dbCode, setDbCode] = useState(initialDbCode);
	const colors = useThemeColors();
	const [value, setValue] = useState("");
	const ref = useBlurOnFulfill({ value, cellCount: 6 });
	const [props, getCellOnLayoutHandler] = useClearByFocusCell({
		value,
		setValue,
	});
	const [timer, setTimer] = useState(300);
	const inputRefs = useRef([]);

	const [canResend, setCanResend] = useState(false);
	useEffect(() => {
		if (inputRefs.current[0]) {
			inputRefs.current[0].focus();
		}
	}, []);

	useEffect(() => {
		if (timer > 0) {
			const interval = setInterval(() => {
				setTimer((prev) => prev - 1);
			}, 1000);
			return () => clearInterval(interval);
		} else {
			setCanResend(true);
		}
	}, [timer]);
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
			resizeMode: "contain",
			height: "100%",
			width: "70%",
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
			marginTop: 15,
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
		bottomBtn: {
			marginTop: -15,
			opacity: !canResend ? 0.4 : 1,
		},
		otherBottomTxt: {
			fontSize: 18,
			fontWeight: "400",
			color: colors.labelColor,
		},
		mainBottomTxt: {
			fontSize: 18,
			fontWeight: !canResend ? "400" : "500",
			color: !canResend ? colors.labelColor : colors.mainColor,
		},
		bcktoLoginBtn: {
			width: "100%",
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			flexDirection: "row",
			gap: 15,
			height: 20,
			marginBottom: 100,
		},
		bcktoLoginTxt: {
			fontWeight: "400",
			fontSize: 14,
			color: colors.backColor,
		},
		codeFieldRoot: {
			width: Dimensions.get("screen").width / 1.1,
			height: 85,
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			alignSelf: "center",
		},
		celltxt: {
			height: 50,
			width: 50,
			backgroundColor: "transparent",
			borderRadius: 6,
			fontSize: 28,
			lineHeight: 50,
			color: colors.darkColor,
			borderWidth: 1,
			textAlign: "center",
		},
		timeTxt: {
			fontWeight: "400",
			fontSize: 12,
			color: colors.backColor,
			width: "90%",
			marginTop: -40,
			marginBottom: 20,
		},
	});
	const sendCodeToEmailFun = async () => {
		try {
			if (!isValidEmailFun(email)) {
				Toast.show({
					type: "error",
					text1: textStrings.inValidEmailMessage,
				});
				return;
			}
			const result = await forgotPasswordApi(email);
			if (result) {
				console.log("resend code success code:", result?.code);
				setDbCode(result?.code);
				setTimer(300);
				setCanResend(false);
				Toast.show({
					type: "success",
					text1: textStrings.codeResendMsg,
				});
			}
		} catch (error) {
			console.log("resend code failed: ", error);
			Toast.show({
				type: "error",
				text1: error ?? textStrings.codeResendFailed,
			});
		}
	};
	const customVerifyOtpFun = async () => {
		try {
			const result = await verifyOtpApi(email, dbCode, value);
			if (result?.tokens) {
				dispatch(
					setResetPasswordToken({
						resetPasswordToken: result?.tokens?.accessToken,
					})
				);
				router.replace({
					pathname: "/emailVerified",
				});
			}
		} catch (error) {
			console.log("verify otp failed: ", error);
			Toast.show({
				type: "error",
				text1: error ?? textStrings.otpVerificationFailed,
			});
		}
	};
	return (
		<AuthLayout varient={"scroll-simple"}>
			<View style={styles.mainContainer}>
				<View style={styles.topHeaderView}>
					<TouchableOpacity
						onPress={() => router.back()}
						style={styles.backBtn}>
						<BackIcon color={colors.backColor} />
					</TouchableOpacity>
					<Image
						source={longLogo}
						style={styles.logoImage}
					/>
					<View style={styles.backBtn} />
				</View>
				<Text style={styles.textHeadingStyle}>{textStrings.otpHeading}</Text>
				<Text style={styles.descriptionTxt}>
					{`${textStrings.sentResetLinkTo} ${email}.\n${textStrings.enterCodeFromEmail}`}
				</Text>
				<View style={styles.mainInputContainer}>
					<CodeField
						{...props}
						ref={ref}
						value={value}
						onChangeText={setValue}
						cellCount={6}
						rootStyle={styles.codeFieldRoot}
						keyboardType="number-pad"
						textContentType="oneTimeCode"
						renderCell={({ index, symbol, isFocused }) => (
							<View
								key={index}
								onLayout={getCellOnLayoutHandler(index)}>
								<Text
									style={[
										styles.celltxt,
										{
											marginRight: index < 5 ? 5 : 0,
											borderColor: isFocused
												? colors.mainColor
												: colors.otpBorder,
										},
									]}>
									{symbol || (isFocused ? <Cursor /> : null)}
								</Text>
							</View>
						)}
					/>
					<Text style={styles.timeTxt}>{`${Math.floor(timer / 60)
						.toString()
						.padStart(2, "0")}:${(timer % 60)
						.toString()
						.padStart(2, "0")}`}</Text>
					<CustomButton
						isDisabled={value.length !== 6 ? true : false}
						btnTitle={textStrings.verifyTxt}
						btnWidth={"100%"}
						btnRadius={10}
						onPressFun={customVerifyOtpFun}
					/>
					<TouchableOpacity
						style={styles.bottomBtn}
						disabled={!canResend}
						onPress={sendCodeToEmailFun}>
						<Text style={styles.otherBottomTxt}>
							{textStrings.didnotReciveCode}{" "}
							<Text style={styles.mainBottomTxt}>{textStrings.resendCode}</Text>
						</Text>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => router.replace({ pathname: "/login" })}
						style={styles.bcktoLoginBtn}>
						<BackIcon color={colors.backColor} />
						<Text style={styles.bcktoLoginTxt}>{textStrings.backToLogin}</Text>
					</TouchableOpacity>
				</View>
			</View>
		</AuthLayout>
	);
};

export default OtpVerification;

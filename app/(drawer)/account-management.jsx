import { useRouter } from "expo-router";
import { useState } from "react";
import {
	Alert,
	Dimensions,
	Image,
	ScrollView,
	StyleSheet,
	Text,
	View,
} from "react-native";
import Toast from "react-native-toast-message";
import { useDispatch, useSelector } from "react-redux";
import logoImage from "../../assets/images/logo.png";
import CustomButton from "../../components/CustomButton";
import CustomInput from "../../components/CustomInput";
import DrawerLayout from "../../components/DrawerLayout";
import ProfileSettingOption from "../../components/ProfileSettingOption";
import UserInfo from "../../components/UserInfo";
import { useLangStrings } from "../../hooks/useLangStrings";
import { useThemeColors } from "../../hooks/useThemeColors";
import { setAuthToken } from "../../services/apiUrl";
import {
	changePasswordApi,
	deleteAccountApi,
	isValidPasswordFun,
} from "../../services/endpoints";
import {
	removeUserTokenfromStorage,
	resetUser,
	setTheme,
} from "../../services/store/userSlice";

const AccountManagement = () => {
	const { theme } = useSelector((state) => state?.user);
	const { textStrings } = useLangStrings();
	const dispatch = useDispatch();
	const [formData, setformData] = useState({
		password: "",
		confirmPassword: "",
	});
	const [userAccountOptions, setUserAccountOptions] = useState({
		theme: "light",
		dataDuration: "0day",
	});
	const router = useRouter();
	const colors = useThemeColors();
	const { user } = useSelector((state) => state?.user);
	const styles = StyleSheet.create({
		mainContainer: {
			width: Dimensions.get("screen").width - 60,
			alignSelf: "center",
			display: "flex",
			flexDirection: "column",
			gap: 20,
			marginTop: 5,
		},
		optionsContainer: {
			width: "100%",
			display: "flex",
			alignItems: "center",
			justifyContent: "flex-start",
			flexDirection: "column",
			gap: 20,
		},
		mainInputContainer: {
			width: "100%",
			display: "flex",
			alignItems: "center",
			justifyContent: "flex-start",
			flexDirection: "column",
			gap: 20,
			opacity: user?.authProvider === "local" ? 1 : 0.4,
		},
		textHeadingStyle: {
			fontSize: 25,
			fontWeight: "700",
			color: colors.mainHeadingColor,
			width: "100%",
		},
		logoImageStyle: {
			width: 33,
			height: 33,
			resizeMode: "contain",
		},
		sepratorView: {
			width: "100%",
			height: 1,
			backgroundColor: colors.inActiveSwitch,
			marginVertical: 4,
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
			const result = await changePasswordApi(formData.password);
			if (result) {
				console.log("Password Change success");
				Toast.show({
					type: "success",
					text1: textStrings.passwordSuccess,
				});
			}
		} catch (error) {
			console.log("Password Change failed: ", error);
			Toast.show({
				type: "error",
				text1: error ?? textStrings.passwordFailed,
			});
		}
	};
	const onDeleteAccountBtnPress = async () => {
		try {
			await deleteAccountApi();
			await removeUserTokenfromStorage();
			dispatch(resetUser());
			setAuthToken(null);
			setTimeout(() => {
				router.replace("/login");
			}, 100);
		} catch (error) {
			console.log("Delete Account failed: ", error);
			Toast.show({
				type: "error",
				text1: error ?? textStrings?.deleteAccountFailed,
			});
		}
	};
	return (
		<DrawerLayout
			title={textStrings.profileSetting}
			leftBtn={
				<Image
					style={styles.logoImageStyle}
					source={logoImage}
				/>
			}>
			<ScrollView>
				<View style={styles.mainContainer}>
					<UserInfo
						email={user?.email ?? "-"}
						username={user?.username ?? "-"}
						hideIcon={true}
					/>
					<View style={styles.mainInputContainer}>
						<Text style={styles.textHeadingStyle}>
							{textStrings.changePasswordHeading}
						</Text>
						<CustomInput
							isDisabled={user?.authProvider !== "local" ? true : false}
							title={textStrings.newPassword}
							isPasswordType={true}
							placeHolderText={textStrings.enterPassword}
							value={formData.password}
							onChangeValue={(value) =>
								setformData({ ...formData, password: value })
							}
						/>
						<CustomInput
							isDisabled={user?.authProvider !== "local" ? true : false}
							title={textStrings.confirmPassword}
							isPasswordType={true}
							placeHolderText={textStrings.reEnterPassword}
							value={formData.confirmPassword}
							onChangeValue={(value) =>
								setformData({ ...formData, confirmPassword: value })
							}
						/>
						<CustomButton
							isDisabled={
								formData.password.length < 4 ||
								formData.confirmPassword.length < 4 ||
								user?.authProvider !== "local"
									? true
									: false
							}
							btnTitle={textStrings.submit}
							btnWidth={"100%"}
							btnRadius={6}
							onPressFun={customResetPasswordFun}
						/>
					</View>
					<View style={styles.sepratorView} />
					<View style={styles.optionsContainer}>
						<ProfileSettingOption
							value={theme}
							setValue={(value) => {
								dispatch(setTheme({ theme: value }));
							}}
							options={textStrings.appernceOptions}
							label={textStrings.apperence}
						/>
						<ProfileSettingOption
							label={textStrings.chathistory}
							value={userAccountOptions.dataDuration}
							setValue={(value) =>
								setUserAccountOptions({
									...userAccountOptions,
									dataDuration: value,
								})
							}
							options={textStrings.chatHistoryOptions}
						/>
					</View>
					<View style={styles.sepratorView} />
					<CustomButton
						btnTitle={textStrings.deleteAccount}
						btnWidth={"100%"}
						bgColor={colors.redColor}
						borderColor={colors.redColor}
						btnRadius={6}
						onPressFun={() =>
							Alert.alert(
								textStrings.deleteAccount,
								textStrings.deleteAccountDesc,
								[
									{ text: textStrings.cancel, style: "cancel" },
									{
										text: textStrings.delete,
										style: "destructive",
										onPress: onDeleteAccountBtnPress,
									},
								]
							)
						}
					/>
				</View>
			</ScrollView>
		</DrawerLayout>
	);
};

export default AccountManagement;

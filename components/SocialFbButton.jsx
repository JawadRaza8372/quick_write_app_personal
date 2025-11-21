import * as Linking from "expo-linking";
import { useRouter } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import { Image, StyleSheet } from "react-native";
import Toast from "react-native-toast-message";
import { useDispatch } from "react-redux";
import fbIcon from "../assets/images/Facebook.png";
import { useLangStrings } from "../hooks/useLangStrings";
import { useThemeColors } from "../hooks/useThemeColors";
import { mainUrl } from "../services/apiUrl";
import { saveUserTokenToStorage, setUser } from "../services/store/userSlice";
import CustomButton from "./CustomButton";

const SocialFbButton = () => {
	const { textStrings } = useLangStrings();
	const colors = useThemeColors();
	const router = useRouter();
	const dispatch = useDispatch();

	const processUserData = async () => {
		try {
			// 1. Open Facebook login in WebBrowser
			const authUrl = `${mainUrl}auth/facebook`;
			const result = await WebBrowser.openAuthSessionAsync(
				authUrl,
				"com.quickwrite://login-success"
			);
			if (result.type === "success") {
				// 2. The backend redirects to your custom scheme with user data
				const { queryParams } = Linking.parse(result.url);
				if (!queryParams?.user) {
					Toast.show({
						type: "error",
						text1: textStrings.facebookLoginFailed,
					});
					return;
				}

				// 3. Parse user object
				const userObj = JSON.parse(queryParams?.user);
				console.log("Facebook Login success:", userObj);
				const { tokens, ...rest } = userObj;
				dispatch(setUser({ user: rest }));
				await saveUserTokenToStorage(tokens?.accessToken, tokens?.refreshToken);
				router.replace({ pathname: "/(drawer)" });
			}
		} catch (error) {
			console.log("facebook login failed: ", error);
			Toast.show({
				type: "error",
				text1: error ?? textStrings.facebookLoginFailed,
			});
		}
	};
	return (
		<CustomButton
			btnTitle={textStrings.continueWithFcebook}
			txtColor={colors.backColor}
			BtnIcon1={
				<Image
					style={styles.socialIcon}
					source={fbIcon}
				/>
			}
			btnWidth={"100%"}
			bgColor={colors.langageBg}
			btnRadius={10}
			onPressFun={processUserData}
		/>
	);
};

export default SocialFbButton;
const styles = StyleSheet.create({
	socialIcon: {
		width: 24,
		height: 24,
		resizeMode: "contain",
	},
});

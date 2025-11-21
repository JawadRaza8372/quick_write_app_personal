import { useRouter } from "expo-router";
import { useEffect } from "react";
import { Dimensions, Image, StyleSheet, View } from "react-native";
import { useDispatch } from "react-redux";
import logoImage from "../assets/images/side-name-logo.png";
import AuthLayout from "../components/AuthLayout";
import { getUserProfileApi } from "../services/endpoints";
import {
	getLangTypefromStorage,
	getUserTokenfromStorage,
	saveUserTokenToStorage,
	setSelectedLang,
	setUser,
} from "../services/store/userSlice";
const Splash = () => {
	const dispatch = useDispatch();
	const router = useRouter();
	const fetchSavedTokenFromDb = async () => {
		const { accessToken, refreshToken } = await getUserTokenfromStorage();
		const result = await getLangTypefromStorage();
		if (result) {
			dispatch(setSelectedLang({ selectedLang: result ?? "en" }));
		}
		if (accessToken && refreshToken) {
			await getUserProfileApi()
				.then(async (result) => {
					console.log("user success:", result?.user);

					const { tokens, ...rest } = result?.user;
					dispatch(setUser({ user: rest }));
					await saveUserTokenToStorage(
						tokens?.accessToken,
						tokens?.refreshToken
					);
					router.replace({ pathname: "/(drawer)" });
				})
				.catch((err) => {
					console.log("err", err);
					router.replace({ pathname: "/onBoarding" });
				});
		} else {
			setTimeout(() => {
				router.replace({ pathname: "/onBoarding" });
			}, 800);
		}
	};
	useEffect(() => {
		fetchSavedTokenFromDb();
	}, []);

	return (
		<AuthLayout varient={"simple"}>
			<View style={styles.imagContainer}>
				<Image
					style={styles.mainLogoStyle}
					source={logoImage}
				/>
			</View>
		</AuthLayout>
	);
};

export default Splash;

const styles = StyleSheet.create({
	imagContainer: {
		width: "100%",
		height: "100%",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	mainLogoStyle: {
		width: Dimensions.get("screen").width / 1.5,
		height: 350,
		resizeMode: "contain",
	},
});

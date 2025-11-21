import { useRouter } from "expo-router";
import { useEffect } from "react";
import { Dimensions, Image, StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import logoImage from "../assets/images/side-name-logo.png";
import logoImage2 from "../assets/images/side-name-logo2.png";

import AuthLayout from "../components/AuthLayout";
import { getUserProfileApi } from "../services/endpoints";
import {
	getLangTypefromStorage,
	getThemefromStorage,
	getUserTokenfromStorage,
	saveUserTokenToStorage,
	setSelectedLang,
	setTheme,
	setUser,
} from "../services/store/userSlice";
const Splash = () => {
	const { theme } = useSelector((state) => state?.user);
	const dispatch = useDispatch();
	const router = useRouter();
	const fetchSavedTokenFromDb = async () => {
		const { accessToken, refreshToken } = await getUserTokenfromStorage();
		const result = await getLangTypefromStorage();
		const result2 = await getThemefromStorage();

		if (result) {
			dispatch(setSelectedLang({ selectedLang: result ?? "en" }));
		}
		if (result2) {
			dispatch(setTheme({ theme: result2 }));
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
					source={theme === "light" ? logoImage : logoImage2}
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

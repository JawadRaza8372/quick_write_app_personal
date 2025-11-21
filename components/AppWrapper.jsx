import * as NavigationBar from "expo-navigation-bar";
import * as ScreenOrientation from "expo-screen-orientation";
import { useEffect } from "react";
import { StatusBar } from "react-native";
import { MenuProvider } from "react-native-popup-menu";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { useThemeColors } from "../hooks/useThemeColors";
import { disconnectSocket, initiateSocket } from "../services/socketService";
import Navigation from "./Navigation";

const AppWrapper = () => {
	const colors = useThemeColors();
	const { theme } = useSelector((state) => state?.user);
	useEffect(() => {
		const lockOrientation = async () => {
			try {
				await ScreenOrientation.lockAsync(
					ScreenOrientation.OrientationLock.PORTRAIT
				);
				await NavigationBar.setButtonStyleAsync("dark");
			} catch (err) {
				console.log("Failed to lock orientation:", err);
			}
		};
		lockOrientation();
		initiateSocket();
		return () => {
			disconnectSocket();
		};
	}, []);

	return (
		<MenuProvider>
			<SafeAreaProvider>
				<SafeAreaView
					edges={["bottom", "top"]}
					style={{ flex: 1, backgroundColor: colors.mainBgColor }}>
					<StatusBar
						backgroundColor={colors.mainBgColor}
						barStyle={theme === "light" ? "dark-content" : "light-content"}
					/>
					<Navigation />
				</SafeAreaView>
			</SafeAreaProvider>
		</MenuProvider>
	);
};

export default AppWrapper;

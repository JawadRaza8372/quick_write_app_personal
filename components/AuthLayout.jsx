import onBoardingImage from "@/assets/images/onboard.png";
import subscriptionImage from "@/assets/images/subscription.png";
import { useThemeColors } from "@/hooks/useThemeColors";
import { Dimensions, Image, ScrollView, StyleSheet, View } from "react-native";
import AuthTopBar from "./AuthTopBar";
const AuthLayout = ({ children, varient, showTopBar }) => {
	const colors = useThemeColors();
	const styles = StyleSheet.create({
		mainContainer: {
			width: "100%",
			flex: 1,
			position: "relative",
			display: "flex",
			backgroundColor: colors.mainBgColor,
			gap: 10,
		},
		bgImageStyle: {
			width: varient === "subscription" ? "65%" : "100%",
			position: "absolute",
			left: 0,
			zIndex: 0,
			...(varient === "onBoarding"
				? { bottom: 0, resizeMode: "contain", height: "65%" }
				: varient === "scroll-Forgot"
				? {
						top: Dimensions.get("screen").height / 6,
						resizeMode: "contain",
						height: "45%",
				  }
				: { top: 0, resizeMode: "cover", height: "100%" }),
		},
		childContainer: {
			width: "100%",
			flex: 1,
			zIndex: 1,
		},
		authMainContainer: {
			width: Dimensions.get("screen").width - 70,
			alignSelf: "center",
			flex: 1,
		},
	});
	return (
		<View style={styles.mainContainer}>
			{showTopBar ? <AuthTopBar /> : null}
			{varient !== "simple" ? (
				<Image
					source={
						varient === "onBoarding" || varient === "scroll-Forgot"
							? onBoardingImage
							: varient === "subscription"
							? subscriptionImage
							: null
					}
					style={styles.bgImageStyle}
				/>
			) : null}

			<View style={styles.childContainer}>
				{varient === "scroll-simple" || varient === "scroll-Forgot" ? (
					<ScrollView showsVerticalScrollIndicator={false}>
						<View style={styles.authMainContainer}>{children}</View>
					</ScrollView>
				) : (
					children
				)}
			</View>
		</View>
	);
};

export default AuthLayout;

import { useNavigation } from "@react-navigation/native";
import {
	Dimensions,
	Image,
	KeyboardAvoidingView,
	Platform,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import menuImage from "../assets/images/menu.png";
import logoImage from "../assets/images/side-name-logo.png";
import { useThemeColors } from "../hooks/useThemeColors";
const DrawerLayout = ({
	children,
	leftBtn,
	leftBtnFun,
	title,
	leftbgColor,
	hideRightBtn,
}) => {
	const colors = useThemeColors();
	const navigation = useNavigation();
	const styles = StyleSheet.create({
		mainContainer: {
			width: "100%",
			flex: 1,
			backgroundColor: colors.mainBgColor,
			display: "flex",
			flexDirection: "column",
		},
		childContainer: {
			width: "100%",
			flex: 1,
		},
		imageContainerTop: {
			width: Dimensions.get("screen").width - 116,
			height: "100%",
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			flexDirection: "row",
		},
		topBar: {
			width: Dimensions.get("screen").width - 26,
			alignSelf: "center",
			marginBottom: 20,
			height: 35,
			display: "flex",
			alignItems: "center",
			justifyContent: "space-between",
			flexDirection: "row",
			marginTop: 15,
			gap: 5,
		},
		sideButton: {
			width: 35,
			height: "100%",
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			borderRadius: 10,
			backgroundColor: leftbgColor ?? "transparent",
		},
		menuButton: {
			width: 35,
			height: "100%",
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			borderRadius: 10,
		},
		menuIcon: {
			width: 25,
			height: 25,
			resizeMode: "contain",
		},
		logoImageStyle: {
			width: "100%",
			height: "100%",
			resizeMode: "contain",
		},
		titleTxt: {
			fontSize: 20,
			fontWeight: "700",
			color: colors.topHeadingColor,
		},
	});

	return (
		<View style={styles.mainContainer}>
			<View style={styles.topBar}>
				{leftBtn ? (
					leftBtnFun ? (
						<TouchableOpacity
							onPress={leftBtnFun}
							style={styles.sideButton}>
							{leftBtn}
						</TouchableOpacity>
					) : (
						<View style={styles.sideButton}>{leftBtn}</View>
					)
				) : (
					<View style={styles.sideButton} />
				)}
				<View style={styles.imageContainerTop}>
					{title ? (
						<Text
							numberOfLines={1}
							ellipsizeMode="tail"
							style={styles.titleTxt}>
							{title}
						</Text>
					) : (
						<Image
							style={styles.logoImageStyle}
							source={logoImage}
						/>
					)}
				</View>
				{!hideRightBtn ? (
					<TouchableOpacity
						onPress={() => navigation.toggleDrawer()}
						style={styles.menuButton}>
						<Image
							source={menuImage}
							style={styles.menuIcon}
						/>
					</TouchableOpacity>
				) : (
					<View style={styles.sideButton} />
				)}
			</View>
			<KeyboardAvoidingView
				style={{ flex: 1 }}
				behavior={Platform.OS === "ios" ? "padding" : "height"}
				keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}>
				<View style={styles.childContainer}>{children}</View>
			</KeyboardAvoidingView>
		</View>
	);
};

export default DrawerLayout;

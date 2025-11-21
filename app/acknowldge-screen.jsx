import { router } from "expo-router";
import { Image, StyleSheet, Text, View } from "react-native";
import tickImage from "../assets/images/item_tick.png";
import AuthLayout from "../components/AuthLayout";
import CustomButton from "../components/CustomButton";
import { useLangStrings } from "../hooks/useLangStrings";
import { useThemeColors } from "../hooks/useThemeColors";

const AcknowldgeScreen = () => {
	const colors = useThemeColors();
	const { textStrings } = useLangStrings();
	const styles = StyleSheet.create({
		textHeadingStyle: {
			fontSize: 32,
			fontWeight: "700",
			textAlign: "center",
			color: colors.mainHeadingColor,
		},
		textdescriptionStyle: {
			color: colors.successDesc,
			fontWeight: "400",
			fontSize: 14,
			lineHeight: 20,
			textAlign: "center",
			width: "80%",
			marginBottom: 10,
		},
		childContainer: {
			width: "100%",
			height: "100%",
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			gap: 15,
			flexDirection: "column",
		},
		logoImageStyle: {
			width: 130,
			height: 130,
			resizeMode: "contain",
		},

		mainBtn: {
			width: 49,
			height: 49,
			borderRadius: 10,
			borderWidth: 1,
			borderColor: colors.mainColor,
			backgroundColor: colors.mainColor,
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
		},
		itemsContainer: {
			width: "68%",
			display: "flex",
			flexDirection: "column",
			gap: 19,
			height: "auto",
			marginTop: 15,
			marginBottom: 35,
		},
		itemText: {
			fontSize: 15,
			fontWeight: "500",
			color: colors.darkColor,
			lineHeight: 22,
			height: "auto",
			flex: 1,
		},
		itemList: {
			width: "100%",
			height: "auto",
			display: "flex",
			alignItems: "center",
			justifyContent: "flex-start",
			flexDirection: "row",
			gap: 10.6,
		},
		itemIcon: {
			width: 19,
			height: 19,
			resizeMode: "contain",
		},
		underlineText: {
			textDecorationLine: "underline",
			textDecorationStyle: "solid",
			textDecorationColor: colors.darkColor,
			fontWeight: "600",
		},
	});
	return (
		<AuthLayout varient={"simple"}>
			<View style={styles.childContainer}>
				<Text style={styles.textHeadingStyle}>
					{textStrings.privacyHeading}
				</Text>
				<Text style={styles.textdescriptionStyle}>{textStrings.fewNotes}</Text>
				<View style={styles.itemsContainer}>
					<View style={styles.itemList}>
						<Image
							source={tickImage}
							style={styles.itemIcon}
						/>
						<Text style={styles.itemText}>
							{textStrings.acknowldgeFirst}
							<Text
								onPress={() => router.push({ pathname: "/terms-conditions-n" })}
								style={styles.underlineText}>
								{textStrings.acknowldgeTerm}
							</Text>
							{textStrings.acknowldgeThier}
							<Text
								onPress={() => router.push({ pathname: "/privacy-policy-n" })}
								style={styles.underlineText}>
								{textStrings.acknowldgePrivacy}
							</Text>
						</Text>
					</View>
					<View style={styles.itemList}>
						<Image
							source={tickImage}
							style={styles.itemIcon}
						/>
						<Text style={styles.itemText}>{textStrings.acknowldgeSecond}</Text>
					</View>
				</View>
				<CustomButton
					btnWidth={"75%"}
					btnTitle={textStrings.acknowldgeContinue}
					btnRadius={10}
					onPressFun={() => router.replace({ pathname: "/login" })}
				/>
			</View>
		</AuthLayout>
	);
};

export default AcknowldgeScreen;

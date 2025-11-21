import { StyleSheet, Text, View } from "react-native";
import { useThemeColors } from "../hooks/useThemeColors";

const LogContainer = ({ title, description, children }) => {
	const colors = useThemeColors();
	const styles = StyleSheet.create({
		mainContainer: {
			width: "100%",
			height: "auto",
			borderWidth: 1,
			borderColor: colors.whiteOnly,
			borderRadius: 10,
			display: "flex",
			flexDirection: "column",
			gap: 15,
		},
		topHeaderContainer: {
			width: "100%",
			paddingVertical: 26,
			paddingHorizontal: 20,
			display: "flex",
			flexDirection: "column",
			backgroundColor: colors.whiteOnly,
			borderTopLeftRadius: 10,
			borderTopRightRadius: 10,
		},
		titleTxt: {
			fontSize: 18,
			fontWeight: "700",
			color: colors.darkColorOnly,
		},
		descTxt: {
			fontSize: 12,
			fontWeight: "400",
			color: colors.darkColorOnly,
			opacity: description ? 1 : 0,
		},
		optionContainer: {
			width: "100%",
			minHeight: 40,
			paddingHorizontal: 22,
			marginBottom: 15,
			maxHeight: 200,
		},
	});

	return (
		<View style={styles.mainContainer}>
			<View style={styles.topHeaderContainer}>
				<Text style={styles.titleTxt}>{title}</Text>
				<Text style={styles.descTxt}>{description ?? ""}</Text>
			</View>
			<View style={styles.optionContainer}>{children}</View>
		</View>
	);
};

export default LogContainer;

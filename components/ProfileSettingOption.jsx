import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import arrow from "../assets/images/tailless-arrow.png";
import tick from "../assets/images/tick.png";

import { useThemeColors } from "../hooks/useThemeColors";

const ProfileSettingOption = ({ options, value, setValue, label }) => {
	const colors = useThemeColors();
	const styles = StyleSheet.create({
		mainContainer: {
			width: "100%",
			height: "auto",
			display: "flex",
			alignItems: "flex-start",
			justifyContent: "flex-start",
			flexDirection: "row",
			gap: 10,
		},
		arrowImage: {
			width: 16,
			height: 16,
			resizeMode: "contain",
		},
		selectImage: {
			width: 20,
			height: 20,
			resizeMode: "contain",
		},
		rowcontainer: {
			height: "auto",
			flex: 1,
			display: "flex",
			alignItems: "center",
			justifyContent: "flex-start",
			flexDirection: "row",
			gap: 10,
		},
		titleTxt: {
			fontSize: 20,
			fontWeight: "700",
			color: colors.topHeadingColor,
			flexShrink: 1,
			lineHeight: 22,
		},
		optionsContainer: {
			height: "auto",
			display: "flex",
			flexDirection: "column",
			gap: 15,
			minWidth: "35%",
		},
		labelText: {
			fontSize: 20,
			fontWeight: "400",
			color: colors.inputLabelColor,
			flexShrink: 1,
			lineHeight: 22,
		},
	});

	return (
		<View style={styles.mainContainer}>
			<View style={styles.rowcontainer}>
				<Text
					numberOfLines={1}
					ellipsizeMode="tail"
					style={styles.titleTxt}>
					{label ?? ""}
				</Text>
				<Image
					source={arrow}
					style={styles.arrowImage}
				/>
			</View>
			<View style={styles.optionsContainer}>
				{options?.map((dat, index) => (
					<TouchableOpacity
						onPress={() => setValue(dat?.value)}
						key={index}
						style={styles.rowcontainer}>
						<Text style={styles.labelText}>{dat?.label}</Text>
						{dat?.value === value ? (
							<Image
								source={tick}
								style={styles.selectImage}
							/>
						) : null}
					</TouchableOpacity>
				))}
			</View>
		</View>
	);
};

export default ProfileSettingOption;

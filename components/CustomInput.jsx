import { useState } from "react";
import {
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import EyeIcon from "../assets/icons/EyeIcon";
import EyeOffIcon from "../assets/icons/EyeOffIcon";
import { useThemeColors } from "../hooks/useThemeColors";

const CustomInput = ({
	title,
	placeHolderText,
	value,
	onChangeValue,
	isPasswordType,
	isDisabled,
}) => {
	const colors = useThemeColors();
	const [hidePassword, sethidePassword] = useState(false);
	const [isFocused, setisFocused] = useState(false);
	const styles = StyleSheet.create({
		mainContainer: {
			width: "100%",
			height: "auto",
			display: "flex",
			flexDirection: "column",
			gap: 10,
		},
		inputLabel: {
			fontSize: 14,
			fontWeight: "400",
			color: colors.inputLabelColor,
			lineHeight: 20,
		},
		inputMainContainer: {
			height: 45,
			width: "100%",
			borderRadius: 6,
			backgroundColor: colors.whiteOnly,
			display: "flex",
			alignItems: "center",
			justifyContent: "flex-start",
			flexDirection: "row",
			gap: 10,
			overflow: "hidden",
			borderWidth: 1,
			borderColor: isFocused ? colors.mainColor : colors.inActiveAuthBorder,
		},
		inputMainStyle: {
			fontSize: 12,
			fontWeight: "500",
			color: colors.darkColorOnly,
			paddingHorizontal: 15,
			height: "100%",
			flex: 1,
		},
		sideBtn: {
			width: 44,
			height: "100%",
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
		},
	});

	return (
		<View style={styles.mainContainer}>
			<Text style={styles?.inputLabel}>{title ?? ""}</Text>
			<View style={styles.inputMainContainer}>
				<TextInput
					editable={isDisabled ? false : true}
					onFocus={() => setisFocused(true)}
					onBlur={() => setisFocused(false)}
					placeholderTextColor={colors.authInputPlaceholder}
					placeholder={placeHolderText ?? title ?? ""}
					value={value}
					onChangeText={onChangeValue}
					style={styles.inputMainStyle}
					secureTextEntry={isPasswordType ? !hidePassword : false}
				/>
				{isPasswordType ? (
					<TouchableOpacity
						style={styles?.sideBtn}
						onPress={() => sethidePassword(!hidePassword)}>
						{!hidePassword ? <EyeIcon size={18} /> : <EyeOffIcon size={18} />}
					</TouchableOpacity>
				) : null}
			</View>
		</View>
	);
};

export default CustomInput;

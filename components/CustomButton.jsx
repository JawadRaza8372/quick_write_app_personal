import { useState } from "react";
import {
	ActivityIndicator,
	Dimensions,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { useThemeColors } from "../hooks/useThemeColors";

const CustomButton = ({
	btnWidth,
	btnTitle,
	onPressFun,
	btnAlignSelf,
	btnRadius,
	BtnIcon,
	bgColor,
	txtColor,
	txtSize,
	btnHeight,
	BtnIcon1,
	borderColor,
	isDisabled,
}) => {
	const [isLoading, setisLoading] = useState(false);
	const colors = useThemeColors();
	const styles = StyleSheet.create({
		mainBtnContainer: {
			width: btnWidth ?? Dimensions.get("screen").width - 60,
			alignSelf: btnAlignSelf ?? "center",
			height: btnHeight ?? 45,
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			flexDirection: "row",
			backgroundColor: bgColor ?? colors.mainColor,
			borderRadius: btnRadius ?? 14,
			gap: BtnIcon1 ? 16 : 8,
			borderWidth: 1,
			borderColor: borderColor ?? colors.mainColor,
			opacity: isDisabled ? 0.6 : 1,
		},
		btnTxt: {
			fontSize: txtSize ?? 15,
			fontWeight: "700",
			color: txtColor ?? colors.mainBgColor,
		},
	});
	const RenderComponent = onPressFun || isLoading ? TouchableOpacity : View;
	const onButtonClickFun = async () => {
		setisLoading(true);
		await onPressFun();
		setisLoading(false);
	};
	const renderProps =
		onPressFun || isLoading
			? { onPress: onButtonClickFun, disabled: isDisabled ?? false }
			: {};

	return (
		<RenderComponent
			{...renderProps}
			style={styles.mainBtnContainer}>
			{isLoading ? (
				<ActivityIndicator
					size={"small"}
					color={txtColor ?? colors.mainBgColor}
				/>
			) : (
				<>
					{BtnIcon1 && BtnIcon1}
					<Text style={styles.btnTxt}>{btnTitle ?? "Submit"}</Text>
					{BtnIcon && BtnIcon}
				</>
			)}
		</RenderComponent>
	);
};

export default CustomButton;

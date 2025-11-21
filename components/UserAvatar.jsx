import { Image, StyleSheet, View } from "react-native";
import EditIcon from "../assets/icons/EditIcon";
import { useThemeColors } from "../hooks/useThemeColors";
const UserAvatar = ({ size, imgUrl, isEditable }) => {
	const colors = useThemeColors();
	const styles = StyleSheet.create({
		editContainer: {
			position: "absolute",
			width: 19,
			height: 19,
			borderRadius: 20,
			backgroundColor: colors.blackColor,
			right: 0,
			bottom: 0,
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			alignSelf: "center",
			borderWidth: 1,
			borderColor: colors.mainBgColor,
		},
		imageStyleContainer: {
			width: size ?? 66,
			height: size ?? 66,
			borderRadius: size ? size / 2 : 33,
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			overflow: "hidden",
			backgroundColor: colors.inputBgColor,
		},
		mainContainer: {
			width: size ?? 66,
			height: size ?? 66,
			position: "relative",
			alignSelf: "center",
		},
		imageStyle: {
			width: "100%",
			height: "100%",
			resizeMode: "cover",
		},
	});

	return (
		<View style={styles?.mainContainer}>
			<View style={styles.imageStyleContainer}>
				<Image
					style={styles?.imageStyle}
					source={
						imgUrl ? { uri: imgUrl } : require("../assets/images/User.jpg")
					}
				/>
			</View>

			{isEditable ? (
				<View style={styles?.editContainer}>
					<EditIcon
						size={11}
						color={colors.mainBgColor}
					/>
				</View>
			) : null}
		</View>
	);
};

export default UserAvatar;

import { useEffect, useRef } from "react";
import {
	Animated,
	Dimensions,
	Easing,
	Modal,
	StyleSheet,
	Text,
	View,
} from "react-native";
import loadingImg from "../assets/images/loading.png";
import { useThemeColors } from "../hooks/useThemeColors";
const LoadingModal = ({ showModal, title }) => {
	const colors = useThemeColors();
	const spinValue = useRef(new Animated.Value(0)).current;

	useEffect(() => {
		Animated.loop(
			Animated.timing(spinValue, {
				toValue: 1,
				duration: 1200,
				easing: Easing.linear,
				useNativeDriver: true,
			})
		).start();
	}, [spinValue]);
	const spin = spinValue.interpolate({
		inputRange: [0, 1],
		outputRange: ["0deg", "360deg"],
	});
	const styles = StyleSheet.create({
		modalBg: {
			width: "100%",
			height: "100%",
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			flexDirection: "column",
			backgroundColor: colors.modalBg,
		},
		mainBg: {
			width: Dimensions.get("screen").width - 70,
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			flexDirection: "column",
			backgroundColor: colors.mainBgColor,
			borderRadius: 15,
			paddingVertical: 23,
			gap: 10,
		},
		loaderImage: {
			width: 110,
			height: 110,
			resizeMode: "contain",
			transform: [{ rotate: spin }],
		},
		loadingText: {
			fontSize: 20,
			fontWeight: "700",
			color: colors.inActiveTab,
		},
	});

	return (
		<Modal
			visible={showModal}
			onRequestClose={() => null}
			transparent={true}>
			<View style={styles.modalBg}>
				<View style={styles.mainBg}>
					<Animated.Image
						style={styles.loaderImage}
						source={loadingImg}
					/>
					<Text style={styles.loadingText}>{title ?? "Loading"}</Text>
				</View>
			</View>
		</Modal>
	);
};

export default LoadingModal;

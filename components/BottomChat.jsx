import NextImg from "@/assets/images/arrow-n.png";
import shieldImage from "@/assets/images/shield.png";
import { useLangStrings } from "@/hooks/useLangStrings";
import { useThemeColors } from "@/hooks/useThemeColors";
import { useEffect, useState } from "react";
import {
	Image,
	Keyboard,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import option2 from "../assets/images/edit-email.png";
import option3 from "../assets/images/refine-w.png";
import option5 from "../assets/images/search.png";
import option4 from "../assets/images/summary.png";
import option1 from "../assets/images/text-resp.png";

const BottomChat = ({
	onSendPress,
	value,
	onChangeValue,
	onEndPress,
	onResponcePress,
	onEmailPress,
	onRefinPress,
	onSummaryPress,
	onAnalyzePress,
	hideBtns,
}) => {
	const [keyboardVisible, setKeyboardVisible] = useState(false);
	const [inputHeight, setInputHeight] = useState(78); // Default height
	const [isMultiline, setIsMultiline] = useState(false); // Track if text is multiline

	useEffect(() => {
		const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
			setKeyboardVisible(true);
		});

		const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
			setKeyboardVisible(false);
		});

		return () => {
			showSubscription.remove();
			hideSubscription.remove();
		};
	}, []);

	const handleContentSizeChange = (event) => {
		const { height } = event.nativeEvent.contentSize;
		// Set minimum height to 78 (single line) and maximum to accommodate 3 lines
		const newHeight = Math.min(Math.max(height + 20, 78), 78 * 1.8); // Adjust multiplier as needed
		setInputHeight(newHeight);

		// Check if text is multiline (height exceeds single line threshold)
		const multiline = newHeight > 90; // Adjust threshold as needed
		setIsMultiline(multiline);
	};

	const { textStrings } = useLangStrings();
	const menuBtns = [
		{
			title: textStrings?.textResponceBtn,
			icon: option1,
			onPressFun: onResponcePress,
		},
		{
			title: textStrings.writeEmailBtn,
			icon: option2,
			onPressFun: onEmailPress,
		},
		{
			title: textStrings.refineWritingBtn,
			icon: option3,
			onPressFun: onRefinPress,
		},
		{
			title: textStrings.summarizeBtn,
			icon: option4,
			onPressFun: onSummaryPress,
		},
		{
			title: textStrings.analyzeBtn,
			icon: option5,
			onPressFun: onAnalyzePress,
		},
	];
	const colors = useThemeColors();
	const styles = StyleSheet.create({
		footerComp: {
			width: "100%",
			display: "flex",
			flexDirection: "column",
			gap: 20,
			marginBottom: keyboardVisible ? 45 : 15,
			marginTop: 5,
		},
		inputMainContainer: {
			width: "100%",
			display: "flex",
			alignItems: isMultiline ? "flex-end" : "center", // Dynamic alignment
			justifyContent: "flex-start",
			flexDirection: "row",
			gap: 8,
			height: inputHeight, // Use dynamic height
			borderWidth: 1,
			borderColor: colors.mainColor,
			borderRadius: 10,
			paddingHorizontal: 16,
			paddingVertical: 12, // Added vertical padding for better appearance
		},
		moreOptionView: {
			width: 47,
			height: 40,
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			flexDirection: "row",
			borderWidth: 1,
			borderColor: colors.moreBg,
			borderRadius: 12,
		},
		sendView: {
			width: 47,
			height: 40,
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			flexDirection: "row",
			borderRadius: 12,
			backgroundColor: colors.mainColor,
			color: colors.darkColor,
		},
		sendInputView: {
			height: "100%",
			flex: 1,
			fontSize: 14,
			fontWeight: "400",
			// Allow text input to expand
			paddingTop: 0,
			paddingBottom: 0,
			textAlignVertical: isMultiline ? "top" : "center", // Dynamic vertical alignment
		},
		moreIcon: {
			width: 24,
			height: 24,
			resizeMode: "contain",
		},
		nextIcon: {
			width: 16,
			height: 18,
			resizeMode: "contain",
			transform: [{ rotate: "-90deg" }],
		},
		shieldContainer: {
			alignSelf: "flex-end",
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			flexDirection: "row",
			gap: 8,
			borderWidth: 1,
			borderColor: colors.shieldColor,
			borderRadius: 9,
			height: 42,
			paddingHorizontal: 12.5,
		},
		endSessionTxt: {
			fontSize: 14,
			fontWeight: "400",
			color: colors.shieldColor,
		},
		optionMainContainer: {
			width: "100%",
			height: 29,
			display: "flex",
			alignItems: "center",
			justifyContent: "flex-start",
			flexDirection: "row",
			gap: 7,
		},
		mb: {
			marginBottom: 5,
		},
		optionIcon: {
			width: 24,
			height: 24,
			resizeMode: "contain",
		},
		optionTxt: {
			fontSize: 14,
			fontWeight: "400",
			color: colors.inActiveTab,
		},
		bottomOptions: {
			width: "98%",
			height: "auto",
			display: "flex",
			alignItems: "center",
			justifyContent: "flex-start",
			flexDirection: "row",
			flexWrap: "wrap",
			gap: 20,
			alignSelf: "center",
		},
		btnTxt: {
			fontSize: 14,
			fontWeight: "400",
			color: colors.backColor,
		},
		btnIcon: {
			width: 22,
			height: 22,
			resizeMode: "contain",
		},
		btnContainer: {
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			flexDirection: "row",
			paddingVertical: 9,
			paddingHorizontal: 19,
			borderRadius: 71,
			borderColor: colors.mainColor,
			borderWidth: 1,
			gap: 8,
		},
	});

	return (
		<View style={styles.footerComp}>
			{!hideBtns ? (
				<View style={styles.bottomOptions}>
					{menuBtns?.map((dat, index) => (
						<TouchableOpacity
							style={styles.btnContainer}
							onPress={dat.onPressFun}
							key={index}>
							<Image
								source={dat?.icon}
								style={styles.btnIcon}
							/>
							<Text style={styles.btnTxt}>{dat?.title}</Text>
						</TouchableOpacity>
					))}
				</View>
			) : null}
			<View style={styles.inputMainContainer}>
				<TextInput
					placeholderTextColor={colors.backColor}
					style={styles.sendInputView}
					placeholder={textStrings.typeTextMsg}
					value={value}
					onChangeText={(text) => onChangeValue(text)}
					multiline={true}
					numberOfLines={1} // Start with 1 line
					maxLength={500} // Optional: set character limit
					onContentSizeChange={handleContentSizeChange}
					scrollEnabled={false} // Prevent scrolling within the input
				/>

				<TouchableOpacity
					onPress={onSendPress}
					style={styles.sendView}>
					<Image
						style={styles.nextIcon}
						source={NextImg}
					/>
				</TouchableOpacity>
			</View>
			<TouchableOpacity
				onPress={onEndPress}
				style={styles.shieldContainer}>
				<Image
					style={styles.moreIcon}
					source={shieldImage}
				/>
				<Text style={styles.endSessionTxt}>{textStrings.endSessionTxt}</Text>
			</TouchableOpacity>
		</View>
	);
};

export default BottomChat;

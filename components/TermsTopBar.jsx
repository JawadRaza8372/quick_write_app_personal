import { useThemeColors } from "@/hooks/useThemeColors";
import { setSelectedLang } from "@/services/store/userSlice";
import { useRouter } from "expo-router";
import {
	Dimensions,
	Image,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import {
	Menu,
	MenuOption,
	MenuOptions,
	MenuTrigger,
} from "react-native-popup-menu";
import { useDispatch, useSelector } from "react-redux";
import BackIcon from "../assets/icons/BackIcon";
import { languages } from "../constants/dummyData";
const TermsTopBar = ({ bottomWidth, title }) => {
	const colors = useThemeColors();
	const dispatch = useDispatch();
	const router = useRouter();
	const { selectedLang } = useSelector((state) => state?.user);
	const switchLangFun = (lng) => {
		dispatch(setSelectedLang({ selectedLang: lng }));
	};
	const styles = StyleSheet.create({
		langIcon: {
			width: 37,
			height: 37,
			borderRadius: 37,
			overflow: "hidden",
			resizeMode: "cover",
		},
		langIconSm: {
			width: 20,
			height: 20,
			borderRadius: 22,
			overflow: "hidden",
			resizeMode: "cover",
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
		bottomContainer: {
			width: bottomWidth ?? Dimensions.get("screen").width,
			paddingHorizontal: 16,
			display: "flex",
			alignItems: "center",
			justifyContent: "space-between",
			flexDirection: "row",
			height: 49,
			alignSelf: "center",
			zIndex: 1,
			backgroundColor: colors.mainBgColor,
		},
		mb: {
			marginBottom: 10,
		},
		sideButton: {
			width: 35,
			height: "100%",
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			borderRadius: 10,
			backgroundColor: "transparent",
		},
		mainLangCont: {
			width: "100%",
			height: "auto",
			display: "flex",
			alignItems: "center",
			justifyContent: "flex-start",
			flexDirection: "row",
			gap: 15,
		},
		langNameTxt: {
			height: "auto",
			flex: 1,
			fontSize: 14,
		},
		imageContainerTop: {
			width: Dimensions.get("screen").width - 116,
			height: "100%",
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			flexDirection: "row",
		},
		titleTxt: {
			fontSize: 20,
			fontWeight: "700",
			color: colors.topHeadingColor,
		},
	});
	const menuStyles = {
		optionsContainer: {
			backgroundColor: colors.mainBgColor,
			borderRadius: 11,
			paddingVertical: 13,
			paddingHorizontal: 11,
			shadowColor: colors.darkColor,
			shadowOffset: {
				width: 0,
				height: 2,
			},
			shadowOpacity: 0.25,
			shadowRadius: 3.84,
			elevation: 5,
			borderWidth: 1,
			borderColor: colors.mainColor,
			width: 197,
			marginTop: 35,
			overflow: "hidden",
		},
		optionsWrapper: {
			backgroundColor: "transparent",
		},
		optionWrapper: {
			backgroundColor: "transparent",
			margin: 0,
			padding: 0,
			borderRadius: 0,
		},
	};

	return (
		<View style={styles.bottomContainer}>
			<TouchableOpacity
				onPress={() => router.back()}
				style={styles.sideButton}>
				<BackIcon />
			</TouchableOpacity>
			<View style={styles.imageContainerTop}>
				<Text
					numberOfLines={1}
					ellipsizeMode="tail"
					style={styles.titleTxt}>
					{title}
				</Text>
			</View>
			<Menu>
				<MenuTrigger>
					<Image
						style={styles.langIcon}
						source={languages.find((dat) => dat.value === selectedLang)?.icon}
					/>
				</MenuTrigger>
				<MenuOptions customStyles={menuStyles}>
					{languages?.map((dat, index) => (
						<MenuOption
							onSelect={() => switchLangFun(dat?.value)}
							key={index}>
							<View
								style={
									languages.length - 1 !== index
										? [styles.mainLangCont, styles.mb]
										: styles.mainLangCont
								}>
								<Image
									style={styles.langIconSm}
									source={dat?.icon}
								/>
								<Text
									style={{
										...styles.langNameTxt,
										fontWeight: selectedLang === dat?.value ? "600" : "400",
										color:
											selectedLang === dat?.value
												? colors.mainColor
												: colors.topHeadingColor,
									}}>
									{dat?.title}
								</Text>
							</View>
						</MenuOption>
					))}
				</MenuOptions>
			</Menu>
		</View>
	);
};

export default TermsTopBar;

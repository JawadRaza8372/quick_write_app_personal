import { LinearGradient } from "expo-linear-gradient";
import {
	Dimensions,
	Image,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import SelectCircleIcon from "../../assets/icons/SelectCircleIcon";
import DrawerLayout from "../../components/DrawerLayout";
import { languages } from "../../constants/dummyData";
import { useLangStrings } from "../../hooks/useLangStrings";
import { useThemeColors } from "../../hooks/useThemeColors";
import { setSelectedLang } from "../../services/store/userSlice";
const Language = () => {
	const { textStrings } = useLangStrings();
	const dispatch = useDispatch();
	const { selectedLang, theme } = useSelector((state) => state?.user);
	const colors = useThemeColors();
	const switchLangFun = (lng) => {
		dispatch(setSelectedLang({ selectedLang: lng }));
	};
	const styles = StyleSheet.create({
		mainBgCont: {
			width: Dimensions.get("screen").width - 60,
			alignSelf: "center",
			display: "flex",
			flexDirection: "column",
			gap: 30,
			paddingVertical: 30,
			paddingHorizontal: 25,
			borderRadius: 12,
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
			fontSize: 18,
			fontWeight: "500",
			color: colors.topHeadingColor,
		},
		emptyCont: {
			borderWidth: 1,
			borderColor: colors.langBorder,
			width: 18,
			height: 18,
			borderRadius: 20,
		},
		langIcon: {
			width: 37,
			height: 37,
			borderRadius: 37,
			overflow: "hidden",
			resizeMode: "cover",
		},
	});
	return (
		<DrawerLayout title={textStrings.sideLangLabel}>
			<LinearGradient
				colors={
					theme === "light"
						? [colors.langageBg, colors.langageBg]
						: [colors.gradient1, colors.gradient2]
				}
				start={{ x: 0.23, y: 0.0 }}
				end={{ x: 0.97, y: 1.0 }}
				style={styles.mainBgCont}>
				{languages?.map((dat, index) => (
					<TouchableOpacity
						onPress={() => switchLangFun(dat?.value)}
						key={index}
						style={styles.mainLangCont}>
						<Image
							style={styles.langIcon}
							source={dat?.icon}
						/>
						<Text style={styles.langNameTxt}>{dat?.title}</Text>
						{selectedLang === dat?.value ? (
							<SelectCircleIcon />
						) : (
							<View style={styles.emptyCont} />
						)}
					</TouchableOpacity>
				))}
			</LinearGradient>
		</DrawerLayout>
	);
};

export default Language;

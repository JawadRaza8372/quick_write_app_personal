import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import {
	Dimensions,
	FlatList,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { useSelector } from "react-redux";
import DownArrow from "../../assets/icons/DownArrow";
import UpArrow from "../../assets/icons/UpArrow";
import DrawerLayout from "../../components/DrawerLayout";
import { useLangStrings } from "../../hooks/useLangStrings";
import { useThemeColors } from "../../hooks/useThemeColors";

const Faq = () => {
	const colors = useThemeColors();
	const { theme } = useSelector((state) => state?.user);
	const { textStrings } = useLangStrings();
	const [openedItemId, setopenedItemId] = useState("0");
	const styles = StyleSheet.create({
		mainContainer: {
			alignSelf: "center",
			borderRadius: 10,
			width: Dimensions.get("screen").width - 60,
			height: "auto",
		},
		innerContainer: {
			width: "100%",
			paddingHorizontal: 25,
			paddingVertical: 31,
		},
		sepratorView: {
			width: "100%",
			height: 10,
		},
		questionTxt: {
			fontSize: 16,
			fontWeight: "500",
			lineHeight: 22,
			color: colors.topHeadingColor,
		},
		questionBtn: {
			width: "100%",
			height: "auto",
			display: "flex",
			alignItems: "center",
			justifyContent: "flex-start",
			flexDirection: "row",
			gap: 15,
		},
		answerTxt: {
			fontSize: 14,
			fontWeight: "400",
			lineHeight: 22,
			color: colors.successDesc,
		},
		concludeTxt: {
			fontSize: 14,
			fontWeight: "700",
			lineHeight: 22,
			color: colors.subscriptionBorderColor,
		},
		questionCont: {
			height: "auto",
			flex: 1,
		},
		answerView: {
			marginTop: 15,
			width: "100%",
			height: "auto",
		},
		iconContainer: {
			width: 22,
			height: 22,
			display: "flex",
			alignItems: "center",
			justifyContent: "flex-end",
			flexDirection: "row",
		},
		mainPointContainer: {
			width: "97%",
			alignSelf: "center",
			marginTop: 20,
		},
		pointsContainer: {
			width: "100%",
			display: "flex",
			flexDirection: "row",
			gap: 10,
			alignItems: "flex-start",
			justifyContent: "flex-start",
		},
		smallDot: {
			width: 4,
			height: 4,
			borderRadius: 15,
			backgroundColor: colors.successDesc,
			marginTop: 9,
		},
		bottomPadding: {
			width: "100%",
			height: 100,
		},
	});
	return (
		<DrawerLayout title={textStrings.frequentAskQuestion}>
			<FlatList
				data={textStrings.faqArray}
				ItemSeparatorComponent={() => <View style={styles.sepratorView} />}
				keyExtractor={(item, index) => index.toString()}
				renderItem={({ item, index }) => (
					<LinearGradient
						colors={
							theme === "light"
								? [colors.langageBg, colors.langageBg]
								: [colors.gradient1, colors.gradient2]
						}
						start={{ x: 0.23, y: 0.0 }}
						end={{ x: 0.97, y: 1.0 }}
						style={styles.mainContainer}>
						<View style={styles.innerContainer}>
							<TouchableOpacity
								style={styles.questionBtn}
								onPress={() => {
									if (openedItemId === `${index}`) {
										setopenedItemId("");
									} else {
										setopenedItemId(`${index}`);
									}
								}}>
								<View style={styles.questionCont}>
									<Text style={styles.questionTxt}>{item?.question}</Text>
								</View>
								<View style={styles.iconContainer}>
									{openedItemId === `${index}` ? (
										<UpArrow color={colors.langBorder} />
									) : (
										<DownArrow color={colors.langBorder} />
									)}
								</View>
							</TouchableOpacity>
							{openedItemId === `${index}` ? (
								<View style={styles.answerView}>
									<Text style={styles.answerTxt}>{item?.answer}</Text>
									{item?.points?.length > 0 ? (
										<View style={styles.mainPointContainer}>
											{item?.points?.map((dat, index) => (
												<View
													style={styles.pointsContainer}
													key={index}>
													<View style={styles.smallDot} />
													<Text style={styles.answerTxt}>{dat}</Text>
												</View>
											))}
										</View>
									) : null}
									{item?.answer2 ? (
										<Text style={styles.answerTxt}>{item?.answer2}</Text>
									) : null}

									{item?.conslude ? (
										<Text style={styles.concludeTxt}>{item?.conslude}</Text>
									) : null}
								</View>
							) : null}
						</View>
					</LinearGradient>
				)}
				ListFooterComponent={<View style={styles.bottomPadding} />}
			/>
		</DrawerLayout>
	);
};

export default Faq;

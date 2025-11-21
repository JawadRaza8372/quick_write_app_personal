import { useRouter } from "expo-router";
import { Dimensions, FlatList, StyleSheet, Text, View } from "react-native";
import TermsTopBar from "../components/TermsTopBar";
import { useLangStrings } from "../hooks/useLangStrings";
import { useThemeColors } from "../hooks/useThemeColors";

const TermConditions = () => {
	const colors = useThemeColors();
	const router = useRouter();
	const { textStrings } = useLangStrings();
	const styles = StyleSheet.create({
		outerContainer: {
			width: "100%",
			flex: 1,
			backgroundColor: colors.mainBgColor,
			display: "flex",
			flexDirection: "column",
			gap: 15,
		},
		mainContainer: {
			width: Dimensions.get("screen").width - 60,
			alignSelf: "center",
			flex: 1,
		},
		textContainer: {
			backgroundColor: colors.langageBg,
			paddingHorizontal: 18,
			paddingVertical: 22,
			borderRadius: 10,
			width: "100%",
		},
		headingTxt: {
			fontSize: 14,
			fontWeight: "700",
			lineHeight: 22,
			color: colors.successDesc,
		},
		subHeadingTxt: {
			fontSize: 14,
			fontWeight: "400",
			lineHeight: 22,
			color: colors.successDesc,
		},
		sepratorView: {
			width: "100%",
			height: 20,
		},
	});
	return (
		<View style={styles.outerContainer}>
			<TermsTopBar title={textStrings.termService} />
			<View style={styles.mainContainer}>
				<FlatList
					showsVerticalScrollIndicator={false}
					data={textStrings?.termsArray?.points}
					ListHeaderComponent={
						<Text style={[styles.subHeadingTxt, { marginBottom: 20 }]}>
							{textStrings?.termsArray?.intro ?? ""}
						</Text>
					}
					keyExtractor={(item, index) => index.toString()}
					contentContainerStyle={styles.textContainer}
					ItemSeparatorComponent={() => <View style={styles.sepratorView} />}
					renderItem={({ item }) => (
						<>
							<Text style={styles.headingTxt}>{item?.title ?? ""}</Text>
							<Text style={styles.subHeadingTxt}>
								{item?.description ?? ""}
							</Text>
						</>
					)}
				/>
			</View>
		</View>
	);
};

export default TermConditions;

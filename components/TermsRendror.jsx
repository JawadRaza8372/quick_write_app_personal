import { LinearGradient } from "expo-linear-gradient";
import { Dimensions, FlatList, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { useThemeColors } from "../hooks/useThemeColors";

const TermsRendror = ({ data }) => {
	const { theme } = useSelector((state) => state?.user);
	const colors = useThemeColors();
	const styles = StyleSheet.create({
		mainContainer: {
			width: Dimensions.get("screen").width - 60,
			alignSelf: "center",
			marginBottom: 15,
			flex: 1,
		},
		textContainer: {
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
		<View style={styles.mainContainer}>
			<LinearGradient
				colors={
					theme === "light"
						? [colors.langageBg, colors.langageBg]
						: [colors.gradient1, colors.gradient2]
				}
				start={{ x: 0.23, y: 0.0 }}
				end={{ x: 0.97, y: 1.0 }}
				style={styles.textContainer}>
				<FlatList
					showsVerticalScrollIndicator={false}
					data={data?.points}
					ListHeaderComponent={
						<Text style={[styles.subHeadingTxt, { marginBottom: 20 }]}>
							{data?.intro ?? ""}
						</Text>
					}
					keyExtractor={(item, index) => index.toString()}
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
			</LinearGradient>
		</View>
	);
};

export default TermsRendror;

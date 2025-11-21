import { Dimensions, FlatList, StyleSheet, Text, View } from "react-native";
import DrawerLayout from "../../components/DrawerLayout";
import { useLangStrings } from "../../hooks/useLangStrings";
import { useThemeColors } from "../../hooks/useThemeColors";

const TermConditions = () => {
	const colors = useThemeColors();
	const { textStrings } = useLangStrings();
	const styles = StyleSheet.create({
		mainContainer: {
			width: Dimensions.get("screen").width - 60,
			alignSelf: "center",
			marginBottom: 15,
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
		<DrawerLayout title={textStrings.termService}>
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
		</DrawerLayout>
	);
};

export default TermConditions;

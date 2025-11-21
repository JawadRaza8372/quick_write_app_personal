import { Image, StyleSheet, Text, View } from "react-native";
import card from "../assets/images/card.png";
import { useLangStrings } from "../hooks/useLangStrings";
import { useThemeColors } from "../hooks/useThemeColors";
import { formatTimestampWithMoment } from "../services/endpoints";
const BillComp = ({ transactionId, status, amount, completedOn, paidBy }) => {
	const colors = useThemeColors();
	const { textStrings } = useLangStrings();

	const styles = StyleSheet.create({
		mainContainer: {
			width: "100%",
			borderRadius: 15,
			borderWidth: 1,
			borderColor: colors.billBorder,
			backgroundColor: colors.mainBgColor,
			padding: 15,
			display: "flex",
			alignItems: "center",
			justifyContent: "flex-start",
			flexDirection: "row",
			gap: 11,
		},
		iconContainer: {
			height: 52,
			width: 52,
			borderRadius: 12,
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			backgroundColor: colors.mainColor,
		},
		iconStyle: {
			width: 25,
			height: 18,
			resizeMode: "contain",
		},
		textContainer: {
			height: "auto",
			flex: 1,
			display: "flex",
			flexDirection: "column",
			gap: 1,
		},
		rowContainer: {
			width: "100%",
			display: "flex",
			alignItems: "center",
			justifyContent: "space-between",
			flexDirection: "row",
			gap: 10,
			height: "auto",
		},
		topTxt: {
			fontSize: 16,
			fontWeight: "700",
			color: colors.darkColor,
		},
		dateTxt: {
			fontSize: 12,
			fontWeight: "400",
			color: colors.darkColor,
			height: "auto",
			flex: 1,
			textAlign: "right",
		},
		transcctionTxt: {
			fontSize: 12,
			fontWeight: "400",
			color: colors.darkColor,
		},
		transcctionIdTxt: {
			fontSize: 12,
			fontWeight: "400",
			color: colors.darkColor,
			height: "auto",
			flex: 1,
		},
		statusTxt: {
			fontSize: 10,
			fontWeight: "700",
			color:
				status === "confirmed" || status === "succeeded"
					? colors.greenTxt
					: colors.redTxt,
			textTransform: "capitalize",
		},
		statusBg: {
			backgroundColor:
				status === "confirmed" || status === "succeeded"
					? colors.greenBg
					: colors.redBg,
			paddingVertical: 1,
			paddingHorizontal: 6,
			borderRadius: 4,
		},
	});

	return (
		<View style={styles.mainContainer}>
			<View style={styles.iconContainer}>
				<Image
					source={card}
					style={styles.iconStyle}
				/>
			</View>
			<View style={styles.textContainer}>
				<View style={styles.rowContainer}>
					<Text style={styles.topTxt}>
						{textStrings.paidFrom} {paidBy ?? "Card"}
					</Text>
					<Text style={styles.topTxt}>${amount ?? 0}</Text>
				</View>
				<View style={styles.rowContainer}>
					<Text style={styles.transcctionTxt}>{textStrings.transactionId}</Text>
					<View style={styles.statusBg}>
						<Text style={styles.statusTxt}>
							{textStrings[status] ?? status}
						</Text>
					</View>
				</View>
				<View style={styles.rowContainer}>
					<Text
						numberOfLines={1}
						ellipsizeMode="tail"
						style={styles.transcctionIdTxt}>
						{transactionId ?? ""}
					</Text>
					<Text
						numberOfLines={1}
						ellipsizeMode="tail"
						style={styles.dateTxt}>
						{completedOn ? formatTimestampWithMoment(completedOn) : "--"}
					</Text>
				</View>
			</View>
		</View>
	);
};

export default BillComp;

import { setAuthToken } from "@/services/apiUrl";
import {
	removeUserTokenfromStorage,
	resetUser,
} from "@/services/store/userSlice";
import { useRouter } from "expo-router";
import { Dimensions, Modal, StyleSheet, Text, View } from "react-native";
import { useDispatch } from "react-redux";
import { useLangStrings } from "../hooks/useLangStrings";
import { useThemeColors } from "../hooks/useThemeColors";
import CustomButton from "./CustomButton";
const PlanExpiredModal = ({ showModal, activePlan }) => {
	const { textStrings } = useLangStrings();
	const colors = useThemeColors();
	const router = useRouter();
	const dispatch = useDispatch();
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
			width: Dimensions.get("screen").width - 50,
			display: "flex",
			flexDirection: "column",
			backgroundColor: colors.mainBgColor,
			borderRadius: 15,
			paddingVertical: 31,
			paddingHorizontal: 27,
			gap: 21,
		},
		descriptionTxt: {
			color: colors.successDesc,
			fontWeight: "400",
			fontSize: 14,
			lineHeight: 18,
			textAlign: "center",
			marginBottom: 10,
		},
		headingTxt: {
			color: colors.redTxt,
			fontWeight: "600",
			fontSize: 16,
			lineHeight: 20,
			textAlign: "center",
			textTransform: "capitalize",
		},
		sideBySideView: {
			width: "100%",
			height: "auto",
			display: "flex",
			alignItems: "center",
			justifyContent: "space-between",
			flexDirection: "row",
		},
	});
	if (!showModal) {
		return null;
	}
	const onLogoutBtnPress = async () => {
		await removeUserTokenfromStorage();
		dispatch(resetUser());
		setAuthToken(null);
		router.replace({ pathname: "/login" });
	};
	return (
		<Modal
			visible={showModal}
			onRequestClose={() => console.log("close selected")}
			transparent={true}>
			<View style={styles.modalBg}>
				<View style={styles.mainBg}>
					<Text style={styles.headingTxt}>
						{activePlan === "free"
							? textStrings.trailEnded
							: textStrings.subscriptionExpired}
					</Text>
					<Text style={styles.descriptionTxt}>
						{activePlan === "free"
							? textStrings.trailEndedDesc
							: textStrings.subscriptionExpiredDesc}
					</Text>
					<View style={styles.sideBySideView}>
						<CustomButton
							btnTitle={textStrings.upgrade}
							btnWidth={"49%"}
							btnRadius={5}
							txtSize={13}
							onPressFun={() => router.push({ pathname: "/subscription" })}
						/>

						<CustomButton
							btnTitle={textStrings.logout}
							bgColor={colors.redColor}
							borderColor={colors.redColor}
							btnWidth={"49%"}
							txtSize={13}
							btnRadius={5}
							onPressFun={onLogoutBtnPress}
						/>
					</View>
				</View>
			</View>
		</Modal>
	);
};

export default PlanExpiredModal;

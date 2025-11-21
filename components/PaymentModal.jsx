import {
	Dimensions,
	Image,
	Modal,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import CloseIcon from "../assets/icons/CloseIcon";
import cardpin from "../assets/images/card-pin.png";
import card1 from "../assets/images/card1.png";
import card2 from "../assets/images/card2.png";
import card3 from "../assets/images/card3.png";
import card4 from "../assets/images/card4.png";

import { Dropdown } from "react-native-element-dropdown";
import stripeImg from "../assets/images/stripe.png";
import { countries } from "../constants/dummyData";
import { useThemeColors } from "../hooks/useThemeColors";
import CustomButton from "./CustomButton";

const PaymentModal = ({
	showModal,
	closeModalFun,
	onPayPress,
	formData,
	setFormData,
}) => {
	const colors = useThemeColors();

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
		topHeaderContainer: {
			width: "100%",
			position: "relative",
			height: 70,
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			flexDirection: "row",
		},
		headerImage: {
			width: "100%",
			height: "100%",
			resizeMode: "contain",
		},
		closeBtn: {
			width: 49,
			height: 49,
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			flexDirection: "column",
			position: "absolute",
			top: -17,
			right: -12,
		},
		inputWrapper: {
			width: "100%",
			height: "auto",
			display: "flex",
			flexDirection: "column",
			gap: 8,
		},
		labelTxt: {
			fontSize: 11,
			fontWeight: "300",
			color: colors.labelColor,
			letterSpacing: 0.2,
		},
		shadowView: {
			shadowColor: colors.darkColor,
			shadowOffset: {
				width: 0,
				height: 2,
			},
			shadowOpacity: 0.25,
			shadowRadius: 3.84,
			elevation: 5,
		},
		dateInput: {
			height: "100%",
			flex: 1,
			fontSize: 11,
			fontWeight: "300",
			color: colors.darkColor,
			backgroundColor: colors.mainBgColor,
			paddingHorizontal: 11,
			borderRightWidth: 1,
			borderColor: colors.stripeBorder,
		},
		csvInput: {
			height: "100%",
			flex: 1,
			fontSize: 11,
			fontWeight: "300",
			color: colors.darkColor,
			backgroundColor: colors.mainBgColor,
			paddingHorizontal: 11,
		},
		cardPinImage: {
			height: "100%",
			width: 26,
			resizeMode: "contain",
		},
		emailTxtInput: {
			width: "100%",
			height: 32,
			fontSize: 11,
			fontWeight: "300",
			color: colors.darkColor,
			borderRadius: 5,
			backgroundColor: colors.mainBgColor,
			paddingHorizontal: 11,
		},
		cardInfoView: {
			width: "100%",
			display: "flex",
			height: "auto",
			flexDirection: "column",
			borderRadius: 5,
			backgroundColor: colors.mainBgColor,
		},
		otherInfoView: {
			width: "100%",
			height: 32,
			display: "flex",
			alignItems: "center",
			justifyContent: "flex-start",
			flexDirection: "row",
			height: 32,
			borderTopWidth: 1,
			borderColor: colors.stripeBorder,
		},
		rowView: {
			width: "100%",
			height: 32,
			display: "flex",
			alignItems: "center",
			justifyContent: "flex-start",
			flexDirection: "row",
			gap: 5,
		},
		csvView: {
			height: "100%",
			flex: 1,
			display: "flex",
			alignItems: "center",
			justifyContent: "flex-start",
			flexDirection: "row",
			gap: 5,
		},
		numberImageView: {
			height: "100%",
			display: "flex",
			alignItems: "center",
			justifyContent: "flex-end",
			flexDirection: "row",
			gap: 5,
		},
		selectContainer: {
			flexDirection: "row",
			alignItems: "center",
			justifyContent: "space-between",
			paddingHorizontal: 11,
			height: 32,
		},
		selectLabel: {
			color: colors.darkColor,
			fontFamily: "600",
			fontSize: 11,
		},
		placeholderStyle: {
			color: colors.stripePlaceholderColor,
			fontFamily: "300",
			fontSize: 11,
		},
	});

	return (
		<Modal
			visible={showModal}
			onRequestClose={closeModalFun}
			transparent={true}>
			<View style={styles.modalBg}>
				<View style={styles.mainBg}>
					<View style={styles.topHeaderContainer}>
						<Image
							style={styles.headerImage}
							source={stripeImg}
						/>
						<TouchableOpacity
							onPress={closeModalFun}
							style={styles.closeBtn}>
							<CloseIcon size={18} />
						</TouchableOpacity>
					</View>
					<View style={styles.inputWrapper}>
						<Text style={styles.labelTxt}>Email</Text>
						<TextInput
							style={[styles.emailTxtInput, styles.shadowView]}
							placeholder="jhon@mail.com"
							placeholderTextColor={colors.stripePlaceholderColor}
							value={formData.email}
							onChangeText={(text) => {
								setFormData({ ...formData, email: text });
							}}
						/>
					</View>
					<View style={styles.inputWrapper}>
						<Text style={styles.labelTxt}>Card Information</Text>
						<View style={[styles.cardInfoView, styles.shadowView]}>
							<View style={styles.rowView}>
								<TextInput
									style={[styles.csvInput]}
									placeholder="Number"
									placeholderTextColor={colors.stripePlaceholderColor}
									value={formData.number}
									onChangeText={(text) => {
										setFormData({ ...formData, number: text });
									}}
								/>
								<View style={styles.numberImageView}>
									<Image
										source={card1}
										style={styles.cardPinImage}
									/>
									<Image
										source={card2}
										style={styles.cardPinImage}
									/>
									<Image
										source={card3}
										style={styles.cardPinImage}
									/>
									<Image
										source={card4}
										style={styles.cardPinImage}
									/>
								</View>
							</View>

							<View style={styles.otherInfoView}>
								<TextInput
									style={[styles.dateInput]}
									placeholder="MM/YY"
									placeholderTextColor={colors.stripePlaceholderColor}
									value={formData.date}
									onChangeText={(text) => {
										setFormData({ ...formData, date: text });
									}}
								/>
								<View style={styles.csvView}>
									<TextInput
										style={[styles.csvInput]}
										placeholder="CSV"
										placeholderTextColor={colors.stripePlaceholderColor}
										value={formData.csv}
										onChangeText={(text) => {
											setFormData({ ...formData, csv: text });
										}}
									/>
									<Image
										source={cardpin}
										style={styles.cardPinImage}
									/>
								</View>
							</View>
						</View>
					</View>
					<View style={styles.inputWrapper}>
						<Text style={styles.labelTxt}>Country or Region</Text>
						<View style={[styles.cardInfoView, styles.shadowView]}>
							<Dropdown
								style={styles.selectContainer}
								placeholderStyle={styles.placeholderStyle}
								selectedTextStyle={styles.selectLabel}
								itemContainerStyle={{
									backgroundColor: colors.mainBgColor,
								}}
								activeColor={colors.sepratorView}
								flatListProps={{
									ItemSeparatorComponent: () => <View style={{ height: 1 }} />,
								}}
								itemTextStyle={{
									fontSize: 12,
									fontWeight: "400",
									color: colors.darkColor,
								}}
								data={countries}
								maxHeight={300}
								labelField="label"
								valueField="value"
								placeholder={"Country"}
								value={formData.country}
								onChange={(item) => {
									setFormData({ ...formData, country: item.value });
								}}
							/>
							<View style={styles.otherInfoView}>
								<TextInput
									style={[styles.dateInput, { borderRightWidth: 0 }]}
									placeholder="Zip Code"
									placeholderTextColor={colors.stripePlaceholderColor}
								/>
							</View>
						</View>
					</View>

					<CustomButton
						txtSize={11}
						btnHeight={32}
						btnTitle={"Pay"}
						btnWidth={"100%"}
						btnRadius={5}
						bgColor={colors.payBg}
						onPressFun={onPayPress}
					/>
				</View>
			</View>
		</Modal>
	);
};

export default PaymentModal;

import shieldImage from "@/assets/images/shield.png";
import { useState } from "react";
import {
	FlatList,
	Image,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import tick from "../../assets/images/item_tick.png";
import logoImage from "../../assets/images/logo.png";
import DrawerLayout from "../../components/DrawerLayout";
import LogContainer from "../../components/LogContainer";
import { useLangStrings } from "../../hooks/useLangStrings";
import { useThemeColors } from "../../hooks/useThemeColors";

const VisibilityValidation = () => {
	const colors = useThemeColors();
	const { textStrings } = useLangStrings();
	const [selectedDataDuration, setselectedDataDuration] = useState("0day");
	const styles = StyleSheet.create({
		logoImageStyle: {
			width: 33,
			height: 33,
			resizeMode: "contain",
		},
		topMainTxt: {
			fontSize: 18,
			fontWeight: "400",
			color: colors.darkColor,
		},
		manageTitle: {
			fontSize: 16,
			fontWeight: "700",
			color: colors.darkColor,
			textAlign: "center",
		},
		optionNormal: {
			fontSize: 16,
			fontWeight: "700",
			color: colors.darkColor,
		},
		optionSmall: {
			fontSize: 12,
			fontWeight: "400",
			color: colors.darkColor,
		},
		manageDescriptionTxt: {
			fontSize: 12,
			fontWeight: "400",
			color: colors.darkColor,
			textAlign: "center",
		},
		optionsContainer: {
			height: "auto",
			display: "flex",
			flexDirection: "column",
			gap: 15,
			marginTop: 15,
			width: "100%",
		},
		labelText: {
			fontSize: 12,
			fontWeight: "400",
			color: colors.inputLabelColor,
			flexShrink: 1,
			lineHeight: 20,
		},
		selectImage: {
			width: 18,
			height: 18,
			resizeMode: "contain",
			tintColor: colors.greenTxt,
		},
		optionSelectImage: {
			width: 14,
			height: 14,
			resizeMode: "contain",
			tintColor: colors.greenTxt,
		},
		deleteMainContainer: {
			width: "100%",
			height: "auto",
			display: "flex",
			alignItems: "center",
			justifyContent: "space-between",
			flexDirection: "row",
			gap: 10,
		},
		auditMainContainer: {
			width: "100%",
			height: "auto",
			display: "flex",
			flexDirection: "column",
			gap: 2,
		},

		rowcontainer: {
			height: "auto",
			flex: 1,
			display: "flex",
			alignItems: "center",
			justifyContent: "flex-start",
			flexDirection: "row",
			gap: 10,
		},
		moreIcon: {
			width: 24,
			height: 24,
			resizeMode: "contain",
		},
		shieldContainer: {
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
			alignSelf: "center",
		},
		endSessionTxt: {
			fontSize: 14,
			fontWeight: "400",
			color: colors.shieldColor,
		},
		deleteDataContainer: {
			width: "100%",
			display: "flex",
			flexDirection: "column",
			alignItems: "center",
			justifyContent: "center",
			gap: 25,
			marginTop: 35,
			marginBottom: 50,
		},
		innerContainer: {
			paddingHorizontal: 30,
		},
		logsContainerMain: {
			width: "100%",
			height: "auto",
			display: "flex",
			flexDirection: "column",
			gap: 35,
			marginTop: 35,
		},
		logSprator: {
			width: "100%",
			height: 10,
		},
	});

	return (
		<DrawerLayout
			leftBtn={
				<Image
					style={styles.logoImageStyle}
					source={logoImage}
				/>
			}
			title={textStrings.sideVisibiltyVerfication}>
			<ScrollView
				showsVerticalScrollIndicator={false}
				contentContainerStyle={styles.innerContainer}>
				<Text style={styles.topMainTxt}>{textStrings.visibiltyText1}</Text>
				<Text style={[styles.topMainTxt, { marginVertical: 25 }]}>
					{textStrings.visibiltyText2}
				</Text>
				<View>
					<Text style={styles.optionNormal}>
						{textStrings.visibiltyChatHistoryTitle}{" "}
						<Text style={styles.optionSmall}>
							({textStrings.visibiltyChatHistorySubTitle})
						</Text>
					</Text>
					<View style={styles.optionsContainer}>
						{textStrings.visibiltyChatHistoryOptions?.map((dat, index) => (
							<TouchableOpacity
								onPress={() => setselectedDataDuration(dat?.value)}
								key={index}
								style={styles.rowcontainer}>
								<Text style={styles.labelText}>{dat?.label}</Text>
								{dat?.value === selectedDataDuration ? (
									<Image
										source={tick}
										style={styles.selectImage}
									/>
								) : null}
							</TouchableOpacity>
						))}
					</View>
				</View>
				<View style={styles.logsContainerMain}>
					<LogContainer title={textStrings.deltSessionStatus}>
						<FlatList
							showsVerticalScrollIndicator={false}
							data={[
								textStrings.sessionDeleted,
								textStrings.localDeleted,
								textStrings.serverDeleted,
								textStrings.noDataStored,
							]}
							ItemSeparatorComponent={() => <View style={styles.logSprator} />}
							renderItem={({ item, index }) => (
								<View
									key={index}
									style={styles.deleteMainContainer}>
									<Text style={styles.labelText}>{item}</Text>

									<Image
										source={tick}
										style={styles.optionSelectImage}
									/>
								</View>
							)}
						/>
					</LogContainer>
					<LogContainer
						title={textStrings.auditStatus}
						description={textStrings.auditDesc}>
						<FlatList
							nestedScrollEnabled={true}
							data={[
								textStrings.sessionDeleted,
								textStrings.localDeleted,
								textStrings.serverDeleted,
								textStrings.noDataStored,
								textStrings.sessionDeleted,
								textStrings.localDeleted,
								textStrings.serverDeleted,
								textStrings.noDataStored,
								textStrings.sessionDeleted,
								textStrings.localDeleted,
								textStrings.serverDeleted,
								textStrings.noDataStored,
							]}
							showsVerticalScrollIndicator={false}
							ItemSeparatorComponent={() => <View style={styles.logSprator} />}
							renderItem={({ item, index }) => (
								<View
									key={index}
									style={styles.auditMainContainer}>
									<Text style={{ ...styles.labelText, fontWeight: "700" }}>
										{new Date().toISOString()}
									</Text>
									<Text style={styles.labelText}>
										{textStrings.chatHistoryDeleted}
									</Text>
								</View>
							)}
						/>
					</LogContainer>
				</View>
				<View style={styles.deleteDataContainer}>
					<Text style={styles.topMainTxt}>{textStrings.manageLocalData}</Text>
					<Text style={styles.manageDescriptionTxt}>
						{textStrings.manageDataDesc}
					</Text>
					<TouchableOpacity
						onPress={null}
						style={styles.shieldContainer}>
						<Image
							style={styles.moreIcon}
							source={shieldImage}
						/>
						<Text style={styles.endSessionTxt}>
							{textStrings.deleteFromDevice}
						</Text>
					</TouchableOpacity>
				</View>
			</ScrollView>
		</DrawerLayout>
	);
};

export default VisibilityValidation;

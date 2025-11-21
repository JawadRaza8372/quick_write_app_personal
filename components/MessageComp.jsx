import { BlurView } from "expo-blur";
import * as Clipboard from "expo-clipboard";
import {
	Dimensions,
	FlatList,
	Image,
	Linking,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import Toast from "react-native-toast-message";
import CopyIcon from "../assets/icons/CopyIcon";
import HistoryIcon from "../assets/icons/HistoryIcon";
import bookIcon from "../assets/images/book.png";
import webLink from "../assets/images/web.png";
import { useThemeColors } from "../hooks/useThemeColors";
const MessageComp = ({
	isSender,
	title,
	message,
	sources,
	images,
	onHistoryPress,
	onImageBtnPress,
}) => {
	const colors = useThemeColors();
	const onCopyPress = async () => {
		if (message) {
			await Clipboard.setStringAsync(message);
			Toast.show({
				type: "success",
				text1: "Copied to clipboard",
			});
		}
	};
	const styles = StyleSheet.create({
		mainContainer: {
			width: "100%",
			height: "auto",
		},
		senderMessageContainer: {
			width: "auto",
			height: "auto",
			display: "flex",
			alignItems: "flex-end",
			justifyContent: "flex-end",
			flexDirection: "row",
			gap: 7,
		},
		senderMessageCont: {
			paddingVertical: 11,
			paddingHorizontal: 12,
			borderRadius: 10,
			backgroundColor: colors.senderBg,
			maxWidth: "80%",
		},
		editBtn: {
			height: 43,
			width: 29,
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			borderRadius: 7,
			backgroundColor: colors.senderBg,
		},
		editIconStyle: {
			height: 16,
			width: 16,
			resizeMode: "contain",
		},
		responceContainer: {
			width: "100%",
			height: "auto",
			display: "flex",
			flexDirection: "column",
			gap: 18,
		},
		textContainer: {
			maxWidth: "92%",
			height: "auto",
			display: "flex",
			flexDirection: "column",
			gap: 4,
		},
		titleTxt: {
			fontSize: 18,
			fontWeight: "700",
			color: colors.machineMsg,
		},
		messageTxt: {
			fontSize: 14,
			fontWeight: "400",
			color: colors.machineMsg,
		},
		btnCont: {
			width: 39,
			height: 38,
			borderRadius: 11,
			borderWidth: 1,
			borderColor: colors.chatBtn,
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
		},
		twoBtns: {
			height: "auto",
			flex: 1,
			display: "flex",
			alignItems: "center",
			justifyContent: "flex-start",
			flexDirection: "row",
			gap: 10,
		},
		responceImageMainContainer: {
			height: 161,
			width: Dimensions.get("screen").width * 0.59,
			borderRadius: 24,
			position: "relative",
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			borderWidth: 1,
			borderColor: colors.moreBg,
			overflow: "hidden",
		},
		sepratorViewImage: {
			height: "auto",
			width: 16,
		},
		responceImage: {
			width: "100%",
			height: "100%",
			resizeMode: "cover",
		},
		imageHistory: {
			width: 39,
			height: 38,
			borderRadius: 11,
			borderWidth: 1,
			borderColor: colors.chatBtn,
			position: "absolute",
			zIndex: 2,
			top: 12,
			left: 15,
			overflow: "hidden",
		},
		internalView: {
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			backgroundColor: colors.white50,
			width: "100%",
			height: "100%",
		},
		responceSourceMainContainer: {
			width: Dimensions.get("screen").width * 0.59,
			borderRadius: 20,
			backgroundColor: colors.sourceBg,
			paddingVertical: 17,
			paddingHorizontal: 14,
			display: "flex",
			flexDirection: "column",
			gap: 12,
		},
		webIcon: {
			height: 19,
			width: 19,
			resizeMode: "contain",
		},
		linkContainer: {
			width: "100%",
			height: "auto",
			display: "flex",
			alignItems: "center",
			justifyContent: "flex-start",
			flexDirection: "row",
			gap: 7,
		},
		linkLabel: {
			height: "auto",
			flex: 1,
			fontSize: 14,
			fontWeight: "400",
			color: colors.backColor,
		},
		lineTxt: {
			height: "auto",
			flex: 1,
			fontSize: 14,
			lineHeight: 22,
			fontWeight: "400",
			color: colors.refernceTxt,
		},
		sourcesViewMain: {
			width: "100%",
			height: "auto",
			display: "flex",
			flexDirection: "column",
			gap: 16,
		},
		sourceTxt: {
			fontSize: 18,
			lineHeight: 26,
			fontWeight: "700",
			color: colors.refernceTxt,
		},
		myMsgTxt: {
			fontSize: 14,
			fontWeight: "400",
			color: colors.myMsgColor,
			lineHeight: 20,
		},
		bookIconImage: {
			width: 29,
			height: 29,
			resizeMode: "contain",
		},
	});
	const SourceRenderComp = ({ linkTitle, title, link }) => {
		const RenderComp = link ? TouchableOpacity : View;
		const renderProps = link ? { onPress: () => Linking.openURL(link) } : {};
		return (
			<RenderComp
				{...renderProps}
				style={styles.responceSourceMainContainer}>
				<Text
					numberOfLines={2}
					ellipsizeMode="tail"
					style={styles.lineTxt}>
					{title ?? ""}
				</Text>
				<View style={styles.linkContainer}>
					<Image
						style={styles.webIcon}
						source={webLink}
					/>
					<Text
						numberOfLines={1}
						ellipsizeMode="tail"
						style={styles.linkLabel}>
						{linkTitle ?? ""}
					</Text>
				</View>
			</RenderComp>
		);
	};
	return (
		<View style={styles.mainContainer}>
			{isSender ? (
				<View style={styles.senderMessageContainer}>
					<TouchableOpacity
						onPress={onCopyPress}
						style={styles.btnCont}>
						<CopyIcon />
					</TouchableOpacity>
					<View style={styles.senderMessageCont}>
						<Text style={styles.myMsgTxt}>{message}</Text>
					</View>
				</View>
			) : (
				<View style={styles.responceContainer}>
					{sources ? (
						<View style={styles.sourcesViewMain}>
							<View style={{ ...styles.linkContainer, gap: 11 }}>
								<Image
									source={bookIcon}
									style={styles.bookIconImage}
								/>
								<Text style={styles.sourceTxt}>Sources</Text>
							</View>
							<FlatList
								ItemSeparatorComponent={() => (
									<View style={styles.sepratorViewImage} />
								)}
								showsHorizontalScrollIndicator={false}
								horizontal={true}
								data={sources}
								keyExtractor={(item, index) => index.toString()}
								renderItem={({ item }) => (
									<SourceRenderComp
										link={item?.link}
										linkTitle={item?.linkTitle}
										title={item?.title}
									/>
								)}
							/>
						</View>
					) : null}
					<View style={styles.textContainer}>
						{title ? <Text style={styles.titleTxt}>{title ?? ""}</Text> : null}
						<Text style={styles.messageTxt}>{message ?? ""}</Text>
					</View>
					{images?.length > 0 ? (
						<FlatList
							ItemSeparatorComponent={() => (
								<View style={styles.sepratorViewImage} />
							)}
							showsHorizontalScrollIndicator={false}
							horizontal={true}
							data={images}
							keyExtractor={(item, index) => index.toString()}
							renderItem={({ item }) => (
								<View style={styles.responceImageMainContainer}>
									<Image
										style={styles.responceImage}
										source={{ uri: item }}
									/>
									<TouchableOpacity
										onPress={onImageBtnPress}
										style={styles.imageHistory}>
										<BlurView
											style={styles.internalView}
											intensity={3}>
											<HistoryIcon
												size={20}
												color={colors.mainBgColor}
											/>
										</BlurView>
									</TouchableOpacity>
								</View>
							)}
						/>
					) : null}
					<View style={[styles.twoBtns, { marginTop: 8 }]}>
						<View style={styles.twoBtns}>
							<TouchableOpacity
								onPress={onCopyPress}
								style={styles.btnCont}>
								<CopyIcon />
							</TouchableOpacity>
						</View>
						{/* <TouchableOpacity
							onPress={onHistoryPress}
							style={styles.btnCont}>
							<HistoryIcon />
						</TouchableOpacity> */}
					</View>
				</View>
			)}
		</View>
	);
};

export default MessageComp;

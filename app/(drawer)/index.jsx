import { useEffect, useRef, useState } from "react";
import {
	Dimensions,
	FlatList,
	Image,
	Keyboard,
	KeyboardAvoidingView,
	Platform,
	StyleSheet,
	TouchableWithoutFeedback,
	View,
} from "react-native";
import { useSelector } from "react-redux";
import newChatIcon from "../../assets/images/new-chat.png";
import BottomChat from "../../components/BottomChat";
import DrawerLayout from "../../components/DrawerLayout";
import MessageComp from "../../components/MessageComp";
import PlanExpiredModal from "../../components/PlanExpiredModal";
import { useLangStrings } from "../../hooks/useLangStrings";
import { useThemeColors } from "../../hooks/useThemeColors";
import {
	endCurrentSessionApi,
	getCurrentChatRoomMessagesApi,
} from "../../services/endpoints";
import {
	getSocket,
	joinRoom,
	leaveRoom,
	receiveMessage,
	sendMessage,
} from "../../services/socketService";
const Home = () => {
	const { textStrings } = useLangStrings();
	const colors = useThemeColors();
	const { user } = useSelector((state) => state?.user);
	const roomId = user?.chatRoomId; //  room ID from user
	const [chatData, setchatData] = useState([]);
	const [messageValue, setmessageValue] = useState("");
	const flatListRef = useRef(null);
	const [showExpiredModal, setShowExpiredModal] = useState(false);
	const styles = StyleSheet.create({
		newChatIcon: {
			width: 24,
			height: 24,
			resizeMode: "contain",
		},
		mainContainer: {
			width: "100%",
			flex: 1,
		},
		authMainContainer: {
			width: Dimensions.get("screen").width - 26,
			alignSelf: "center",
			flex: 1,
		},
		sepratorView: {
			width: "100%",
			height: 26,
		},
		bottomPadding: {
			width: "100%",
			height: 20,
		},
	});
	useEffect(() => {
		const socket = getSocket(); // Get the socket instance

		if (socket) {
			joinRoom(roomId); // Join the room

			receiveMessage((message) => {
				setchatData((prevMessages) => [...prevMessages, message]);
			});
		}
		fetchChatRoomMessages();
		return () => {
			if (socket && roomId) {
				leaveRoom(roomId);
			}
		};
	}, [roomId]);
	const fetchChatRoomMessages = async () => {
		await getCurrentChatRoomMessagesApi(roomId)
			.then((dat) => {
				if (dat?.messages?.length > 0) {
					setchatData(dat?.messages);
				} else {
					setchatData(dat?.messages);
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};
	const endCurrentSessionFun = async () => {
		await endCurrentSessionApi(roomId)
			.then((dat) => {
				setchatData([]);
			})
			.catch((err) => {
				console.log(err);
			});
	};
	const sendMessageFun = () => {
		if (messageValue.trim().length > 0) {
			sendMessage({
				chatRoomId: roomId,
				content: messageValue,
			});
			setmessageValue("");
		}
	};
	useEffect(() => {
		if (chatData.length > 0) {
			flatListRef?.current?.scrollToEnd({ animated: true });
		}
	}, [chatData]);
	useEffect(() => {
		if (!user?.expiresAt || !user?.activePlan) return;
		const checkExpiry = () => {
			const now = new Date();
			const expiry = new Date(user.expiresAt);
			console.log("runed");
			if (expiry <= now) {
				setShowExpiredModal(true);
				clearInterval(interval); // stop checking once expired
			} else {
				setShowExpiredModal(false);
			}
			console.log("runed");
		};
		checkExpiry(); // immediate check

		const interval = setInterval(() => {
			const expired = checkExpiry();
			if (expired) clearInterval(interval);
		}, 3 * 60 * 1000); // 5 minutes

		return () => clearInterval(interval);
	}, [user]);
	return (
		<DrawerLayout
			leftBtnFun={endCurrentSessionFun}
			leftbgColor={colors.mainColor}
			leftBtn={
				<Image
					style={styles.newChatIcon}
					source={newChatIcon}
				/>
			}>
			<View style={styles.mainContainer}>
				<KeyboardAvoidingView
					style={{ flex: 1 }}
					behavior={Platform.OS === "ios" ? "padding" : undefined}>
					<View style={styles.authMainContainer}>
						<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
							<FlatList
								ref={flatListRef}
								onContentSizeChange={() =>
									flatListRef?.current?.scrollToEnd({ animated: true })
								}
								showsVerticalScrollIndicator={false}
								data={chatData}
								ItemSeparatorComponent={() => (
									<View style={styles.sepratorView} />
								)}
								keyExtractor={(item, index) => index.toString()}
								renderItem={({ item }) => (
									<MessageComp
										isSender={item?.role === "user"}
										message={item?.content}
										title={item?.title}
										onHistoryPress={() => null}
										onImageBtnPress={() => null}
									/>
								)}
								ListFooterComponent={<View style={styles.bottomPadding} />}
							/>
						</TouchableWithoutFeedback>
						<BottomChat
							hideBtns={chatData.length > 0}
							value={messageValue}
							onChangeValue={(text) => setmessageValue(text)}
							onEndPress={endCurrentSessionFun}
							onSendPress={sendMessageFun}
							onAnalyzePress={() =>
								setmessageValue(textStrings?.aiPrompts?.analyze)
							}
							onEmailPress={() =>
								setmessageValue(textStrings?.aiPrompts?.writeEmail)
							}
							onRefinPress={() =>
								setmessageValue(textStrings?.aiPrompts?.refineWriting)
							}
							onResponcePress={() =>
								setmessageValue(textStrings?.aiPrompts?.textResponse)
							}
							onSummaryPress={() =>
								setmessageValue(textStrings?.aiPrompts?.summarize)
							}
						/>
					</View>
				</KeyboardAvoidingView>
				<PlanExpiredModal
					activePlan={user?.activePlan}
					showModal={showExpiredModal}
				/>
			</View>
		</DrawerLayout>
	);
};

export default Home;

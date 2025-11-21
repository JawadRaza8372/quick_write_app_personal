import { useStripe } from "@stripe/stripe-react-native";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
	Dimensions,
	Image,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import Toast from "react-native-toast-message";
import { useSelector } from "react-redux";
import CloseIcon from "../assets/icons/CloseIcon";
import tickImage from "../assets/images/item_tick.png";
import starImage from "../assets/images/star.png";
import AuthLayout from "../components/AuthLayout";
import CustomButton from "../components/CustomButton";
import LoadingModal from "../components/LoadingModal";
import PaymentModal from "../components/PaymentModal";
import { useLangStrings } from "../hooks/useLangStrings";
import { useThemeColors } from "../hooks/useThemeColors";
import {
	createPaymentIntentApi,
	postPaymentSuccessApi,
	shouldShowGetStarted,
} from "../services/endpoints";
const Subscription = () => {
	const { theme } = useSelector((state) => state?.user);
	const { textStrings } = useLangStrings();
	const colors = useThemeColors();
	const { initPaymentSheet, presentPaymentSheet, confirmPayment } = useStripe();
	const [sselectedTab, setsselectedTab] = useState("Monthly");
	const [openStripeModal, setopenStripeModal] = useState(false);
	const [openLoadingModal, setopenLoadingModal] = useState(false);
	const { user } = useSelector((state) => state?.user);
	const [paymentFormData, setPaymentFormData] = useState({
		number: "",
		csv: "",
		date: "",
		country: "",
		zip: "",
		email: "",
	});
	const subscriptionData =
		sselectedTab === "Monthly"
			? textStrings.subscriptionsArray[0]
			: textStrings.subscriptionsArray[1];
	useEffect(() => {
		if (openLoadingModal) {
			setTimeout(() => {
				setopenLoadingModal(false);
				setopenStripeModal(false);
				router.push({ pathname: "/success", params: { type: "payment" } });
			}, 1200);
		}
	}, [openLoadingModal]);

	const styles = StyleSheet.create({
		mainContainer: {
			width: "100%",
			height: "100%",
			display: "flex",
			alignItems: "center",
			justifyContent: "flex-start",
			flexDirection: "column",
			position: "relative",
		},
		closeBtn: {
			width: 49,
			height: 49,
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			flexDirection: "column",
			position: "absolute",
			top: 15,
			right: 10,
		},
		mainTabContainer: {
			height: 40,
			borderRadius: 5,
			width: Dimensions.get("screen").width - 140,
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			flexDirection: "row",
			borderWidth: 1,
			borderColor: colors.mainColor,
			padding: 2,
			gap: 5,
			marginTop: 24,
			marginBottom: 40,
			backgroundColor: colors.whiteOnly,
		},
		tabContainer: {
			height: "100%",
			flex: 1,
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			flexDirection: "row",
			borderRadius: 5,
		},
		tabTxt: {
			fontSize: 14,
			fontWeight: "700",
		},
		mainTitleTxt: {
			fontSize: 20,
			fontWeight: "700",
			textAlign: "center",
			marginTop: 90,
			color: colors.darkColor,
		},
		subscriptionMainContainer: {
			borderRadius: 15,
			borderWidth: 4,
			borderColor: colors.subscriptionBorderColor,
			width: "auto",
			height: "auto",
		},
		mainInnerContainer: {
			paddingHorizontal: 22,
			paddingVertical: 33,
			height: "auto",
			width: Dimensions.get("screen").width - 70,
		},
		starImageStyle: {
			width: 42,
			height: 42,
			objectFit: "contain",
			tintColor: colors.tickTint,
		},
		headerView: {
			width: "100%",
			display: "flex",
			alignItems: "center",
			justifyContent: "space-between",
			flexDirection: "row",
			gap: 10,
		},
		priceTxt: {
			fontSize: 32,
			fontWeight: "700",
			color: colors.mainColor,
		},
		titleTxt: {
			fontSize: 20,
			fontWeight: "700",
			color: theme === "light" ? colors.inActiveTab : colors.whiteOnly,
			marginTop: 17,
			marginBottom: 8,
		},
		descriptionTxt: {
			fontSize: 13,
			fontWeight: "400",
			color: theme === "light" ? colors.inActiveTab : colors.whiteOnly,
			marginBottom: 24,
			textAlign: "center",
		},
		itemsContainer: {
			width: "100%",
			display: "flex",
			flexDirection: "column",
			gap: 19,
			height: "auto",
			marginTop: 15,
			marginBottom: 35,
		},
		sepratorView: {
			width: "115%",
			height: 1,
			backgroundColor: colors.sepratorView,
			alignSelf: "center",
		},
		itemText: {
			fontSize: 14,
			fontWeight: "500",
			color: colors.darkColor,
			lineHeight: 16,
			height: "auto",
			flex: 1,
		},
		itemList: {
			width: "100%",
			height: "auto",
			display: "flex",
			alignItems: "center",
			justifyContent: "flex-start",
			flexDirection: "row",
			gap: 10.6,
		},
		itemIcon: {
			width: 19,
			height: 19,
			resizeMode: "contain",
			tintColor: colors.tickTint,
		},
	});
	const startPayment = async (planName) => {
		try {
			// 1️⃣ Get Payment Intent from your backend
			const result = await createPaymentIntentApi(planName);
			const clientSecret = result?.paymentIntent?.client_secret;
			const currentPaymentId = result?.paymentIntent?.id;
			// 2️⃣ Initialize Payment Sheet
			const { error: initError } = await initPaymentSheet({
				paymentIntentClientSecret: clientSecret,
				merchantDisplayName: "Quick Write Ai",
				allowsDelayedPaymentMethods: true,
				defaultBillingDetails: {
					email: user?.email || "",
				},
				googlePay: true,
				googlePay: {
					merchantCountryCode: "US",
					testEnv: true,
				},
				// applePay: true,
				// applePay: {
				// 	merchantCountryCode: "US",
				// },
			});

			if (initError) {
				console.log("init error", initError);
				Toast.show({
					type: "error",
					text1: initError.message ?? textStrings.paymentInitFailedMsg,
				});
				return;
			}
			// 3️⃣ Present the Payment Sheet
			const { error: paymentError } = await presentPaymentSheet();
			if (paymentError) {
				console.log("payment error", paymentError);
				Toast.show({
					type: "error",
					text1: paymentError.message ?? textStrings.paymentFailedMsg,
				});
				return;
			}

			// 4️⃣ Notify backend of success
			await postPaymentSuccessApi(currentPaymentId);
			Toast.show({
				type: "success",
				text1: textStrings.paymentSuccessMsg,
			});
		} catch (error) {
			console.log("Payment failed error:", error);
			Toast.show({
				type: "error",
				text1: error ?? textStrings.paymentFailedMsg,
			});
		}
	};
	return (
		<AuthLayout varient={"subscription"}>
			<View style={styles.mainContainer}>
				<TouchableOpacity
					onPress={() => {
						if (router.canGoBack()) {
							router.back();
						}
					}}
					style={styles.closeBtn}>
					<CloseIcon size={18} />
				</TouchableOpacity>
				<Text style={styles.mainTitleTxt}>{textStrings.subscriptionDesc}</Text>
				<View style={styles.mainTabContainer}>
					<TouchableOpacity
						onPress={() => setsselectedTab("Monthly")}
						style={[
							styles.tabContainer,
							{
								backgroundColor:
									sselectedTab === "Monthly" ? colors.mainColor : "transparent",
							},
						]}>
						<Text
							style={[
								styles.tabTxt,
								{
									color:
										sselectedTab === "Monthly"
											? colors.whiteOnly
											: colors.inActiveTab,
								},
							]}>
							{textStrings.monthlyTxt}
						</Text>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => setsselectedTab("Yearly")}
						style={[
							styles.tabContainer,
							{
								backgroundColor:
									sselectedTab === "Yearly" ? colors.mainColor : "transparent",
							},
						]}>
						<Text
							style={[
								styles.tabTxt,
								{
									color:
										sselectedTab === "Yearly"
											? colors.mainBgColor
											: colors.inActiveTab,
								},
							]}>
							{textStrings?.yearlyTxt}
						</Text>
					</TouchableOpacity>
				</View>
				<LinearGradient
					colors={[colors.gradient1, colors.gradient2]}
					start={{ x: 0.23, y: 0.0 }}
					end={{ x: 0.97, y: 1.0 }}
					style={styles.subscriptionMainContainer}>
					<View style={styles.mainInnerContainer}>
						<View style={styles.headerView}>
							<Image
								style={styles.starImageStyle}
								source={starImage}
							/>
							<Text style={styles.priceTxt}>
								${subscriptionData.price}/{subscriptionData.priceSuffix}
							</Text>
						</View>
						<Text style={styles.titleTxt}>{subscriptionData.name}</Text>
						<Text style={styles.descriptionTxt}>
							{subscriptionData.description}
						</Text>
						<View style={styles.sepratorView} />
						<View style={styles.itemsContainer}>
							{subscriptionData?.points?.map((dat, index) => (
								<View
									style={styles.itemList}
									key={index}>
									<Image
										source={tickImage}
										style={styles.itemIcon}
									/>
									<Text style={styles.itemText}>{dat}</Text>
								</View>
							))}
						</View>
						<CustomButton
							isDisabled={!shouldShowGetStarted(user, sselectedTab)}
							btnWidth={"100%"}
							btnTitle={textStrings.getStarted}
							onPressFun={() => startPayment(subscriptionData.value)}
						/>
					</View>
				</LinearGradient>
				<PaymentModal
					showModal={openStripeModal}
					closeModalFun={() => setopenStripeModal(false)}
					onPayPress={() => setopenLoadingModal(true)}
					formData={paymentFormData}
					setFormData={setPaymentFormData}
				/>
				<LoadingModal
					showModal={openLoadingModal}
					title={textStrings.processingPayment}
				/>
			</View>
		</AuthLayout>
	);
};

export default Subscription;

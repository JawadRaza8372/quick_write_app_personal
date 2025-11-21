import NextIcon from "@/assets/icons/NextIcon";
import side0 from "@/assets/images/side0.png";
import side1 from "@/assets/images/side1.png";
import side3 from "@/assets/images/side3.png";
import side4 from "@/assets/images/side4.png";
import side5 from "@/assets/images/side5.png";

import UserAvtar from "@/components/UserAvatar";
import { useThemeColors } from "@/hooks/useThemeColors";
import { setAuthToken } from "@/services/apiUrl";
import {
	removeUserTokenfromStorage,
	resetUser,
} from "@/services/store/userSlice";
import {
	DrawerContentScrollView,
	DrawerItemList,
} from "@react-navigation/drawer";
import { useRouter } from "expo-router";
import { Drawer } from "expo-router/drawer";
import {
	Alert,
	Image,
	ImageBackground,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import proBg from "../../assets/images/pro-bg.png";
import { useLangStrings } from "../../hooks/useLangStrings";
function CustomDrawerContent(props) {
	const colors = useThemeColors();
	const router = useRouter();
	const dispatch = useDispatch();
	const { textStrings } = useLangStrings();
	const { user } = useSelector((state) => state?.user);
	const styles = StyleSheet.create({
		topHeaderContainer: {
			width: "100%",
			height: "auto",
			paddingBottom: 44,
			paddingTop: 18,
			display: "flex",
			alignItems: "center",
			justifyContent: "flex-start",
			flexDirection: "row",
			gap: 18,
		},
		logoutView: {
			width: "100%",
			height: 29,
			display: "flex",
			alignItems: "center",
			justifyContent: "flex-start",
			flexDirection: "row",
			gap: 13,
			paddingHorizontal: 15,
			marginTop: 17,
		},
		childContainer: {
			borderBottomWidth: 1,
			borderTopWidth: 1,
			borderColor: colors.sepratorView,
		},
		nextContainer: {
			borderBottomWidth: 1,
			borderColor: colors.sepratorView,
			paddingBottom: 14,
		},
		logoutTxt: {
			fontWeight: "400",
			fontSize: 14,
			color: colors.redColor,
		},
		usernameTxt: {
			fontWeight: "400",
			fontSize: 18,
			color: colors.userColor,
			height: "auto",
			flex: 1,
		},
		mainBgImage: {
			width: 82,
			height: 42,
			borderRadius: 12,
			overflow: "hidden",
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
		},
		mainContainer: {
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			flexDirection: "row",
			height: "70%",
			flex: 1,
		},
		proTxt: {
			fontSize: 14,
			fontWeight: "500",
			color: colors.whiteOnly,
			textAlign: "center",
		},
	});
	const onLogoutBtnPress = async () => {
		await removeUserTokenfromStorage();
		dispatch(resetUser());
		setAuthToken(null);
		setTimeout(() => {
			router.replace("/login");
		}, 100);
	};

	return (
		<DrawerContentScrollView
			{...props}
			contentContainerStyle={{ flex: 1, backgroundColor: colors.mainBgColor }}>
			<View style={styles.topHeaderContainer}>
				<UserAvtar
					isEditable={false}
					size={45}
				/>
				<Text
					numberOfLines={1}
					ellipsizeMode="tail"
					style={styles.usernameTxt}>
					{user?.username ?? textStrings?.username}
				</Text>
				{user?.activePlan !== "premium" && user?.activePlan ? (
					<TouchableOpacity
						onPress={() => router.push({ pathname: "/subscription" })}>
						<ImageBackground
							style={styles.mainBgImage}
							source={proBg}>
							<View style={styles.mainContainer}>
								<Text style={styles.proTxt}>
									{user?.activePlan === "free"
										? textStrings.goPro
										: user?.activePlan === "pro"
										? textStrings.upgrade
										: textStrings.alreadyPremium}
								</Text>
							</View>
						</ImageBackground>
					</TouchableOpacity>
				) : null}
				<TouchableOpacity
					onPress={() => router.push({ pathname: "/subscription" })}>
					<ImageBackground
						style={styles.mainBgImage}
						source={proBg}>
						<View style={styles.mainContainer}>
							<Text style={styles.proTxt}>
								{user?.activePlan === "free"
									? textStrings.goPro
									: user?.activePlan === "pro"
									? textStrings.upgrade
									: textStrings.alreadyPremium}
							</Text>
						</View>
					</ImageBackground>
				</TouchableOpacity>
			</View>

			<View style={styles.childContainer}>
				<DrawerItemList {...props} />
			</View>
			<View style={styles.nextContainer}>
				<TouchableOpacity
					style={styles.logoutView}
					onPress={() =>
						Alert.alert(textStrings.areYouSure, textStrings.wantLogout, [
							{ text: textStrings.cancel, style: "cancel" },
							{
								text: textStrings.logout,
								style: "destructive",
								onPress: onLogoutBtnPress,
							},
						])
					}>
					<NextIcon
						size={24}
						color={colors.redColor}
					/>
					<Text style={styles.logoutTxt}>{textStrings?.logout}</Text>
				</TouchableOpacity>
			</View>
		</DrawerContentScrollView>
	);
}

export default function Layout() {
	const { textStrings } = useLangStrings();
	const { theme } = useSelector((state) => state?.user);
	const colors = useThemeColors();
	const styles = StyleSheet.create({
		drawerIcon: {
			width: 24,
			height: 24,
			objectFit: "contain",
			tintColor: colors.backColor,
		},
	});
	return (
		<Drawer
			screenOptions={{
				headerShown: false,
				drawerPosition: "right",
				drawerActiveBackgroundColor: colors.mainBgColor,
				drawerInactiveBackgroundColor: colors.mainBgColor,
				drawerActiveTintColor: colors.mainColor,
				drawerInactiveTintColor:
					theme === "light" ? colors.backColor : colors.whiteOnly,
				drawerLabelStyle: {
					fontSize: 16,
					fontWeight: "400",
				},
				drawerStyle: {
					width: "70%", // 👈 set drawer width
					height: "110%",
					marginTop: -10,
				},
			}}
			drawerContent={(props) => <CustomDrawerContent {...props} />}>
			<Drawer.Screen
				name="index"
				options={{
					drawerLabel: textStrings.sideHomeLabel,
					drawerIcon: ({ focused }) => (
						<Image
							style={[
								styles.drawerIcon,
								focused ? { tintColor: colors.mainColor } : {},
							]}
							source={side0}
						/>
					),
				}}
			/>
			<Drawer.Screen
				name="account-management"
				options={{
					drawerLabel: textStrings.sideProfileLabel,
					drawerIcon: ({ focused }) => (
						<Image
							style={[
								styles.drawerIcon,
								focused ? { tintColor: colors.mainColor } : {},
							]}
							source={side1}
						/>
					),
				}}
			/>
			<Drawer.Screen
				name="language"
				options={{
					drawerLabel: textStrings.sideLangLabel,
					drawerIcon: ({ focused }) => (
						<Image
							style={[
								styles.drawerIcon,
								focused ? { tintColor: colors.mainColor } : {},
							]}
							source={side3}
						/>
					),
				}}
			/>
			<Drawer.Screen
				name="billing-info"
				options={{
					drawerLabel: textStrings.sideBillingLabal,
					drawerIcon: ({ focused }) => (
						<Image
							style={[
								styles.drawerIcon,
								focused ? { tintColor: colors.mainColor } : {},
							]}
							source={side4}
						/>
					),
				}}
			/>
			<Drawer.Screen
				name="faq"
				options={{
					drawerLabel: textStrings.sideFaqLabel,
					drawerIcon: ({ focused }) => (
						<Image
							style={[
								styles.drawerIcon,
								focused ? { tintColor: colors.mainColor } : {},
							]}
							source={side5}
						/>
					),
				}}
			/>
			<Drawer.Screen
				name="privacy-policy"
				options={{
					drawerLabel: textStrings.sidePrivacyLabel,
					drawerIcon: ({ focused }) => (
						<Image
							style={[
								styles.drawerIcon,
								focused ? { tintColor: colors.mainColor } : {},
							]}
							source={side5}
						/>
					),
				}}
			/>
			<Drawer.Screen
				name="terms-conditions"
				options={{
					drawerLabel: textStrings?.termService,
					drawerIcon: ({ focused }) => (
						<Image
							style={[
								styles.drawerIcon,
								focused ? { tintColor: colors.mainColor } : {},
							]}
							source={side5}
						/>
					),
				}}
			/>
		</Drawer>
	);
}

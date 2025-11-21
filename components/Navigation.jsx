import {
	decodeUserId,
	getBillingPaymentsApi,
	getUserProfileApi,
} from "@/services/endpoints";
import {
	userPaymentUpdated,
	userProfileUpdated,
} from "@/services/socketService";
import {
	getUserTokenfromStorage,
	saveUserTokenToStorage,
	setBillPayments,
	setUser,
} from "@/services/store/userSlice";
import { Stack } from "expo-router";
import { useCallback, useEffect, useRef } from "react";
import Toast from "react-native-toast-message";
import { useDispatch, useSelector } from "react-redux";

const Naviagtion = () => {
	const { user } = useSelector((state) => state?.user);
	const dispatch = useDispatch();
	const isFetchingRef = useRef(false);
	const previousUserIdRef = useRef(null);
	useEffect(() => {
		if (user?.email) {
			userProfileUpdated(async (userId) => {
				const result = await getUserTokenfromStorage();
				const userIdFromToken = await decodeUserId(result?.accessToken);
				console.log("here is userid from token", userIdFromToken);

				if (userId === userIdFromToken) {
					await getUserProfileApi()
						.then(async (result) => {
							const { tokens, ...rest } = result?.user;
							dispatch(setUser({ user: rest }));
							await saveUserTokenToStorage(
								tokens?.accessToken,
								tokens?.refreshToken
							);
						})
						.catch((err) => {
							Toast.show({
								type: "error",
								text1: err || "Profile Fetch Failed",
							});
						});
				}
			});
			userPaymentUpdated(async (userId) => {
				const result = await getUserTokenfromStorage();
				const userIdFromToken = await decodeUserId(result?.accessToken);
				console.log("here is userid from token", userIdFromToken);

				if (userId === userIdFromToken) {
					await getBillingPaymentsApi()
						.then(async (result) => {
							dispatch(setBillPayments({ billPayments: result?.payments }));
						})
						.catch((err) => {
							Toast.show({
								type: "error",
								text1: err || "Billing Payment Fetch Failed",
							});
						});
				}
			});
		}
	}, [user]);
	const fetchDataWhenLogedIn = useCallback(async () => {
		if (!user?.email) {
			return;
		}
		if (isFetchingRef.current) {
			return;
		}
		try {
			isFetchingRef.current = true;
			previousUserIdRef.current = user?.email;
			console.log("this runed");
			await getBillingPaymentsApi()
				.then(async (result) => {
					dispatch(setBillPayments({ billPayments: result?.payments }));
				})
				.catch((err) => {
					Toast.show({
						type: "error",
						text1: err || "Billing Payment Fetch Failed",
					});
				});
		} catch (error) {
			console.log("LoginFetchError", error);
		} finally {
			isFetchingRef.current = false;
		}
	}, [user?.email]);
	useEffect(() => {
		const run = async () => {
			if (user?.email && user.email !== previousUserIdRef.current)
				await fetchDataWhenLogedIn();
		};
		run();
	}, [user, fetchDataWhenLogedIn]);
	return (
		<Stack screenOptions={{ headerShown: false }}>
			<Stack.Screen name="index" />
			<Stack.Screen name="onBoarding" />
			<Stack.Screen name="acknowldge-screen" />
			<Stack.Screen name="login" />
			<Stack.Screen name="register" />
			<Stack.Screen name="subscription" />
			<Stack.Screen name="success" />
			<Stack.Screen name="login-success" />
			<Stack.Screen name="emailVerified" />
			<Stack.Screen name="newPassword" />
			<Stack.Screen name="otpVerification" />
			<Stack.Screen name="forgot-password" />
			<Stack.Screen name="privacy-policy-n" />
			<Stack.Screen name="terms-conditions-n" />
			<Stack.Screen name="(drawer)" />
			<Stack.Screen name="+not-found" />
		</Stack>
	);
};

export default Naviagtion;

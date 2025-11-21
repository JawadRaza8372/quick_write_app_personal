import { Dimensions, FlatList, StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import BillComp from "../../components/BillComp";
import DrawerLayout from "../../components/DrawerLayout";
import EmptyComp from "../../components/EmptyComp";
import UserInfo from "../../components/UserInfo";
import { useLangStrings } from "../../hooks/useLangStrings";

const BillingInfo = () => {
	const { textStrings } = useLangStrings();
	const { billPayments, user } = useSelector((state) => state?.user);
	const styles = StyleSheet.create({
		mainContainer: {
			width: Dimensions.get("screen").width - 60,
			alignSelf: "center",
			display: "flex",
			flexDirection: "column",
			gap: 20,
		},
		bottomPadding: {
			width: "100%",
			height: 100,
		},
		sepratorArray: {
			width: "100%",
			height: 13,
		},
	});
	return (
		<DrawerLayout title={textStrings.billingHistory}>
			<View style={styles.mainContainer}>
				<UserInfo
					email={user?.email ?? "-"}
					username={user?.username ?? "-"}
					hideIcon={true}
				/>
				<FlatList
					ListFooterComponent={<View style={styles.bottomPadding} />}
					keyExtractor={(item, index) => index.toString()}
					renderItem={({ item }) => (
						<BillComp
							amount={item?.amount}
							completedOn={item?.createdAt}
							status={item?.status}
							transactionId={item?.paymentIntentId}
							paidBy={item?.paymentMethod}
						/>
					)}
					data={billPayments}
					ListEmptyComponent={() => <EmptyComp />}
					ItemSeparatorComponent={() => <View style={styles.sepratorArray} />}
				/>
			</View>
		</DrawerLayout>
	);
};

export default BillingInfo;

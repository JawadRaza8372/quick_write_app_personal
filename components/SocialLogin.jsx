import { StyleSheet, View } from "react-native";
import SocialFbButton from "./SocialFbButton";
import SocialGoogleButton from "./SocialGoogleButton";

const SocialLogin = ({ mt }) => {
	const styles = StyleSheet.create({
		socialBtnsContainer: {
			width: "100%",
			display: "flex",
			flexDirection: "column",
			gap: 22,
			marginTop: mt ?? 0,
		},
	});
	return (
		<View style={styles.socialBtnsContainer}>
			<SocialGoogleButton />
			<SocialFbButton />
		</View>
	);
};

export default SocialLogin;

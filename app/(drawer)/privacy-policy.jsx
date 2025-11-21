import DrawerLayout from "../../components/DrawerLayout";
import TermsRendror from "../../components/TermsRendror";
import { useLangStrings } from "../../hooks/useLangStrings";
const PrivacyPolicy = () => {
	const { textStrings } = useLangStrings();

	return (
		<DrawerLayout title={textStrings.sidePrivacyLabel}>
			<TermsRendror data={textStrings.privacyPolicyArry} />
		</DrawerLayout>
	);
};

export default PrivacyPolicy;

import DrawerLayout from "../../components/DrawerLayout";
import TermsRendror from "../../components/TermsRendror";
import { useLangStrings } from "../../hooks/useLangStrings";

const TermConditions = () => {
	const { textStrings } = useLangStrings();
	return (
		<DrawerLayout title={textStrings.termService}>
			<TermsRendror data={textStrings.termsArray} />
		</DrawerLayout>
	);
};

export default TermConditions;

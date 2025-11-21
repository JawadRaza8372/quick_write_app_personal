import Svg, { Path } from "react-native-svg";

const EyeOffIcon = ({ size, color }) => {
	return (
		<Svg
			width={size ?? 24}
			height={size ? size + 1 : 25}
			viewBox="0 0 19 19"
			fill="none"
			xmlns="http://www.w3.org/2000/svg">
			<Path
				d="M11.65 7.35l-4.3 4.3A3.04 3.04 0 1111.65 7.35z"
				stroke={color ?? "#6A6A6A"}
				strokeOpacity={0.6}
				strokeWidth={1.5}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<Path
				d="M14.447 4.205C12.96 3.083 11.259 2.47 9.5 2.47c-3 0-5.797 1.769-7.744 4.829-.765 1.198-.765 3.213 0 4.411a12.178 12.178 0 002.304 2.695M6.457 15.9a7.833 7.833 0 003.043.63c3 0 5.797-1.768 7.744-4.828.765-1.199.765-3.213 0-4.412-.28-.442-.587-.858-.901-1.25M12.484 10.095a3.03 3.03 0 01-2.397 2.397M7.35 11.65L1 18M18 1l-6.35 6.35"
				stroke={color ?? "#6A6A6A"}
				strokeOpacity={0.6}
				strokeWidth={1.5}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</Svg>
	);
};

export default EyeOffIcon;

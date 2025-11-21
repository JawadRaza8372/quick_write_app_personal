import Svg, { G, Path } from "react-native-svg";

const HistoryIcon = ({ size, color }) => {
	return (
		<Svg
			width={size ?? 13}
			height={size ? size + 1 : 14}
			viewBox="0 0 13 14"
			fill="none"
			xmlns="http://www.w3.org/2000/svg">
			<G
				clipPath="url(#clip0_404_500)"
				stroke={color ?? "#505050"}
				strokeWidth={1.0315}
				strokeLinecap="round"
				strokeLinejoin="round">
				<Path d="M2.055 7.692a4.642 4.642 0 10.252-2.108M2.01 3.05v2.58H4.59" />
				<Path d="M6.142 7.176a.516.516 0 101.032 0 .516.516 0 00-1.032 0z" />
			</G>
		</Svg>
	);
};

export default HistoryIcon;

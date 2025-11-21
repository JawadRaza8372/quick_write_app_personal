import Svg, { G, Path } from "react-native-svg";

const ShareIcon = ({ size, color }) => {
	return (
		<Svg
			width={size ?? 16}
			height={size ?? 16}
			viewBox="0 0 16 16"
			fill="none"
			xmlns="http://www.w3.org/2000/svg">
			<G
				clipPath="url(#clip0_404_494)"
				stroke={color ?? "#505050"}
				strokeWidth={1.24689}
				strokeLinecap="round"
				strokeLinejoin="round">
				<Path d="M5.272 6.306H4.65a1.247 1.247 0 00-1.247 1.247v4.987a1.247 1.247 0 001.247 1.247h6.234a1.247 1.247 0 001.247-1.247V7.553a1.247 1.247 0 00-1.247-1.247h-.623M7.766 9.423V2.565M5.9 4.435l1.871-1.87 1.87 1.87" />
			</G>
		</Svg>
	);
};

export default ShareIcon;

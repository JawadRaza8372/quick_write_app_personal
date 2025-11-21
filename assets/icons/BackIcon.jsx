import Svg, { G, Path } from "react-native-svg";

function BackIcon({ size, color }) {
	return (
		<Svg
			width={size ?? 20}
			height={size ?? 20}
			viewBox="0 0 20 20"
			fill="none"
			xmlns="http://www.w3.org/2000/svg">
			<G
				clipPath="url(#clip0_17_2827)"
				stroke={color ?? "#929292"}
				strokeWidth={1.5}
				strokeLinecap="round"
				strokeLinejoin="round">
				<Path d="M1.25 10h17.5M6.25 5l-5 5M6.25 15l-5-5" />
			</G>
		</Svg>
	);
}

export default BackIcon;

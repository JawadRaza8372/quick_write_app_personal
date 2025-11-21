import Svg, { ClipPath, Defs, G, Path } from "react-native-svg";

const NextIcon = ({ size, color }) => {
	return (
		<Svg
			width={size ?? 27}
			height={size ?? 27}
			viewBox="0 0 27 27"
			fill="none"
			xmlns="http://www.w3.org/2000/svg">
			<G
				clipPath="url(#clip0_17_3137)"
				stroke={color ?? "#fff"}
				strokeWidth={1.29629}
				strokeLinecap="round"
				strokeLinejoin="round">
				<Path d="M6.722 13.443h13.444M14.703 7.982l5.461 5.462-5.461 5.461" />
			</G>
			<Defs>
				<ClipPath id="clip0_17_3137">
					<Path
						fill={color ?? "#fff"}
						transform="rotate(45 6.722 16.228)"
						d="M0 0H19.0122V19.0122H0z"
					/>
				</ClipPath>
			</Defs>
		</Svg>
	);
};

export default NextIcon;

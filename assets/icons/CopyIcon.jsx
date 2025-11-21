import Svg, { G, Path } from "react-native-svg";

const CopyIcon = ({ size, color }) => {
	return (
		<Svg
			width={size ?? 15}
			height={size ? size - 1 : 14}
			viewBox="0 0 15 14"
			fill="none"
			xmlns="http://www.w3.org/2000/svg">
			<G
				clipPath="url(#clip0_404_488)"
				stroke={color ?? "#505050"}
				strokeWidth={1.11861}
				strokeLinecap="round"
				strokeLinejoin="round">
				<Path d="M4.874 5.871A1.492 1.492 0 016.365 4.38h4.847a1.492 1.492 0 011.492 1.492v4.847a1.49 1.49 0 01-1.492 1.492H6.365a1.491 1.491 0 01-1.491-1.492V5.871z" />
				<Path d="M3.2 9.826a1.121 1.121 0 01-.566-.972V3.261c0-.615.503-1.119 1.118-1.119h5.593c.42 0 .648.216.84.56" />
			</G>
		</Svg>
	);
};

export default CopyIcon;

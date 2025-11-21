import Svg, { Path } from "react-native-svg";

function CloseIcon({ size, color }) {
	return (
		<Svg
			width={size ?? 12}
			height={size ?? 12}
			viewBox="0 0 12 12"
			fill="none"
			xmlns="http://www.w3.org/2000/svg">
			<Path
				d="M11.193 11.582a1.167 1.167 0 01-1.69 0L6 8.08l-3.503 3.502a1.167 1.167 0 01-1.69 0 1.168 1.168 0 010-1.69l3.502-3.503L.807 2.887a1.167 1.167 0 010-1.691 1.167 1.167 0 011.69 0L6 4.698l3.502-3.502a1.167 1.167 0 011.691 0 1.167 1.167 0 010 1.69L7.691 6.39l3.502 3.502a1.167 1.167 0 010 1.691z"
				fill={color ?? "#757575"}
			/>
		</Svg>
	);
}

export default CloseIcon;

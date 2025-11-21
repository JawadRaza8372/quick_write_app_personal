import Svg, { Path } from "react-native-svg";

export default function UpArrow({ size, color }) {
	return (
		<Svg
			width={size ?? 16}
			height={size ? size - 1 : 15}
			viewBox="0 0 16 15"
			fill="none"
			xmlns="http://www.w3.org/2000/svg">
			<Path
				d="M14.421 9.728a.81.81 0 00-.088-.37.868.868 0 00-.251-.298L8.579 4.924a.958.958 0 00-.582-.195.958.958 0 00-.583.195L1.911 9.205a.841.841 0 00-.327.58.82.82 0 00.208.628.963.963 0 001.293.111l4.916-3.828 4.916 3.7a.974.974 0 00.98.115.899.899 0 00.386-.32c.092-.14.14-.3.138-.463z"
				fill={color ?? "#767C8C"}
			/>
		</Svg>
	);
}

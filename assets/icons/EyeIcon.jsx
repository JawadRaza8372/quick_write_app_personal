import Svg, { Path } from "react-native-svg";

const EyeIcon = ({ color, size }) => {
	return (
		<Svg
			width={size ?? 24}
			height={size ? size + 1 : 25}
			viewBox="0 0 24 25"
			fill="none"
			xmlns="http://www.w3.org/2000/svg">
			<Path
				d="M12 7.25a9.77 9.77 0 018.82 5.5 9.77 9.77 0 01-8.82 5.5 9.77 9.77 0 01-8.82-5.5A9.77 9.77 0 0112 7.25zm0-2c-5 0-9.27 3.11-11 7.5 1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zm0 5a2.5 2.5 0 010 5 2.5 2.5 0 010-5zm0-2c-2.48 0-4.5 2.02-4.5 4.5s2.02 4.5 4.5 4.5 4.5-2.02 4.5-4.5-2.02-4.5-4.5-4.5z"
				fill={color ?? "#6A6A6A"}
			/>
		</Svg>
	);
};

export default EyeIcon;

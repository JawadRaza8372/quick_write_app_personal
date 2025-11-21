import Svg, { Path } from "react-native-svg";

const SelectCircleIcon = ({ size, color, secColor }) => {
	return (
		<Svg
			width={size ?? 20}
			height={size ?? 20}
			viewBox="0 0 20 20"
			fill="none"
			xmlns="http://www.w3.org/2000/svg">
			<Path
				d="M19 10c0-4.969-4.031-9-9-9s-9 4.031-9 9 4.031 9 9 9 9-4.031 9-9z"
				fill={color ?? "#8C40FF"}
				stroke={color ?? "#8C40FF"}
				strokeMiterlimit={10}
			/>
			<Path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M15.7 6.19c.31.274.339.748.065 1.06l-5.75 6.5a.75.75 0 01-1.074.051l-3.75-3.5a.75.75 0 011.023-1.097l3.19 2.97 5.24-5.92a.75.75 0 011.06-.064H15.7z"
				fill={secColor ?? "#fff"}
			/>
		</Svg>
	);
};

export default SelectCircleIcon;

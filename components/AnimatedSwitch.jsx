import { useEffect, useRef } from "react";
import {
	Animated,
	Easing,
	Platform,
	StyleSheet,
	TouchableWithoutFeedback,
} from "react-native";
import { useThemeColors } from "../hooks/useThemeColors";
const AnimatedSwitch = ({
	value,
	onValueChange = () => {},
	disabled = false,
	activeColor,
	inactiveColor,
	thumbColor,
	width = 50,
	height = 30,
	thumbSize,
	style,
	accessibilityLabel = "toggle",
}) => {
	const colors = useThemeColors();
	const finalThumbSize = thumbSize || Math.round(height * 0.9);
	const padding = Math.max(1, Math.round((height - finalThumbSize) / 2));
	const trackWidth = width;
	const trackHeight = height;
	const travelDistance = trackWidth - finalThumbSize - padding * 2;
	const currentActiveColor = activeColor ?? colors.mainBgColor;
	const inActiveCurrentColor = inactiveColor ?? colors.inActiveSwitch;
	const anim = useRef(new Animated.Value(value ? 1 : 0)).current;

	useEffect(() => {
		Animated.timing(anim, {
			toValue: value ? 1 : 0,
			duration: 200,
			easing: Easing.out(Easing.ease),
			useNativeDriver: false, // layout color and transform mix; keep false for cross-platform safety
		}).start();
	}, [value, anim]);

	const interpolatedBackgroundColor = anim.interpolate({
		inputRange: [0, 1],
		outputRange: [inActiveCurrentColor, currentActiveColor],
	});

	const translateX = anim.interpolate({
		inputRange: [0, 1],
		outputRange: [0, travelDistance],
	});

	const handleToggle = () => {
		if (disabled) return;
		onValueChange(!value);
	};

	return (
		<TouchableWithoutFeedback
			onPress={handleToggle}
			accessibilityRole="switch"
			accessibilityState={{ checked: !!value, disabled: !!disabled }}
			accessibilityLabel={accessibilityLabel}
			disabled={disabled}>
			<Animated.View
				style={[
					styles.track,
					{
						width: trackWidth,
						height: trackHeight,
						borderRadius: trackHeight / 2,
						backgroundColor: interpolatedBackgroundColor,
						opacity: disabled ? 0.6 : 1,
						padding,
					},
					style,
				]}>
				<Animated.View
					style={{
						width: finalThumbSize,
						height: finalThumbSize,
						borderRadius: finalThumbSize / 2,
						backgroundColor: thumbColor || "#fff",
						transform: [{ translateX }],
						...Platform.select({
							ios: {
								shadowColor: "#000",
								shadowOffset: { width: 0, height: 1 },
								shadowOpacity: 0.25,
								shadowRadius: 1.5,
							},
							android: { elevation: 2 },
						}),
					}}
				/>
			</Animated.View>
		</TouchableWithoutFeedback>
	);
};

const styles = StyleSheet.create({
	track: {
		justifyContent: "center",
	},
});

export default AnimatedSwitch;

// ------------------- Usage Example -------------------
//
// import React, { useState } from 'react';
// import { View, Text } from 'react-native';
// import RNAnimatedSwitch from './RNAnimatedSwitch';
//
// export default function Example() {
//   const [on, setOn] = useState(false);
//
//   return (
//     <View style={{ padding: 20 }}>
//       <Text>Switch is {on ? 'ON' : 'OFF'}</Text>
//       <RNAnimatedSwitch
//         value={on}
//         onValueChange={setOn}
//         activeColor="#0ea5a4"
//         inactiveColor="#ddd"
//         width={56}
//         height={32}
//       />
//     </View>
//   );
// }

import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Svg, { Path } from "react-native-svg";
import { Colors, Spacing, Typography, BorderRadius } from "../../constants/Theme";

/**
 * MicIcon - Microphone SVG icon
 */
const MicIcon = ({ size = 16, color = "#E6E6E6" }) => (
  <Svg width={size} height={size} viewBox="0 0 16 16" fill="none">
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M9.5 7V3.5C9.5 3.10218 9.34196 2.72064 9.06066 2.43934C8.77936 2.15804 8.39782 2 8 2C7.60218 2 7.22064 2.15804 6.93934 2.43934C6.65804 2.72064 6.5 3.10218 6.5 3.5V7C6.5 7.39782 6.65804 7.77936 6.93934 8.06066C7.22064 8.34196 7.60218 8.5 8 8.5C8.39782 8.5 8.77936 8.34196 9.06066 8.06066C9.34196 7.77936 9.5 7.39782 9.5 7ZM8 0.5C7.20435 0.5 6.44129 0.81607 5.87868 1.37868C5.31607 1.94129 5 2.70435 5 3.5V7C5 7.79565 5.31607 8.55871 5.87868 9.12132C6.44129 9.68393 7.20435 10 8 10C8.79565 10 9.55871 9.68393 10.1213 9.12132C10.6839 8.55871 11 7.79565 11 7V3.5C11 2.70435 10.6839 1.94129 10.1213 1.37868C9.55871 0.81607 8.79565 0.5 8 0.5ZM8.75 12.954C10.2001 12.7713 11.5337 12.0656 12.5003 10.9693C13.467 9.87301 14.0003 8.46159 14 7V6.75C14 6.55109 13.921 6.36032 13.7803 6.21967C13.6397 6.07902 13.4489 6 13.25 6C13.0511 6 12.8603 6.07902 12.7197 6.21967C12.579 6.36032 12.5 6.55109 12.5 6.75V7C12.5 8.19347 12.0259 9.33807 11.182 10.182C10.3381 11.0259 9.19347 11.5 8 11.5C6.80653 11.5 5.66193 11.0259 4.81802 10.182C3.97411 9.33807 3.5 8.19347 3.5 7V6.75C3.5 6.55109 3.42098 6.36032 3.28033 6.21967C3.13968 6.07902 2.94891 6 2.75 6C2.55109 6 2.36032 6.07902 2.21967 6.21967C2.07902 6.36032 2 6.55109 2 6.75V7C2 10.06 4.29 12.585 7.25 12.954V14.75C7.25 14.9489 7.32902 15.1397 7.46967 15.2803C7.61032 15.421 7.80109 15.5 8 15.5C8.19891 15.5 8.38968 15.421 8.53033 15.2803C8.67098 15.1397 8.75 14.9489 8.75 14.75V12.954Z"
      fill={color}
    />
  </Svg>
);

/**
 * TalkToKimiButton - Representational button (no functionality)
 * 
 * Displays customizable label with microphone icon
 * @param {function} onPress - Callback when button is pressed
 * @param {string} label - Button label text (default: "Talk to Kimi instead")
 */
const TalkToKimiButton = ({ onPress, label = "Talk to Kimi instead" }) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <MicIcon size={16} color={Colors.textAccent} />
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "rgba(47, 44, 45, 0.9)",
    borderWidth: 0.681,
    borderColor: Colors.glassBorder,
    borderRadius: BorderRadius.pill,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    alignSelf: "center",
  },
  label: {
    fontFamily: Typography.fontFamily.regular,
    fontSize: Typography.fontSize.base,
    color: Colors.textAccent,
    letterSpacing: Typography.letterSpacing.normal,
  },
});

export default TalkToKimiButton;


import React from "react";
import { StyleSheet, TextInput, View } from "react-native";
import Svg, { Path } from "react-native-svg";
import { Colors, Spacing, Typography } from "../../constants/Theme";

/**
 * SearchIcon - Magnifying glass SVG icon
 */
const SearchIcon = ({ size = 17, color = "#E6E6E6" }) => (
  <Svg width={size} height={size} viewBox="0 0 17 17" fill="none">
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7.5 2.5C6.04131 2.5 4.64236 3.07946 3.61091 4.11091C2.57946 5.14236 2 6.54131 2 8C2 9.45869 2.57946 10.8576 3.61091 11.8891C4.64236 12.9205 6.04131 13.5 7.5 13.5C8.95869 13.5 10.3576 12.9205 11.3891 11.8891C12.4205 10.8576 13 9.45869 13 8C13 6.54131 12.4205 5.14236 11.3891 4.11091C10.3576 3.07946 8.95869 2.5 7.5 2.5ZM0.5 8C0.5 3.85786 3.85786 0.5 8 0.5C12.1421 0.5 15.5 3.85786 15.5 8C15.5 9.847 14.8097 11.5358 13.6636 12.8129L16.2803 15.4297C16.5732 15.7226 16.5732 16.1974 16.2803 16.4903C15.9874 16.7832 15.5126 16.7832 15.2197 16.4903L12.603 13.8736C11.326 15.0197 9.637 15.71 7.79 15.71C3.64786 15.71 0.29 12.3521 0.29 8.21C0.29 4.06786 3.64786 0.71 7.79 0.71C11.9321 0.71 15.29 4.06786 15.29 8.21C15.29 10.057 14.5997 11.7458 13.4536 13.0229L10.8369 10.4062C11.9829 9.12911 12.6732 7.44032 12.6732 5.59332C12.6732 1.45119 9.31532 -1.90667 5.17319 -1.90667Z"
      fill={color}
    />
  </Svg>
);

/**
 * MicIcon - Microphone SVG icon
 */
const MicIcon = ({ size = 17, color = "#E6E6E6" }) => (
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
 * StyleSearchBar - Search input with icons (representational only)
 *
 * Features:
 * - Search icon on left
 * - Mic icon on right
 * - Dark background styling
 * - No actual search functionality
 */
const StyleSearchBar = () => {
  return (
    <View style={styles.container}>
      <SearchIcon size={16} color={Colors.textAccent} />
      <TextInput
        style={styles.input}
        placeholder="Search"
        placeholderTextColor={Colors.textAccent}
        editable={false} // Representational only
      />
      <MicIcon size={17} color={Colors.textAccent} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#312f31",
    borderWidth: 1,
    borderColor: "#3d3b3e",
    borderRadius: 100,
    paddingHorizontal: 11,
    paddingVertical: 6,
    gap: Spacing.md,
    height: 46,
  },
  input: {
    flex: 1,
    height: "100%",
    fontFamily: Typography.fontFamily.regular,
    fontSize: 17,
    color: Colors.textAccent,
    letterSpacing: -0.08,
    textAlignVertical: "center",
    padding: 0,
    includeFontPadding: false,
  },
});

export default StyleSearchBar;

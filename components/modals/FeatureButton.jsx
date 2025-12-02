import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Svg, { Circle } from "react-native-svg";
import {
  BrightnessIcon,
  ContrastIcon,
  ExposureIcon,
  HueIcon,
  SaturationIcon,
} from "../icons/FilterIcons";

/**
 * Map feature IDs to icon components
 * Using FilterIcons based on SVG assets for GL filter features
 */
const FEATURE_ICONS = {
  saturation: SaturationIcon,
  brightness: BrightnessIcon,
  contrast: ContrastIcon,
  hue: HueIcon,
  exposure: ExposureIcon,
};

// Feature display names
const FEATURE_NAMES = {
  saturation: "Saturation",
  brightness: "Brightness",
  contrast: "Contrast",
  hue: "Hue",
  exposure: "Exposure",
};

// Fallback icon component
const FallbackIcon = ({ size = 16, color = "#E6E6E6" }) => (
  <Svg width={size} height={size} viewBox="0 0 16 16" fill="none">
    <Circle cx="8" cy="8" r="6" stroke={color} strokeWidth="1.5" />
  </Svg>
);

/**
 * FeatureButton - Individual feature selection button
 *
 * Features:
 * - Icon display based on feature type using SVG assets
 * - Active/inactive states with colored highlight
 * - Compact circular design
 */
const FeatureButton = ({ feature, isActive, onPress }) => {
  const IconComponent = FEATURE_ICONS[feature] || FallbackIcon;
  
  // Accent colors for different filter types
  const accentColors = {
    saturation: "#4CAF50", // Green
    brightness: "#FFC107", // Amber
    contrast: "#9C27B0", // Purple
    hue: "#E91E63", // Pink
    exposure: "#FF5722", // Deep orange
  };
  
  const activeColor = accentColors[feature] || "#ffa500";
  const inactiveColor = "#888888";

  return (
    <TouchableOpacity
      style={[
        styles.container,
        isActive && [styles.containerActive, { borderColor: activeColor }],
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.iconWrapper}>
        <IconComponent
          size={16}
          color={isActive ? activeColor : inactiveColor}
        />
      </View>
    </TouchableOpacity>
  );
};

// Export constants
export { FEATURE_ICONS, FEATURE_NAMES };

const styles = StyleSheet.create({
  container: {
    width: 40,
    height: 40,
    borderRadius: 85,
    backgroundColor: "rgba(47, 44, 45, 0.9)",
    borderWidth: 0.83,
    borderColor: "rgba(120, 120, 128, 0.16)",
    justifyContent: "center",
    alignItems: "center",
  },
  containerActive: {
    borderWidth: 2,
  },
  iconWrapper: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default FeatureButton;

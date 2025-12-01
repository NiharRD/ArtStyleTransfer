import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Svg, { Circle, G, Path, Rect } from "react-native-svg";

/**
 * Feature Icons
 */
const SunIcon = ({ size = 16, color = "#E6E6E6" }) => (
  <Svg width={size} height={size} viewBox="0 0 16 16" fill="none">
    <Path
      d="M8 1V2.5M8 13.5V15M15 8H13.5M2.5 8H1M12.95 12.95L11.89 11.89M4.11 4.11L3.05 3.05M12.95 3.05L11.89 4.11M4.11 11.89L3.05 12.95M11 8C11 9.65685 9.65685 11 8 11C6.34315 11 5 9.65685 5 8C5 6.34315 6.34315 5 8 5C9.65685 5 11 6.34315 11 8Z"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const ContrastIcon = ({ size = 16, color = "#E6E6E6" }) => (
  <Svg width={size} height={size} viewBox="0 0 16 16" fill="none">
    <Circle cx="8" cy="8" r="6" stroke={color} strokeWidth="1.5" strokeDasharray="2 2" />
    <Path d="M8 2V14" stroke={color} strokeWidth="1.5" />
    <Path d="M8 2C11.3137 2 14 4.68629 14 8C14 11.3137 11.3137 14 8 14" fill={color} />
  </Svg>
);

const ExposureIcon = ({ size = 16, color = "#E6E6E6" }) => (
  <Svg width={size} height={size} viewBox="0 0 16 16" fill="none">
    <Circle cx="8" cy="8" r="6" stroke={color} strokeWidth="1.5" />
    <Path d="M8 5V11M5 8H11" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
  </Svg>
);

const HighlightsIcon = ({ size = 16, color = "#E6E6E6" }) => (
  <Svg width={size} height={size} viewBox="0 0 16 16" fill="none">
    <Path
      d="M2.5 10C2.5 10 4 8.5 8 8.5C12 8.5 13.5 10 13.5 10"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <Path
      d="M4 12.5C4 12.5 5.5 11 8 11C10.5 11 12 12.5 12 12.5"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <Circle cx="8" cy="5" r="2" stroke={color} strokeWidth="1.5" />
  </Svg>
);

const ShadowsIcon = ({ size = 16, color = "#E6E6E6" }) => (
  <Svg width={size} height={size} viewBox="0 0 16 16" fill="none">
    <Path
      d="M14 8C14 11.3137 11.3137 14 8 14C4.68629 14 2 11.3137 2 8C2 4.68629 4.68629 2 8 2"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <Path
      d="M10 2.5C10 2.5 12 3 13 4C14 5 14.5 7 14.5 7"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </Svg>
);

const WhitesIcon = ({ size = 16, color = "#E6E6E6" }) => (
  <Svg width={size} height={size} viewBox="0 0 16 16" fill="none">
    <Circle cx="8" cy="8" r="6" stroke={color} strokeWidth="1.5" />
  </Svg>
);

const BlacksIcon = ({ size = 16, color = "#E6E6E6" }) => (
  <Svg width={size} height={size} viewBox="0 0 16 16" fill="none">
    <Circle cx="8" cy="8" r="6" fill={color} />
  </Svg>
);

const SaturationIcon = ({ size = 16, color = "#E6E6E6" }) => (
  <Svg width={size} height={size} viewBox="0 0 16 16" fill="none">
    <Path
      d="M8 2C8 2 4 6 4 9C4 11.2091 5.79086 13 8 13C10.2091 13 12 11.2091 12 9C12 6 8 2 8 2Z"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const VibranceIcon = ({ size = 16, color = "#E6E6E6" }) => (
  <Svg width={size} height={size} viewBox="0 0 16 16" fill="none">
    <Path
      d="M8 2L9.5 5.5L13.5 6L10.5 9L11.5 13L8 11L4.5 13L5.5 9L2.5 6L6.5 5.5L8 2Z"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const ColorMixerIcon = ({ size = 16, color = "#E6E6E6" }) => (
  <Svg width={size} height={size} viewBox="0 0 16 16" fill="none">
    <Circle cx="6" cy="6" r="3" stroke={color} strokeWidth="1.5" />
    <Circle cx="10" cy="6" r="3" stroke={color} strokeWidth="1.5" />
    <Circle cx="8" cy="10" r="3" stroke={color} strokeWidth="1.5" />
  </Svg>
);

// Map feature IDs to icons
const FEATURE_ICONS = {
  brightness: SunIcon,
  contrast: ContrastIcon,
  exposure: ExposureIcon,
  highlights: HighlightsIcon,
  shadows: ShadowsIcon,
  whites: WhitesIcon,
  blacks: BlacksIcon,
  saturation: SaturationIcon,
  vibrance: VibranceIcon,
  colorMixer: ColorMixerIcon,
};

// Feature display names
const FEATURE_NAMES = {
  brightness: "Brightness",
  contrast: "Contrast",
  exposure: "Exposure",
  highlights: "Highlights",
  shadows: "Shadows",
  whites: "Whites",
  blacks: "Blacks",
  saturation: "Saturation",
  vibrance: "Vibrance",
  colorMixer: "Color Mixer",
};

/**
 * FeatureButton - Individual feature selection button
 *
 * Features:
 * - Icon display based on feature type
 * - Active/inactive states with orange highlight
 * - Compact circular design
 */
const FeatureButton = ({ feature, isActive, onPress }) => {
  const IconComponent = FEATURE_ICONS[feature] || SunIcon;
  const activeColor = "#ffa500"; // Orange
  const inactiveColor = "#888888";

  return (
    <TouchableOpacity
      style={[styles.container, isActive && styles.containerActive]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={[styles.iconWrapper, isActive && styles.iconWrapperActive]}>
        <IconComponent
          size={16}
          color={isActive ? activeColor : inactiveColor}
        />
      </View>
    </TouchableOpacity>
  );
};

/**
 * ColorChannelButton - Color channel selection button for Color Mixer
 */
export const ColorChannelButton = ({ color, colorName, isActive, onPress }) => {
  return (
    <TouchableOpacity
      style={[styles.colorContainer, isActive && styles.colorContainerActive]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={[styles.colorDot, { backgroundColor: color }]} />
    </TouchableOpacity>
  );
};

// Color channel colors
export const COLOR_CHANNELS = {
  red: "#ff4444",
  orange: "#ff8800",
  yellow: "#ffdd00",
  green: "#44ff44",
  cyan: "#00dddd",
  blue: "#4444ff",
  purple: "#aa44ff",
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
    borderColor: "#ffa500",
    borderWidth: 2,
  },
  iconWrapper: {
    justifyContent: "center",
    alignItems: "center",
  },
  iconWrapperActive: {},
  colorContainer: {
    width: 40,
    height: 40,
    borderRadius: 85,
    backgroundColor: "rgba(47, 44, 45, 0.9)",
    borderWidth: 0.83,
    borderColor: "rgba(120, 120, 128, 0.16)",
    justifyContent: "center",
    alignItems: "center",
  },
  colorContainerActive: {
    borderColor: "#FFFFFF",
    borderWidth: 2,
  },
  colorDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
  },
});

export default FeatureButton;


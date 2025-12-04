import { StyleSheet, TouchableOpacity, View } from "react-native";
import Svg, { Circle, Path, Rect } from "react-native-svg";

/**
 * Icon Components for all features
 */

// Exposure - Sun icon
const ExposureIcon = ({ size = 24, color = "#E6E6E6" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="4" stroke={color} strokeWidth="2" />
    <Path d="M12 2V4M12 20V22M4 12H2M22 12H20M5.64 5.64L4.22 4.22M19.78 19.78L18.36 18.36M5.64 18.36L4.22 19.78M19.78 4.22L18.36 5.64" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </Svg>
);

// Contrast - Half circle icon
const ContrastIcon = ({ size = 24, color = "#E6E6E6" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="9" stroke={color} strokeWidth="2" strokeDasharray="2 2" />
    <Path d="M12 3C16.97 3 21 7.03 21 12C21 16.97 16.97 21 12 21" stroke={color} strokeWidth="2" />
    <Path d="M12 3V21" stroke={color} strokeWidth="2" />
    <Path d="M12 3C7.03 3 3 7.03 3 12C3 16.97 7.03 21 12 21" fill={color} />
  </Svg>
);

// Highlights - Cloud icon
const HighlightsIcon = ({ size = 24, color = "#E6E6E6" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M18 10H16.74C16.36 8.22 14.9 6.86 13.12 6.51C11.34 6.16 9.44 6.88 8.42 8.37C7.4 9.86 7.45 11.82 8.55 13.26C9.66 14.7 11.46 15.25 13.2 14.7" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M18 10C19.66 10 21 11.34 21 13C21 14.66 19.66 16 18 16H7C4.79 16 3 14.21 3 12C3 9.79 4.79 8 7 8C7.18 8 7.36 8.01 7.54 8.04" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

// Shadows - Lightning bolt icon
const ShadowsIcon = ({ size = 24, color = "#E6E6E6" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

// Whites - Hollow circle icon
const WhitesIcon = ({ size = 24, color = "#E6E6E6" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="8" stroke={color} strokeWidth="2" />
  </Svg>
);

// Blacks - Filled circle with border
const BlacksIcon = ({ size = 24, color = "#E6E6E6" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="6" fill={color} />
    <Circle cx="12" cy="12" r="8" stroke={color} strokeWidth="2" />
  </Svg>
);

// Temperature - Thermometer icon
const TemperatureIcon = ({ size = 24, color = "#E6E6E6" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M14 14.76V3.5C14 2.12 12.88 1 11.5 1C10.12 1 9 2.12 9 3.5V14.76C7.79 15.67 7 17.09 7 18.69C7 21.13 8.87 23 11.31 23H11.69C14.13 23 16 21.13 16 18.69C16 17.09 15.21 15.67 14 14.76Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <Circle cx="11.5" cy="18.5" r="2.5" stroke={color} strokeWidth="2" />
    <Path d="M11.5 6V14" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </Svg>
);

// Tint - Droplet icon
const TintIcon = ({ size = 24, color = "#E6E6E6" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

// Saturation - Color wheel icon
const SaturationIcon = ({ size = 24, color = "#E6E6E6" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="9" stroke={color} strokeWidth="2" />
    <Path d="M12 3C16.97 3 21 7.03 21 12" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <Path d="M12 21C7.03 21 3 16.97 3 12" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <Circle cx="12" cy="12" r="3" stroke={color} strokeWidth="2" />
  </Svg>
);

// Vibrance - Lightning icon
const VibranceIcon = ({ size = 24, color = "#E6E6E6" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" fill={color} />
  </Svg>
);

// Vignette - Rounded square with hole
const VignetteIcon = ({ size = 24, color = "#E6E6E6" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Rect x="3" y="3" width="18" height="18" rx="3" stroke={color} strokeWidth="2" />
    <Circle cx="12" cy="12" r="5" stroke={color} strokeWidth="2" />
  </Svg>
);

// Grain - Dots icon
const GrainIcon = ({ size = 24, color = "#E6E6E6" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="6" cy="6" r="2" fill={color} />
    <Circle cx="12" cy="6" r="2" fill={color} />
    <Circle cx="18" cy="6" r="2" fill={color} />
    <Circle cx="6" cy="12" r="2" fill={color} />
    <Circle cx="12" cy="12" r="2" fill={color} />
    <Circle cx="18" cy="12" r="2" fill={color} />
    <Circle cx="6" cy="18" r="2" fill={color} />
    <Circle cx="12" cy="18" r="2" fill={color} />
    <Circle cx="18" cy="18" r="2" fill={color} />
  </Svg>
);

// Clarity - Layers icon
const ClarityIcon = ({ size = 24, color = "#E6E6E6" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M12 2L2 7L12 12L22 7L12 2Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M2 17L12 22L22 17" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M2 12L12 17L22 12" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

// Fade - Layers icon with transparency
const FadeIcon = ({ size = 24, color = "#E6E6E6" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Rect x="4" y="4" width="16" height="16" rx="2" stroke={color} strokeWidth="2" strokeDasharray="4 2" />
  </Svg>
);

// Bleach Bypass - Film icon
const BleachBypassIcon = ({ size = 24, color = "#E6E6E6" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Rect x="2" y="4" width="20" height="16" rx="2" stroke={color} strokeWidth="2" />
    <Path d="M6 4V20M10 4V20M14 4V20M18 4V20" stroke={color} strokeWidth="1" />
  </Svg>
);

// Teal & Orange - Two colors icon
const TealOrangeIcon = ({ size = 24, color = "#E6E6E6" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="8" cy="12" r="5" stroke={color} strokeWidth="2" />
    <Circle cx="16" cy="12" r="5" stroke={color} strokeWidth="2" />
  </Svg>
);

// Fallback icon component
const FallbackIcon = ({ size = 24, color = "#E6E6E6" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="8" stroke={color} strokeWidth="2" />
  </Svg>
);

/**
 * Map feature IDs to icon components
 */
const FEATURE_ICONS = {
  exposure: ExposureIcon,
  contrast: ContrastIcon,
  highlights: HighlightsIcon,
  shadows: ShadowsIcon,
  whites: WhitesIcon,
  blacks: BlacksIcon,
  temperature: TemperatureIcon,
  tint: TintIcon,
  saturation: SaturationIcon,
  vibrance: VibranceIcon,
  vignetteStrength: VignetteIcon,
  grainAmount: GrainIcon,
  clarity: ClarityIcon,
  fadeAmount: FadeIcon,
  bleachBypass: BleachBypassIcon,
  tealOrange: TealOrangeIcon,
};

// Feature display names
const FEATURE_NAMES = {
  exposure: "Exposure",
  contrast: "Contrast",
  highlights: "Highlights",
  shadows: "Shadows",
  whites: "Whites",
  blacks: "Blacks",
  temperature: "Temperature",
  tint: "Tint",
  saturation: "Saturation",
  vibrance: "Vibrance",
  vignetteStrength: "Vignette",
  grainAmount: "Grain",
  clarity: "Clarity",
  fadeAmount: "Fade",
  bleachBypass: "Bleach Bypass",
  tealOrange: "Teal & Orange",
};

/**
 * FeatureButton - Individual feature selection button
 *
 * Features:
 * - Icon display based on feature type using SVG assets
 * - Active/inactive states with light background when active
 * - Circular design matching reference
 */
const FeatureButton = ({ feature, isActive, onPress }) => {
  const IconComponent = FEATURE_ICONS[feature] || FallbackIcon;

  return (
    <TouchableOpacity
      style={[
        styles.container,
        isActive && styles.containerActive,
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.iconWrapper}>
        <IconComponent
          size={22}
          color={isActive ? "#1C1C1E" : "#888888"}
        />
      </View>
    </TouchableOpacity>
  );
};

// Export constants
export { FEATURE_ICONS, FEATURE_NAMES };

const styles = StyleSheet.create({
  container: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "rgba(60, 60, 67, 0.6)",
    borderWidth: 1,
    borderColor: "rgba(120, 120, 128, 0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  containerActive: {
    backgroundColor: "#E5E5EA",
    borderColor: "#E5E5EA",
  },
  iconWrapper: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default FeatureButton;

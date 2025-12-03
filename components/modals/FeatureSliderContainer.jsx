import { useEffect, useRef } from "react";
import { Dimensions, ScrollView, StyleSheet, View } from "react-native";
import FeatureButton, { FEATURE_NAMES } from "./FeatureButton";
import RulerSlider from "./RulerSlider";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const BUTTON_WIDTH = 40;
const BUTTON_GAP = 8;
const CONTAINER_PADDING = 8;
const ROW_PADDING = 4;

/**
 * Filter configurations with value ranges for each feature
 * These match the GL shader filter parameters
 */
export const FILTER_CONFIGS = {
  saturation: {
    name: "Saturation",
    minValue: -100,
    maxValue: 100,
    defaultValue: 0,
    step: 1,
    description: "Controls the intensity of colors",
  },
  brightness: {
    name: "Brightness",
    minValue: -100,
    maxValue: 100,
    defaultValue: 0,
    step: 1,
    description: "Adjusts the overall lightness",
  },
  contrast: {
    name: "Contrast",
    minValue: -100,
    maxValue: 100,
    defaultValue: 0,
    step: 1,
    description: "Difference between light and dark areas",
  },
  hue: {
    name: "Hue",
    minValue: 0,
    maxValue: 100,
    defaultValue: 0,
    step: 1,
    description: "Rotates color hue",
  },
  exposure: {
    name: "Exposure",
    minValue: -2,
    maxValue: 2,
    defaultValue: 0,
    step: 0.05,
    description: "Adjusts overall exposure",
  },
};

// Feature list - only GL filter features
const FEATURES = [
  "saturation",
  "brightness",
  "contrast",
  "hue",
  "exposure",
];

// Accent colors for different filter types
const FILTER_ACCENT_COLORS = {
  saturation: "#4CAF50", // Green
  brightness: "#FFC107", // Amber
  contrast: "#9C27B0", // Purple
  hue: "#E91E63", // Pink
  exposure: "#FF5722", // Deep orange
};

/**
 * FeatureSliderContainer - Main container for image editing sliders
 *
 * Features:
 * - Horizontal scrollable feature selection row
 * - Interactive ruler slider with dynamic value ranges
 * - State management for all features
 * - Auto-scrolls to center the active button
 */
const FeatureSliderContainer = ({
  sliderValues,
  onSliderValueChange,
  selectedFeature,
  onFeatureSelect,
}) => {
  const featureScrollRef = useRef(null);

  // Calculate scroll position to center a button
  const calculateScrollPosition = (index) => {
    const containerWidth = SCREEN_WIDTH - 24 - CONTAINER_PADDING * 2;
    const buttonCenter = index * (BUTTON_WIDTH + BUTTON_GAP) + BUTTON_WIDTH / 2 + ROW_PADDING;
    const scrollX = buttonCenter - containerWidth / 2;
    return Math.max(0, scrollX);
  };

  // Scroll to center the active feature button
  useEffect(() => {
    const featureIndex = FEATURES.indexOf(selectedFeature);
    if (featureIndex !== -1 && featureScrollRef.current) {
      const scrollX = calculateScrollPosition(featureIndex);
      featureScrollRef.current.scrollTo({ x: scrollX, animated: true });
    }
  }, [selectedFeature]);

  // Get filter configuration for current feature
  const getFilterConfig = () => {
    return FILTER_CONFIGS[selectedFeature] || FILTER_CONFIGS.saturation;
  };

  // Get current value for selected feature
  const getCurrentValue = () => {
    const config = getFilterConfig();
    return sliderValues[selectedFeature] ?? config.defaultValue;
  };

  // Get current feature name for display
  const getFeatureName = () => {
    return FEATURE_NAMES[selectedFeature] || getFilterConfig().name;
  };

  // Get accent color based on selection
  const getAccentColor = () => {
    return FILTER_ACCENT_COLORS[selectedFeature] || "#ffa500";
  };

  // Handle value change from slider
  const handleValueChange = (newValue) => {
    onSliderValueChange(selectedFeature, newValue);
  };

  const config = getFilterConfig();

  return (
    <View style={styles.container}>
      {/* Feature Selection Row */}
      <ScrollView
        ref={featureScrollRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.featureRow}
      >
        {FEATURES.map((feature) => (
          <FeatureButton
            key={feature}
            feature={feature}
            isActive={selectedFeature === feature}
            onPress={() => onFeatureSelect(feature)}
          />
        ))}
      </ScrollView>

      {/* Ruler Slider with dynamic range based on feature */}
      <RulerSlider
        value={getCurrentValue()}
        onValueChange={handleValueChange}
        featureName={getFeatureName()}
        accentColor={getAccentColor()}
        minValue={config.minValue}
        maxValue={config.maxValue}
        step={config.step}
        defaultValue={config.defaultValue}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "rgba(47, 44, 45, 0.9)",
    borderWidth: 1.644,
    borderColor: "#FFFFFF",
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 8,
    gap: 12,
  },
  featureRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 4,
  },
});

export default FeatureSliderContainer;

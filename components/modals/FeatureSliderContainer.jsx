import { useEffect, useRef } from "react";
import { Dimensions, ScrollView, StyleSheet, View } from "react-native";
import { FILTER_CONFIGS } from "../FilteredImage";
import FeatureButton, { FEATURE_NAMES } from "./FeatureButton";
import RulerSlider from "./RulerSlider";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const BUTTON_WIDTH = 48;
const BUTTON_GAP = 16;
const CONTAINER_PADDING = 8;
const ROW_PADDING = 4;

// All features in a single linear list (matching the reference image layout)
const ALL_FEATURES = [
  // Basic Adjustments
  "exposure",
  "contrast",
  "highlights",
  "shadows",
  "whites",
  "blacks",
  "temperature",
  "tint",
  "saturation",
  "vibrance",
  // Creative Effects
  "vignetteStrength",
  "grainAmount",
  "clarity",
  "fadeAmount",
  "bleachBypass",
  "tealOrange",
];

// Accent colors for different filter types
const FILTER_ACCENT_COLORS = {
  exposure: "#FFC107", // Amber (sun icon)
  contrast: "#FFFFFF", // White (contrast icon)
  highlights: "#B0BEC5", // Light Grey (cloud icon)
  shadows: "#FF9800", // Orange (lightning icon)
  whites: "#FFFFFF",
  blacks: "#607D8B",
  temperature: "#FF5722",
  tint: "#E91E63",
  saturation: "#4CAF50",
  vibrance: "#00BCD4",
  vignetteStrength: "#607D8B",
  grainAmount: "#9E9E9E",
  clarity: "#2196F3",
  fadeAmount: "#B0BEC5",
  bleachBypass: "#546E7A",
  tealOrange: "#00BCD4",
};

/**
 * FeatureSliderContainer - Main container for image editing sliders
 *
 * Features:
 * - Single horizontal scrollable feature selection row
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
    const featureIndex = ALL_FEATURES.indexOf(selectedFeature);

    if (featureIndex !== -1 && featureScrollRef.current) {
      const scrollX = calculateScrollPosition(featureIndex);
      featureScrollRef.current.scrollTo({ x: scrollX, animated: true });
    }
  }, [selectedFeature]);

  // Get filter configuration for current feature
  const getFilterConfig = () => {
    return FILTER_CONFIGS[selectedFeature] || FILTER_CONFIGS.exposure;
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
      {/* Ruler Slider with value display at TOP */}
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

      {/* Feature Selection Row at BOTTOM */}
      <ScrollView
        ref={featureScrollRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.featureRow}
      >
        {ALL_FEATURES.map((feature) => (
          <FeatureButton
            key={feature}
            feature={feature}
            isActive={selectedFeature === feature}
            onPress={() => onFeatureSelect(feature)}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "rgba(47, 44, 45, 0.95)",
    borderRadius: 20,
    paddingVertical: 16,
    paddingHorizontal: 8,
    gap: 16,
  },
  featureRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    paddingHorizontal: 8,
  },
});

export default FeatureSliderContainer;

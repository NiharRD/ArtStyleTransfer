import React, { useEffect, useRef } from "react";
import { Dimensions, ScrollView, StyleSheet, View } from "react-native";
import FeatureButton, {
  ColorChannelButton,
  COLOR_CHANNELS,
  FEATURE_NAMES,
} from "./FeatureButton";
import RulerSlider from "./RulerSlider";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const BUTTON_WIDTH = 40;
const BUTTON_GAP = 8;
const CONTAINER_PADDING = 8;
const ROW_PADDING = 4;

// Feature list in order (Vibrance at 4th position for better UX on open)
const FEATURES = [
  "brightness",
  "contrast",
  "exposure",
  "vibrance",
  "highlights",
  "shadows",
  "whites",
  "blacks",
  "saturation",
  "colorMixer",
];

// Color channels in order
const COLOR_CHANNEL_LIST = [
  "red",
  "orange",
  "yellow",
  "green",
  "cyan",
  "blue",
  "purple",
];

/**
 * FeatureSliderContainer - Main container for image editing sliders
 *
 * Features:
 * - Horizontal scrollable feature selection row
 * - Color channel row (when Color Mixer selected)
 * - Interactive ruler slider
 * - State management for all features
 * - Auto-scrolls to center the active button
 */
const FeatureSliderContainer = ({
  sliderValues,
  onSliderValueChange,
  selectedFeature,
  onFeatureSelect,
  selectedColorChannel,
  onColorChannelSelect,
}) => {
  const featureScrollRef = useRef(null);
  const colorScrollRef = useRef(null);

  // Calculate scroll position to center a button
  const calculateScrollPosition = (index, totalItems) => {
    const containerWidth = SCREEN_WIDTH - 24 - CONTAINER_PADDING * 2; // Account for modal padding
    const buttonCenter = index * (BUTTON_WIDTH + BUTTON_GAP) + BUTTON_WIDTH / 2 + ROW_PADDING;
    const scrollX = buttonCenter - containerWidth / 2;
    return Math.max(0, scrollX);
  };

  // Scroll to center the active feature button
  useEffect(() => {
    const featureIndex = FEATURES.indexOf(selectedFeature);
    if (featureIndex !== -1 && featureScrollRef.current) {
      const scrollX = calculateScrollPosition(featureIndex, FEATURES.length);
      featureScrollRef.current.scrollTo({ x: scrollX, animated: true });
    }
  }, [selectedFeature]);

  // Scroll to center the active color channel button
  useEffect(() => {
    if (selectedFeature === "colorMixer") {
      const channelIndex = COLOR_CHANNEL_LIST.indexOf(selectedColorChannel);
      if (channelIndex !== -1 && colorScrollRef.current) {
        const scrollX = calculateScrollPosition(channelIndex, COLOR_CHANNEL_LIST.length);
        colorScrollRef.current.scrollTo({ x: scrollX, animated: true });
      }
    }
  }, [selectedColorChannel, selectedFeature]);
  // Get current value based on selected feature and channel
  const getCurrentValue = () => {
    if (selectedFeature === "colorMixer") {
      return sliderValues.colorMixer[selectedColorChannel];
    }
    return sliderValues[selectedFeature];
  };

  // Get current feature name for display
  const getFeatureName = () => {
    if (selectedFeature === "colorMixer") {
      return (
        selectedColorChannel.charAt(0).toUpperCase() +
        selectedColorChannel.slice(1)
      );
    }
    return FEATURE_NAMES[selectedFeature];
  };

  // Get accent color based on selection
  const getAccentColor = () => {
    if (selectedFeature === "colorMixer") {
      return COLOR_CHANNELS[selectedColorChannel];
    }
    return "#ffa500"; // Default orange
  };

  // Handle value change from slider
  const handleValueChange = (newValue) => {
    if (selectedFeature === "colorMixer") {
      onSliderValueChange("colorMixer", {
        ...sliderValues.colorMixer,
        [selectedColorChannel]: newValue,
      });
    } else {
      onSliderValueChange(selectedFeature, newValue);
    }
  };

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

      {/* Color Channel Row (only when Color Mixer selected) */}
      {selectedFeature === "colorMixer" && (
        <ScrollView
          ref={colorScrollRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.colorRow}
        >
          {COLOR_CHANNEL_LIST.map((channel) => (
            <ColorChannelButton
              key={channel}
              color={COLOR_CHANNELS[channel]}
              colorName={channel}
              isActive={selectedColorChannel === channel}
              onPress={() => onColorChannelSelect(channel)}
            />
          ))}
        </ScrollView>
      )}

      {/* Ruler Slider */}
      <RulerSlider
        value={getCurrentValue()}
        onValueChange={handleValueChange}
        featureName={getFeatureName()}
        accentColor={getAccentColor()}
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
  colorRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 4,
  },
});

export default FeatureSliderContainer;


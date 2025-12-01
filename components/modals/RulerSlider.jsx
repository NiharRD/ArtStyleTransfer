import React, { useCallback } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const SLIDER_WIDTH = SCREEN_WIDTH - 64; // Account for container padding
const LINE_COUNT = 41; // Number of ruler lines (for -100 to +100, step 5)
const LINE_SPACING = SLIDER_WIDTH / (LINE_COUNT - 1);
const VALUE_RANGE = 200; // -100 to +100
const PIXELS_PER_UNIT = (SLIDER_WIDTH * 2) / VALUE_RANGE; // More range for smoother scrolling

/**
 * RulerSlider - Interactive ruler-style slider with gesture handling
 *
 * Features:
 * - 41 vertical ruler lines with varying heights
 * - Fixed center indicator (orange/dynamic color)
 * - Pan gesture for value adjustment
 * - Value range: -100 to +100
 * - Spring animation on release
 * - Displays "Feature Name • Value" label
 */
const RulerSlider = ({
  value = 0,
  onValueChange,
  featureName = "Vibrance",
  accentColor = "#ffa500",
}) => {
  // Shared value for ruler position (offset from center)
  const translateX = useSharedValue(-value * PIXELS_PER_UNIT);
  const startX = useSharedValue(0);

  // Update translation when value prop changes externally
  React.useEffect(() => {
    translateX.value = withSpring(-value * PIXELS_PER_UNIT, {
      damping: 20,
      stiffness: 200,
    });
  }, [value]);

  // Callback to update parent value
  const updateValue = useCallback(
    (newValue) => {
      if (onValueChange) {
        // Clamp value to range
        const clampedValue = Math.max(-100, Math.min(100, Math.round(newValue)));
        onValueChange(clampedValue);
      }
    },
    [onValueChange]
  );

  // Pan gesture handler
  const panGesture = Gesture.Pan()
    .onStart(() => {
      startX.value = translateX.value;
    })
    .onUpdate((event) => {
      // Calculate new position
      const newTranslateX = startX.value + event.translationX;
      // Clamp to value range
      const maxTranslate = 100 * PIXELS_PER_UNIT;
      const clampedTranslate = Math.max(
        -maxTranslate,
        Math.min(maxTranslate, newTranslateX)
      );
      translateX.value = clampedTranslate;

      // Calculate and report new value
      const newValue = -clampedTranslate / PIXELS_PER_UNIT;
      runOnJS(updateValue)(newValue);
    })
    .onEnd(() => {
      // Snap to nearest integer with spring animation
      const currentValue = -translateX.value / PIXELS_PER_UNIT;
      const snappedValue = Math.round(currentValue);
      translateX.value = withSpring(-snappedValue * PIXELS_PER_UNIT, {
        damping: 20,
        stiffness: 200,
      });
      runOnJS(updateValue)(snappedValue);
    });

  // Animated style for the ruler
  const rulerStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  // Generate ruler lines
  const renderRulerLines = () => {
    const lines = [];
    const totalLines = LINE_COUNT * 3; // Extra lines for scrolling
    const centerOffset = (totalLines * LINE_SPACING) / 2;

    for (let i = 0; i < totalLines; i++) {
      const lineValue = (i - Math.floor(totalLines / 2)) * 5;
      const isMajor = lineValue % 25 === 0;
      const isZero = lineValue === 0;

      let lineHeight = 20;
      let lineColor = "#666666";
      let lineWidth = 2;

      if (isMajor) {
        lineHeight = 30;
        lineColor = "#888888";
      }
      if (isZero) {
        lineHeight = 35;
        lineColor = "#999999";
        lineWidth = 2.5;
      }

      lines.push(
        <View
          key={i}
          style={[
            styles.rulerLine,
            {
              height: lineHeight,
              backgroundColor: lineColor,
              width: lineWidth,
              left: i * LINE_SPACING - centerOffset + SLIDER_WIDTH / 2,
            },
          ]}
        />
      );
    }
    return lines;
  };

  return (
    <View style={styles.container}>
      {/* Value Label */}
      <View style={styles.labelContainer}>
        <Text style={[styles.labelText, { color: "rgba(255, 255, 255, 0.6)" }]}>
          {featureName}
        </Text>
        <View style={[styles.labelDot, { backgroundColor: accentColor }]} />
        <Text style={[styles.valueText, { color: "rgba(255, 255, 255, 0.6)" }]}>
          {value}
        </Text>
      </View>

      {/* Ruler Container */}
      <View style={styles.rulerContainer}>
        {/* Scrollable Ruler */}
        <GestureDetector gesture={panGesture}>
          <Animated.View style={[styles.rulerWrapper, rulerStyle]}>
            {renderRulerLines()}
          </Animated.View>
        </GestureDetector>

        {/* Fixed Center Indicator */}
        <View
          style={[styles.centerIndicator, { backgroundColor: accentColor }]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    gap: 8,
  },
  labelContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingVertical: 8,
    backgroundColor: "rgba(34, 32, 32, 0.9)",
    borderWidth: 0.681,
    borderColor: "rgba(120, 120, 128, 0.16)",
    borderRadius: 70,
    alignSelf: "center",
    paddingHorizontal: 12,
  },
  labelText: {
    fontSize: 14,
    fontFamily: "System",
    letterSpacing: 0.28,
  },
  labelDot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
  },
  valueText: {
    fontSize: 14,
    fontFamily: "System",
    letterSpacing: 0.28,
  },
  rulerContainer: {
    height: 50,
    width: "100%",
    overflow: "hidden",
    position: "relative",
    justifyContent: "center",
  },
  rulerWrapper: {
    position: "absolute",
    height: "100%",
    width: SLIDER_WIDTH * 3,
    flexDirection: "row",
    alignItems: "center",
  },
  rulerLine: {
    position: "absolute",
    borderRadius: 1,
  },
  centerIndicator: {
    position: "absolute",
    left: "50%",
    marginLeft: -1.5,
    width: 3,
    height: 40,
    borderRadius: 1.5,
    zIndex: 10,
  },
});

export default RulerSlider;


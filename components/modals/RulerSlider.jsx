import React, { useCallback, useMemo } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const SLIDER_WIDTH = SCREEN_WIDTH - 64;
const MAX_LINES = 41; // Fixed number of lines to prevent performance issues

/**
 * RulerSlider - Interactive ruler-style slider with gesture handling
 *
 * Features:
 * - Dynamic ruler lines based on value range
 * - Fixed center indicator (orange/dynamic color)
 * - Pan gesture for value adjustment
 * - Configurable min/max values, step size, and default value
 * - Spring animation on release
 * - Displays "Feature Name • Value" label
 */
const RulerSlider = ({
  value = 0,
  onValueChange,
  featureName = "Vibrance",
  accentColor = "#ffa500",
  minValue = -100,
  maxValue = 100,
  step = 1,
  defaultValue = 0,
  decimalPlaces,
}) => {
  // Calculate derived values based on props
  const config = useMemo(() => {
    const valueRange = maxValue - minValue;
    // Fixed line count to prevent performance issues
    const lineCount = MAX_LINES;
    const lineSpacing = SLIDER_WIDTH / (lineCount - 1);
    const pixelsPerUnit = (SLIDER_WIDTH * 2) / Math.max(valueRange, 0.001); // Prevent division by zero

    // Auto-calculate decimal places based on step if not provided
    let autoDecimalPlaces = 0;
    if (decimalPlaces !== undefined) {
      autoDecimalPlaces = decimalPlaces;
    } else if (step > 0 && step < 1) {
      autoDecimalPlaces = Math.min(4, Math.ceil(-Math.log10(step)));
    }

    return {
      valueRange: Math.max(valueRange, 0.001),
      lineCount,
      lineSpacing,
      pixelsPerUnit,
      decimalPlaces: autoDecimalPlaces,
      centerValue: defaultValue,
    };
  }, [minValue, maxValue, step, defaultValue, decimalPlaces]);

  // Shared value for ruler position (offset from center)
  const translateX = useSharedValue(0);
  const startX = useSharedValue(0);

  // Store config values for worklet access
  const pixelsPerUnit = config.pixelsPerUnit;
  const centerValue = config.centerValue;

  // Update translation when value prop changes externally
  React.useEffect(() => {
    const newTranslate = -(value - centerValue) * pixelsPerUnit;
    if (isFinite(newTranslate)) {
      translateX.value = withSpring(newTranslate, {
        damping: 20,
        stiffness: 200,
      });
    }
  }, [value, centerValue, pixelsPerUnit]);

  // Callback to update parent value (runs on JS thread)
  const updateValue = useCallback(
    (newValue) => {
      if (onValueChange && isFinite(newValue)) {
        // Clamp value to range and round to step
        const clampedValue = Math.max(minValue, Math.min(maxValue, newValue));
        const steppedValue = Math.round(clampedValue / step) * step;
        // Round to avoid floating point issues
        const roundedValue = Number(steppedValue.toFixed(config.decimalPlaces));
        onValueChange(roundedValue);
      }
    },
    [onValueChange, minValue, maxValue, step, config.decimalPlaces]
  );

  // Pan gesture handler - calculations done inline to avoid worklet issues
  const panGesture = Gesture.Pan()
    .onStart(() => {
      "worklet";
      startX.value = translateX.value;
    })
    .onUpdate((event) => {
      "worklet";
      // Calculate new position
      const newTranslateX = startX.value + event.translationX;

      // Calculate bounds (inline to avoid callback issues)
      const minTranslate = -(maxValue - centerValue) * pixelsPerUnit;
      const maxTranslate = -(minValue - centerValue) * pixelsPerUnit;

      const clampedTranslate = Math.max(
        minTranslate,
        Math.min(maxTranslate, newTranslateX)
      );
      translateX.value = clampedTranslate;

      // Calculate new value
      const newValue = centerValue - clampedTranslate / pixelsPerUnit;
      runOnJS(updateValue)(newValue);
    })
    .onEnd(() => {
      "worklet";
      // Calculate current value
      const currentValue = centerValue - translateX.value / pixelsPerUnit;
      const snappedValue = Math.round(currentValue / step) * step;
      const clampedSnapped = Math.max(
        minValue,
        Math.min(maxValue, snappedValue)
      );

      // Animate to snapped position
      const snappedTranslate = -(clampedSnapped - centerValue) * pixelsPerUnit;
      translateX.value = withSpring(snappedTranslate, {
        damping: 20,
        stiffness: 200,
      });
      runOnJS(updateValue)(clampedSnapped);
    });

  // Animated style for the ruler
  const rulerStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  // Generate ruler lines - fixed count for performance
  const renderRulerLines = useMemo(() => {
    const lines = [];
    const totalLines = MAX_LINES * 3; // Extra lines for scrolling
    const centerOffset = (totalLines * config.lineSpacing) / 2;
    const majorLineStep = 5;
    const lineValueStep = config.valueRange / (MAX_LINES - 1);

    for (let i = 0; i < totalLines; i++) {
      const lineIndex = i - Math.floor(totalLines / 2);
      const lineValue = config.centerValue + lineIndex * lineValueStep;

      const isMajor = Math.abs(lineIndex) % majorLineStep === 0;
      const isDefault = Math.abs(lineValue - defaultValue) < lineValueStep / 2;

      let lineHeight = 20;
      let lineColor = "#666666";
      let lineWidth = 2;

      if (isMajor) {
        lineHeight = 30;
        lineColor = "#888888";
      }
      if (isDefault) {
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
              left: i * config.lineSpacing - centerOffset + SLIDER_WIDTH / 2,
            },
          ]}
        />
      );
    }
    return lines;
  }, [config, defaultValue]);

  // Format value for display
  const displayValue = useMemo(() => {
    if (!isFinite(value)) return "0";
    if (config.decimalPlaces === 0) {
      return Math.round(value).toString();
    }
    return value.toFixed(config.decimalPlaces);
  }, [value, config.decimalPlaces]);

  return (
    <View style={styles.container}>
      {/* Value Label */}
      <View style={styles.labelContainer}>
        <Text style={[styles.labelText, { color: "rgba(255, 255, 255, 0.6)" }]}>
          {featureName}
        </Text>
        <View style={[styles.labelDot, { backgroundColor: accentColor }]} />
        <Text style={[styles.valueText, { color: "rgba(255, 255, 255, 0.6)" }]}>
          {displayValue}
        </Text>
      </View>

      {/* Ruler Container */}
      <View style={styles.rulerContainer}>
        {/* Scrollable Ruler */}
        <GestureDetector gesture={panGesture}>
          <Animated.View style={[styles.rulerWrapper, rulerStyle]}>
            {renderRulerLines}
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

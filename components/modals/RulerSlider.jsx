import { useCallback, useEffect, useMemo, useRef } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
    runOnJS,
    useAnimatedStyle,
    useDerivedValue,
    useSharedValue,
} from "react-native-reanimated";
import { Typography } from "../../constants/Theme";

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
 * - Smooth dragging without React re-renders during gesture
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
  // Track if we're currently dragging to avoid external updates during drag
  const isDragging = useRef(false);

  // Calculate derived values based on props
  const config = useMemo(() => {
    const valueRange = maxValue - minValue;
    const lineCount = MAX_LINES;
    const lineSpacing = SLIDER_WIDTH / (lineCount - 1);
    const pixelsPerUnit = (SLIDER_WIDTH * 2) / Math.max(valueRange, 0.001);

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

  // Shared values for smooth animation
  const translateX = useSharedValue(-(value - config.centerValue) * config.pixelsPerUnit);
  const startX = useSharedValue(0);

  // Shared value for display (updated during drag without React re-renders)
  const displayValueShared = useSharedValue(value);

  // Store config values for worklet access
  const pixelsPerUnit = config.pixelsPerUnit;
  const centerValue = config.centerValue;

  // Sync with external value changes (only when not dragging)
  useEffect(() => {
    if (!isDragging.current) {
      const newTranslate = -(value - centerValue) * pixelsPerUnit;
      if (isFinite(newTranslate)) {
        translateX.value = newTranslate;
        displayValueShared.value = value;
      }
    }
  }, [value, centerValue, pixelsPerUnit]);

  // Callback to update parent value (only called on gesture end)
  const updateValue = useCallback(
    (newValue) => {
      if (onValueChange && isFinite(newValue)) {
        const clampedValue = Math.max(minValue, Math.min(maxValue, newValue));
        const steppedValue = Math.round(clampedValue / step) * step;
        const roundedValue = Number(steppedValue.toFixed(config.decimalPlaces));
        onValueChange(roundedValue);
      }
    },
    [onValueChange, minValue, maxValue, step, config.decimalPlaces]
  );

  const setDragging = useCallback((dragging) => {
    isDragging.current = dragging;
  }, []);

  // Pan gesture handler - NO runOnJS during onUpdate for smooth performance
  const panGesture = Gesture.Pan()
    .onStart(() => {
      "worklet";
      startX.value = translateX.value;
      runOnJS(setDragging)(true);
    })
    .onUpdate((event) => {
      "worklet";
      const newTranslateX = startX.value + event.translationX;

      // Calculate bounds
      const minTranslate = -(maxValue - centerValue) * pixelsPerUnit;
      const maxTranslate = -(minValue - centerValue) * pixelsPerUnit;

      const clampedTranslate = Math.max(
        minTranslate,
        Math.min(maxTranslate, newTranslateX)
      );

      // Direct assignment - no animation, no JS thread callback
      translateX.value = clampedTranslate;

      // Update display value on UI thread (no React re-render)
      const newValue = centerValue - clampedTranslate / pixelsPerUnit;
      const steppedValue = Math.round(newValue / step) * step;
      displayValueShared.value = Math.max(minValue, Math.min(maxValue, steppedValue));
    })
    .onEnd(() => {
      "worklet";
      const currentValue = centerValue - translateX.value / pixelsPerUnit;
      const snappedValue = Math.round(currentValue / step) * step;
      const clampedSnapped = Math.max(minValue, Math.min(maxValue, snappedValue));

      // Snap to final position
      const snappedTranslate = -(clampedSnapped - centerValue) * pixelsPerUnit;
      translateX.value = snappedTranslate;
      displayValueShared.value = clampedSnapped;

      // Only update parent state at the end
      runOnJS(updateValue)(clampedSnapped);
      runOnJS(setDragging)(false);
    })
    .onFinalize(() => {
      "worklet";
      runOnJS(setDragging)(false);
    });

  // Animated style for the ruler
  const rulerStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  // Generate ruler lines - fixed count for performance
  const renderRulerLines = useMemo(() => {
    const lines = [];
    const totalLines = MAX_LINES * 3;
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

  // Derived value for formatted display text
  const formattedDisplayValue = useDerivedValue(() => {
    const val = displayValueShared.value;
    if (!isFinite(val)) return "0";
    if (config.decimalPlaces === 0) {
      return Math.round(val).toString();
    }
    return val.toFixed(config.decimalPlaces);
  });

  // Animated text style for the value display
  const animatedValueStyle = useAnimatedStyle(() => ({
    // This triggers re-render of the animated text
    opacity: 1,
  }));

  return (
    <View style={styles.container}>
      {/* Value Label */}
      <View style={styles.labelContainer}>
        <Text style={[styles.labelText, { color: "rgba(255, 255, 255, 0.6)" }]}>
          {featureName}
        </Text>
        <View style={[styles.labelDot, { backgroundColor: accentColor }]} />
        <Animated.Text style={[styles.valueText, { color: "rgba(255, 255, 255, 0.6)" }, animatedValueStyle]}>
          {config.decimalPlaces === 0
            ? Math.round(value).toString()
            : value.toFixed(config.decimalPlaces)}
        </Animated.Text>
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
    fontFamily: Typography.fontFamily.regular,
    letterSpacing: 0.28,
  },
  labelDot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
  },
  valueText: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.regular,
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

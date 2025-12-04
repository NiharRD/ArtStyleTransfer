import { useEffect, useRef, useState } from "react";
import {
    Animated,
    Easing,
    PanResponder,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { Typography } from "../../constants/Theme";

/**
 * XYPad - Interactive 2D touch pad for selecting values on two axes
 *
 * Features:
 * - Drag the purple dot to select position
 * - Values are applied when the user releases the dot
 * - Center grid lines (horizontal and vertical) inside the pad
 * - Four labels positioned INSIDE the pad at edges
 * - Normalized output values: X (-1 to +1), Y (-1 to +1)
 * - Smooth animated transitions
 * - Dynamic labels from semantic axes API
 * - Disabled state during processing
 *
 * Props:
 * - value: { x, y } - Current values (-1 to 1)
 * - onValueChange: (newValue) => void - Callback when values change (during drag)
 * - onDragEnd: (finalValue) => void - Callback when drag ends (apply edits)
 * - dotColor: string - Color for the draggable dot
 * - labels: { top, bottom, left, right } - Custom labels for axes (optional)
 * - disabled: boolean - Disable interaction during processing
 */
const XYPad = ({
  value = { x: 0, y: 0 },
  onValueChange,
  onDragEnd,
  dotColor = "#8A2BE2",
  labels: customLabels,
  disabled = false,
}) => {
  // Default labels - used when no custom labels are provided
  const defaultLabels = {
    top: "Joyful",
    bottom: "Gloomy",
    left: "Day",
    right: "Night",
  };

  // Use custom labels if provided, otherwise fall back to defaults
  const labels = customLabels || defaultLabels;

  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

  const DOT_SIZE = 30;

  // Animated values for smooth dot movement
  const dotX = useRef(new Animated.Value(0)).current;
  const dotY = useRef(new Animated.Value(0)).current;

  // Calculate dot position from normalized values (-1 to 1)
  const calculateDotPosition = (normalizedX, normalizedY, size) => {
    const effectiveWidth = size.width - DOT_SIZE;
    const effectiveHeight = size.height - DOT_SIZE;

    // Convert from -1,1 range to pixel position
    // X: -1 = left edge, +1 = right edge
    // Y: -1 = bottom edge, +1 = top edge (inverted from screen coords)
    const x = ((normalizedX + 1) / 2) * effectiveWidth;
    const y = ((1 - normalizedY) / 2) * effectiveHeight; // Invert Y

    return { x, y };
  };

  // Update animated position when value changes
  useEffect(() => {
    if (containerSize.width > 0 && containerSize.height > 0) {
      const pos = calculateDotPosition(value.x, value.y, containerSize);
      // Use fast timing for responsive feel
      Animated.parallel([
        Animated.timing(dotX, {
          toValue: pos.x,
          duration: 150,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: false,
        }),
        Animated.timing(dotY, {
          toValue: pos.y,
          duration: 150,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: false,
        }),
      ]).start();
    }
  }, [value.x, value.y, containerSize.width, containerSize.height]);

  // Track if currently dragging
  const isDragging = useRef(false);
  const currentValue = useRef(value);
  const debounceTimer = useRef(null);

  // Update current value ref when prop changes
  useEffect(() => {
    currentValue.current = value;
  }, [value]);

  // Cleanup debounce timer on unmount
  useEffect(() => {
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, []);

  // Debounced apply function - triggers after 0.5s of no movement
  const scheduleApply = (values) => {
    // Clear any existing timer
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    // Schedule new apply after 500ms
    debounceTimer.current = setTimeout(() => {
      console.log("=== XYPad Auto-Apply (0.5s debounce) ===");
      console.log("Final values:", values);
      console.log("Labels:", labels);
      console.log("=========================================");

      if (onDragEnd) {
        onDragEnd(values);
      }
    }, 500);
  };

  // Calculate normalized values from pixel position
  const getNormalizedValues = (pixelX, pixelY, size) => {
    const effectiveWidth = size.width - DOT_SIZE;
    const effectiveHeight = size.height - DOT_SIZE;

    if (effectiveWidth <= 0 || effectiveHeight <= 0) return null;

    // Clamp pixel positions (center dot on touch)
    const clampedX = Math.max(
      0,
      Math.min(effectiveWidth, pixelX - DOT_SIZE / 2)
    );
    const clampedY = Math.max(
      0,
      Math.min(effectiveHeight, pixelY - DOT_SIZE / 2)
    );

    // Convert to -1,1 range
    const normalizedX = (clampedX / effectiveWidth) * 2 - 1;
    const normalizedY = 1 - (clampedY / effectiveHeight) * 2; // Invert Y

    return {
      x: Math.round(normalizedX * 100) / 100, // Round to 2 decimal places
      y: Math.round(normalizedY * 100) / 100,
    };
  };

  // Track disabled state in a ref so PanResponder can access current value
  const disabledRef = useRef(disabled);
  useEffect(() => {
    disabledRef.current = disabled;
  }, [disabled]);

  // Store containerSize in a ref for PanResponder access
  const containerSizeRef = useRef(containerSize);
  useEffect(() => {
    containerSizeRef.current = containerSize;
  }, [containerSize]);

  // Track if user has started moving (to differentiate tap from drag)
  const hasMoved = useRef(false);
  const startLocation = useRef({ x: 0, y: 0 });

  // Animate dot to position with spring animation (for taps)
  const animateToPosition = (targetX, targetY) => {
    Animated.parallel([
      Animated.spring(dotX, {
        toValue: targetX,
        tension: 100,
        friction: 8,
        useNativeDriver: false,
      }),
      Animated.spring(dotY, {
        toValue: targetY,
        tension: 100,
        friction: 8,
        useNativeDriver: false,
      }),
    ]).start();
  };

  // Handle tap - animate with spring to tapped position
  const handleTapRef = useRef(null);
  handleTapRef.current = (locationX, locationY) => {
    const size = containerSizeRef.current;
    if (size.width === 0 || size.height === 0) return;

    const newValues = getNormalizedValues(locationX, locationY, size);

    if (newValues) {
      currentValue.current = newValues;

      // Animate dot with spring to tap position
      const pos = calculateDotPosition(newValues.x, newValues.y, size);
      animateToPosition(pos.x, pos.y);

      // Notify parent of value change
      if (onValueChange) {
        onValueChange(newValues);
      }

      // Schedule apply after 0.5s
      scheduleApply(newValues);
    }
  };

  // Handle drag move - follow finger immediately (no animation)
  const handleDragRef = useRef(null);
  handleDragRef.current = (locationX, locationY) => {
    const size = containerSizeRef.current;
    if (size.width === 0 || size.height === 0) return;

    const newValues = getNormalizedValues(locationX, locationY, size);

    if (newValues) {
      currentValue.current = newValues;

      // Update dot position immediately during drag (no animation)
      const pos = calculateDotPosition(newValues.x, newValues.y, size);
      dotX.setValue(pos.x);
      dotY.setValue(pos.y);

      // Notify parent of value change during drag
      if (onValueChange) {
        onValueChange(newValues);
      }

      // Schedule apply after 0.5s of staying at this position
      scheduleApply(newValues);
    }
  };

  // PanResponder for tap and drag handling
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => !disabledRef.current,
      onMoveShouldSetPanResponder: () => !disabledRef.current,
      onPanResponderGrant: (evt) => {
        if (disabledRef.current) return;
        isDragging.current = true;
        hasMoved.current = false;
        const { locationX, locationY } = evt.nativeEvent;
        startLocation.current = { x: locationX, y: locationY };
      },
      onPanResponderMove: (evt) => {
        if (disabledRef.current || !isDragging.current) return;
        const { locationX, locationY } = evt.nativeEvent;

        // Check if user has moved more than a small threshold (5px)
        const dx = Math.abs(locationX - startLocation.current.x);
        const dy = Math.abs(locationY - startLocation.current.y);

        if (dx > 5 || dy > 5) {
          hasMoved.current = true;
        }

        // During drag, follow finger immediately
        if (hasMoved.current && handleDragRef.current) {
          handleDragRef.current(locationX, locationY);
        }
      },
      onPanResponderRelease: (evt) => {
        if (disabledRef.current) return;

        const { locationX, locationY } = evt.nativeEvent;

        // If user didn't drag (just tapped), animate with spring to that position
        if (!hasMoved.current && handleTapRef.current) {
          handleTapRef.current(locationX, locationY);
        }

        isDragging.current = false;
        hasMoved.current = false;
      },
      onPanResponderTerminate: () => {
        isDragging.current = false;
        hasMoved.current = false;
      },
    })
  ).current;

  // Handle container layout - initialize dot position
  const onLayout = (event) => {
    const { width, height } = event.nativeEvent.layout;
    setContainerSize({ width, height });

    // Set initial position immediately (no animation)
    const pos = calculateDotPosition(value.x, value.y, { width, height });
    dotX.setValue(pos.x);
    dotY.setValue(pos.y);
  };

  return (
    <View
      style={[styles.container, disabled && styles.containerDisabled]}
      onLayout={onLayout}
      {...panResponder.panHandlers}
    >
        {/* Horizontal Grid Lines */}
        <View style={[styles.horizontalLine, { top: "33%" }]} />
        <View style={[styles.horizontalLine, { top: "66%" }]} />

        {/* Vertical Grid Lines */}
        <View style={[styles.verticalLine, { left: "33%" }]} />
        <View style={[styles.verticalLine, { left: "66%" }]} />

        {/* Top Label - Inside */}
        <Text style={[styles.label, styles.labelTop]}>{labels.top}</Text>

        {/* Bottom Label - Inside */}
        <Text style={[styles.label, styles.labelBottom]}>{labels.bottom}</Text>

        {/* Left Label - Inside */}
        <Text style={[styles.label, styles.labelLeft]}>{labels.left}</Text>

        {/* Right Label - Inside */}
        <Text style={[styles.label, styles.labelRight]}>{labels.right}</Text>

        {/* Dot - Animated */}
        {containerSize.width > 0 && (
          <Animated.View
            style={[
              styles.dot,
              {
                backgroundColor: dotColor,
                left: dotX,
                top: dotY,
                width: DOT_SIZE,
                height: DOT_SIZE,
                borderRadius: DOT_SIZE / 2,
              },
              disabled && styles.dotDisabled,
            ]}
          />
        )}
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 175,
    backgroundColor: "rgba(47, 44, 45, 0.9)",
    borderWidth: 1.644,
    borderColor: "#FFFFFF",
    borderRadius: 20,
    position: "relative",
    overflow: "hidden",
  },
  containerDisabled: {
    opacity: 0.5,
  },
  horizontalLine: {
    position: "absolute",
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
  },
  verticalLine: {
    position: "absolute",
    top: 0,
    bottom: 0,
    width: 1,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
  },
  dot: {
    position: "absolute",
    shadowColor: "#8A2BE2",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 8,
  },
  dotDisabled: {
    opacity: 0.5,
  },
  label: {
    position: "absolute",
    fontFamily: Typography.fontFamily.regular,
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.6)",
    letterSpacing: 0.24,
  },
  labelTop: {
    top: 12,
    alignSelf: "center",
    left: 0,
    right: 0,
    textAlign: "center",
  },
  labelBottom: {
    bottom: 12,
    alignSelf: "center",
    left: 0,
    right: 0,
    textAlign: "center",
  },
  labelLeft: {
    left: 12,
    top: "50%",
    transform: [{ translateY: -8 }],
  },
  labelRight: {
    right: 12,
    top: "50%",
    transform: [{ translateY: -8 }],
  },
});

export default XYPad;

import React, { useRef, useState, useEffect } from "react";
import { Animated, StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";

/**
 * XYPad - Interactive 2D touch pad for selecting values on two axes
 *
 * Features:
 * - Tap anywhere to move the purple dot to that location
 * - Center grid lines (horizontal and vertical) inside the pad
 * - Four labels positioned INSIDE the pad at edges
 * - Normalized output values: X (-1 to +1), Y (-1 to +1)
 * - Smooth animated transitions when tapping
 *
 * Props:
 * - value: { x, y } - Current values (-1 to 1)
 * - onValueChange: (newValue) => void - Callback when values change
 * - dotColor: string - Color for the draggable dot
 */
const XYPad = ({
  value = { x: 0, y: 0 },
  onValueChange,
  dotColor = "#8A2BE2",
}) => {
  // Dynamic labels state
  const [labels] = useState({
    top: "Joyful",
    bottom: "Gloomy",
    left: "Day",
    right: "Night",
  });

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
      Animated.spring(dotX, {
        toValue: pos.x,
        useNativeDriver: false,
        tension: 120,
        friction: 10,
      }).start();
      Animated.spring(dotY, {
        toValue: pos.y,
        useNativeDriver: false,
        tension: 120,
        friction: 10,
      }).start();
    }
  }, [value.x, value.y, containerSize.width, containerSize.height]);

  // Calculate normalized values from pixel position
  const getNormalizedValues = (pixelX, pixelY, size) => {
    const effectiveWidth = size.width - DOT_SIZE;
    const effectiveHeight = size.height - DOT_SIZE;

    if (effectiveWidth <= 0 || effectiveHeight <= 0) return null;

    // Clamp pixel positions (center dot on touch)
    const clampedX = Math.max(0, Math.min(effectiveWidth, pixelX - DOT_SIZE / 2));
    const clampedY = Math.max(0, Math.min(effectiveHeight, pixelY - DOT_SIZE / 2));

    // Convert to -1,1 range
    const normalizedX = (clampedX / effectiveWidth) * 2 - 1;
    const normalizedY = 1 - (clampedY / effectiveHeight) * 2; // Invert Y

    return {
      x: Math.round(normalizedX * 100) / 100, // Round to 2 decimal places
      y: Math.round(normalizedY * 100) / 100,
    };
  };

  // Handle tap to select position
  const handlePress = (event) => {
    const { locationX, locationY } = event.nativeEvent;
    
    if (containerSize.width === 0 || containerSize.height === 0) return;

    const newValues = getNormalizedValues(locationX, locationY, containerSize);
    if (newValues && onValueChange) {
      onValueChange(newValues);
    }
  };

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
    <TouchableWithoutFeedback onPress={handlePress}>
      <View style={styles.container} onLayout={onLayout}>
        {/* Horizontal Grid Line */}
        <View style={styles.horizontalLine} />

        {/* Vertical Grid Line */}
        <View style={styles.verticalLine} />

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
            ]}
          />
        )}
      </View>
    </TouchableWithoutFeedback>
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
  horizontalLine: {
    position: "absolute",
    top: "50%",
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
  },
  verticalLine: {
    position: "absolute",
    left: "50%",
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
  label: {
    position: "absolute",
    fontFamily: "System",
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

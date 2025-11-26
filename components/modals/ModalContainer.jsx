import React, { useEffect, useRef, useState } from "react";
import { Animated, StyleSheet } from "react-native";

/**
 * ModalContainer - Reusable animated bottom sheet wrapper
 *
 * Features:
 * - Slide up/down animations with spring physics
 * - Absolute positioning at bottom
 * - Conditional rendering for performance
 * - Customizable height
 */
const ModalContainer = ({ visible, onClose, children, height = 400 }) => {
  const slideAnim = useRef(new Animated.Value(500)).current;
  const [shouldRender, setShouldRender] = useState(visible);

  useEffect(() => {
    if (visible) {
      setShouldRender(true);
      // Slide up with spring animation
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
        tension: 65,
        friction: 11,
      }).start();
    } else {
      // Slide down
      Animated.timing(slideAnim, {
        toValue: 500,
        duration: 250,
        useNativeDriver: true,
      }).start(() => {
        setShouldRender(false);
      });
    }
  }, [visible]);

  if (!shouldRender) {
    return null;
  }

  return (
    <Animated.View
      style={[
        styles.container,
        {
          height,
          transform: [{ translateY: slideAnim }],
        },
      ]}
      pointerEvents={visible ? "auto" : "none"}
    >
      {children}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 48,
    left: 0,
    right: 0,
    backgroundColor: "transparent",
    zIndex: 100,
  },
});

export default ModalContainer;

import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet } from "react-native";

/**
 * ModalBottomSheet - Layout-integrated bottom sheet component
 *
 * Features:
 * - Animated slide-up/down transitions
 * - Part of main layout (not overlay)
 * - Configurable height
 *
 * Note: This component is now rendered as part of the main layout,
 * not as a Modal overlay. The parent component handles positioning.
 */
const ModalBottomSheet = ({ visible, onClose, children, height = 400 }) => {
  const slideAnim = useRef(new Animated.Value(500)).current;
  const [shouldRender, setShouldRender] = React.useState(visible);

  useEffect(() => {
    if (visible) {
      setShouldRender(true);
      // Slide up
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
        // After animation completes, stop rendering
        setShouldRender(false);
      });
    }
  }, [visible]);

  // Don't render if not visible and animation hasn't started
  if (!shouldRender) {
    return null;
  }

  return (
    <Animated.View
      style={[
        styles.bottomSheet,
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
  bottomSheet: {
    backgroundColor: "transparent",
    width: "100%",
  },
});

export default ModalBottomSheet;

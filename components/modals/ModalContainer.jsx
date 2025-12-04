import { useEffect, useRef, useState } from "react";
import {
    Animated,
    Easing,
    Keyboard,
    Platform,
    Pressable,
    StyleSheet,
    View
} from "react-native";

/**
 * ModalContainer - Reusable animated bottom sheet wrapper
 *
 * Features:
 * - Fast slide up/down animations
 * - Absolute positioning at bottom
 * - Conditional rendering for performance
 * - Customizable height
 * - Keyboard avoidance: Shifts up when keyboard opens
 * - Background dimming: Dims background when keyboard opens
 */
const ModalContainer = ({ visible, onClose, children, height = 400 }) => {
  const slideAnim = useRef(new Animated.Value(500)).current;
  const keyboardOffset = useRef(new Animated.Value(0)).current;
  const backdropOpacity = useRef(new Animated.Value(0)).current;
  const [shouldRender, setShouldRender] = useState(visible);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  useEffect(() => {
    if (visible) {
      setShouldRender(true);
      // Slide up with fast timing animation
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 250,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }).start();
    } else {
      // Slide down
      Animated.timing(slideAnim, {
        toValue: 500,
        duration: 200,
        easing: Easing.in(Easing.cubic),
        useNativeDriver: true,
      }).start(() => {
        setShouldRender(false);
      });
    }
  }, [visible]);

  useEffect(() => {
    const showEvent =
      Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow";
    const hideEvent =
      Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide";

    const onShow = (e) => {
      const keyboardHeight = e.endCoordinates.height;
      setIsKeyboardVisible(true);

      Animated.parallel([
        Animated.timing(keyboardOffset, {
          toValue: -keyboardHeight,
          duration: Platform.OS === "ios" ? e.duration : 200,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(backdropOpacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    };

    const onHide = (e) => {
      setIsKeyboardVisible(false);

      Animated.parallel([
        Animated.timing(keyboardOffset, {
          toValue: 0,
          duration: Platform.OS === "ios" ? e.duration : 200,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(backdropOpacity, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    };

    const showListener = Keyboard.addListener(showEvent, onShow);
    const hideListener = Keyboard.addListener(hideEvent, onHide);

    return () => {
      showListener.remove();
      hideListener.remove();
    };
  }, []);

  // Dismiss keyboard when tapping backdrop
  const handleBackdropPress = () => {
    if (isKeyboardVisible) {
      Keyboard.dismiss();
    }
  };

  if (!shouldRender) {
    return null;
  }

  return (
    <View style={styles.wrapper} pointerEvents="box-none">
      {/* Backdrop for dimming effect - tappable to dismiss keyboard */}
      <Pressable
        style={StyleSheet.absoluteFill}
        onPress={handleBackdropPress}
        pointerEvents={isKeyboardVisible ? "auto" : "none"}
      >
        <Animated.View
          style={[styles.backdrop, { opacity: backdropOpacity }]}
        />
      </Pressable>

      <Animated.View
        style={[
          styles.container,
          {
            height,
            transform: [
              { translateY: Animated.add(slideAnim, keyboardOffset) },
            ],
          },
        ]}
        pointerEvents={visible ? "auto" : "none"}
      >
        {children}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 100,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.7)", // Dark overlay
  },
  container: {
    position: "absolute",
    bottom: 40,
    left: 0,
    right: 0,
    backgroundColor: "transparent",
  },
});

export default ModalContainer;

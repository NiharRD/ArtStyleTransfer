import { useEffect, useRef } from "react";
import {
    Animated,
    Dimensions,
    Easing,
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { Typography } from "../../constants/Theme";
import { useOnboarding } from "../../context/OnboardingContext";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

/**
 * Position configurations for each onboarding step
 * These are approximate positions - adjust based on actual layout
 */
const TOOLTIP_POSITIONS = {
  "main-branch": {
    top: 140, // Below control bar
    left: 16,
    arrowLeft: 50,
  },
  "ai-expert": {
    top: 140,
    right: 16,
    arrowRight: 40,
  },
  "infinite-view": {
    top: 100,
    right: 80,
    arrowRight: 30,
  },
  "quick-actions": {
    bottom: 160,
    left: 16,
    arrowLeft: 60,
    arrowUp: false,
  },
  "ai-button": {
    bottom: 160,
    right: 16,
    arrowRight: 30,
    arrowUp: false,
  },
};

/**
 * OnboardingOverlay - Full screen overlay with positioned tooltip
 * Dismisses on tap anywhere
 */
const OnboardingOverlay = () => {
  const { isActive, currentStep, advanceStep, currentStepData, totalSteps } = useOnboarding();

  // Animation values
  const overlayOpacity = useRef(new Animated.Value(0)).current;
  const tooltipScale = useRef(new Animated.Value(0.8)).current;
  const tooltipOpacity = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (isActive && currentStepData) {
      // Animate in
      Animated.parallel([
        Animated.timing(overlayOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.spring(tooltipScale, {
          toValue: 1,
          tension: 100,
          friction: 8,
          useNativeDriver: true,
        }),
        Animated.timing(tooltipOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();

      // Start pulse animation
      const pulse = Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.02,
            duration: 1000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 1000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ])
      );
      pulse.start();

      return () => pulse.stop();
    } else {
      // Reset animations
      overlayOpacity.setValue(0);
      tooltipScale.setValue(0.8);
      tooltipOpacity.setValue(0);
    }
  }, [isActive, currentStep]);

  if (!isActive || !currentStepData) {
    return null;
  }

  const position = TOOLTIP_POSITIONS[currentStepData.id] || {};
  const isArrowUp = position.arrowUp !== false;

  // Build tooltip position style
  const tooltipPositionStyle = {};
  if (position.top !== undefined) tooltipPositionStyle.top = position.top;
  if (position.bottom !== undefined) tooltipPositionStyle.bottom = position.bottom;
  if (position.left !== undefined) tooltipPositionStyle.left = position.left;
  if (position.right !== undefined) tooltipPositionStyle.right = position.right;

  // Arrow position
  const arrowStyle = {};
  if (position.arrowLeft !== undefined) arrowStyle.left = position.arrowLeft;
  if (position.arrowRight !== undefined) arrowStyle.right = position.arrowRight;

  const handleDismiss = () => {
    // Animate out then advance
    Animated.parallel([
      Animated.timing(overlayOpacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(tooltipOpacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(tooltipScale, {
        toValue: 0.8,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      advanceStep();
    });
  };

  return (
    <Animated.View style={[styles.overlay, { opacity: overlayOpacity }]}>
      <Pressable style={styles.touchArea} onPress={handleDismiss}>
        <Animated.View
          style={[
            styles.tooltipContainer,
            tooltipPositionStyle,
            {
              opacity: tooltipOpacity,
              transform: [{ scale: tooltipScale }, { scale: pulseAnim }],
            },
          ]}
        >
          {/* Arrow - Top (pointing up) */}
          {isArrowUp && (
            <View style={[styles.arrowUp, arrowStyle]} />
          )}

          {/* Tooltip content */}
          <View style={styles.tooltip}>
            <Text style={styles.tooltipText}>{currentStepData.message}</Text>
            <Text style={styles.stepIndicator}>
              {currentStep + 1} of {totalSteps} • Tap anywhere to continue
            </Text>
          </View>

          {/* Arrow - Bottom (pointing down) */}
          {!isArrowUp && (
            <View style={[styles.arrowDown, arrowStyle]} />
          )}
        </Animated.View>
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    zIndex: 99999,
    elevation: 99999,
  },
  touchArea: {
    flex: 1,
  },
  tooltipContainer: {
    position: "absolute",
    maxWidth: SCREEN_WIDTH - 32,
    zIndex: 100000,
  },
  tooltip: {
    backgroundColor: "rgba(138, 43, 226, 0.95)",
    borderRadius: 16,
    paddingHorizontal: 18,
    paddingVertical: 14,
    shadowColor: "#8A2BE2",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 10,
  },
  tooltipText: {
    fontFamily: Typography.fontFamily.medium,
    fontSize: 15,
    color: "#FFFFFF",
    letterSpacing: 0.2,
    lineHeight: 22,
  },
  stepIndicator: {
    fontFamily: Typography.fontFamily.regular,
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.7)",
    marginTop: 10,
    letterSpacing: 0.1,
  },
  arrowUp: {
    position: "absolute",
    top: -8,
    width: 16,
    height: 16,
    backgroundColor: "rgba(138, 43, 226, 0.95)",
    transform: [{ rotate: "45deg" }],
  },
  arrowDown: {
    position: "absolute",
    bottom: -8,
    width: 16,
    height: 16,
    backgroundColor: "rgba(138, 43, 226, 0.95)",
    transform: [{ rotate: "45deg" }],
  },
});

export default OnboardingOverlay;

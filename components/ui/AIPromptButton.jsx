import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, TouchableOpacity, View } from "react-native";
import { StarImageIcon } from "../icons/IconComponents";

/**
 * AI Prompt Button - Matches Figma Design
 *
 * A beautiful gradient diamond-shaped button with animated sparkles.
 * Design: Diamond shape with purple-blue gradient and floating star decorations.
 */
const AIPromptButton = ({ onPress }) => {
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const sparkleAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Slow continuous rotation for the diamond
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 12000,
        useNativeDriver: true,
      })
    ).start();

    // Gentle pulse animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.08,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Sparkle twinkle animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(sparkleAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(sparkleAnim, {
          toValue: 0,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  const sparkleOpacity = sparkleAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0.4, 1, 0.4],
  });

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.85}
    >
      {/* Outer glow effect */}
      <Animated.View
        style={[
          styles.outerGlow,
          {
            opacity: 0.6,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      />

      {/* Background sparkles - larger, slower */}
      <Animated.View
        style={[
          styles.sparkleContainer,
          {
            opacity: sparkleOpacity,
            transform: [{ rotate: rotate }],
          },
        ]}
      >
        <StarImageIcon size={16} style={styles.bgStar1} />
        <StarImageIcon size={14} style={styles.bgStar2} />
        <StarImageIcon size={12} style={styles.bgStar3} />
        <StarImageIcon size={10} style={styles.bgStar4} />
      </Animated.View>

      {/* Main diamond shape */}
      <Animated.View
        style={[
          styles.diamondContainer,
          {
            transform: [{ rotate: "45deg" }, { scale: scaleAnim }],
          },
        ]}
      >
        <LinearGradient
          colors={["#FF1493", "#8A2BE2", "#4169E1", "#1E90FF"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.diamondGradient}
        />

        {/* Inner glow */}
        <View style={styles.innerGlow} />
      </Animated.View>

      {/* Foreground sparkles - smaller, on top */}
      <Animated.View
        style={[
          styles.sparkleContainer,
          {
            opacity: sparkleOpacity,
            transform: [
              { rotate: rotate },
              { scale: Animated.multiply(scaleAnim, 1.1) },
            ],
          },
        ]}
      >
        <StarImageIcon size={18} style={styles.fgStar1} />
        <StarImageIcon size={16} style={styles.fgStar2} />
        <StarImageIcon size={14} style={styles.fgStar3} />
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 78,
    height: 78,
    justifyContent: "center",
    alignItems: "center",
  },
  outerGlow: {
    position: "absolute",
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#8A2BE2",
    shadowColor: "#8A2BE2",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 25,
    elevation: 20,
  },
  sparkleContainer: {
    position: "absolute",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  diamondContainer: {
    width: 56,
    height: 56,
    overflow: "hidden",
    borderRadius: 12,
    shadowColor: "#4169E1",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 20,
    elevation: 15,
  },
  diamondGradient: {
    width: "100%",
    height: "100%",
  },
  innerGlow: {
    position: "absolute",
    top: "15%",
    left: "15%",
    width: "40%",
    height: "40%",
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 20,
  },
  // Background sparkles
  bgStar1: {
    position: "absolute",
    top: -8,
    left: 8,
    opacity: 0.7,
  },
  bgStar2: {
    position: "absolute",
    top: 8,
    right: -4,
    opacity: 0.7,
  },
  bgStar3: {
    position: "absolute",
    bottom: 8,
    left: -4,
    opacity: 0.7,
  },
  bgStar4: {
    position: "absolute",
    bottom: -4,
    right: 12,
    opacity: 0.7,
  },
  // Foreground sparkles
  fgStar1: {
    position: "absolute",
    top: -12,
    right: 10,
    opacity: 0.9,
  },
  fgStar2: {
    position: "absolute",
    bottom: -10,
    right: -8,
    opacity: 0.9,
  },
  fgStar3: {
    position: "absolute",
    top: 12,
    left: -10,
    opacity: 0.9,
  },
});

export default AIPromptButton;

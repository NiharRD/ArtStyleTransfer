import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, TouchableOpacity, View } from "react-native";
import { StarImageIcon } from "../icons/IconComponents";

const AIPromptButton = ({ onPress }) => {
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Continuous rotation animation
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 8000,
        useNativeDriver: true,
      })
    ).start();

    // Pulse animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.05,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
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

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Animated.View
        style={[
          styles.outerGlow,
          {
            transform: [{ rotate }, { scale: scaleAnim }],
          },
        ]}
      >
        <StarImageIcon size={40} style={styles.star1} />
        <StarImageIcon size={35} style={styles.star2} />
        <StarImageIcon size={30} style={styles.star3} />
      </Animated.View>

      <View style={styles.innerCircle}>
        <Animated.View
          style={[
            styles.centerGlow,
            {
              transform: [{ rotate: rotate }, { scale: scaleAnim }],
            },
          ]}
        />
      </View>
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
    width: "100%",
    height: "100%",
    borderRadius: 39,
    justifyContent: "center",
    alignItems: "center",
  },
  star1: {
    position: "absolute",
    top: -5,
    left: 10,
    opacity: 0.6,
  },
  star2: {
    position: "absolute",
    bottom: 5,
    right: 5,
    opacity: 0.6,
  },
  star3: {
    position: "absolute",
    top: 20,
    right: 10,
    opacity: 0.6,
  },
  innerCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#8A2BE2",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#8A2BE2",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 15,
    elevation: 10,
  },
  centerGlow: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
});

export default AIPromptButton;

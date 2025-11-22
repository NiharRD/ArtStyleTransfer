import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, View } from "react-native";

/**
 * Star Icon Component
 *
 * A decorative gradient star icon matching the Figma design.
 * Features a smooth purple-to-blue gradient with rounded edges.
 *
 * Props:
 * - size: number - Width and height of the star (default: 50)
 * - colors: array - Custom gradient colors (default: purple to blue)
 */
const StarIcon = ({
  size = 50,
  colors = ["#FF1493", "#8A2BE2", "#0080FF"],
}) => {
  // Create star shape using rotated squares
  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <View style={styles.starContainer}>
        {/* First diamond */}
        <View
          style={[styles.diamond, { width: size * 0.7, height: size * 0.7 }]}
        >
          <LinearGradient
            colors={colors}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradient}
          />
        </View>

        {/* Second diamond rotated 45 degrees */}
        <View
          style={[
            styles.diamond,
            styles.diamondRotated,
            { width: size * 0.7, height: size * 0.7 },
          ]}
        >
          <LinearGradient
            colors={colors}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradient}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  starContainer: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  diamond: {
    position: "absolute",
    transform: [{ rotate: "45deg" }],
    borderRadius: 15,
    overflow: "hidden",
  },
  diamondRotated: {
    transform: [{ rotate: "0deg" }],
  },
  gradient: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
});

export default StarIcon;

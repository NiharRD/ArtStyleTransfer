import React from "react";
import { Image, StyleSheet, View } from "react-native";

/**
 * Star Image Icon Component
 *
 * Uses the actual star image from Figma for pixel-perfect accuracy.
 * This is the star graphic with the gradient effect.
 *
 * Props:
 * - size: number - Width and height of the star (default: 50)
 * - style: object - Additional styles
 */
const StarImageIcon = ({ size = 50, style }) => {
  // Star image from Figma
  const imgStar =
    "https://www.figma.com/api/mcp/asset/54f7520a-fedc-4176-a2d1-02d11ef07274";

  return (
    <View style={[styles.container, { width: size, height: size }, style]}>
      <Image
        source={{ uri: imgStar }}
        style={styles.image}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "110%",
    height: "110%",
  },
});

export default StarImageIcon;

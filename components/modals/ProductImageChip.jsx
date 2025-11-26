import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import Svg, { Path } from "react-native-svg";
import { Colors } from "../../constants/Theme";

/**
 * Cross Icon for removing images
 */
const CrossIcon = ({ size = 16, color = "#2F2C2D" }) => (
  <Svg width={size} height={size} viewBox="0 0 16 16" fill="none">
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12.4697 4.53033C12.7626 4.23744 12.7626 3.76256 12.4697 3.46967C12.1768 3.17678 11.7019 3.17678 11.409 3.46967L7.96967 6.90901L4.53033 3.46967C4.23744 3.17678 3.76256 3.17678 3.46967 3.46967C3.17678 3.76256 3.17678 4.23744 3.46967 4.53033L6.90901 7.96967L3.46967 11.409C3.17678 11.7019 3.17678 12.1768 3.46967 12.4697C3.76256 12.7626 4.23744 12.7626 4.53033 12.4697L7.96967 9.03033L11.409 12.4697C11.7019 12.7626 12.1768 12.7626 12.4697 12.4697C12.7626 12.1768 12.7626 11.7019 12.4697 11.409L9.03033 7.96967L12.4697 4.53033Z"
      fill={color}
    />
  </Svg>
);

/**
 * ProductImageChip - 60x60 thumbnail with X button
 *
 * Used to display product images and background images
 * with a remove button in the Generate Mockup modal.
 *
 * @param {string} imageSource - URI or require() for the image
 * @param {function} onRemove - Callback when X is pressed
 * @param {boolean} isPlaceholder - Show gray placeholder if no image
 */
const ProductImageChip = ({ imageSource, onRemove, isPlaceholder = false }) => {
  return (
    <View style={styles.container}>
      {isPlaceholder || !imageSource ? (
        <View style={styles.placeholder} />
      ) : (
        <Image source={imageSource} style={styles.image} resizeMode="cover" />
      )}

      {/* Remove button */}
      <TouchableOpacity
        style={styles.removeButton}
        onPress={onRemove}
        activeOpacity={0.7}
      >
        <CrossIcon size={16} color="#2F2C2D" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 60,
    height: 60,
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: Colors.tileGray || "#9A9A9A",
    position: "relative",
  },
  placeholder: {
    width: "100%",
    height: "100%",
    backgroundColor: Colors.tileGray || "#9A9A9A",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  removeButton: {
    position: "absolute",
    top: 4,
    right: 3,
    padding: 0,
  },
});

export default ProductImageChip;


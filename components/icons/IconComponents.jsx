import React from "react";
import { StyleSheet, View } from "react-native";

// Icon components for the app

// Export Star icons from separate files
export { default as StarIcon } from "./StarIcon";
export { default as StarImageIcon } from "./StarImageIcon";
export const AddIcon = ({ size = 28, color = "#E6E6E6" }) => (
  <View style={[styles.iconContainer, { width: size, height: size }]}>
    <View style={[styles.addIcon, { borderColor: color }]} />
  </View>
);

export const BrushIcon = ({ size = 28, color = "#E6E6E6" }) => (
  <View style={[styles.iconContainer, { width: size, height: size }]}>
    <View style={[styles.brushIcon, { backgroundColor: color }]} />
  </View>
);

export const TShirtIcon = ({ size = 28, color = "#E6E6E6" }) => (
  <View style={[styles.iconContainer, { width: size, height: size }]}>
    <View style={[styles.tshirtIcon, { borderColor: color }]} />
  </View>
);

export const CameraIcon = ({ size = 28, color = "#E6E6E6" }) => (
  <View style={[styles.iconContainer, { width: size, height: size }]}>
    <View
      style={[
        styles.cameraIcon,
        { borderColor: color, backgroundColor: color },
      ]}
    />
  </View>
);

export const MasterIcon = ({ size = 16, color = "#E6E6E6" }) => (
  <View style={[styles.iconContainer, { width: size, height: size }]}>
    <View style={[styles.masterIcon, { backgroundColor: color }]} />
  </View>
);

export const BranchIcon = ({ size = 16, color = "#E6E6E6" }) => (
  <View style={[styles.iconContainer, { width: size, height: size }]}>
    <View style={[styles.branchIcon, { borderColor: color }]} />
  </View>
);

export const DropdownIcon = ({ size = 15, color = "#E6E6E6" }) => (
  <View style={[styles.iconContainer, { width: size, height: size }]}>
    <View style={[styles.dropdownIcon, { borderTopColor: color }]} />
  </View>
);

export const DotsIcon = ({ size = 20, color = "#E6E6E6" }) => (
  <View style={[styles.iconContainer, { width: size, height: size }]}>
    <View style={styles.dotsContainer}>
      <View style={[styles.dot, { backgroundColor: color }]} />
      <View style={[styles.dot, { backgroundColor: color }]} />
      <View style={[styles.dot, { backgroundColor: color }]} />
    </View>
  </View>
);

export const BackIcon = ({ size = 20, color = "#BFBFBF" }) => (
  <View style={[styles.iconContainer, { width: size, height: size }]}>
    <View
      style={[
        styles.backIcon,
        { borderRightColor: color, borderTopColor: color },
      ]}
    />
  </View>
);

const styles = StyleSheet.create({
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  addIcon: {
    width: "70%",
    height: "70%",
    borderWidth: 2,
    borderRadius: 2,
  },
  brushIcon: {
    width: "60%",
    height: "70%",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderBottomLeftRadius: 2,
  },
  tshirtIcon: {
    width: "80%",
    height: "70%",
    borderWidth: 2,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
  },
  cameraIcon: {
    width: "70%",
    height: "60%",
    borderWidth: 2,
    borderRadius: 4,
  },
  masterIcon: {
    width: "50%",
    height: "50%",
    borderRadius: 8,
  },
  branchIcon: {
    width: "60%",
    height: "80%",
    borderWidth: 2,
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
  },
  dropdownIcon: {
    width: 0,
    height: 0,
    borderLeftWidth: 5,
    borderRightWidth: 5,
    borderTopWidth: 8,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
  },
  dotsContainer: {
    flexDirection: "row",
    gap: 3,
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
  },
  backIcon: {
    width: 10,
    height: 10,
    borderRightWidth: 2,
    borderTopWidth: 2,
    transform: [{ rotate: "-135deg" }],
  },
});

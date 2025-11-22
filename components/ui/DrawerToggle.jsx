import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

const DrawerToggle = ({ onPress }) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.handle} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingVertical: 8,
  },
  handle: {
    width: 36,
    height: 5,
    borderRadius: 100,
    backgroundColor: "#333333",
  },
});

export default DrawerToggle;

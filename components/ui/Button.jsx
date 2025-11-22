import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const Button = ({ icon, label, iconOnly = false, onPress }) => {
  return (
    <TouchableOpacity
      style={[styles.container, iconOnly && styles.iconOnlyContainer]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {iconOnly ? (
        icon
      ) : (
        <View style={styles.content}>
          {icon}
          {label && <Text style={styles.label}>{label}</Text>}
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 70,
    backgroundColor: "rgba(118, 118, 128, 0.12)",
    borderWidth: 0.7,
    borderColor: "rgba(120, 120, 128, 0.16)",
  },
  iconOnlyContainer: {
    width: 40,
    height: 40,
    borderRadius: 95,
    justifyContent: "center",
    alignItems: "center",
    padding: 0,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  label: {
    fontFamily: "System",
    fontSize: 16,
    color: "#E6E6E6",
    letterSpacing: -0.16,
  },
});

export default Button;

import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const QuickActionButton = ({
  icon,
  label,
  isActive = false,
  isDashed = false,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        isActive && styles.activeContainer,
        isDashed && styles.dashedContainer,
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.content}>
        <View style={styles.iconContainer}>{icon}</View>
        <Text style={styles.label}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 89,
    height: 87,
    borderRadius: 22,
    backgroundColor: "rgba(0, 0, 0, 0)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  activeContainer: {
    backgroundColor: "rgba(247, 247, 247, 0.08)",
  },
  dashedContainer: {
    borderWidth: 1,
    borderColor: "rgba(186, 182, 178, 0.7)",
    borderStyle: "dashed",
    backgroundColor: "#191916",
  },
  content: {
    alignItems: "center",
    gap: 5,
  },
  iconContainer: {
    marginBottom: 2,
  },
  label: {
    fontFamily: "System",
    fontSize: 13,
    color: "#CCCCCC",
    textAlign: "center",
    lineHeight: 17,
  },
});

export default QuickActionButton;

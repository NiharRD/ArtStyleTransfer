import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { DropdownIcon, MasterIcon } from "../icons/IconComponents";

const Switcher = ({ label = "Master", onPress }) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.content}>
        <View style={styles.leftSection}>
          <MasterIcon size={16} color="#E6E6E6" />
          <Text style={styles.label}>{label}</Text>
        </View>
        <DropdownIcon size={15} color="#E6E6E6" />
      </View>
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
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 11,
  },
  leftSection: {
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

export default Switcher;

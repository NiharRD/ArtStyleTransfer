import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SvgXml } from "react-native-svg";

/**
 * SuggestionChip - Glass effect pill-shaped suggestion button
 *
 * Features:
 * - Glass morphism background
 * - Rounded pill shape
 * - Icon on left + text label
 * - onPress handler for AI actions
 */
const SuggestionChip = ({ label, icon, onPress }) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.innerContainer}>
        {icon && (
          <View style={styles.iconContainer}>
            <SvgXml xml={icon} width={14} height={14} />
          </View>
        )}
        <Text style={styles.label}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 34,
    backgroundColor: "rgba(82, 82, 82, 0.2)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
    opacity: 0.9,
  },
  innerContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 8,
    paddingVertical: 6,
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    borderRadius: 21,
    height: 29,
  },
  iconContainer: {
    width: 14,
    height: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    fontFamily: "System",
    fontSize: 16,
    color: "#E6E6E6",
    letterSpacing: -0.23,
    lineHeight: 17,
  },
});

export default SuggestionChip;


import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Colors, Spacing, Typography, BorderRadius } from "../../constants/Theme";

/**
 * VoiceButton - "Talk to Kimi instead" voice input button
 * 
 * Placeholder for future voice AI integration
 */
const VoiceButton = ({ onPress }) => {
  const handleVoiceInput = () => {
    // TODO: Voice AI integration
    if (onPress) onPress();
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={handleVoiceInput}
      activeOpacity={0.7}
    >
      <View style={styles.iconContainer}>
        <Text style={styles.icon}>🎤</Text>
      </View>
      <Text style={styles.label}>Talk to Kimi instead</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "rgba(47, 44, 45, 0.9)",
    borderWidth: 0.681,
    borderColor: Colors.glassBorder,
    borderRadius: BorderRadius.pill,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    alignSelf: "flex-start",
  },
  iconContainer: {
    width: 16,
    height: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    fontSize: 14,
  },
  label: {
    fontFamily: Typography.fontFamily.regular,
    fontSize: Typography.fontSize.base,
    color: Colors.textAccent,
    letterSpacing: Typography.letterSpacing.normal,
  },
});

export default VoiceButton;


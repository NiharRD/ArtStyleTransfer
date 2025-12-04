import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { BorderRadius, Colors, Shadows, Typography } from "../../constants/Theme";
import { BranchIcon } from "../icons/IconComponents";
import Button from "./Button";
import Switcher from "./Switcher";

const ControlBar = ({ onModeChange }) => {
  const [activeMode, setActiveMode] = useState("AI");

  const handleModePress = (mode) => {
    setActiveMode(mode);
    onModeChange?.(mode);
  };

  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
        <Switcher label="Main" />
        <Button
          icon={<BranchIcon size={16} color={Colors.textAccent} />}
          label="Branch"
        />
      </View>

      <View style={styles.rightSection}>
        <View style={styles.modeToggle}>
          <TouchableOpacity
            style={[
              styles.modeButton,
              activeMode === "AI" && styles.activeModeButton,
            ]}
            onPress={() => handleModePress("AI")}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.modeText,
                activeMode === "AI" && styles.activeModeText,
              ]}
            >
              AI
            </Text>
          </TouchableOpacity>
          <Text style={styles.expertText}>Expert</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    height: 32,
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  rightSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  modeToggle: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingLeft: 3,
    paddingRight: 10,
    paddingVertical: 3,
    borderRadius: BorderRadius.pill,
    backgroundColor: Colors.glassActive,
    borderWidth: 0.681,
    borderColor: Colors.glassBorder,
  },
  modeButton: {
    paddingHorizontal: 14,
    paddingTop: 2.5,
    paddingBottom: 8,
    borderRadius: BorderRadius.md,
    justifyContent: "center",
    alignItems: "center",
  },
  activeModeButton: {
    backgroundColor: Colors.glassSurface,
    ...Shadows.small,
  },
  modeText: {
    fontFamily: Typography.fontFamily.medium,
    fontSize: 14,
    color: Colors.textPrimary,
    letterSpacing: Typography.letterSpacing.wide,
    textAlign: "center",
    textAlignVertical: "center",
    includeFontPadding: false,
  },
  activeModeText: {
    color: Colors.textPrimary,
  },
  expertText: {
    fontFamily: Typography.fontFamily.medium,
    fontSize: 14,
    color: Colors.textPrimary,
    letterSpacing: Typography.letterSpacing.wide,
    textAlign: "center",
    textAlignVertical: "center",
    includeFontPadding: false,
    marginTop: -2,
  },
});

export default ControlBar;

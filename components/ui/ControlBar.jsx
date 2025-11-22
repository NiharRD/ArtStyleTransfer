import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { BranchIcon } from "../icons/IconComponents";
import Button from "./Button";
import Switcher from "./Switcher";

const ControlBar = () => {
  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
        <Switcher label="Master" />
        <Button
          icon={<BranchIcon size={16} color="#E6E6E6" />}
          label="Branch"
        />
      </View>

      <View style={styles.rightSection}>
        <View style={styles.menuButton}>
          <View style={styles.activeTab}>
            <Text style={styles.activeTabText}>AI</Text>
          </View>
          <Text style={styles.inactiveTabText}>Expert</Text>
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
    paddingVertical: 8,
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
  menuButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingLeft: 4,
    paddingRight: 9,
    paddingVertical: 3,
    borderRadius: 70,
    backgroundColor: "rgba(118, 118, 128, 0.24)",
    borderWidth: 0.7,
    borderColor: "rgba(120, 120, 128, 0.16)",
  },
  activeTab: {
    paddingHorizontal: 13,
    paddingVertical: 6,
    borderRadius: 14,
    backgroundColor: "#6C6C71",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1.4 },
    shadowOpacity: 0.06,
    shadowRadius: 14,
    elevation: 2,
  },
  activeTabText: {
    fontFamily: "System",
    fontSize: 16,
    color: "#FFFFFF",
    letterSpacing: -0.06,
    textAlign: "center",
  },
  inactiveTabText: {
    fontFamily: "System",
    fontSize: 16,
    color: "#FFFFFF",
    letterSpacing: -0.06,
    textAlign: "center",
  },
});

export default ControlBar;

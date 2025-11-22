import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { BackIcon, DotsIcon } from "../icons/IconComponents";

const Header = ({
  title = "Untitled Project 1",
  subtitle = "Synced just now",
  onBackPress,
  onMenuPress,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={onBackPress}
          activeOpacity={0.7}
        >
          <BackIcon size={20} color="#BFBFBF" />
        </TouchableOpacity>

        <View style={styles.titleContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.menuButton}
        onPress={onMenuPress}
        activeOpacity={0.7}
      >
        <DotsIcon size={20} color="#BFBFBF" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 44,
    paddingBottom: 12,
    backgroundColor: "transparent",
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  backButton: {
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  titleContainer: {
    paddingHorizontal: 2,
    paddingVertical: 3,
  },
  title: {
    fontFamily: "System",
    fontSize: 16,
    color: "#FFFFFF",
    letterSpacing: -0.23,
    lineHeight: 18,
  },
  subtitle: {
    fontFamily: "System",
    fontSize: 12,
    color: "#999999",
    lineHeight: 14,
  },
  menuButton: {
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Header;

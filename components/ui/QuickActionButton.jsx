import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { BorderRadius, Colors, Layout, Typography } from "../../constants/Theme";

const QuickActionButton = ({
  icon,
  label,
  isActive = false,
  isDashed = false,
  smallLabel = false,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        isDashed && styles.dashedContainer,
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {/* Background gradient for active state */}
      {isActive && !isDashed && (
        <View style={styles.gradientBackground}>
          <View style={styles.gradientOverlay} />
          <View style={styles.gradientBase} />
        </View>
      )}

      {/* Glass Effect overlay */}
      {!isDashed && <View style={styles.glassEffect} />}

      <View style={styles.content}>
        <View style={styles.iconContainer}>{icon}</View>
        <Text style={[styles.label, isDashed && styles.dashedLabel, smallLabel && styles.smallLabel]}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Layout.quickActionWidth,
    height: Layout.quickActionHeight,
    borderRadius: BorderRadius.lg,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    overflow: "hidden",
    position: "relative",
  },
  dashedContainer: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderStyle: "dashed",
    backgroundColor: Colors.surfaceDark,
  },
  gradientBackground: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: BorderRadius.lg,
  },
  gradientBase: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(247, 247, 247, 0.08)",
    borderRadius: BorderRadius.lg,
  },
  gradientOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Colors.indicatorDark,
    opacity: 0.3,
    borderRadius: BorderRadius.lg,
  },
  glassEffect: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0)",
    borderRadius: BorderRadius.lg,
  },
  content: {
    alignItems: "center",
    gap: 5,
    zIndex: 1,
  },
  iconContainer: {
    marginBottom: 2,
  },
  label: {
    fontFamily: Typography.fontFamily.medium,
    fontSize: Typography.fontSize.sm,
    color: Colors.textSecondary,
    textAlign: "center",
    lineHeight: 17,
  },
  dashedLabel: {
    color: Colors.textMuted,
  },
  smallLabel: {
    fontSize: 10,
    lineHeight: 13,
  },
});

export default QuickActionButton;

import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SvgXml } from "react-native-svg";
import { BorderRadius, Colors, Layout, Opacity, Shadows, Typography } from "../../constants/Theme";

/**
 * SuggestionChip - Glass effect pill-shaped suggestion button
 * Based on Figma design with glass morphism styling
 *
 * Features:
 * - Glass morphism background with subtle overlay
 * - Rounded pill shape (borderRadius: 34)
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
      {/* Glass effect layers */}
      <View style={styles.glassBackground}>
        <View style={styles.glassDifference} />
        <View style={styles.glassOverlay} />
      </View>

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
    borderRadius: BorderRadius.xxl,
    overflow: "hidden",
    opacity: Opacity.suggestionChip,
    ...Shadows.suggestion,
  },
  glassBackground: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: BorderRadius.xxl,
  },
  glassDifference: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: BorderRadius.xxl,
  },
  glassOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Colors.glassOverlay,
    borderRadius: BorderRadius.xxl,
  },
  innerContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: Layout.suggestionPaddingH,
    paddingVertical: Layout.suggestionPaddingV,
    backgroundColor: Colors.glassEffect,
    borderRadius: BorderRadius.lg,
  },
  iconContainer: {
    width: 14,
    height: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    fontFamily: Typography.fontFamily.regular,
    fontSize: Typography.fontSize.base,
    color: Colors.textAccent,
    letterSpacing: Typography.letterSpacing.tight,
    lineHeight: 17,
  },
});

export default SuggestionChip;

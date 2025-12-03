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
    backgroundColor: "rgba(255, 255, 255, 0.15)", // Lighter glass effect
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3, // Enhanced shadow
    shadowRadius: 6,
    elevation: 6,
  },
  innerContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 12, // Increased padding
    paddingVertical: 8,
    // Removed inner dark background for cleaner look
    borderRadius: 21,
  },
  iconContainer: {
    width: 14,
    height: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    fontFamily: "System",
    fontSize: 15, // Slightly adjusted size
    fontWeight: "500", // Added weight for contrast
    color: "#FFFFFF", // Pure white for better contrast
    letterSpacing: -0.23,
    lineHeight: 18,
  },
});

export default SuggestionChip;


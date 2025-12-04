import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Colors, Spacing, Typography } from "../../constants/Theme";

/**
 * SelectedStyleChip - 60x60px style tile with X button to deselect
 *
 * Features:
 * - Shows selected style image
 * - X button in top-right corner
 * - Click X to deselect and return to text-only state
 */
const SelectedStyleChip = ({ style, onDeselect }) => {
  if (!style) return null;

  return (
    <View style={styles.container}>
      <Image source={style.source} style={styles.image} resizeMode="cover" />
      <TouchableOpacity
        style={styles.removeButton}
        onPress={onDeselect}
        activeOpacity={0.7}
      >
        <Text style={styles.removeIcon}>✕</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 60,
    height: 60,
    position: "relative",
  },
  image: {
    width: 60,
    height: 60,
    backgroundColor: Colors.tileGray,
    borderRadius: Spacing.md,
  },
  removeButton: {
    position: "absolute",
    top: 3,
    right: 3,
    width: 16,
    height: 16,
    backgroundColor: "rgba(47, 44, 45, 1)",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  removeIcon: {
    fontFamily: Typography.fontFamily.medium,
    fontSize: 12,
    color: Colors.textAccent,
    lineHeight: 12,
  },
});

export default SelectedStyleChip;

import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Colors, Spacing, Typography } from "../../constants/Theme";

/**
 * SelectedStyleChip - Shows selected artwork with full details
 *
 * Features:
 * - Thumbnail image with X button to deselect
 * - Artwork title and artist name
 * - Style description
 * - Copyright info
 */
const SelectedStyleChip = ({ style, onDeselect }) => {
  if (!style) return null;

  return (
    <View style={styles.container}>
      {/* Thumbnail with remove button */}
      <View style={styles.imageContainer}>
        <Image source={style.source} style={styles.image} resizeMode="cover" />
        <TouchableOpacity
          style={styles.removeButton}
          onPress={onDeselect}
          activeOpacity={0.7}
        >
          <Text style={styles.removeIcon}>✕</Text>
        </TouchableOpacity>
      </View>

      {/* Artwork details */}
      <View style={styles.detailsContainer}>
        {/* Title and Artist */}
        <Text style={styles.titleText} numberOfLines={1}>
          {style.name}, <Text style={styles.artistText}>{style.artist}</Text>
        </Text>

        {/* Style and Description */}
        <Text style={styles.styleText} numberOfLines={1}>
          {style.style} • {style.description}
        </Text>

        {/* Copyright */}
        <Text style={styles.copyrightText} numberOfLines={1}>
          {style.copyright}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: Spacing.md,
    paddingVertical: Spacing.sm,
  },
  imageContainer: {
    width: 56,
    height: 56,
    position: "relative",
  },
  image: {
    width: 56,
    height: 56,
    backgroundColor: Colors.tileGray,
    borderRadius: Spacing.sm,
  },
  removeButton: {
    position: "absolute",
    top: -4,
    left: -4,
    width: 18,
    height: 18,
    backgroundColor: "#5856D6",
    borderRadius: 9,
    justifyContent: "center",
    alignItems: "center",
  },
  removeIcon: {
    fontFamily: Typography.fontFamily.medium,
    fontSize: 10,
    color: "#FFFFFF",
    lineHeight: 12,
  },
  detailsContainer: {
    flex: 1,
    gap: 2,
    paddingTop: 2,
  },
  titleText: {
    fontFamily: Typography.fontFamily.semiBold,
    fontSize: 14,
    color: Colors.textPrimary,
    lineHeight: 18,
  },
  artistText: {
    fontFamily: Typography.fontFamily.regular,
    color: Colors.textPrimary,
  },
  styleText: {
    fontFamily: Typography.fontFamily.regular,
    fontSize: 12,
    color: Colors.textSecondary,
    lineHeight: 16,
  },
  copyrightText: {
    fontFamily: Typography.fontFamily.regular,
    fontSize: 11,
    color: Colors.textMuted,
    lineHeight: 14,
  },
});

export default SelectedStyleChip;

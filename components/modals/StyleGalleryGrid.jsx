import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { Colors, Spacing } from "../../constants/Theme";

/**
 * StyleGalleryGrid - 4x2 grid of style reference images
 * 
 * Features:
 * - Loads images from assets/images/referenceStyles/
 * - Click to select a style
 * - Visual feedback on selection
 */
const StyleGalleryGrid = ({ onStyleSelect, selectedStyleId }) => {
  // Style reference images from assets
  // Style reference images from assets
  const styleImages = [
    { id: 1, name: "Impression Sunrise", source: require("../../assets/images/artStylereference/Impression,_Sunrise.jpg") },
    { id: 2, name: "The Scream", source: require("../../assets/images/artStylereference/The_Scream.jpg") },
    { id: 3, name: "Cafe Terrace", source: require("../../assets/images/artStylereference/cafe_terrace_at_night.jpg") },
  ];

  const handleStylePress = (style) => {
    if (onStyleSelect) {
      onStyleSelect(style);
    }
  };

  return (
    <View style={styles.container}>
      {/* Row 1 */}
      <View style={styles.row}>
        {styleImages.slice(0, 4).map((style) => (
          <TouchableOpacity
            key={style.id}
            style={[
              styles.tile,
              selectedStyleId === style.id && styles.tileSelected,
            ]}
            onPress={() => handleStylePress(style)}
            activeOpacity={0.7}
          >
            <Image source={style.source} style={styles.tileImage} resizeMode="cover" />
          </TouchableOpacity>
        ))}
      </View>

      {/* Row 2 */}
      <View style={styles.row}>
        {styleImages.slice(4, 8).map((style) => (
          <TouchableOpacity
            key={style.id}
            style={[
              styles.tile,
              selectedStyleId === style.id && styles.tileSelected,
            ]}
            onPress={() => handleStylePress(style)}
            activeOpacity={0.7}
          >
            <Image source={style.source} style={styles.tileImage} resizeMode="cover" />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: Spacing.md,
  },
  row: {
    flexDirection: "row",
    gap: Spacing.md,
  },
  tile: {
    flex: 1,
    aspectRatio: 1,
    backgroundColor: Colors.tileGray,
    borderRadius: Spacing.md,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "transparent",
  },
  tileSelected: {
    borderColor: Colors.aiPrimary,
  },
  tileImage: {
    width: "100%",
    height: "100%",
  },
});

export default StyleGalleryGrid;


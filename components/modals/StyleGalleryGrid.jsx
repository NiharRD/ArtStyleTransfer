import React from "react";
import { StyleSheet, TouchableOpacity, View, Image } from "react-native";
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
  const styleImages = [
    { id: 1, name: "First Style", source: require("../../assets/images/referenceStyles/First.png") },
    { id: 2, name: "Second Style", source: require("../../assets/images/referenceStyles/second.png") },
    { id: 3, name: "Third Style", source: require("../../assets/images/referenceStyles/third.png") },
    { id: 4, name: "Fourth Style", source: require("../../assets/images/referenceStyles/forth.png") },
    { id: 5, name: "Fifth Style", source: require("../../assets/images/referenceStyles/First.png") },
    { id: 6, name: "Sixth Style", source: require("../../assets/images/referenceStyles/second.png") },
    { id: 7, name: "Seventh Style", source: require("../../assets/images/referenceStyles/third.png") },
    { id: 8, name: "Eighth Style", source: require("../../assets/images/referenceStyles/forth.png") },
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


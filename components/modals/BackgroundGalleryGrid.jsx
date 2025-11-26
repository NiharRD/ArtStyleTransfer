import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Colors, Typography } from "../../constants/Theme";

/**
 * Background images from assets/images/productMockUps/
 */
const BACKGROUND_IMAGES = {
  professional: [
    { id: "prof-1", source: require("../../assets/images/productMockups/first.jpg") },
    { id: "prof-2", source: require("../../assets/images/productMockups/second.jpg") },
    { id: "prof-3", source: require("../../assets/images/productMockups/firth.jpg") },
    { id: "prof-4", source: require("../../assets/images/productMockups/foroth.png") },
  ],
  quirky: [
    { id: "quirky-1", source: require("../../assets/images/productMockups/sixth.jpg") },
    { id: "quirky-2", source: require("../../assets/images/productMockups/first.jpg") },
    { id: "quirky-3", source: require("../../assets/images/productMockups/second.jpg") },
    { id: "quirky-4", source: require("../../assets/images/productMockups/firth.jpg") },
  ],
};

/**
 * BackgroundGalleryGrid - Grid of background images for selection
 *
 * Displays categorized background images (Professional, Quirky)
 * with 4 images per row and a gradient fade at bottom.
 *
 * @param {function} onSelect - Callback when a background is selected
 * @param {string} selectedId - ID of currently selected background
 */
const BackgroundGalleryGrid = ({ onSelect, selectedId }) => {
  const renderImageRow = (images, startIndex = 0) => (
    <View style={styles.imageRow}>
      {images.slice(startIndex, startIndex + 4).map((image) => (
        <TouchableOpacity
          key={image.id}
          style={[
            styles.imageContainer,
            selectedId === image.id && styles.imageContainerSelected,
          ]}
          onPress={() => onSelect(image)}
          activeOpacity={0.7}
        >
          <Image source={image.source} style={styles.image} resizeMode="cover" />
        </TouchableOpacity>
      ))}
      {/* Fill empty spaces if less than 4 images */}
      {Array.from({ length: Math.max(0, 4 - images.slice(startIndex, startIndex + 4).length) }).map(
        (_, idx) => (
          <View key={`empty-${idx}`} style={styles.imageContainer} />
        )
      )}
    </View>
  );

  const renderCategory = (title, images) => (
    <View style={styles.category}>
      <Text style={styles.categoryTitle}>{title}</Text>
      <View style={styles.categoryImages}>
        {renderImageRow(images, 0)}
        {images.length > 4 && renderImageRow(images, 4)}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {renderCategory("Professional", BACKGROUND_IMAGES.professional)}
        {renderCategory("Quirky", BACKGROUND_IMAGES.quirky)}
      </ScrollView>

      {/* Gradient fade at bottom */}
      <LinearGradient
        colors={["rgba(39, 37, 38, 0)", "rgba(26, 25, 26, 0.73)", "#272526"]}
        locations={[0, 0.67, 0.92]}
        style={styles.gradient}
        pointerEvents="none"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 200,
    position: "relative",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 4,
    paddingBottom: 40,
  },
  category: {
    marginBottom: 8,
  },
  categoryTitle: {
    fontFamily: Typography.fontFamily.bold || "System",
    fontSize: Typography.fontSize.sm,
    color: Colors.textPrimary,
    marginBottom: 4,
    fontWeight: "700",
  },
  categoryImages: {
    gap: 8,
  },
  imageRow: {
    flexDirection: "row",
    gap: 8,
  },
  imageContainer: {
    flex: 1,
    height: 78,
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: Colors.tileGray || "#9A9A9A",
  },
  imageContainerSelected: {
    borderWidth: 2,
    borderColor: Colors.aiPrimary,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  gradient: {
    position: "absolute",
    bottom: 0,
    left: 4,
    right: 4,
    height: 100,
  },
});

export default BackgroundGalleryGrid;


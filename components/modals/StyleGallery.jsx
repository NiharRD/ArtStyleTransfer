import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import {
  Colors,
  Spacing,
  Typography,
  BorderRadius,
} from "../../constants/Theme";
import { SearchIcon, MicIcon } from "../icons/ModalIcons";

/**
 * StyleGallery - Grid of art style tiles with search
 * 
 * Features:
 * - 4x2 grid of style tiles (8 total)
 * - Search bar with voice input
 * - Gradient fade at bottom
 */
const StyleGallery = ({ onStyleSelect, selectedStyles = [] }) => {
  const [searchText, setSearchText] = useState("");

  // Placeholder styles - will be populated with real data later
  const styles_data = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    name: `Style ${i + 1}`,
  }));

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Style Grid */}
        <View style={styles.grid}>
          {styles_data.map((style) => (
            <TouchableOpacity
              key={style.id}
              style={[
                styles.tile,
                selectedStyles.includes(style.id) && styles.tileSelected,
              ]}
              onPress={() => onStyleSelect && onStyleSelect(style.id)}
              activeOpacity={0.7}
            >
              {/* Placeholder tile content */}
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Gradient Fade */}
      <View style={styles.gradientFade} />

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <SearchIcon size={17} color={Colors.textAccent} />
          <TextInput
            style={styles.searchInput}
            value={searchText}
            onChangeText={setSearchText}
            placeholder="Search"
            placeholderTextColor={Colors.textAccent}
          />
          <MicIcon size={17} color={Colors.textAccent} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 238,
    position: "relative",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 4,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Spacing.md,
  },
  tile: {
    width: "23.5%",
    aspectRatio: 1,
    backgroundColor: Colors.tileGray,
    borderRadius: Spacing.md,
  },
  tileSelected: {
    borderWidth: 2,
    borderColor: Colors.aiPrimary,
  },
  gradientFade: {
    position: "absolute",
    bottom: 42,
    left: 0,
    right: 0,
    height: 102,
    backgroundColor: "transparent",
    // Note: In production, use react-native-linear-gradient
    // For now, using a solid color approximation
    opacity: 0.8,
  },
  searchContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 42,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.promptBackground,
    borderWidth: 1,
    borderColor: Colors.promptBorder,
    borderRadius: 100,
    paddingHorizontal: 11,
    paddingVertical: 10,
    gap: Spacing.md,
  },
  searchInput: {
    flex: 1,
    fontFamily: Typography.fontFamily.regular,
    fontSize: 17,
    color: Colors.textAccent,
    letterSpacing: -0.08,
  },
});

export default StyleGallery;


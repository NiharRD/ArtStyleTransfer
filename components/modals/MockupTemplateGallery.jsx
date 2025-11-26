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

/**
 * MockupTemplateGallery - Grid of mockup template tiles with search
 * 
 * Features:
 * - 4x2 grid of mockup tiles (8 total)
 * - Category label (e.g., "Professional")
 * - Search bar with voice input
 */
const MockupTemplateGallery = ({ onTemplateSelect, selectedTemplates = [] }) => {
  const [searchText, setSearchText] = useState("");

  // Placeholder templates - will be populated with real data later
  const templates_data = Array.from({ length: 8 }, (_, i) => ({
    id: i + 1,
    name: `Template ${i + 1}`,
    category: "Professional",
  }));

  return (
    <View style={styles.container}>
      {/* Category Label */}
      <Text style={styles.categoryLabel}>Professional</Text>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Template Grid */}
        <View style={styles.grid}>
          {templates_data.map((template) => (
            <TouchableOpacity
              key={template.id}
              style={[
                styles.tile,
                selectedTemplates.includes(template.id) && styles.tileSelected,
              ]}
              onPress={() => onTemplateSelect && onTemplateSelect(template.id)}
              activeOpacity={0.7}
            >
              {/* Placeholder tile content */}
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            value={searchText}
            onChangeText={setSearchText}
            placeholder="Search"
            placeholderTextColor={Colors.textAccent}
          />
          <Text style={styles.voiceIcon}>🎤</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 280,
    position: "relative",
  },
  categoryLabel: {
    fontFamily: Typography.fontFamily.regular,
    fontSize: Typography.fontSize.base,
    color: Colors.textPrimary,
    marginBottom: Spacing.md,
    paddingHorizontal: 4,
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
  searchIcon: {
    fontSize: 17,
  },
  searchInput: {
    flex: 1,
    fontFamily: Typography.fontFamily.regular,
    fontSize: 17,
    color: Colors.textAccent,
    letterSpacing: -0.08,
  },
  voiceIcon: {
    fontSize: 17,
  },
});

export default MockupTemplateGallery;


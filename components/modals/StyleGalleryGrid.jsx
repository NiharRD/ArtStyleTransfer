import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Svg, { Path } from "react-native-svg";
import { Colors, Spacing, Typography } from "../../constants/Theme";

// Chevron arrow icon
const ChevronRightIcon = ({ size = 16, color = "#E6E6E6" }) => (
  <Svg width={size} height={size} viewBox="0 0 16 16" fill="none">
    <Path
      d="M6 3L11 8L6 13"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

/**
 * StyleGalleryGrid - Gallery of art styles organized by category
 *
 * Features:
 * - Two categories: Trending and Modernism
 * - Horizontal scrollable rows per category
 * - Full artwork metadata (title, artist, style, copyright)
 * - Click to select a style
 */
const StyleGalleryGrid = ({ onStyleSelect, selectedStyleId }) => {
  // Trending category - Popular and classic artworks
  const trendingStyles = [
    {
      id: 1,
      name: "Mona Lisa",
      artist: "Leonardo da Vinci",
      style: "High Renaissance",
      description: "Serene, enigmatic, iconic",
      copyright: "Public domain",
      source: require("../../assets/images/artwork/image_3.png"),
      category: "Trending",
    },
    {
      id: 2,
      name: "The Starry Night",
      artist: "Vincent van Gogh",
      style: "Post-Impressionism",
      description: "Swirling, emotional, nocturnal",
      copyright: "Public domain",
      source: require("../../assets/images/artwork/image_7.png"),
      category: "Trending",
    },
    {
      id: 3,
      name: "Cafe Terrace at Night",
      artist: "Vincent van Gogh",
      style: "Post-Impressionism",
      description: "Vibrant, warm, inviting",
      copyright: "Public domain",
      source: require("../../assets/images/artwork/image_7.png"),
      category: "Trending",
    },
    {
      id: 4,
      name: "Impression, Sunrise",
      artist: "Claude Monet",
      style: "Impressionism",
      description: "Atmospheric, hazy, luminous",
      copyright: "Public domain",
      source: require("../../assets/images/artwork/image_5.png"),
      category: "Trending",
    },
    {
      id: 5,
      name: "The Persistence of Memory",
      artist: "Salvador Dalí",
      style: "Surrealism",
      description: "Dreamlike, uncanny, fluid",
      copyright: "Public domain",
      source: require("../../assets/images/artwork/image_6.png"),
      category: "Trending",
    },
  ];

  // Modernism category - Modern and contemporary art
  const modernismStyles = [
    {
      id: 6,
      name: "Portrait of Two Figures",
      artist: "Jean Dubuffet",
      style: "Art Brut / Outsider Art",
      description: "Playful, raw, childlike",
      copyright: "© Dubuffet estate",
      source: require("../../assets/images/artwork/image_2.png"),
      category: "Modernism",
    },
    {
      id: 7,
      name: "Impression Sunrise",
      artist: "Monet",
      style: "Impressionism",
      description: "Atmospheric, misty, luminous",
      copyright: "© Public Domain",
      source: require("../../assets/images/artwork/image_10.jpg"),
      category: "Impressionism",
    },
    {
      id: 8,
      name: "Blues Musician Collage",
      artist: "Romare Bearden",
      style: "Collage / Modern Art",
      description: "Rhythmic, fragmented, expressive",
      copyright: "© Bearden estate",
      source: require("../../assets/images/artwork/image_8.png"),
      category: "Modernism",
    },
    {
      id: 9,
      name: "Wheel of Life Thangka",
      artist: "Unknown Tibetan artist",
      style: "Tibetan Buddhist Art",
      description: "Symbolic, didactic, spiritual",
      copyright: "Public domain",
      source: require("../../assets/images/artwork/image_9.png"),
      category: "Modernism",
    },
  ];

  const handleStylePress = (style) => {
    if (onStyleSelect) {
      onStyleSelect(style);
    }
  };

  const renderCategoryRow = (title, styles) => (
    <View style={rowStyles.categoryContainer}>
      {/* Category Header */}
      <TouchableOpacity style={rowStyles.categoryHeader} activeOpacity={0.7}>
        <Text style={rowStyles.categoryTitle}>{title}</Text>
        <ChevronRightIcon size={16} color="rgba(255,255,255,0.6)" />
      </TouchableOpacity>

      {/* Horizontal Scroll of Tiles */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={rowStyles.tilesContainer}
      >
        {styles.map((style) => (
          <TouchableOpacity
            key={style.id}
            style={[
              rowStyles.tile,
              selectedStyleId === style.id && rowStyles.tileSelected,
            ]}
            onPress={() => handleStylePress(style)}
            activeOpacity={0.7}
          >
            <Image
              source={style.source}
              style={rowStyles.tileImage}
              resizeMode="cover"
            />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  return (
    <View style={rowStyles.container}>
      {renderCategoryRow("Trending", trendingStyles)}
      {renderCategoryRow("Modernism", modernismStyles)}
    </View>
  );
};

const rowStyles = StyleSheet.create({
  container: {
    gap: Spacing.md,
  },
  categoryContainer: {
    gap: Spacing.sm,
  },
  categoryHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  categoryTitle: {
    fontFamily: Typography.fontFamily.semiBold,
    fontSize: Typography.fontSize.sm,
    color: Colors.textPrimary,
  },
  tilesContainer: {
    flexDirection: "row",
    gap: Spacing.sm,
    paddingRight: Spacing.md,
  },
  tile: {
    width: 72,
    height: 72,
    backgroundColor: Colors.tileGray,
    borderRadius: Spacing.sm,
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

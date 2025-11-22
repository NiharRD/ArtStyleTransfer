import { router } from "expo-router";
import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { BrushIcon } from "../../components/icons/IconComponents";
import Button from "../../components/ui/Button";
import Header from "../../components/ui/Header";
import {
  BorderRadius,
  Colors,
  Spacing,
  Typography,
} from "../../constants/Theme";

/**
 * Art Style Transfer Screen
 *
 * This is a placeholder screen for the Art Style Transfer feature.
 * Ready for implementation of:
 * - Style selection gallery
 * - Image processing
 * - Preview generation
 * - Style intensity controls
 */
const ArtStyleTransferScreen = () => {
  const [selectedStyle, setSelectedStyle] = useState(null);

  const styles = [
    { id: 1, name: "Van Gogh", description: "Starry Night style" },
    { id: 2, name: "Picasso", description: "Cubist style" },
    { id: 3, name: "Monet", description: "Impressionist style" },
    { id: 4, name: "Abstract", description: "Modern abstract" },
    { id: 5, name: "Watercolor", description: "Soft watercolor" },
    { id: 6, name: "Oil Painting", description: "Classic oil painting" },
  ];

  const handleStyleSelect = (styleId) => {
    setSelectedStyle(styleId);
  };

  const handleApplyStyle = () => {
    if (selectedStyle) {
      console.log("Applying style:", selectedStyle);
      // TODO: Implement style transfer logic
      router.back();
    }
  };

  return (
    <SafeAreaView style={screenStyles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.background} />

      <View style={screenStyles.container}>
        <Header
          title="Art Style Transfer"
          subtitle="Choose your style"
          onBackPress={() => router.back()}
          onMenuPress={() => console.log("Menu")}
        />

        <ScrollView style={screenStyles.content}>
          <Text style={screenStyles.sectionTitle}>Select a Style</Text>

          <View style={screenStyles.stylesGrid}>
            {styles.map((style) => (
              <TouchableOpacity
                key={style.id}
                style={[
                  screenStyles.styleCard,
                  selectedStyle === style.id && screenStyles.styleCardSelected,
                ]}
                onPress={() => handleStyleSelect(style.id)}
                activeOpacity={0.7}
              >
                <View style={screenStyles.stylePreview}>
                  <BrushIcon
                    size={32}
                    color={
                      selectedStyle === style.id
                        ? Colors.aiPrimary
                        : Colors.textSecondary
                    }
                  />
                </View>
                <Text style={screenStyles.styleName}>{style.name}</Text>
                <Text style={screenStyles.styleDescription}>
                  {style.description}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={screenStyles.infoSection}>
            <Text style={screenStyles.infoTitle}>How it works:</Text>
            <Text style={screenStyles.infoText}>
              1. Select a style from the gallery above{"\n"}
              2. Adjust the intensity (coming soon){"\n"}
              3. Apply the style to your image{"\n"}
              4. Preview and save your result
            </Text>
          </View>
        </ScrollView>

        <View style={screenStyles.footer}>
          <Button
            icon={<BrushIcon size={20} color="#FFF" />}
            label="Apply Style"
            onPress={handleApplyStyle}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const screenStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: Spacing.xxl,
  },
  sectionTitle: {
    fontSize: Typography.fontSize.xxl,
    color: Colors.textPrimary,
    fontWeight: "600",
    marginTop: Spacing.xxl,
    marginBottom: Spacing.xl,
  },
  stylesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: Spacing.xl,
  },
  styleCard: {
    width: "47%",
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.xl,
    padding: Spacing.xxl,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "transparent",
  },
  styleCardSelected: {
    borderColor: Colors.aiPrimary,
    backgroundColor: Colors.surfaceLight,
  },
  stylePreview: {
    width: 80,
    height: 80,
    backgroundColor: Colors.surfaceLight,
    borderRadius: BorderRadius.sm,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: Spacing.lg,
  },
  styleName: {
    fontSize: Typography.fontSize.base,
    color: Colors.textPrimary,
    fontWeight: "600",
    marginBottom: Spacing.xs,
  },
  styleDescription: {
    fontSize: Typography.fontSize.xs,
    color: Colors.textTertiary,
    textAlign: "center",
  },
  infoSection: {
    marginTop: Spacing.huge,
    marginBottom: Spacing.huge,
    padding: Spacing.xxl,
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.xl,
  },
  infoTitle: {
    fontSize: Typography.fontSize.lg,
    color: Colors.textPrimary,
    fontWeight: "600",
    marginBottom: Spacing.md,
  },
  infoText: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  footer: {
    padding: Spacing.xxl,
    borderTopWidth: 1,
    borderTopColor: Colors.glassBackground,
  },
});

export default ArtStyleTransferScreen;

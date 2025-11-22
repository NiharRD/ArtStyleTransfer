import { router } from "expo-router";
import React from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { StarIcon, StarImageIcon } from "../../components/icons/IconComponents";
import Header from "../../components/ui/Header";
import { Colors, Spacing, Typography } from "../../constants/Theme";

/**
 * Star Icon Demo Screen
 *
 * Demonstrates the usage of Star icons from Figma design
 * Shows both the image-based and gradient-based versions
 */
const StarDemoScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.background} />

      <View style={styles.container}>
        <Header
          title="Star Icon Demo"
          subtitle="Figma Design Implementation"
          onBackPress={() => router.back()}
          onMenuPress={() => console.log("Menu")}
        />

        <ScrollView style={styles.content}>
          {/* Star Image Icon */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>StarImageIcon</Text>
            <Text style={styles.description}>
              Pixel-perfect star using the actual Figma image
            </Text>

            <View style={styles.demoRow}>
              <View style={styles.demoItem}>
                <StarImageIcon size={30} />
                <Text style={styles.label}>Small (30)</Text>
              </View>
              <View style={styles.demoItem}>
                <StarImageIcon size={50} />
                <Text style={styles.label}>Medium (50)</Text>
              </View>
              <View style={styles.demoItem}>
                <StarImageIcon size={80} />
                <Text style={styles.label}>Large (80)</Text>
              </View>
            </View>
          </View>

          {/* Star Gradient Icon */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>StarIcon (Gradient)</Text>
            <Text style={styles.description}>
              Programmatic star with customizable gradients
            </Text>

            <View style={styles.demoRow}>
              <View style={styles.demoItem}>
                <StarIcon size={50} />
                <Text style={styles.label}>Default</Text>
              </View>
              <View style={styles.demoItem}>
                <StarIcon
                  size={50}
                  colors={["#FFD700", "#FFA500", "#FF6347"]}
                />
                <Text style={styles.label}>Gold</Text>
              </View>
              <View style={styles.demoItem}>
                <StarIcon
                  size={50}
                  colors={["#00FF00", "#00FFFF", "#0000FF"]}
                />
                <Text style={styles.label}>Cyan</Text>
              </View>
            </View>
          </View>

          {/* Usage Examples */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Usage Examples</Text>

            {/* Decorative Header */}
            <View style={styles.exampleCard}>
              <Text style={styles.exampleTitle}>Decorative Header</Text>
              <View style={styles.decorativeHeader}>
                <StarImageIcon size={20} />
                <Text style={styles.headerText}>Premium Feature</Text>
                <StarImageIcon size={20} />
              </View>
            </View>

            {/* Background Stars */}
            <View style={styles.exampleCard}>
              <Text style={styles.exampleTitle}>Background Decoration</Text>
              <View style={styles.backgroundStars}>
                <StarImageIcon size={40} style={styles.bgStar1} />
                <StarImageIcon size={30} style={styles.bgStar2} />
                <StarImageIcon size={25} style={styles.bgStar3} />
                <Text style={styles.overlayText}>Special Offer!</Text>
              </View>
            </View>

            {/* Button with Stars */}
            <View style={styles.exampleCard}>
              <Text style={styles.exampleTitle}>Button Decoration</Text>
              <View style={styles.starButton}>
                <StarImageIcon size={16} />
                <Text style={styles.buttonText}>Upgrade Now</Text>
              </View>
            </View>
          </View>

          {/* Implementation Notes */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Implementation Notes</Text>
            <View style={styles.noteCard}>
              <Text style={styles.noteText}>
                • StarImageIcon: Best for consistent design{"\n"}• StarIcon:
                Best for dynamic color changes{"\n"}• Both support custom sizing
                {"\n"}• Images are cached automatically{"\n"}• Gradient version
                requires expo-linear-gradient
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
  section: {
    marginTop: Spacing.huge,
    marginBottom: Spacing.xxl,
  },
  sectionTitle: {
    fontSize: Typography.fontSize.xl,
    color: Colors.textPrimary,
    fontWeight: "600",
    marginBottom: Spacing.md,
  },
  description: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textTertiary,
    marginBottom: Spacing.xxl,
  },
  demoRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    padding: Spacing.xxl,
    backgroundColor: Colors.surface,
    borderRadius: 12,
  },
  demoItem: {
    alignItems: "center",
    gap: Spacing.md,
  },
  label: {
    fontSize: Typography.fontSize.xs,
    color: Colors.textSecondary,
  },
  exampleCard: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: Spacing.xxl,
    marginBottom: Spacing.xl,
  },
  exampleTitle: {
    fontSize: Typography.fontSize.base,
    color: Colors.textPrimary,
    fontWeight: "600",
    marginBottom: Spacing.lg,
  },
  decorativeHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.lg,
    padding: Spacing.xl,
    backgroundColor: Colors.surfaceLight,
    borderRadius: 8,
  },
  headerText: {
    fontSize: Typography.fontSize.lg,
    color: Colors.textPrimary,
    fontWeight: "600",
  },
  backgroundStars: {
    position: "relative",
    height: 120,
    backgroundColor: Colors.surfaceLight,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  bgStar1: {
    position: "absolute",
    top: 10,
    left: 20,
    opacity: 0.5,
  },
  bgStar2: {
    position: "absolute",
    bottom: 15,
    right: 25,
    opacity: 0.4,
  },
  bgStar3: {
    position: "absolute",
    top: 50,
    right: 60,
    opacity: 0.6,
  },
  overlayText: {
    fontSize: Typography.fontSize.xxl,
    color: Colors.textPrimary,
    fontWeight: "bold",
    zIndex: 10,
  },
  starButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.md,
    padding: Spacing.lg,
    backgroundColor: Colors.aiPrimary,
    borderRadius: 50,
  },
  buttonText: {
    fontSize: Typography.fontSize.base,
    color: Colors.textPrimary,
    fontWeight: "600",
  },
  noteCard: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: Spacing.xxl,
    borderLeftWidth: 4,
    borderLeftColor: Colors.aiPrimary,
  },
  noteText: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textSecondary,
    lineHeight: 22,
  },
});

export default StarDemoScreen;

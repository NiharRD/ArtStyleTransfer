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
import { TShirtIcon } from "../components/icons/IconComponents";
import Button from "../components/ui/Button";
import Header from "../components/ui/Header";
import { BorderRadius, Colors, Spacing, Typography } from "../constants/Theme";

/**
 * Generate Mockup Screen
 *
 * This is a placeholder screen for the Mockup Generation feature.
 * Ready for implementation of:
 * - Mockup template selection
 * - Image placement
 * - Customization options
 * - Export functionality
 */
const GenerateMockupScreen = () => {
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const mockupTemplates = [
    { id: 1, name: "T-Shirt Front", category: "Apparel" },
    { id: 2, name: "T-Shirt Back", category: "Apparel" },
    { id: 3, name: "Hoodie", category: "Apparel" },
    { id: 4, name: "Tote Bag", category: "Accessories" },
    { id: 5, name: "Mug", category: "Home" },
    { id: 6, name: "Phone Case", category: "Tech" },
  ];

  const handleTemplateSelect = (templateId) => {
    setSelectedTemplate(templateId);
  };

  const handleGenerateMockup = () => {
    if (selectedTemplate) {
      console.log("Generating mockup:", selectedTemplate);
      // TODO: Implement mockup generation logic
      router.back();
    }
  };

  return (
    <SafeAreaView style={screenStyles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.background} />

      <View style={screenStyles.container}>
        <Header
          title="Generate Mockup"
          subtitle="Select a template"
          onBackPress={() => router.back()}
          onMenuPress={() => console.log("Menu")}
        />

        <ScrollView style={screenStyles.content}>
          <Text style={screenStyles.sectionTitle}>Mockup Templates</Text>

          <View style={screenStyles.templatesGrid}>
            {mockupTemplates.map((template) => (
              <TouchableOpacity
                key={template.id}
                style={[
                  screenStyles.templateCard,
                  selectedTemplate === template.id &&
                    screenStyles.templateCardSelected,
                ]}
                onPress={() => handleTemplateSelect(template.id)}
                activeOpacity={0.7}
              >
                <View style={screenStyles.templatePreview}>
                  <TShirtIcon
                    size={40}
                    color={
                      selectedTemplate === template.id
                        ? Colors.aiPrimary
                        : Colors.textSecondary
                    }
                  />
                </View>
                <Text style={screenStyles.templateName}>{template.name}</Text>
                <Text style={screenStyles.templateCategory}>
                  {template.category}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={screenStyles.infoSection}>
            <Text style={screenStyles.infoTitle}>Features:</Text>
            <Text style={screenStyles.infoText}>
              • High-quality mockup generation{"\n"}• Multiple product
              categories{"\n"}• Customizable placement{"\n"}• Realistic shadows
              and lighting{"\n"}• Export in multiple formats
            </Text>
          </View>
        </ScrollView>

        <View style={screenStyles.footer}>
          <Button
            icon={<TShirtIcon size={20} color="#FFF" />}
            label="Generate Mockup"
            onPress={handleGenerateMockup}
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
  templatesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: Spacing.xl,
  },
  templateCard: {
    width: "47%",
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.xl,
    padding: Spacing.xxl,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "transparent",
  },
  templateCardSelected: {
    borderColor: Colors.aiPrimary,
    backgroundColor: Colors.surfaceLight,
  },
  templatePreview: {
    width: 80,
    height: 80,
    backgroundColor: Colors.surfaceLight,
    borderRadius: BorderRadius.sm,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: Spacing.lg,
  },
  templateName: {
    fontSize: Typography.fontSize.base,
    color: Colors.textPrimary,
    fontWeight: "600",
    marginBottom: Spacing.xs,
    textAlign: "center",
  },
  templateCategory: {
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

export default GenerateMockupScreen;

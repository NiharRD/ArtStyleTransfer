import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  Animated,
  Dimensions,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";
import ArtStyleTransferModal from "../components/modals/ArtStyleTransferModal";
import GenerateMockupModal from "../components/modals/GenerateMockupModal";
import GlobalEditingModal from "../components/modals/GlobalEditingModal";
import AIPromptButton from "../components/ui/AIPromptButton";
import ControlBar from "../components/ui/ControlBar";
import DrawerToggle from "../components/ui/DrawerToggle";
import Header from "../components/ui/Header";
import QuickActionsBar from "../components/ui/QuickActionsBar";
import SmartSuggestions from "../components/ui/SmartSuggestions";

const { width, height } = Dimensions.get("window");

/**
 * Home Screen - Main app screen
 *
 * The main workspace where users can view and edit their images.
 * Provides navigation to various features like art style transfer and mockup generation.
 *
 * Features:
 * - Responsive canvas with animated height
 * - Bottom sheet modals that push content up
 * - Smooth state transitions
 */
const DEFAULT_CANVAS_HEIGHT = 450;
const DEFAULT_CANVAS_WIDTH = width - 32;
const MIN_CANVAS_HEIGHT = 200;
const SUGGESTIONS_HEIGHT = 100; // Height reserved for suggestions section
// Calculate min width to maintain aspect ratio
const MIN_CANVAS_WIDTH =
  (MIN_CANVAS_HEIGHT / DEFAULT_CANVAS_HEIGHT) * DEFAULT_CANVAS_WIDTH;
// Canvas height when suggestions are visible (no modal open)
const CANVAS_WITH_SUGGESTIONS = DEFAULT_CANVAS_HEIGHT - SUGGESTIONS_HEIGHT;

const HomeScreen = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [artStyleModalVisible, setArtStyleModalVisible] = useState(false);
  const [generateMockupModalVisible, setGenerateMockupModalVisible] =
    useState(false);
  const [globalEditingModalVisible, setGlobalEditingModalVisible] =
    useState(false);
  const [currentModalHeight, setCurrentModalHeight] = useState(0);

  // Animated value for canvas height
  const canvasHeightAnim = useRef(
    new Animated.Value(DEFAULT_CANVAS_HEIGHT)
  ).current;

  // Interpolate width from height to maintain aspect ratio
  const canvasWidthAnim = canvasHeightAnim.interpolate({
    inputRange: [MIN_CANVAS_HEIGHT, DEFAULT_CANVAS_HEIGHT],
    outputRange: [MIN_CANVAS_WIDTH, DEFAULT_CANVAS_WIDTH],
    extrapolate: "clamp",
  });

  // Check if any modal is open
  const isModalOpen =
    artStyleModalVisible ||
    generateMockupModalVisible ||
    globalEditingModalVisible;

  // Calculate canvas height based on modal height and suggestions visibility
  const calculateCanvasHeight = (modalHeight, modalOpen) => {
    if (modalHeight > 0) {
      // Modal is open - shrink proportionally to modal height (50% of modal height)
      const shrinkAmount = modalHeight * 0.5;
      const newHeight = DEFAULT_CANVAS_HEIGHT - shrinkAmount;
      return Math.max(newHeight, MIN_CANVAS_HEIGHT);
    }
    // No modal open - use canvas height with suggestions
    return CANVAS_WITH_SUGGESTIONS;
  };

  // Animate canvas height when modal height changes or modal visibility changes
  useEffect(() => {
    const targetHeight = calculateCanvasHeight(currentModalHeight, isModalOpen);
    Animated.spring(canvasHeightAnim, {
      toValue: targetHeight,
      useNativeDriver: false, // Height cannot use native driver
      tension: 65,
      friction: 11,
    }).start();
  }, [currentModalHeight, isModalOpen]);

  // Handler for modal height changes
  const handleModalHeightChange = (height) => {
    setCurrentModalHeight(height);
  };

  const handleBackPress = () => {
    // Navigate back or show projects list
    Alert.alert("Navigation", "Back to projects list");
  };

  const handleMenuPress = () => {
    // Open menu with project options
    Alert.alert("Menu", "Project options menu");
  };

  const handleAIPromptPress = () => {
    // Navigate to AI assistant (future feature)
    Alert.alert("AI Assistant", "AI prompt feature coming soon!");
  };

  const handleDrawerToggle = () => {
    // Toggle bottom drawer with additional options
    Alert.alert("Drawer", "Bottom drawer functionality coming soon!");
  };

  const handleArtStylePress = () => {
    setArtStyleModalVisible(true);
  };

  const handleGenerateMockupPress = () => {
    setGenerateMockupModalVisible(true);
  };

  const handleCloseArtStyleModal = () => {
    setArtStyleModalVisible(false);
  };

  const handleCloseGenerateMockupModal = () => {
    setGenerateMockupModalVisible(false);
  };

  const handleGlobalEditingPress = () => {
    setGlobalEditingModalVisible(true);
  };

  const handleCloseGlobalEditingModal = () => {
    setGlobalEditingModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#191816" />

      <View style={styles.container}>
        {/* Header */}
        <Header
          title="Untitled Project 1"
          subtitle="Synced just now"
          onBackPress={handleBackPress}
          onMenuPress={handleMenuPress}
        />

        {/* Control Bar */}
        <ControlBar />

        {/* Main Image Display Area - Animated height & width (maintains aspect ratio) */}
        <View style={styles.imageContainer}>
          {selectedImage ? (
            <Animated.Image
              source={{ uri: selectedImage }}
              style={[
                styles.image,
                { height: canvasHeightAnim, width: canvasWidthAnim },
              ]}
              resizeMode="cover"
            />
          ) : (
            <Animated.View
              style={[
                styles.placeholderContainer,
                { height: canvasHeightAnim, width: canvasWidthAnim },
              ]}
            >
              <View style={styles.placeholder} />
            </Animated.View>
          )}
        </View>

        {/* Smart Suggestions - Hide when any modal is open */}
        {!artStyleModalVisible &&
          !generateMockupModalVisible &&
          !globalEditingModalVisible && (
            <SmartSuggestions
              onSuggestionPress={(suggestion) => {
                Alert.alert("Suggestion", `Selected: ${suggestion.label}`);
              }}
            />
          )}

        {/* Bottom Section */}
        <View style={styles.bottomSection}>
          {/* Drawer Toggle */}
          <DrawerToggle onPress={handleDrawerToggle} />

          {/* Quick Actions Bar with AI Button */}
          <View style={styles.actionsContainer}>
            {/* Quick Actions Bar - Hide when any modal is open */}
            {!artStyleModalVisible &&
              !generateMockupModalVisible &&
              !globalEditingModalVisible && (
                <QuickActionsBar
                  onArtStylePress={handleArtStylePress}
                  onGenerateMockupPress={handleGenerateMockupPress}
                  onGlobalEditingPress={handleGlobalEditingPress}
                />
              )}

            {/* AI Prompt Button - Hide when any modal is open */}
            {!artStyleModalVisible &&
              !generateMockupModalVisible &&
              !globalEditingModalVisible && (
                <View style={styles.aiButtonContainer}>
                  <AIPromptButton onPress={handleAIPromptPress} />
                </View>
              )}
          </View>

          {/* Home Indicator */}
          <View style={styles.homeIndicator} />
        </View>

        {/* Art Style Transfer Modal */}
        <ArtStyleTransferModal
          visible={artStyleModalVisible}
          onClose={handleCloseArtStyleModal}
          onHeightChange={handleModalHeightChange}
        />

        {/* Generate Mockup Modal */}
        <GenerateMockupModal
          visible={generateMockupModalVisible}
          onClose={handleCloseGenerateMockupModal}
          onHeightChange={handleModalHeightChange}
        />

        {/* Global Editing Modal */}
        <GlobalEditingModal
          visible={globalEditingModalVisible}
          onClose={handleCloseGlobalEditingModal}
          onHeightChange={handleModalHeightChange}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#191816",
  },
  container: {
    flex: 1,
    backgroundColor: "#191816",
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
    marginTop: 10,
  },
  placeholderContainer: {
    width: width - 32,
    height: 450,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2A2A28",
    borderRadius: 12,
    overflow: "hidden",
  },
  placeholder: {
    width: "100%",
    height: "100%",
    backgroundColor: "#3A3A38",
  },
  image: {
    width: width - 32,
    height: 450,
    borderRadius: 12,
  },
  bottomSection: {
    paddingBottom: 20,
  },
  actionsContainer: {
    position: "relative",
    marginTop: 8,
    zIndex: 1,
  },
  aiButtonContainer: {
    position: "absolute",
    right: 16,
    top: "50%",
    transform: [{ translateY: -39 }], // Half of button height
    zIndex: 10,
  },
  homeIndicator: {
    width: 140,
    height: 5,
    backgroundColor: "#8E8E8E",
    borderRadius: 100,
    alignSelf: "center",
    marginTop: 12,
  },
});

export default HomeScreen;

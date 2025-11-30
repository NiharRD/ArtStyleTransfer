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
import AIPromptButton from "../components/ui/AIPromptButton";
import ControlBar from "../components/ui/ControlBar";
import DrawerToggle from "../components/ui/DrawerToggle";
import Header from "../components/ui/Header";
import QuickActionsBar from "../components/ui/QuickActionsBar";

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
const MIN_CANVAS_HEIGHT = 200;

const HomeScreen = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [artStyleModalVisible, setArtStyleModalVisible] = useState(false);
  const [generateMockupModalVisible, setGenerateMockupModalVisible] =
    useState(false);
  const [currentModalHeight, setCurrentModalHeight] = useState(0);

  // Animated value for canvas height
  const canvasHeightAnim = useRef(
    new Animated.Value(DEFAULT_CANVAS_HEIGHT)
  ).current;

  // Calculate canvas height based on modal height
  const calculateCanvasHeight = (modalHeight) => {
    if (modalHeight === 0) {
      return DEFAULT_CANVAS_HEIGHT;
    }
    // Shrink canvas proportionally to modal height (50% of modal height)
    const shrinkAmount = modalHeight * 0.5;
    const newHeight = DEFAULT_CANVAS_HEIGHT - shrinkAmount;
    return Math.max(newHeight, MIN_CANVAS_HEIGHT);
  };

  // Animate canvas height when modal height changes
  useEffect(() => {
    const targetHeight = calculateCanvasHeight(currentModalHeight);
    Animated.spring(canvasHeightAnim, {
      toValue: targetHeight,
      useNativeDriver: false, // Height cannot use native driver
      tension: 65,
      friction: 11,
    }).start();
  }, [currentModalHeight]);

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

        {/* Main Image Display Area - Animated height */}
        <View style={styles.imageContainer}>
          {selectedImage ? (
            <Animated.Image
              source={{ uri: selectedImage }}
              style={[styles.image, { height: canvasHeightAnim }]}
              resizeMode="cover"
            />
          ) : (
            <Animated.View
              style={[
                styles.placeholderContainer,
                { height: canvasHeightAnim },
              ]}
            >
              <View style={styles.placeholder} />
            </Animated.View>
          )}
        </View>

        {/* Bottom Section */}
        <View style={styles.bottomSection}>
          {/* Drawer Toggle */}
          <DrawerToggle onPress={handleDrawerToggle} />

          {/* Quick Actions Bar with AI Button */}
          <View style={styles.actionsContainer}>
            {/* Quick Actions Bar - Hide when any modal is open */}
            {!artStyleModalVisible && !generateMockupModalVisible && (
              <QuickActionsBar
                onArtStylePress={handleArtStylePress}
                onGenerateMockupPress={handleGenerateMockupPress}
              />
            )}

            {/* AI Prompt Button - Hide when any modal is open */}
            {!artStyleModalVisible && !generateMockupModalVisible && (
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

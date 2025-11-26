import React, { useState, useRef, useEffect } from "react";
import {
  Alert,
  Animated,
  Dimensions,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";
import AIPromptButton from "../components/ui/AIPromptButton";
import ControlBar from "../components/ui/ControlBar";
import DrawerToggle from "../components/ui/DrawerToggle";
import Header from "../components/ui/Header";
import QuickActionsBar from "../components/ui/QuickActionsBar";
import ArtStyleTransferModal from "../components/modals/ArtStyleTransferModal";
import GenerateMockupModal from "../components/modals/GenerateMockupModal";

const { width, height } = Dimensions.get("window");

/**
 * Home Screen - Main app screen
 *
 * The main workspace where users can view and edit their images.
 * Provides navigation to various features like art style transfer and mockup generation.
 * 
 * Features:
 * - Responsive layout with animated image canvas
 * - Bottom sheet modals that push content up
 * - Smooth transitions between states
 */
const HomeScreen = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [artStyleModalVisible, setArtStyleModalVisible] = useState(false);
  const [mockupModalVisible, setMockupModalVisible] = useState(false);
  
  // Animated value for image height
  const imageHeightAnim = useRef(new Animated.Value(450)).current;
  
  // Animate image height when modal opens/closes
  useEffect(() => {
    const isModalOpen = artStyleModalVisible || mockupModalVisible;
    
    Animated.spring(imageHeightAnim, {
      toValue: isModalOpen ? 250 : 450,
      useNativeDriver: false,
      tension: 65,
      friction: 11,
    }).start();
  }, [artStyleModalVisible, mockupModalVisible]);

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

  const handleMockupPress = () => {
    setMockupModalVisible(true);
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

        {/* Main Image Display Area - Animated */}
        <Animated.View 
          style={[
            styles.imageContainer,
            { height: imageHeightAnim }
          ]}
        >
          {selectedImage ? (
            <Image
              source={{ uri: selectedImage }}
              style={styles.image}
              resizeMode="cover"
            />
          ) : (
            <View style={styles.placeholderContainer}>
              <View style={styles.placeholder} />
            </View>
          )}
        </Animated.View>

        {/* Bottom Section */}
        <View style={styles.bottomSection}>
          {/* Drawer Toggle - Hide when modal is open */}
          {!artStyleModalVisible && !mockupModalVisible && (
            <DrawerToggle onPress={handleDrawerToggle} />
          )}

          {/* Quick Actions Bar with AI Button */}
          <View style={styles.actionsContainer}>
            <QuickActionsBar
              onArtStylePress={handleArtStylePress}
              onMockupPress={handleMockupPress}
            />

            {/* AI Prompt Button - Positioned absolutely on the right */}
            <View style={styles.aiButtonContainer}>
              <AIPromptButton onPress={handleAIPromptPress} />
            </View>
          </View>

          {/* Home Indicator - Hide when modal is open */}
          {!artStyleModalVisible && !mockupModalVisible && (
            <View style={styles.homeIndicator} />
          )}
        </View>

        {/* Modal Sheet Container - Positioned absolutely at bottom */}
        <View style={styles.modalSheetContainer}>
          <ArtStyleTransferModal
            visible={artStyleModalVisible}
            onClose={() => setArtStyleModalVisible(false)}
          />
          <GenerateMockupModal
            visible={mockupModalVisible}
            onClose={() => setMockupModalVisible(false)}
          />
        </View>
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
    flex: 1,
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
    flex: 1,
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
  modalSheetContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 100,
  },
});

export default HomeScreen;

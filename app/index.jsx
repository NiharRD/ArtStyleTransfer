import * as ImagePicker from "expo-image-picker";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Animated,
  Dimensions,
  Easing,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
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
 * - Image picker with blob-ready state for HTTP form data
 * - Loading overlay for async AI/ML operations
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
  // Image state with uri, blob, and loading status (dynamic - updated after AI operations)
  const [imageState, setImageState] = useState({
    uri: null, // Display URI for the Image component
    blob: null, // Blob object ready for FormData
    isLoading: false, // Loading state for async operations
  });

  // Original image state - stores the initially picked image for AI reference
  const [originalImageState, setOriginalImageState] = useState({
    uri: null, // Original image URI
    blob: null, // Original image blob for FormData
    isLoading: false, // Loading state
  });

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

  // Animated value for loading overlay pulse effect
  const pulseAnim = useRef(new Animated.Value(0.3)).current;

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

  // Pulse animation for loading overlay
  useEffect(() => {
    if (imageState.isLoading) {
      const pulseAnimation = Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 0.6,
            duration: 800,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 0.3,
            duration: 800,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ])
      );
      pulseAnimation.start();
      return () => pulseAnimation.stop();
    }
  }, [imageState.isLoading]);

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

  // Canvas aspect ratio for image cropping (width:height)
  const CANVAS_ASPECT_RATIO = [DEFAULT_CANVAS_WIDTH, DEFAULT_CANVAS_HEIGHT];

  /**
   * Pick an image from the device gallery
   * Converts the image to blob for HTTP form data compatibility
   * Crops image to match canvas aspect ratio
   */
  const pickImage = async () => {
    try {
      // Request media library permissions
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (status !== "granted") {
        Alert.alert(
          "Permission Required",
          "Please grant access to your photo library to select images."
        );
        return;
      }

      // Launch the image picker with fixed aspect ratio matching the canvas
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        aspect: CANVAS_ASPECT_RATIO, // Lock crop to canvas aspect ratio
        quality: 1,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const selectedAsset = result.assets[0];
        const imageUri = selectedAsset.uri;

        // Set loading state while converting to blob
        setImageState((prev) => ({ ...prev, isLoading: true }));

        // Convert image URI to blob for form data
        const response = await fetch(imageUri);
        const blob = await response.blob();

        // Store as original image (for AI reference)
        setOriginalImageState({
          uri: imageUri,
          blob: blob,
          isLoading: false,
        });

        // Update dynamic image state with both uri and blob
        setImageState({
          uri: imageUri,
          blob: blob,
          isLoading: false,
        });
      }
    } catch (error) {
      console.error("Error picking image:", error);
      setImageState((prev) => ({ ...prev, isLoading: false }));
      Alert.alert("Error", "Failed to load the image. Please try again.");
    }
  };

  /**
   * Update image state from HTTP response
   * Call this after AI/ML operations return a new image URL
   *
   * @param {string} newImageUri - The new image URI from the server response
   */
  const updateImageFromResponse = async (newImageUri) => {
    try {
      // Set loading state
      setImageState((prev) => ({ ...prev, isLoading: true }));

      // Fetch and convert to blob
      const response = await fetch(newImageUri);
      const blob = await response.blob();

      // Update state with new image
      setImageState({
        uri: newImageUri,
        blob: blob,
        isLoading: false,
      });
    } catch (error) {
      console.error("Error updating image from response:", error);
      setImageState((prev) => ({ ...prev, isLoading: false }));
      Alert.alert("Error", "Failed to load the processed image.");
    }
  };

  /**
   * Set loading state manually
   * Use before making HTTP requests
   *
   * @param {boolean} loading - Whether the image is loading
   */
  const setImageLoading = (loading) => {
    setImageState((prev) => ({ ...prev, isLoading: loading }));
  };

  /**
   * Get the current blob for form data
   * Use when sending the image via HTTP POST
   *
   * @returns {Blob|null} The current image blob or null
   */
  const getImageBlob = () => imageState.blob;

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

  // Loading Overlay Component
  const LoadingOverlay = () => (
    <Animated.View style={[styles.loadingOverlay, { opacity: pulseAnim }]}>
      <View style={styles.loadingContent}>
        <ActivityIndicator size="large" color="#FFFFFF" />
        <Text style={styles.loadingText}>Processing...</Text>
      </View>
    </Animated.View>
  );

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
          {imageState.uri ? (
            <View style={styles.imageWrapper}>
              <Animated.Image
                source={{ uri: imageState.uri }}
                style={[
                  styles.image,
                  { height: canvasHeightAnim, width: canvasWidthAnim },
                ]}
                resizeMode="cover"
              />
              {/* Loading overlay on top of image */}
              {imageState.isLoading && <LoadingOverlay />}
            </View>
          ) : (
            <Animated.View
              style={[
                styles.placeholderContainer,
                { height: canvasHeightAnim, width: canvasWidthAnim },
              ]}
            >
              {imageState.isLoading ? (
                <LoadingOverlay />
              ) : (
                <TouchableOpacity
                  style={styles.pickImageButton}
                  onPress={pickImage}
                  activeOpacity={0.8}
                >
                  <View style={styles.pickImageIconContainer}>
                    <View style={styles.pickImageIcon}>
                      <View style={styles.plusHorizontal} />
                      <View style={styles.plusVertical} />
                    </View>
                  </View>
                  <Text style={styles.pickImageText}>Open Image</Text>
                  <Text style={styles.pickImageSubtext}>
                    Tap to select from gallery
                  </Text>
                </TouchableOpacity>
              )}
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
  imageWrapper: {
    position: "relative",
    borderRadius: 12,
    overflow: "hidden",
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
  // Pick Image Button Styles
  pickImageButton: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#3A3A38",
  },
  pickImageIconContainer: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  pickImageIcon: {
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  plusHorizontal: {
    position: "absolute",
    width: 24,
    height: 3,
    backgroundColor: "#FFFFFF",
    borderRadius: 2,
  },
  plusVertical: {
    position: "absolute",
    width: 3,
    height: 24,
    backgroundColor: "#FFFFFF",
    borderRadius: 2,
  },
  pickImageText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FFFFFF",
    marginBottom: 8,
  },
  pickImageSubtext: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.6)",
  },
  // Loading Overlay Styles
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(25, 24, 22, 0.85)",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
  },
  loadingContent: {
    alignItems: "center",
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    fontWeight: "500",
    color: "#FFFFFF",
    letterSpacing: 0.5,
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

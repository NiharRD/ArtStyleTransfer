import * as ImagePicker from "expo-image-picker";
import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Animated,
  Dimensions,
  Easing,
  Image,
  Modal,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import FilteredImage from "../components/FilteredImage";
import ArtStyleTransferModal from "../components/modals/ArtStyleTransferModal";
import GenerateMockupModal from "../components/modals/GenerateMockupModal";
import GlobalEditingModal from "../components/modals/GlobalEditingModal";
import AIPromptButton from "../components/ui/AIPromptButton";
import ControlBar from "../components/ui/ControlBar";
import DrawerToggle from "../components/ui/DrawerToggle";
import Header from "../components/ui/Header";
import QuickActionsBar from "../components/ui/QuickActionsBar";
import SmartSuggestions from "../components/ui/SmartSuggestions";
import { baseUrl } from "../endPoints";

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
 * - Global Editing with HTTP workflow for AI image processing
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

  // Iteration tracking for Global Editing
  const [iterations, setIterations] = useState(1);
  const [baseFilename, setBaseFilename] = useState("01_final.jpg");

  // Keep baseFilename in sync with iterations
  useEffect(() => {
    const filename = getFilenameForIteration(iterations);
    setBaseFilename(filename);
    console.log(
      "Base filename updated:",
      filename,
      "for iteration:",
      iterations
    );
  }, [iterations]);

  // Session ID for Global Editing HTTP workflow
  const [sessionIdGlobalEditing, setSessionIdGlobalEditing] = useState(null);

  // Status modal for showing progress during HTTP operations
  const [statusModal, setStatusModal] = useState({
    visible: false,
    message: "",
  });

  // Semantic axes states for XYPad dynamic labels
  const [semanticAxes, setSemanticAxes] = useState({
    additionalProp1: null, // First axis name (e.g., "Bright-Dark")
    additionalProp2: null, // Second axis name (e.g., "Moody-Airy")
    labels: null, // Parsed labels for XYPad { left, right, top, bottom }
  });
  const [semanticLoading, setSemanticLoading] = useState(false);

  // Filter values state for real-time image filtering
  const [filterValues, setFilterValues] = useState({
    saturation: 1, // 0-2, default 1
    brightness: 1, // 0-5, default 1
    contrast: 1, // -10 to 10, default 1
    hue: 0, // 0-6.3, default 0
    exposure: 0, // -2 to 2, default 0
  });

  // Check if filters are active (any value different from default)
  const areFiltersActive =
    filterValues.saturation !== 1 ||
    filterValues.brightness !== 1 ||
    filterValues.contrast !== 1 ||
    filterValues.hue !== 0 ||
    filterValues.exposure !== 0;

  // Handler for filter value changes from GlobalEditingModal
  const handleFilterChange = (newFilters) => {
    setFilterValues(newFilters);
    console.log("Filter values updated:", newFilters);
  };

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

  // Animated value for status modal pulse
  const statusPulseAnim = useRef(new Animated.Value(0.8)).current;

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

  // Pulse animation for status modal
  useEffect(() => {
    if (statusModal.visible) {
      const statusAnimation = Animated.loop(
        Animated.sequence([
          Animated.timing(statusPulseAnim, {
            toValue: 1,
            duration: 600,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(statusPulseAnim, {
            toValue: 0.8,
            duration: 600,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ])
      );
      statusAnimation.start();
      return () => statusAnimation.stop();
    }
  }, [statusModal.visible]);

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

        // Reset iteration tracking when new image is picked
        setIterations(1);
        setBaseFilename("01_final.jpg");
        setSessionIdGlobalEditing(null);
        setSemanticAxes({
          additionalProp1: null,
          additionalProp2: null,
          labels: null,
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

      // Prefetch the image to ensure it's cached before displaying
      console.log("Prefetching image:", newImageUri);
      await Image.prefetch(newImageUri);
      console.log("Image prefetched successfully");

      // Fetch and convert to blob
      const response = await fetch(newImageUri);
      const blob = await response.blob();

      // Update state with new image (image is now cached and ready)
      setImageState({
        uri: newImageUri,
        blob: blob,
        isLoading: false,
      });

      // Wait for React to process the state update and render
      await new Promise((resolve) => {
        requestAnimationFrame(() => {
          requestAnimationFrame(resolve);
        });
      });

      console.log("Image state updated and rendered");
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

  /**
   * Update base filename based on iteration number
   * @param {number} iterationNum - The iteration number
   * @returns {string} The formatted filename
   */
  const getFilenameForIteration = (iterationNum) => {
    const paddedNum = String(iterationNum).padStart(2, "0");
    return `${paddedNum}_final.jpg`;
  };

  /**
   * Upload image and get session ID from server
   * POST to baseUrl + "upload" with FormData
   *
   * @param {string} prompt - The user's prompt text
   * @returns {Promise<string|null>} The session ID or null on failure
   */
  const uploadAndGetSessionId = async (prompt) => {
    try {
      setStatusModal({ visible: true, message: "Uploading image..." });

      // Debug: Log upload URL
      const uploadUrl = `${baseUrl}upload`;
      console.log("=== Upload Debug ===");
      console.log("Upload URL:", uploadUrl);
      console.log("Prompt:", prompt);
      console.log("Original image URI:", originalImageState.uri);
      console.log("====================");

      // Create FormData with file and prompt
      const formData = new FormData();
      formData.append("file", {
        uri: originalImageState.uri,
        type: "image/jpeg",
        name: "original.jpg",
      });
      formData.append("prompt", prompt);

      const response = await fetch(uploadUrl, {
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Upload response status:", response.status);

      if (!response.ok) {
        throw new Error(`Upload failed with status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Upload response:", data);

      // Extract and store session ID
      const sessionId = data.session_id;
      setSessionIdGlobalEditing(sessionId);

      return sessionId;
    } catch (error) {
      console.error("Error uploading image:", error);
      setStatusModal({ visible: false, message: "" });
      Alert.alert("Upload Error", "Failed to upload image. Please try again.");
      return null;
    }
  };

  /**
   * Generate edited image using session ID
   * POST to baseUrl + "generate/{sessionId}"
   *
   * @param {string} sessionId - The session ID from upload
   * @returns {Promise<boolean>} Success status
   */
  const generateImage = async (sessionId) => {
    try {
      setStatusModal({ visible: true, message: "Generating edit..." });

      const response = await fetch(`${baseUrl}generate/${sessionId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Generate failed with status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Generate response:", data);

      if (data.status === "success" && data.image_url) {
        // Update status to show loading result
        setStatusModal({ visible: true, message: "Loading result..." });

        // Debug: Log URL components
        console.log("=== URL Debug ===");
        console.log("baseUrl:", baseUrl);
        console.log("data.image_url:", data.image_url);
        console.log("starts with /:", data.image_url.startsWith("/"));

        // Construct full image URL
        const fullImageUrl = `${baseUrl}${
          data.image_url.startsWith("/")
            ? data.image_url.slice(1)
            : data.image_url
        }`;

        console.log("fullImageUrl:", fullImageUrl);
        console.log("=================");

        // Update image state with new image
        await updateImageFromResponse(fullImageUrl);

        // Update iteration tracking
        const newIteration = data.iteration || iterations + 1;
        setIterations(newIteration);
        setBaseFilename(getFilenameForIteration(newIteration));

        setStatusModal({ visible: false, message: "" });
        return true;
      } else {
        throw new Error("Invalid response from generate endpoint");
      }
    } catch (error) {
      console.error("Error generating image:", error);
      setStatusModal({ visible: false, message: "" });
      Alert.alert(
        "Generation Error",
        "Failed to generate edited image. Please try again."
      );
      return false;
    }
  };

  /**
   * Main handler for Global Editing send button
   * Orchestrates the full HTTP workflow
   *
   * @param {string} prompt - The user's prompt text
   * @returns {Promise<boolean>} Success status
   */
  const handleGlobalEditingSend = async (prompt) => {
    // Validate that we have an image to work with
    if (!originalImageState.uri || !originalImageState.blob) {
      Alert.alert("No Image", "Please select an image before applying edits.");
      return false;
    }

    // Validate prompt
    if (!prompt || prompt.trim() === "") {
      Alert.alert("No Prompt", "Please enter a prompt describing your edit.");
      return false;
    }

    try {
      // Set image loading state
      setImageLoading(true);

      // Step 1: Upload image and get session ID
      const sessionId = await uploadAndGetSessionId(prompt);
      if (!sessionId) {
        setImageLoading(false);
        return false;
      }

      // Step 2: Generate edited image
      const success = await generateImage(sessionId);
      if (!success) {
        setImageLoading(false);
        return false;
      }

      return true;
    } catch (error) {
      console.error("Error in global editing workflow:", error);
      setStatusModal({ visible: false, message: "" });
      setImageLoading(false);
      Alert.alert("Error", "Something went wrong. Please try again.");
      return false;
    }
  };

  /**
   * Retry the last generation with the same session ID
   * @returns {Promise<boolean>} Success status
   */
  const handleGlobalEditingRetry = async () => {
    if (!sessionIdGlobalEditing) {
      Alert.alert("Error", "No active session. Please start a new edit.");
      return false;
    }

    try {
      setImageLoading(true);
      const success = await generateImage(sessionIdGlobalEditing);
      return success;
    } catch (error) {
      console.error("Error retrying generation:", error);
      setImageLoading(false);
      return false;
    }
  };

  /**
   * Fetch semantic axes from server for XYPad labels
   * POST to baseUrl + "semantic/init/{sessionId}"
   *
   * @param {string} sessionId - The session ID
   * @returns {Promise<object|null>} Parsed axes data or null on failure
   */
  const fetchSemanticAxes = async (sessionId) => {
    try {
      setSemanticLoading(true);
      setStatusModal({ visible: true, message: "Loading semantic axes..." });

      console.log("=== Semantic Init Debug ===");
      console.log("Session ID:", sessionId);
      const semanticUrl = `${baseUrl}semantic/init/${sessionId}`;
      console.log("Semantic URL:", semanticUrl);

      const response = await fetch(semanticUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Semantic response status:", response.status);

      if (!response.ok) {
        throw new Error(`Semantic init failed with status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Semantic response:", data);

      if (data.axes && data.axes.length >= 2) {
        // Extract axis names
        const additionalProp1 = data.axes[0].name; // e.g., "Bright-Dark"
        const additionalProp2 = data.axes[1].name; // e.g., "Moody-Airy"

        // Parse axis names to get short labels
        // First axis: "Bright-Dark" → left: "Bright", right: "Dark"
        // Second axis: "Moody-Airy" → bottom: "Moody", top: "Airy"
        const axis1Parts = additionalProp1.split("-");
        const axis2Parts = additionalProp2.split("-");

        const labels = {
          left: axis1Parts[0] || "Day", // -X: first part of first axis (Bright)
          right: axis1Parts[1] || "Night", // +X: second part of first axis (Dark)
          bottom: axis2Parts[0] || "Gloomy", // -Y: first part of second axis (Moody)
          top: axis2Parts[1] || "Joyful", // +Y: second part of second axis (Airy)
        };

        console.log("Parsed labels:", labels);
        console.log("===========================");

        setSemanticAxes({
          additionalProp1,
          additionalProp2,
          labels,
        });

        setStatusModal({ visible: false, message: "" });
        setSemanticLoading(false);
        return { additionalProp1, additionalProp2, labels };
      } else {
        throw new Error("Invalid axes data in response");
      }
    } catch (error) {
      console.error("Error fetching semantic axes:", error);
      setStatusModal({ visible: false, message: "" });
      setSemanticLoading(false);
      Alert.alert(
        "Semantic Error",
        "Failed to load semantic axes. Using default labels."
      );
      return null;
    }
  };

  /**
   * Handle tick button press - fetch semantic axes and show XYPad
   * Called when user accepts the generated changes
   *
   * @returns {Promise<boolean>} Success status
   */
  const handleSemanticInit = async () => {
    if (!sessionIdGlobalEditing) {
      Alert.alert("Error", "No active session.");
      return false;
    }

    try {
      const result = await fetchSemanticAxes(sessionIdGlobalEditing);
      return result !== null;
    } catch (error) {
      console.error("Error in semantic init:", error);
      return false;
    }
  };

  /**
   * Handle semantic edit POST request when XY pad is active
   * POST to baseUrl + "semantic/edit/{sessionId}"
   *
   * @param {object} xyValues - The XY pad values { x, y } normalized from -1 to 1
   * @returns {Promise<boolean>} Success status
   */
  const handleSemanticEdit = async (xyValues) => {
    if (!sessionIdGlobalEditing) {
      Alert.alert("Error", "No active session.");
      return false;
    }

    if (!semanticAxes.additionalProp1 || !semanticAxes.additionalProp2) {
      Alert.alert("Error", "Semantic axes not loaded. Please try again.");
      return false;
    }

    try {
      setImageLoading(true);
      setStatusModal({ visible: true, message: "Applying semantic edit..." });

      // Build request body using axis names as coordinate keys
      // First semantic (additionalProp1) = X axis value
      // Second semantic (additionalProp2) = Y axis value
      const requestBody = {
        coordinates: {
          [semanticAxes.additionalProp1]: xyValues.x,
          [semanticAxes.additionalProp2]: xyValues.y,
        },
        base_filename: baseFilename,
      };

      console.log("=== Semantic Edit Debug ===");
      console.log("Session ID:", sessionIdGlobalEditing);
      console.log("XY Values:", xyValues);
      console.log("Request Body:", JSON.stringify(requestBody, null, 2));

      const semanticEditUrl = `${baseUrl}semantic/edit/${sessionIdGlobalEditing}`;
      console.log("Semantic Edit URL:", semanticEditUrl);

      const response = await fetch(semanticEditUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      console.log("Semantic edit response status:", response.status);

      if (!response.ok) {
        throw new Error(`Semantic edit failed with status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Semantic edit response:", data);

      // Check for image_url in response (API doesn't return status field)
      if (data.image_url) {
        setStatusModal({ visible: true, message: "Loading result..." });

        // Construct full image URL
        const fullImageUrl = `${baseUrl}${
          data.image_url.startsWith("/")
            ? data.image_url.slice(1)
            : data.image_url
        }`;

        console.log("Semantic edit fullImageUrl:", fullImageUrl);

        // Update image state with new image
        await updateImageFromResponse(fullImageUrl);

        // Keep same iteration for semantic edits
        console.log("Semantic edit applied. Iteration remains:", iterations);

        console.log("===========================");
        setStatusModal({ visible: false, message: "" });
        setImageLoading(false);
        return true;
      } else {
        throw new Error("No image_url in semantic edit response");
      }
    } catch (error) {
      console.error("Error in semantic edit:", error);
      setStatusModal({ visible: false, message: "" });
      setImageLoading(false);
      Alert.alert(
        "Semantic Edit Error",
        "Failed to apply semantic edit. Please try again."
      );
      return false;
    }
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

  // Loading Overlay Component
  const LoadingOverlay = ({ message }) => (
    <Animated.View style={[styles.loadingOverlay, { opacity: pulseAnim }]}>
      <View style={styles.loadingContent}>
        <ActivityIndicator size="large" color="#FFFFFF" />
        <Text style={styles.loadingText}>{message || "Processing..."}</Text>
      </View>
    </Animated.View>
  );

  // Status Modal Component - Shows progress during HTTP operations
  const StatusModalComponent = () => (
    <Modal
      visible={statusModal.visible}
      transparent={true}
      animationType="fade"
      statusBarTranslucent={true}
    >
      <View style={styles.statusModalOverlay}>
        <Animated.View
          style={[
            styles.statusModalContent,
            { transform: [{ scale: statusPulseAnim }] },
          ]}
        >
          <ActivityIndicator size="large" color="#8A2BE2" />
          <Text style={styles.statusModalText}>{statusModal.message}</Text>
        </Animated.View>
      </View>
    </Modal>
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
              {/* Use FilteredImage when filters are active, otherwise regular Animated.Image */}
              {areFiltersActive ? (
                <Animated.View
                  style={[
                    styles.filteredImageContainer,
                    { height: canvasHeightAnim, width: canvasWidthAnim },
                  ]}
                >
                  <FilteredImage
                    uri={imageState.uri}
                    filters={filterValues}
                    width={DEFAULT_CANVAS_WIDTH}
                    height={DEFAULT_CANVAS_HEIGHT}
                    style={styles.image}
                  />
                </Animated.View>
              ) : (
                <Animated.Image
                  source={{ uri: imageState.uri }}
                  style={[
                    styles.image,
                    { height: canvasHeightAnim, width: canvasWidthAnim },
                  ]}
                  resizeMode="cover"
                />
              )}
              {/* Loading overlay on top of image */}
              {imageState.isLoading && (
                <LoadingOverlay message={statusModal.message} />
              )}
            </View>
          ) : (
            <Animated.View
              style={[
                styles.placeholderContainer,
                { height: canvasHeightAnim, width: canvasWidthAnim },
              ]}
            >
              {imageState.isLoading ? (
                <LoadingOverlay message={statusModal.message} />
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
          onSendPrompt={handleGlobalEditingSend}
          onRetry={handleGlobalEditingRetry}
          isProcessing={imageState.isLoading}
          onTickPress={handleSemanticInit}
          onSemanticEdit={handleSemanticEdit}
          semanticLabels={semanticAxes.labels}
          isSemanticLoading={semanticLoading}
          onFilterChange={handleFilterChange}
        />

        {/* Status Modal for progress updates */}
        <StatusModalComponent />
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
  filteredImageContainer: {
    borderRadius: 12,
    overflow: "hidden",
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
  // Status Modal Styles
  statusModalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  statusModalContent: {
    backgroundColor: "#2A2A28",
    borderRadius: 16,
    padding: 32,
    alignItems: "center",
    minWidth: 200,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  statusModalText: {
    marginTop: 16,
    fontSize: 16,
    fontWeight: "500",
    color: "#FFFFFF",
    letterSpacing: 0.5,
    textAlign: "center",
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

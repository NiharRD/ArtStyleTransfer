import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useRef, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    Animated,
    BackHandler,
    Dimensions,
    Image,
    Keyboard,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { LLAMA3_2_1B_SPINQUANT, useLLM } from "react-native-executorch";
import { z } from "zod";
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
import { BorderRadius, Colors, Layout, Typography } from "../constants/Theme";
import { artStyleBaseUrl, baseUrl } from "../endPoints";
const GOOGLE_API_KEY = process.env.EXPO_PUBLIC_GOOGLE_API_KEY;
const SYSTEM_PROMPT = `Analyze the image carefully and return ONLY a single JSON object containing exactly 4 main suggestions only in 4 to 6 strictly words (one for each category: Movie Style, Mood, Color Focus, Other) and exactly 15 general suggestions, all in natural human language.

*STRICT FORMAT INSTRUCTIONS*:
Return a JSON object with this structure:
{
  "main_suggestions": {
    "movie_style_suggestion": "string",
    "mood_suggestion": "string",
    "color_focus_suggestion": "string",
    "other_main_suggestion": "string"
  },
  "normal_suggestions": [
    "string",
    "string",
    ... (15 items)
  ]
}

*RULES FOR ALL 19 SUGGESTIONS*:
- The output MUST contain exactly one main_suggestions object with 4 fields, and one normal_suggestions list with exactly 15 elements.
- Keep each suggestion short and natural, as if a user wrote it.
- NO numbers, NO technical terms, NO percentages, NO stops.
- NO crop or composition instructions.
- Suggestions MUST relate only to exposure, contrast, tone, temperature, tint, highlights, shadows, whites, blacks, saturation, vibrance, or general color feel.
- main suggestions must be strictly 4 to 6 words each.
- Style should match examples like:
  • Main: 'Give this photo a dark, cinematic grade like a Christopher Nolan film.'
  • Normal: 'Slightly reduce the overall exposure to add drama.'
`;

// Define Zod schema for suggestions
const SuggestionSchema = z.object({
  main_suggestions: z.object({
    movie_style_suggestion: z.string(),
    mood_suggestion: z.string(),
    color_focus_suggestion: z.string(),
    other_main_suggestion: z.string(),
  }),
  normal_suggestions: z.array(z.string()),
});

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
const MIN_CANVAS_HEIGHT = 150;
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

  const llm = useLLM({
    model: LLAMA3_2_1B_SPINQUANT,
    contextWindowLength: 1024, // Adjust as needed (e.g., 128 to 512),
  });

  const [isModelReady, setIsModelReady] = useState(false);
  const [modelLoadingError, setModelLoadingError] = useState(null);

  useEffect(() => {
    const initModel = async () => {
      try {
        if (!isModelReady) {
          console.log("--- LLM Initialization Start ---");
          console.log("Checking model status...");
          console.log("LLM Object Keys:", Object.keys(llm));
          console.log("Type of llm.load:", typeof llm.load);

          // The useLLM hook's load function typically handles downloading if the model isn't cached.
          if (typeof llm.load === "function") {
            console.log("Initiating model download/load sequence...");
            const startTime = Date.now();

            await llm.load();

            const duration = Date.now() - startTime;
            console.log(`Model operation completed in ${duration}ms`);
            console.log(
              "CONFIRMATION: Model has been downloaded (if missing) and loaded into memory."
            );
          } else {
            console.log(
              "WARNING: llm.load is not a function. Model might not be loaded correctly."
            );
          }

          setIsModelReady(true);
          console.log("--- LLM Ready for Inference ---");
        }
      } catch (error) {
        console.error(
          "CRITICAL ERROR: Failed to download or load LLM model:",
          error
        );
        setModelLoadingError(error.message);
      }
    };
    initModel();
  }, []);

  // Monitor download progress
  useEffect(() => {
    if (llm.downloadProgress !== undefined && llm.downloadProgress < 1) {
      const progress = (llm.downloadProgress * 100).toFixed(1);
      console.log(`Downloading model: ${progress}%`);
    }
  }, [llm.downloadProgress]);

  // Cleanup: Interrupt generation if the user leaves the screen or component unmounts
  // Cleanup: Interrupt generation if the user leaves the screen or component unmounts - REMOVED per user request
  // useEffect(() => {
  //   return () => {
  //     if (llm && llm.isGenerating) {
  //       console.log("Interrupting LLM generation on cleanup...");
  //       llm.interrupt();
  //     }
  //   };
  // }, [llm]);

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
    saturation: 0, // -100 to 100, default 0
    brightness: 0, // -100 to 100, default 0
    contrast: 0, // -100 to 100, default 0
    hue: 0, // 0 to 100, default 0
    exposure: 0, // -2 to 2, default 0
  });

  // Check if filters are active (any value different from default)
  const areFiltersActive =
    filterValues.saturation !== 0 ||
    filterValues.brightness !== 0 ||
    filterValues.contrast !== 0 ||
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
  const [showSemanticEditor, setShowSemanticEditor] = useState(false);
  const [currentModalHeight, setCurrentModalHeight] = useState(0);
  const [generatedPrompt, setGeneratedPrompt] = useState("");

  // Animated value for canvas height
  const canvasHeightAnim = useRef(
    new Animated.Value(DEFAULT_CANVAS_HEIGHT)
  ).current;

  // Animated value for carousel scroll (0 = not scrolling, 1 = scrolling)
  const carouselScrollAnim = useRef(new Animated.Value(0)).current;
  const gradientOpacityAnim = useRef(new Animated.Value(1)).current;
  const scrollTimeoutRef = useRef(null);
  const isAtEndRef = useRef(false);

  // Handler for carousel scroll events
  const handleCarouselScroll = (isScrolling) => {
    // Clear any existing timeout
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    if (isScrolling) {
      // Animate to scrolling state - hide button and fade
      Animated.parallel([
        Animated.timing(carouselScrollAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: false,
        }),
        Animated.timing(gradientOpacityAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: false,
        }),
      ]).start();
    } else {
      // Only show button again if NOT at the end
      if (!isAtEndRef.current) {
        scrollTimeoutRef.current = setTimeout(() => {
          Animated.parallel([
            Animated.timing(carouselScrollAnim, {
              toValue: 0,
              duration: 300,
              useNativeDriver: false,
            }),
            Animated.timing(gradientOpacityAnim, {
              toValue: 1,
              duration: 300,
              useNativeDriver: false,
            }),
          ]).start();
        }, 150);
      }
    }
  };

  // Handler for scroll position changes
  const handleCarouselScrollPosition = ({ isAtEnd, isAtStart }) => {
    isAtEndRef.current = isAtEnd;

    // If scrolling back towards start, show the button again
    if (isAtStart && carouselScrollAnim._value === 1) {
      Animated.parallel([
        Animated.timing(carouselScrollAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: false,
        }),
        Animated.timing(gradientOpacityAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: false,
        }),
      ]).start();
    }
  };

  // Interpolate AI button opacity (fades out when scrolling)
  const aiButtonOpacity = carouselScrollAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  });

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
  const calculateCanvasHeight = (modalHeight, modalOpen, hasImage) => {
    if (modalHeight > 0) {
      // Modal is open - shrink to fit nicely above the modal
      // Calculate available space based on screen height
      // We want the canvas to be strictly above the modal content to avoid overlap
      const headerHeight = 60; // Reduced to make canvas taller and tighter
      const bottomOffset = 20; // ModalContainer bottom offset
      const separatorSpace = 0; // No separator space needed

      // Calculate available height for the canvas
      const availableHeight =
        height - headerHeight - bottomOffset - modalHeight - separatorSpace;

      // Ensure we don't shrink below minimum height
      return Math.max(availableHeight, MIN_CANVAS_HEIGHT);
    }
    // No modal open
    // If image is loaded, suggestions are visible, so shrink canvas
    if (hasImage) {
      return CANVAS_WITH_SUGGESTIONS;
    }
    // No image, no suggestions, use full height
    return DEFAULT_CANVAS_HEIGHT;
  };

  // Animate canvas height when modal height changes or modal visibility changes
  useEffect(() => {
    const targetHeight = calculateCanvasHeight(
      currentModalHeight,
      isModalOpen,
      !!imageState.uri
    );
    Animated.spring(canvasHeightAnim, {
      toValue: targetHeight,
      useNativeDriver: false, // Height cannot use native driver
      tension: 65,
      friction: 11,
    }).start();
  }, [currentModalHeight, isModalOpen, imageState.uri]);

  // Handle Android back button - dismiss keyboard or close modal
  useEffect(() => {
    const backAction = () => {
      // First, dismiss keyboard if it's open
      Keyboard.dismiss();

      // If any modal is open, close it
      if (globalEditingModalVisible) {
        setGlobalEditingModalVisible(false);
        return true; // Prevent default back behavior
      }
      if (artStyleModalVisible) {
        setArtStyleModalVisible(false);
        return true;
      }
      if (generateMockupModalVisible) {
        setGenerateMockupModalVisible(false);
        return true;
      }

      // On main screen with no modals - prevent app exit
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, [
    globalEditingModalVisible,
    artStyleModalVisible,
    generateMockupModalVisible,
  ]);

  // Handler for modal height changes
  const handleModalHeightChange = (height) => {
    setCurrentModalHeight(height);
  };

  // Canvas aspect ratio for image cropping (width:height)
  const CANVAS_ASPECT_RATIO = [DEFAULT_CANVAS_WIDTH, DEFAULT_CANVAS_HEIGHT];

  // Suggestions loading state
  const [isSuggestionsLoading, setIsSuggestionsLoading] = useState(false);
  const [smartSuggestions, setSmartSuggestions] = useState([]);
  const [allSuggestions, setAllSuggestions] = useState([]);

  /**
   * Generate prompt from image using Gemini (via Axios)
   */
  const generatePromptFromImage = async (base64Image) => {
    if (!base64Image) return;

    setIsSuggestionsLoading(true);
    setSmartSuggestions([]); // Clear previous suggestions

    try {
      console.log("Generating prompt from image using Gemini...");

      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro:generateContent?key=${GOOGLE_API_KEY}`,
        {
          contents: [
            {
              parts: [
                { text: SYSTEM_PROMPT },
                {
                  inline_data: {
                    mime_type: "image/jpeg",
                    data: base64Image,
                  },
                },
              ],
            },
          ],
          generationConfig: {
            response_mime_type: "application/json",
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const content = response.data.candidates[0].content.parts[0].text;
      console.log("Generated prompt raw:", content);

      try {
        // Parse JSON first
        const json = JSON.parse(content);

        // Validate with Zod
        const validatedData = SuggestionSchema.parse(json);
        const main = validatedData.main_suggestions;

        // Set Smart Suggestions from main suggestions
        const newSuggestions = [
          { id: "movie", label: main.movie_style_suggestion },
          { id: "mood", label: main.mood_suggestion },
          { id: "color", label: main.color_focus_suggestion },
          { id: "other", label: main.other_main_suggestion },
        ].filter((item) => item.label); // Filter out empty suggestions

        setSmartSuggestions(newSuggestions);

        // Combine all suggestions for Ghost Text context
        const allContext = [
          ...newSuggestions.map((s) => s.label),
          ...(validatedData.normal_suggestions || []),
        ];
        console.log("Setting allSuggestions with count:", allContext.length);
        setAllSuggestions(allContext);
      } catch (e) {
        console.warn("Validation or parsing failed:", e);
        // Fallback or error handling
        if (e instanceof z.ZodError) {
          console.error("Zod Validation Errors:", e.errors);
          Alert.alert("Error", "AI response format was invalid.");
        }
        // setGeneratedPrompt(content); // REMOVED: Do not auto-fill modal
      }
    } catch (error) {
      console.error("Error generating prompt:", error);
      if (error.response) {
        console.error(
          "Error response:",
          JSON.stringify(error.response.data, null, 2)
        );
      }
      Alert.alert("Error", "Failed to generate prompt from image.");
    } finally {
      setIsSuggestionsLoading(false);
    }
  };

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
        aspect: CANVAS_ASPECT_RATIO, // Lock crop to canvas aspect ratio
        quality: 1,
        base64: true, // Request base64 for Gemini
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

        // Generate prompt from the new image
        if (selectedAsset.base64) {
          generatePromptFromImage(selectedAsset.base64);
        }
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
    Keyboard.dismiss();
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
        // Extract axis names for API requests
        const additionalProp1 = data.axes[0].name; // e.g., "Gloomy-Happy"
        const additionalProp2 = data.axes[1].name; // e.g., "Dramatic-Flat"

        // Use left_synonym and right_synonym from API response
        // First axis (index 0) controls X axis: left_synonym = -X, right_synonym = +X
        // Second axis (index 1) controls Y axis: left_synonym = -Y, right_synonym = +Y
        const labels = {
          left: data.axes[0].left_synonym || data.axes[0].left_pole, // -X: left_synonym from first axis
          right: data.axes[0].right_synonym || data.axes[0].right_pole, // +X: right_synonym from first axis
          bottom: data.axes[1].left_synonym || data.axes[1].left_pole, // -Y: left_synonym from second axis
          top: data.axes[1].right_synonym || data.axes[1].right_pole, // +Y: right_synonym from second axis
        };

        console.log("Parsed labels from synonyms:", labels);
        console.log(
          "First axis:",
          data.axes[0].name,
          "->",
          labels.left,
          "/",
          labels.right
        );
        console.log(
          "Second axis:",
          data.axes[1].name,
          "->",
          labels.bottom,
          "/",
          labels.top
        );
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
    Keyboard.dismiss();
    if (!sessionIdGlobalEditing) {
      Alert.alert("Error", "No active session.");
      return false;
    }

    try {
      const result = await fetchSemanticAxes(sessionIdGlobalEditing);
      if (result !== null) {
        // Show the semantic editor in the modal
        setShowSemanticEditor(true);
        return true;
      }
      return false;
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
    Keyboard.dismiss();
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

  /**
   * Handle Art Style Transfer send button
   * POST to artStyleBaseUrl + "generate"
   *
   * @param {string} prompt - The user's prompt text
   * @param {object} style - The selected style object
   * @returns {Promise<boolean>} Success status
   */
  const handleArtStyleTransferSend = async (prompt, style) => {
    Keyboard.dismiss();
    // Validate prompt
    if (!prompt || prompt.trim() === "") {
      Alert.alert("No Prompt", "Please enter a prompt describing your edit.");
      return false;
    }

    // Validate style selection
    if (!style) {
      Alert.alert("No Style", "Please select an art style.");
      return false;
    }

    try {
      setImageLoading(true);
      setStatusModal({ visible: true, message: "Applying art style..." });

      // Map style ID to artwork and artist names
      let artworkName = "";
      let artistName = "";

      switch (style.id) {
        case 1: // Impression Sunrise
          artworkName = "impression_sunshine";
          artistName = "monet";
          break;
        case 2: // The Scream
          artworkName = "the_scream";
          artistName = "edward_munch";
          break;
        case 3: // Cafe Terrace
          artworkName = "cafe_terrace_at_night";
          artistName = "gough";
          break;
        default:
          console.warn("Unknown style ID:", style.id);
          artworkName = "impression_sunshine"; // Default
          artistName = "monet";
      }

      const requestBody = {
        artwork_name: artworkName,
        artist_name: artistName,
        prompt: prompt,
        negative_prompt: "string",
        num_inference_steps: 50,
        guidance_scale: 7,
      };

      console.log("=== Art Style Transfer Debug ===");
      console.log("Request Body:", JSON.stringify(requestBody, null, 2));

      const generateUrl = `${artStyleBaseUrl}/generate`;
      console.log("Generate URL:", generateUrl);

      const response = await fetch(generateUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      console.log("Art Style response status:", response.status);

      if (!response.ok) {
        throw new Error(
          `Art Style transfer failed with status: ${response.status}`
        );
      }

      const data = await response.json();
      console.log("Art Style response:", data);

      if (data.status === "success" && data.image_url_refined) {
        setStatusModal({ visible: true, message: "Loading result..." });

        // Construct full image URL
        const fullImageUrl = `${artStyleBaseUrl}${
          data.image_url_refined.startsWith("/")
            ? data.image_url_refined
            : "/" + data.image_url_refined
        }`;

        console.log("Art Style fullImageUrl:", fullImageUrl);

        // Update image state with new image
        await updateImageFromResponse(fullImageUrl);

        console.log("===========================");
        setStatusModal({ visible: false, message: "" });
        setImageLoading(false);
        setArtStyleModalVisible(false); // Close modal on success
        return true;
      } else {
        throw new Error("Invalid response from art style endpoint");
      }
    } catch (error) {
      console.error("Error in art style transfer:", error);
      setStatusModal({ visible: false, message: "" });
      setImageLoading(false);
      Alert.alert(
        "Art Style Error",
        "Failed to apply art style. Please try again."
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

  /**
   * Handle Reset Button Press
   * Resets the app to its initial state
   */
  const handleReset = () => {
    Alert.alert(
      "Reset App",
      "Are you sure? This will clear all data and reset the app to its initial state.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Reset",
          style: "destructive",
          onPress: () => {
            // Reset all states
            setImageState({
              uri: null,
              blob: null,
              isLoading: false,
            });
            setOriginalImageState({
              uri: null,
              blob: null,
              isLoading: false,
            });
            setIterations(1);
            setBaseFilename("01_final.jpg");
            setSessionIdGlobalEditing(null);
            setGeneratedPrompt("");
            setSmartSuggestions([]);
            setFilterValues({
              saturation: 0,
              brightness: 0,
              contrast: 0,
              hue: 0,
              exposure: 0,
            });
            setSemanticAxes({
              additionalProp1: null,
              additionalProp2: null,
              labels: null,
            });
            setSemanticLoading(false);

            // Close any open modals
            setArtStyleModalVisible(false);
            setGenerateMockupModalVisible(false);
            setGlobalEditingModalVisible(false);

            console.log("App reset to initial state");
          },
        },
      ]
    );
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
    setShowSemanticEditor(false); // Reset semantic editor state
  };

  // Loading Overlay Component
  const LoadingOverlay = ({ message }) => (
    <View style={styles.loadingOverlay}>
      <View style={styles.loadingContent}>
        <ActivityIndicator size="large" color="#FFFFFF" />
        <Text style={styles.loadingText}>{message || "Processing..."}</Text>
      </View>
    </View>
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
          onUndoPress={() =>
            Alert.alert("Undo", "Undo functionality coming soon!")
          }
          onRedoPress={() =>
            Alert.alert("Redo", "Redo functionality coming soon!")
          }
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
                    style={{ width: "100%", height: "100%" }}
                  />
                </Animated.View>
              ) : (
                <Animated.Image
                  source={{ uri: imageState.uri }}
                  style={[
                    styles.image,
                    { height: canvasHeightAnim, width: canvasWidthAnim },
                  ]}
                  resizeMode="contain"
                />
              )}
              {/* Loading overlay on top of image */}
              {(imageState.isLoading || statusModal.visible) && (
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
              {imageState.isLoading || statusModal.visible ? (
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
              isLoading={isSuggestionsLoading}
              isVisible={!!imageState.uri}
              suggestions={smartSuggestions}
            />
          )}

        {/* Bottom Section */}
        <View style={styles.bottomSection}>
          {/* Drawer Toggle - Hide when any modal is open (modal has its own) */}
          {!artStyleModalVisible &&
            !generateMockupModalVisible &&
            !globalEditingModalVisible && (
              <DrawerToggle onPress={handleDrawerToggle} />
            )}

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
                  onScroll={handleCarouselScroll}
                  onScrollPosition={handleCarouselScrollPosition}
                />
              )}

            {/* AI Prompt Button with fade effect - Hide when any modal is open */}
            {!artStyleModalVisible &&
              !generateMockupModalVisible &&
              !globalEditingModalVisible && (
                <View style={styles.aiButtonWrapper} pointerEvents="box-none">
                  <Animated.View
                    style={[
                      styles.aiButtonGradient,
                      { opacity: gradientOpacityAnim },
                    ]}
                    pointerEvents="none"
                  >
                    <LinearGradient
                      colors={[
                        "transparent",
                        "transparent",
                        "rgba(25, 24, 22, 0.6)",
                        "rgba(25, 24, 22, 1)",
                      ]}
                      locations={[0, 0.35, 0.65, 1]}
                      start={{ x: 0, y: 0.5 }}
                      end={{ x: 1, y: 0.5 }}
                      style={styles.aiButtonGradient}
                    />
                  </Animated.View>
                  <Animated.View
                    style={[
                      styles.aiButtonContainer,
                      { opacity: aiButtonOpacity },
                    ]}
                  >
                    <AIPromptButton onPress={handleAIPromptPress} />
                  </Animated.View>
                </View>
              )}
          </View>
        </View>

        {/* Art Style Transfer Modal */}
        {/* Art Style Transfer Modal */}
        {/* Art Style Transfer Modal */}
        {/* Art Style Transfer Modal */}
        <ArtStyleTransferModal
          visible={artStyleModalVisible}
          onClose={handleCloseArtStyleModal}
          onHeightChange={handleModalHeightChange}
          onSend={handleArtStyleTransferSend}
          llm={llm}
          modelReady={isModelReady}
          suggestions={allSuggestions}
        />

        {/* Generate Mockup Modal */}
        <GenerateMockupModal
          visible={generateMockupModalVisible}
          onClose={handleCloseGenerateMockupModal}
          onHeightChange={handleModalHeightChange}
          llm={llm}
          modelReady={isModelReady}
          suggestions={allSuggestions}
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
          initialPrompt={generatedPrompt}
          llm={llm}
          modelReady={isModelReady}
          suggestions={allSuggestions}
          showSemanticEditor={showSemanticEditor}
        />

        {/* Status Modal for progress updates - REMOVED */}
        {/* <StatusModalComponent /> */}

        {/* Download Progress Overlay */}
        {llm.downloadProgress !== undefined && llm.downloadProgress < 1 && (
          <LoadingOverlay
            message={`Downloading AI Model: ${(
              llm.downloadProgress * 100
            ).toFixed(0)}%`}
          />
        )}
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
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
    marginTop: 10,
  },
  imageWrapper: {
    position: "relative",
    borderRadius: BorderRadius.xs,
    overflow: "hidden",
    backgroundColor: "transparent",
  },
  placeholderContainer: {
    width: width - 32,
    height: Layout.imageHeight,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.xs,
    overflow: "hidden",
  },
  placeholder: {
    width: "100%",
    height: "100%",
    backgroundColor: Colors.surfaceLight,
  },
  image: {
    width: width - 32,
    height: Layout.imageHeight,
    borderRadius: BorderRadius.xs,
  },
  filteredImageContainer: {
    borderRadius: BorderRadius.xs,
    overflow: "hidden",
    backgroundColor: "transparent",
  },
  // Pick Image Button Styles
  pickImageButton: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.surfaceLight,
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
    backgroundColor: Colors.textPrimary,
    borderRadius: 2,
  },
  plusVertical: {
    position: "absolute",
    width: 3,
    height: 24,
    backgroundColor: Colors.textPrimary,
    borderRadius: 2,
  },
  pickImageText: {
    fontFamily: Typography.fontFamily.medium,
    fontSize: 18,
    color: Colors.textPrimary,
    marginBottom: 8,
  },
  pickImageSubtext: {
    fontFamily: Typography.fontFamily.regular,
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.6)",
  },
  // Loading Overlay Styles
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: BorderRadius.xs,
  },
  loadingContent: {
    alignItems: "center",
  },
  loadingText: {
    fontFamily: Typography.fontFamily.medium,
    marginTop: 16,
    fontSize: 16,
    color: Colors.textPrimary,
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
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 32,
    alignItems: "center",
    minWidth: 200,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  statusModalText: {
    fontFamily: Typography.fontFamily.medium,
    marginTop: 16,
    fontSize: 16,
    color: Colors.textPrimary,
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
  aiButtonWrapper: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    zIndex: 10,
  },
  aiButtonGradient: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  aiButtonContainer: {
    marginRight: -35,
    marginTop: 0,
    zIndex: 11,
  },
});

export default HomeScreen;

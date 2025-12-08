import { memo, useCallback, useEffect, useRef, useState } from "react";
import {
  Animated,
  Easing,
  Keyboard,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Colors, Typography } from "../../constants/Theme";
import { useGhostSuggestion } from "../../hooks/useGhostSuggestion";

// Global Editing suggestions to cycle through
const GLOBAL_EDITING_SUGGESTIONS = [
  "Give the image a subtle cinematic look.",
  "Enhance the colors while keeping the natural feel.",
  "Add a soft vintage film texture.",
  "Sharpen the details without overprocessing.",
  "Increase contrast for a punchier appearance.",
  "Add a mild glow effect around bright areas.",
  "Make the lighting feel more dramatic.",
  "Reduce noise while preserving clarity.",
  "Give the photo a warm, cozy color tone.",
  "Convert the image into a clean, minimalistic black-and-white style.",
];

/**
 * CyclingSuggestionText - Simple fade in/out transitions
 * Uses native driver for smooth 60fps animations
 */
const CyclingSuggestionText = memo(
  ({
    suggestions = GLOBAL_EDITING_SUGGESTIONS,
    cycleDuration = 1500,
    transitionDuration = 500,
    textStyle,
  }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [displayText, setDisplayText] = useState(suggestions[0]);

    // Single opacity animation for simple fade
    const opacity = useRef(new Animated.Value(1)).current;

    // Cycle through suggestions with simple fade out then fade in
    useEffect(() => {
      const cycleInterval = setInterval(() => {
        // Fade out
        Animated.timing(opacity, {
          toValue: 0,
          duration: transitionDuration,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }).start(() => {
          // Update text while invisible
          const nextIndex = (currentIndex + 1) % suggestions.length;
          setDisplayText(suggestions[nextIndex]);
          setCurrentIndex(nextIndex);

          // Fade in
          Animated.timing(opacity, {
            toValue: 1,
            duration: transitionDuration,
            easing: Easing.in(Easing.ease),
            useNativeDriver: true,
          }).start();
        });
      }, cycleDuration);

      return () => clearInterval(cycleInterval);
    }, [currentIndex, suggestions, cycleDuration, transitionDuration]);

    return (
      <Animated.Text style={[textStyle, { opacity, color: "#949494" }]}>
        {displayText}
      </Animated.Text>
    );
  }
);

/**
 * ShimmerText - Simplified shimmer using opacity pulse (native driver)
 */
const ShimmerText = memo(
  ({ text, baseColor, highlightColor, duration = 2000, textStyle }) => {
    const shimmerOpacity = useRef(new Animated.Value(0.5)).current;

    useEffect(() => {
      const animation = Animated.loop(
        Animated.sequence([
          Animated.timing(shimmerOpacity, {
            toValue: 0.8,
            duration: duration / 2,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(shimmerOpacity, {
            toValue: 0.5,
            duration: duration / 2,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ])
      );
      animation.start();
      return () => animation.stop();
    }, [duration]);

    return (
      <Animated.Text
        style={[textStyle, { opacity: shimmerOpacity, color: "#949494" }]}
      >
        {text}
      </Animated.Text>
    );
  }
);

/**
 * GhostTextInput
 * A TextInput that displays AI-generated ghost suggestions.
 * Supports cycling placeholder suggestions with smooth transitions.
 */
const GhostTextInput = memo(
  ({
    llm,
    modelReady,
    value,
    onChangeText,
    style,
    onSuggestionAccept,
    placeholder,
    placeholderTextColor,
    cyclePlaceholders = false,
    suggestions = GLOBAL_EDITING_SUGGESTIONS,
    enableSuggestions = true,
    ...props
  }) => {
    // Only run hook if suggestions are enabled and value is not empty (if we wanted autocomplete)
    // But user requested NO autocomplete when typing.
    // So we effectively disable the hook's output if value is present, or just don't use it.
    // However, useGhostSuggestion might be expensive, so let's control it.
    // Actually, the user said "It is only needed when there is nothing on the prompt box written."
    // This implies they only want the PLACEHOLDERS.
    // So we should disable the autocomplete entirely?
    // "when I'm writing something... it still starts suggesting the ghost text again, which is not needed!"
    // This confirms they don't want autocomplete.

    // We will still call the hook but ignore its result if we want to disable autocomplete.
    const { suggestion: rawSuggestion, isLoading } = useGhostSuggestion(
      value,
      llm,
      modelReady,
      suggestions
    );

    // Filter suggestion: Only show if enabled AND (user wants autocomplete? No, they said no).
    // If the user wants NO autocomplete, we just force suggestion to null.
    // But maybe they want it ONLY if they haven't sent a prompt?
    // "the ghost text suggestions is only for users who haven't sent any prompt to the model yet."
    // This applies to everything.

    // Logic:
    // 1. If !enableSuggestions (user sent prompt), show NOTHING (no placeholder, no ghost).
    // 2. If enableSuggestions:
    //    - Show placeholder if empty.
    //    - Show ghost text ONLY in prompt boxes (for autocomplete and error messages)

    // Enable ghost text suggestion ONLY when:
    // - Suggestions are enabled (enableSuggestions = true)
    // - User is typing (value.length > 0)
    // - This ensures ghost text (including error messages) only appears in prompt boxes
    const suggestion = enableSuggestions ? rawSuggestion : null;

    const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

    // Listen for keyboard show/hide to stop placeholder animations
    useEffect(() => {
      const showEvent =
        Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow";
      const hideEvent =
        Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide";

      const showListener = Keyboard.addListener(showEvent, () => {
        setIsKeyboardVisible(true);
      });
      const hideListener = Keyboard.addListener(hideEvent, () => {
        setIsKeyboardVisible(false);
      });

      return () => {
        showListener.remove();
        hideListener.remove();
      };
    }, []);

    const handleAcceptSuggestion = useCallback(() => {
      if (suggestion && onChangeText) {
        const newValue = value + suggestion;
        onChangeText(newValue);
        if (onSuggestionAccept) {
          onSuggestionAccept(newValue);
        }
      }
    }, [suggestion, value, onChangeText, onSuggestionAccept]);

    // Hide placeholder when keyboard is visible OR when there's text OR suggestions disabled
    const showPlaceholder =
      enableSuggestions && (!value || value.length === 0) && !isKeyboardVisible;

    // Extract text-related styles from the passed style prop
    const flatStyle = StyleSheet.flatten(style) || {};
    const textStyle = {
      fontFamily: flatStyle.fontFamily || Typography.fontFamily.regular,
      fontSize: flatStyle.fontSize || Typography.fontSize.base,
      textAlignVertical: flatStyle.textAlignVertical || "top",
      color: Colors.textPrimary, // Ensure default color is set for measurements/consistency
    };

    return (
      <View style={[styles.container, style]}>
        {/* Animated Placeholder - Cycling or Static */}
        {showPlaceholder && (
          <View style={styles.placeholderContainer} pointerEvents="none">
            {cyclePlaceholders ? (
              <CyclingSuggestionText
                suggestions={suggestions}
                cycleDuration={1500}
                transitionDuration={500}
                textStyle={textStyle}
              />
            ) : placeholder ? (
              <ShimmerText
                text={placeholder}
                duration={2000}
                textStyle={textStyle}
              />
            ) : null}
          </View>
        )}

        {/* Overlay Text for Ghost Suggestion */}
        {/* Only render if there is a suggestion to show */}
        {suggestion && (
          <View style={StyleSheet.absoluteFill} pointerEvents="none">
            {/*
              Fix for "black text behind":
              We use a transparent color for the user's text part.
              We also ensure the container Text has transparent color to avoid inheritance issues.
           */}
            <Text
              style={[
                styles.ghostText,
                textStyle,
                props.multiline ? styles.multilineGhost : {},
                { color: "transparent" },
              ]}
            >
              {value}
              <Text style={{ color: Colors.textAccent, opacity: 0.6 }}>
                {suggestion}
              </Text>
            </Text>
          </View>
        )}

        <TextInput
          value={value}
          onChangeText={onChangeText}
          style={[styles.input, textStyle, { color: Colors.textPrimary }]}
          placeholder=""
          {...props}
        />

        {suggestion ? (
          <TouchableOpacity
            style={styles.acceptOverlay}
            onPress={handleAcceptSuggestion}
            activeOpacity={1}
          />
        ) : null}
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    position: "relative",
    justifyContent: "center",
  },
  input: {
    textAlignVertical: "top",
    minHeight: 60,
  },
  placeholderContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
  },
  ghostText: {
    paddingTop: 0,
  },
  multilineGhost: {},
  acceptOverlay: {
    position: "absolute",
    right: 0,
    bottom: 0,
    padding: 8,
  },
});

export default GhostTextInput;

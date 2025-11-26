import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
  Colors,
  Spacing,
  Typography,
  BorderRadius,
} from "../../constants/Theme";
import ModalBottomSheet from "./ModalBottomSheet";
import StyleGallery from "./StyleGallery";
import PromptInputArea from "./PromptInputArea";
import {
  AddIcon,
  RefineIcon,
  SendIcon,
  DropdownIcon,
  ReferenceIcon,
} from "../icons/ModalIcons";

/**
 * ArtStyleTransferModal - Main modal for art style transfer feature
 * 
 * Three states:
 * 1. Gallery View - Grid of style tiles with search
 * 2. Prompt Expanded - Text input with reference chips
 * 3. Prompt Minimized - Collapsed "Choose Art Style" button
 */
const ArtStyleTransferModal = ({ visible, onClose }) => {
  const [modalState, setModalState] = useState("gallery"); // 'gallery', 'prompt', 'minimized'
  const [selectedStyles, setSelectedStyles] = useState([]);
  const [references, setReferences] = useState([]);
  const [promptText, setPromptText] = useState("");

  // Placeholder functions for AI implementation
  const handleStyleSelect = (styleId) => {
    // TODO: AI style transfer implementation
    if (selectedStyles.includes(styleId)) {
      setSelectedStyles(selectedStyles.filter((id) => id !== styleId));
    } else {
      setSelectedStyles([...selectedStyles, styleId]);
      // When a style is selected, show it as a reference in prompt view
      setReferences([...references, { id: styleId, name: `Style ${styleId}` }]);
      setModalState("prompt");
    }
  };

  const handleRemoveReference = (index) => {
    // TODO: Update AI context
    const newReferences = [...references];
    newReferences.splice(index, 1);
    setReferences(newReferences);
  };

  const handleFindSimilar = () => {
    // TODO: AI similarity search
    console.log("Find Similar clicked");
  };

  const handleRefine = () => {
    // TODO: AI refinement
    console.log("Refine clicked");
  };

  const handleSend = () => {
    // TODO: AI prompt processing
    console.log("Send clicked:", promptText);
  };

  const handleVoiceInput = () => {
    // TODO: Voice AI integration
    console.log("Voice input clicked");
  };

  const handleSwitcherPress = () => {
    // Toggle between gallery and prompt states
    if (modalState === "gallery") {
      setModalState("prompt");
    } else {
      setModalState("gallery");
    }
  };

  const handleMinimize = () => {
    setModalState("minimized");
  };

  const handleExpand = () => {
    setModalState(references.length > 0 ? "prompt" : "gallery");
  };

  // Dynamic height based on state
  const getModalHeight = () => {
    switch (modalState) {
      case "gallery":
        return 420;
      case "prompt":
        return 380;
      case "minimized":
        return 200;
      default:
        return 420;
    }
  };

  return (
    <ModalBottomSheet visible={visible} onClose={onClose} height={getModalHeight()}>
      <View style={styles.container}>
        {/* Main Content Container */}
        <View style={styles.contentContainer}>
          {/* Header - Switcher */}
          <TouchableOpacity
            style={styles.switcher}
            onPress={handleSwitcherPress}
            activeOpacity={0.7}
          >
            <Text style={styles.switcherText}>Art Style Transfer</Text>
            <DropdownIcon size={16} color={Colors.textAccent} />
          </TouchableOpacity>

          {/* Content based on state */}
          {modalState === "gallery" && (
            <View style={styles.galleryContainer}>
              <StyleGallery
                onStyleSelect={handleStyleSelect}
                selectedStyles={selectedStyles}
              />
              
              {/* Bottom Actions for Gallery */}
              <View style={styles.actionsRow}>
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={handleFindSimilar}
                  activeOpacity={0.7}
                >
                  <AddIcon size={16} color={Colors.textAccent} />
                  <Text style={styles.actionButtonText}>Find Similar</Text>
                </TouchableOpacity>

                <View style={styles.rightActions}>
                  <TouchableOpacity
                    style={styles.refineButton}
                    onPress={handleRefine}
                    activeOpacity={0.7}
                  >
                    <RefineIcon size={16} color={Colors.textAccent} />
                    <Text style={styles.buttonText}>Refine</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.sendButton}
                    onPress={handleSend}
                    activeOpacity={0.7}
                  >
                    <SendIcon size={44} color={Colors.aiPrimary} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}

          {modalState === "prompt" && (
            <PromptInputArea
              references={references}
              onRemoveReference={handleRemoveReference}
              promptText={promptText}
              onPromptChange={setPromptText}
              onFindSimilar={handleFindSimilar}
              onRefine={handleRefine}
              onSend={handleSend}
              placeholder="Can you make this scene more gloomy"
              leftButtonLabel="Find Similar"
              leftButtonIcon="🔍"
            />
          )}

          {modalState === "minimized" && (
            <TouchableOpacity
              style={styles.expandButton}
              onPress={handleExpand}
              activeOpacity={0.7}
            >
              <ReferenceIcon size={16} color={Colors.textAccent} />
              <Text style={styles.expandButtonText}>Choose Art Style</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </ModalBottomSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 22.5,
    paddingBottom: 20,
    paddingTop: Spacing.md,
  },
  contentContainer: {
    backgroundColor: Colors.modalBackground,
    borderWidth: 0.681,
    borderColor: Colors.modalBorder,
    borderRadius: 24,
    padding: Spacing.md,
    gap: Spacing.xxl,
  },
  switcher: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
    backgroundColor: Colors.glassBackground,
    borderWidth: 0.681,
    borderColor: Colors.glassBorder,
    borderRadius: BorderRadius.pill,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    alignSelf: "flex-start",
  },
  switcherText: {
    fontFamily: Typography.fontFamily.regular,
    fontSize: Typography.fontSize.base,
    color: Colors.textAccent,
    letterSpacing: Typography.letterSpacing.normal,
  },
  galleryContainer: {
    gap: Spacing.md,
  },
  actionsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: Spacing.md,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: Colors.glassBackground,
    borderWidth: 0.681,
    borderColor: Colors.glassBorder,
    borderRadius: BorderRadius.pill,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.lg,
    height: 36,
  },
  actionButtonText: {
    fontFamily: Typography.fontFamily.regular,
    fontSize: Typography.fontSize.base,
    color: Colors.textAccent,
    letterSpacing: Typography.letterSpacing.normal,
  },
  rightActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.md,
  },
  refineButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "rgba(47, 44, 45, 0.9)",
    borderWidth: 0.681,
    borderColor: Colors.glassBorder,
    borderRadius: BorderRadius.pill,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.lg,
    height: 36,
  },
  buttonText: {
    fontFamily: Typography.fontFamily.regular,
    fontSize: Typography.fontSize.base,
    color: Colors.textAccent,
    letterSpacing: Typography.letterSpacing.normal,
  },
  sendButton: {
    width: 44,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
  },
  expandButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: Colors.glassBackground,
    borderWidth: 0.681,
    borderColor: Colors.glassBorder,
    borderRadius: BorderRadius.pill,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.lg,
    height: 36,
  },
  expandButtonText: {
    fontFamily: Typography.fontFamily.regular,
    fontSize: Typography.fontSize.base,
    color: Colors.textAccent,
    letterSpacing: Typography.letterSpacing.normal,
  },
});

export default ArtStyleTransferModal;


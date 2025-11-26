import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
  Colors,
  Spacing,
  Typography,
  BorderRadius,
} from "../../constants/Theme";
import ModalBottomSheet from "./ModalBottomSheet";
import VoiceButton from "./VoiceButton";
import MockupTemplateGallery from "./MockupTemplateGallery";
import PromptInputArea from "./PromptInputArea";

/**
 * GenerateMockupModal - Main modal for mockup generation feature
 * 
 * Three states:
 * 1. Template Gallery - Grid of mockup templates with search
 * 2. Prompt with References - Text input with 2 selected mockup references
 * 3. Add Product Image - Single reference with "Add Product Image" button
 */
const GenerateMockupModal = ({ visible, onClose }) => {
  const [modalState, setModalState] = useState("gallery"); // 'gallery', 'prompt', 'addProduct'
  const [selectedTemplates, setSelectedTemplates] = useState([]);
  const [references, setReferences] = useState([]);
  const [promptText, setPromptText] = useState("");

  // Placeholder functions for AI implementation
  const handleTemplateSelect = (templateId) => {
    // TODO: AI mockup generation implementation
    if (selectedTemplates.includes(templateId)) {
      setSelectedTemplates(selectedTemplates.filter((id) => id !== templateId));
    } else {
      setSelectedTemplates([...selectedTemplates, templateId]);
      // When a template is selected, show it as a reference in prompt view
      const newReferences = [...references, { id: templateId, name: `Template ${templateId}` }];
      setReferences(newReferences);
      
      // Switch to appropriate state based on number of references
      if (newReferences.length === 1) {
        setModalState("addProduct");
      } else {
        setModalState("prompt");
      }
    }
  };

  const handleRemoveReference = (index) => {
    // TODO: Update AI context
    const newReferences = [...references];
    newReferences.splice(index, 1);
    setReferences(newReferences);
    
    if (newReferences.length === 0) {
      setModalState("gallery");
    } else if (newReferences.length === 1) {
      setModalState("addProduct");
    }
  };

  const handleAddOwn = () => {
    // TODO: Add custom mockup template
    console.log("Add your own clicked");
  };

  const handleAddProduct = () => {
    // TODO: Add product image for mockup
    console.log("Add Product Image clicked");
  };

  const handleRefine = () => {
    // TODO: AI refinement
    console.log("Refine clicked");
  };

  const handleSend = () => {
    // TODO: AI prompt processing for mockup generation
    console.log("Send clicked:", promptText);
  };

  const handleVoiceInput = () => {
    // TODO: Voice AI integration
    console.log("Voice input clicked");
  };

  const handleSwitcherPress = () => {
    // Toggle between gallery and other states
    if (modalState === "gallery") {
      setModalState(references.length > 0 ? (references.length === 1 ? "addProduct" : "prompt") : "gallery");
    } else {
      setModalState("gallery");
    }
  };

  // Dynamic height based on state
  const getModalHeight = () => {
    switch (modalState) {
      case "gallery":
        return 450;
      case "prompt":
        return 380;
      case "addProduct":
        return 280;
      default:
        return 450;
    }
  };

  return (
    <ModalBottomSheet visible={visible} onClose={onClose} height={getModalHeight()}>
      <View style={styles.container}>
        {/* Voice Button */}
        <VoiceButton onPress={handleVoiceInput} />

        {/* Main Content Container */}
        <View style={styles.contentContainer}>
          {/* Header - Switcher */}
          <TouchableOpacity
            style={styles.switcher}
            onPress={handleSwitcherPress}
            activeOpacity={0.7}
          >
            <Text style={styles.switcherText}>Generate Mockup</Text>
            <Text style={styles.dropdownIcon}>▼</Text>
          </TouchableOpacity>

          {/* Content based on state */}
          {modalState === "gallery" && (
            <View style={styles.galleryContainer}>
              <MockupTemplateGallery
                onTemplateSelect={handleTemplateSelect}
                selectedTemplates={selectedTemplates}
              />
              
              {/* Bottom Actions for Gallery */}
              <View style={styles.actionsRow}>
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={handleAddOwn}
                  activeOpacity={0.7}
                >
                  <Text style={styles.actionButtonIcon}>➕</Text>
                  <Text style={styles.actionButtonText}>Add your own</Text>
                </TouchableOpacity>

                <View style={styles.rightActions}>
                  <TouchableOpacity
                    style={styles.refineButton}
                    onPress={handleRefine}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.refineIcon}>⚙️</Text>
                    <Text style={styles.buttonText}>Refine</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.sendButton}
                    onPress={handleSend}
                    activeOpacity={0.7}
                  >
                    <View style={styles.sendIconContainer}>
                      <Text style={styles.sendIcon}>➤</Text>
                    </View>
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
              onAddOwn={handleAddOwn}
              onRefine={handleRefine}
              onSend={handleSend}
              placeholder="Can you make this scene more gloomy"
              leftButtonLabel="Add your own"
              leftButtonIcon="➕"
            />
          )}

          {modalState === "addProduct" && (
            <PromptInputArea
              references={references}
              onRemoveReference={handleRemoveReference}
              promptText={promptText}
              onPromptChange={setPromptText}
              onRefine={handleRefine}
              onSend={handleSend}
              onAddProduct={handleAddProduct}
              placeholder="Can you make this scene more gloomy"
              showAddProductButton={true}
            />
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
    paddingBottom: 35,
    gap: Spacing.md,
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
    justifyContent: "space-between",
    backgroundColor: Colors.glassBackground,
    borderWidth: 0.681,
    borderColor: Colors.glassBorder,
    borderRadius: BorderRadius.pill,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
  },
  switcherText: {
    fontFamily: Typography.fontFamily.regular,
    fontSize: Typography.fontSize.base,
    color: Colors.textAccent,
    letterSpacing: Typography.letterSpacing.normal,
  },
  dropdownIcon: {
    fontSize: 12,
    color: Colors.textAccent,
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
  },
  actionButtonIcon: {
    fontSize: 14,
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
  },
  refineIcon: {
    fontSize: 14,
  },
  buttonText: {
    fontFamily: Typography.fontFamily.regular,
    fontSize: Typography.fontSize.base,
    color: Colors.textAccent,
    letterSpacing: Typography.letterSpacing.normal,
  },
  sendButton: {
    width: 52,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
  },
  sendIconContainer: {
    width: 44,
    height: 44,
    backgroundColor: Colors.aiPrimary,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    transform: [{ rotate: "45deg" }],
  },
  sendIcon: {
    fontSize: 18,
    color: Colors.textPrimary,
    transform: [{ rotate: "-45deg" }],
  },
});

export default GenerateMockupModal;


import React from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView } from "react-native";
import { Colors, Spacing, Typography, BorderRadius } from "../../constants/Theme";
import {
  CrossIcon,
  RefineIcon,
  SendIcon,
  ReferenceIcon,
} from "../icons/ModalIcons";

/**
 * PromptInputArea - Text prompt input with reference chips and action buttons
 * 
 * Features:
 * - Reference chips with remove (X) buttons
 * - Multi-line text input
 * - Action buttons: Find Similar/Add your own, Refine, Send
 */
const PromptInputArea = ({
  references = [],
  onRemoveReference,
  promptText = "",
  onPromptChange,
  onFindSimilar,
  onAddOwn,
  onRefine,
  onSend,
  placeholder = "Can you make this scene more gloomy",
  leftButtonLabel = "Find Similar",
  leftButtonIcon = "🔍",
  showAddProductButton = false,
  onAddProduct,
}) => {
  return (
    <View style={styles.promptContainer}>
      {/* Reference Chips */}
      {references.length > 0 && (
        <View style={styles.referencesContainer}>
          {references.map((ref, index) => (
            <View key={index} style={styles.referenceChip}>
              <View style={styles.referenceThumbnail}>
                <Text style={styles.referenceText}>{ref.name || "Reference"}</Text>
              </View>
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => onRemoveReference && onRemoveReference(index)}
                activeOpacity={0.7}
              >
                <CrossIcon size={10} color={Colors.textAccent} />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      )}

      {/* Text Input Area */}
      <View style={styles.textInputContainer}>
        <TextInput
          style={styles.textInput}
          value={promptText}
          onChangeText={onPromptChange}
          placeholder={placeholder}
          placeholderTextColor="#949494"
          multiline
        />
      </View>

      {/* Action Buttons */}
      <View style={styles.actionsRow}>
        {/* Left Action Button */}
        {showAddProductButton ? (
          <TouchableOpacity
            style={styles.addProductButton}
            onPress={onAddProduct}
            activeOpacity={0.7}
          >
            <ReferenceIcon size={16} color={Colors.textAccent} />
            <Text style={styles.buttonText}>Add Product Image</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.iconButton}
            onPress={onFindSimilar || onAddOwn}
            activeOpacity={0.7}
          >
            <ReferenceIcon size={16} color={Colors.textAccent} />
          </TouchableOpacity>
        )}

        {/* Right Actions */}
        <View style={styles.rightActions}>
          {/* Refine Button */}
          <TouchableOpacity
            style={styles.refineButton}
            onPress={onRefine}
            activeOpacity={0.7}
          >
            <RefineIcon size={16} color={Colors.textAccent} />
            <Text style={styles.buttonText}>Refine</Text>
          </TouchableOpacity>

          {/* Send Button */}
          <TouchableOpacity
            style={styles.sendButton}
            onPress={onSend}
            activeOpacity={0.7}
          >
            <SendIcon size={44} color={Colors.aiPrimary} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  promptContainer: {
    gap: Spacing.md,
    width: "100%",
  },
  referencesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Spacing.md,
  },
  referenceChip: {
    width: 60,
    height: 60,
    position: "relative",
  },
  referenceThumbnail: {
    width: 60,
    height: 60,
    backgroundColor: Colors.tileGray,
    borderRadius: Spacing.md,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  referenceText: {
    fontSize: 10,
    color: Colors.background,
    textAlign: "center",
  },
  removeButton: {
    position: "absolute",
    top: 4,
    right: 4,
    width: 16,
    height: 16,
    backgroundColor: Colors.background,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  textInputContainer: {
    minHeight: 60,
  },
  textInput: {
    fontFamily: Typography.fontFamily.regular,
    fontSize: Typography.fontSize.base,
    color: Colors.textPrimary,
    lineHeight: 20,
  },
  actionsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  iconButton: {
    width: 40,
    height: 40,
    backgroundColor: Colors.glassBackground,
    borderWidth: 0.681,
    borderColor: Colors.glassBorder,
    borderRadius: 95,
    justifyContent: "center",
    alignItems: "center",
  },
  addProductButton: {
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
});

export default PromptInputArea;


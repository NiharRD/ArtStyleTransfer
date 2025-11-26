import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  TouchableWithoutFeedback,
} from "react-native";
import Svg, { Path } from "react-native-svg";
import {
  Colors,
  Spacing,
  Typography,
  BorderRadius,
} from "../../constants/Theme";
import ModalContainer from "./ModalContainer";
import TalkToKimiButton from "./TalkToKimiButton";
import StyleGalleryGrid from "./StyleGalleryGrid";
import StyleSearchBar from "./StyleSearchBar";
import SelectedStyleChip from "./SelectedStyleChip";

/**
 * Icon Components
 */
const DropdownIcon = ({ size = 16, color = "#E6E6E6" }) => (
  <Svg width={size} height={size} viewBox="0 0 16 16" fill="none">
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M2.97001 5.47C3.11064 5.32955 3.30126 5.25066 3.50001 5.25066C3.69876 5.25066 3.88939 5.32955 4.03001 5.47L8.00001 9.44L11.97 5.47C12.0387 5.39631 12.1215 5.33721 12.2135 5.29622C12.3055 5.25523 12.4048 5.23319 12.5055 5.23141C12.6062 5.22963 12.7062 5.24816 12.7996 5.28588C12.893 5.3236 12.9778 5.37974 13.049 5.45096C13.1203 5.52218 13.1764 5.60701 13.2141 5.7004C13.2519 5.79379 13.2704 5.89382 13.2686 5.99452C13.2668 6.09523 13.2448 6.19454 13.2038 6.28654C13.1628 6.37854 13.1037 6.46134 13.03 6.53L8.53001 11.03C8.38939 11.1705 8.19876 11.2493 8.00001 11.2493C7.80126 11.2493 7.61064 11.1705 7.47001 11.03L2.97001 6.53C2.82956 6.38938 2.75067 6.19875 2.75067 6C2.75067 5.80125 2.82956 5.61063 2.97001 5.47Z"
      fill={color}
    />
  </Svg>
);

const RefineIcon = ({ size = 16, color = "#E6E6E6" }) => (
  <Svg width={size} height={size} viewBox="0 0 16 16" fill="none">
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M11.1 5.89399L10.688 6.79699L11.359 7.52899L12.715 9.00899L10.721 8.78199L9.73497 8.66899L9.24497 9.53299L8.25797 11.28L7.85797 9.31299L7.65997 8.34099L6.68697 8.14299L4.72097 7.74299L6.46697 6.75399L7.33097 6.26499L7.21897 5.27899L6.99197 3.28499L8.46997 4.64099L9.20197 5.31099L10.105 4.89999L11.931 4.06799L11.1 5.89399ZM7.01997 1.27599L9.48497 3.53599L12.528 2.14899C13.37 1.76499 14.236 2.63199 13.853 3.47299L12.466 6.51599L14.725 8.98099C15.35 9.66299 14.794 10.755 13.875 10.651L10.552 10.271L8.90597 13.182C8.44997 13.987 7.23997 13.795 7.05597 12.889L6.38897 9.61199L3.11197 8.94599C2.20597 8.76099 2.01397 7.55099 2.81897 7.09599L5.72897 5.44899L5.35097 2.12699C5.24597 1.20699 6.33797 0.649994 7.01997 1.27599Z"
      fill={color}
    />
  </Svg>
);

const ReferenceIcon = ({ size = 16, color = "#E6E6E6" }) => (
  <Svg width={size} height={size} viewBox="0 0 16 16" fill="none">
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M3.46993 6.53C3.61144 6.39345 3.80093 6.31794 3.99758 6.31974C4.19423 6.32154 4.3823 6.40051 4.52129 6.53963C4.66028 6.67875 4.73907 6.8669 4.74068 7.06355C4.7423 7.2602 4.66661 7.44962 4.52993 7.591L3.80293 8.318C3.29687 8.83411 3.01499 9.52911 3.01854 10.2519C3.0221 10.9747 3.31081 11.6669 3.82192 12.178C4.33302 12.6891 5.02521 12.9778 5.74802 12.9814C6.47082 12.9849 7.16582 12.7031 7.68193 12.197L8.40893 11.47C8.5511 11.3375 8.73915 11.2654 8.93345 11.2688C9.12775 11.2723 9.31313 11.351 9.45055 11.4884C9.58796 11.6258 9.66667 11.8112 9.6701 12.0055C9.67353 12.1998 9.60141 12.3878 9.46893 12.53L8.74293 13.257C7.94377 14.0356 6.87009 14.4681 5.75436 14.4609C4.63864 14.4536 3.57067 14.0072 2.78172 13.2182C1.99276 12.4293 1.54632 11.3613 1.53906 10.2456C1.5318 9.12984 1.96431 8.05616 2.74293 7.257L3.46993 6.53Z"
      fill={color}
    />
  </Svg>
);

const AddIcon = ({ size = 16, color = "#E6E6E6" }) => (
  <Svg width={size} height={size} viewBox="0 0 16 16" fill="none">
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8 1.75C8.19891 1.75 8.38968 1.82902 8.53033 1.96967C8.67098 2.11032 8.75 2.30109 8.75 2.5V7.25H13.5C13.6989 7.25 13.8897 7.32902 14.0303 7.46967C14.171 7.61032 14.25 7.80109 14.25 8C14.25 8.19891 14.171 8.38968 14.0303 8.53033C13.8897 8.67098 13.6989 8.75 13.5 8.75H8.75V13.5C8.75 13.6989 8.67098 13.8897 8.53033 14.0303C8.38968 14.171 8.19891 14.25 8 14.25C7.80109 14.25 7.61032 14.171 7.46967 14.0303C7.32902 13.8897 7.25 13.6989 7.25 13.5V8.75H2.5C2.30109 8.75 2.11032 8.67098 1.96967 8.53033C1.82902 8.38968 1.75 8.19891 1.75 8C1.75 7.80109 1.82902 7.61032 1.96967 7.46967C2.11032 7.32902 2.30109 7.25 2.5 7.25H7.25V2.5C7.25 2.30109 7.32902 2.11032 7.46967 1.96967C7.61032 1.82902 7.80109 1.75 8 1.75Z"
      fill={color}
    />
  </Svg>
);

const SendIcon = ({ size = 44, color = "#8A2BE2" }) => (
  <Svg width={size} height={size} viewBox="0 0 44 44" fill="none">
    <Path
      d="M22 44C34.1503 44 44 34.1503 44 22C44 9.84974 34.1503 0 22 0C9.84974 0 0 9.84974 0 22C0 34.1503 9.84974 44 22 44Z"
      fill={color}
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M17 15L29 22L17 29V15Z"
      fill="white"
    />
  </Svg>
);

/**
 * ArtStyleTransferModal - Main modal with 3 states
 * 
 * States:
 * - 'textOnly': Default text input with "Choose Art Style" button
 * - 'gallery': Style gallery grid with search
 * - 'textWithStyle': Text input with selected style chip
 */
const ArtStyleTransferModal = ({ visible, onClose }) => {
  const [modalState, setModalState] = useState("textOnly");
  const [promptText, setPromptText] = useState("");
  const [selectedStyle, setSelectedStyle] = useState(null);

  // Calculate modal height based on state
  const getModalHeight = () => {
    switch (modalState) {
      case "textOnly":
        return 240;
      case "gallery":
        return 420;
      case "textWithStyle":
        return 280;
      default:
        return 240;
    }
  };

  // State transition handlers
  const handleChooseArtStyle = () => {
    setModalState("gallery");
  };

  const handleStyleSelect = (style) => {
    setSelectedStyle(style);
    setModalState("textWithStyle");
  };

  const handleDeselectStyle = () => {
    setSelectedStyle(null);
    setModalState("textOnly");
  };

  const handleHeaderClick = () => {
    onClose();
  };

  // Placeholder functions for future AI implementation
  const handleRefine = () => {
    // TODO: AI refinement
    console.log("Refine clicked");
  };

  const handleSend = () => {
    // TODO: AI prompt processing
    console.log("Send clicked:", promptText, selectedStyle);
  };

  const handleFindSimilar = () => {
    // TODO: AI similarity search
    console.log("Find Similar clicked");
  };

  return (
    <ModalContainer visible={visible} onClose={onClose} height={getModalHeight()}>
      <View style={styles.container}>
        {/* Talk to Kimi Button */}
        <TalkToKimiButton onPress={() => console.log("Talk to Kimi")} />

        {/* Main Content */}
        <View style={styles.contentContainer}>
          {/* Header - Dropdown to close */}
          <TouchableOpacity
            style={styles.header}
            onPress={handleHeaderClick}
            activeOpacity={0.7}
          >
            <Text style={styles.headerText}>Art Style Transfer</Text>
            <DropdownIcon size={16} color={Colors.textAccent} />
          </TouchableOpacity>

          {/* State 1: Text Only */}
          {modalState === "textOnly" && (
            <View style={styles.stateContent}>
              <TextInput
                style={styles.textInput}
                value={promptText}
                onChangeText={setPromptText}
                placeholder="Can you make this scene more gloomy"
                placeholderTextColor="#949494"
                multiline
              />

              <View style={styles.actionsRow}>
                <TouchableOpacity
                  style={styles.chooseButton}
                  onPress={handleChooseArtStyle}
                  activeOpacity={0.7}
                >
                  <ReferenceIcon size={16} color={Colors.textAccent} />
                  <Text style={styles.buttonText}>Choose Art Style</Text>
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

          {/* State 2: Gallery */}
          {modalState === "gallery" && (
            <View style={styles.stateContent}>
              <StyleGalleryGrid
                onStyleSelect={handleStyleSelect}
                selectedStyleId={selectedStyle?.id}
              />

              <StyleSearchBar />

              <View style={styles.actionsRow}>
                <TouchableOpacity
                  style={styles.findSimilarButton}
                  onPress={handleFindSimilar}
                  activeOpacity={0.7}
                >
                  <AddIcon size={16} color={Colors.textAccent} />
                  <Text style={styles.buttonText}>Find Similar</Text>
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

          {/* State 3: Text with Style */}
          {modalState === "textWithStyle" && (
            <View style={styles.stateContent}>
              <SelectedStyleChip style={selectedStyle} onDeselect={handleDeselectStyle} />

              <TextInput
                style={styles.textInput}
                value={promptText}
                onChangeText={setPromptText}
                placeholder="Can you make this scene more gloomy"
                placeholderTextColor="#949494"
                multiline
              />

              <View style={styles.actionsRow}>
                <TouchableOpacity
                  style={styles.chooseButton}
                  onPress={handleChooseArtStyle}
                  activeOpacity={0.7}
                >
                  <ReferenceIcon size={16} color={Colors.textAccent} />
                  <Text style={styles.buttonText}>Choose Art Style</Text>
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
        </View>
      </View>
    </ModalContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 22.5,
    paddingBottom: 20,
    paddingTop: Spacing.md,
    gap: Spacing.md,
  },
  contentContainer: {
    backgroundColor: "rgba(43, 40, 41, 0.7)",
    borderWidth: 0.681,
    borderColor: Colors.modalBorder,
    borderRadius: 24,
    padding: Spacing.md,
    gap: Spacing.xxl,
  },
  header: {
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
  headerText: {
    fontFamily: Typography.fontFamily.regular,
    fontSize: Typography.fontSize.base,
    color: Colors.textAccent,
    letterSpacing: Typography.letterSpacing.normal,
  },
  stateContent: {
    gap: Spacing.md,
  },
  textInput: {
    fontFamily: Typography.fontFamily.regular,
    fontSize: Typography.fontSize.base,
    color: Colors.textPrimary,
    minHeight: 60,
    textAlignVertical: "top",
  },
  actionsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  chooseButton: {
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
  findSimilarButton: {
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

export default ArtStyleTransferModal;


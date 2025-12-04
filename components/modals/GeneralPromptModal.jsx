import React, { useState } from "react";
import {
    Keyboard,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import Svg, { Defs, LinearGradient, Path, Stop } from "react-native-svg";
import {
    BorderRadius,
    Colors,
    Spacing,
    Typography,
} from "../../constants/Theme";
import DrawerToggle from "../ui/DrawerToggle";
import GhostTextInput from "../ui/GhostTextInput";
import ModalContainer from "./ModalContainer";
import ModeSelector from "./ModeSelector";
import TalkToKimiButton from "./TalkToKimiButton";

/**
 * Icon Components
 */
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

const ArrowSendIcon = ({ size = 44, color = "#8A2BE2" }) => (
  <Svg width={size} height={size} viewBox="0 0 44 44" fill="none">
    {/* Circular background */}
    <Path
      d="M22 44C34.1503 44 44 34.1503 44 22C44 9.84974 34.1503 0 22 0C9.84974 0 0 9.84974 0 22C0 34.1503 9.84974 44 22 44Z"
      fill={color}
    />
    {/* Arrow icon - scaled and centered */}
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M13.0719 26.7381L14.1277 21.8156L13.0719 16.8932C12.9455 16.3057 12.9862 15.6946 13.1894 15.129C13.3926 14.5635 13.7502 14.0662 14.2215 13.6935C14.6929 13.3207 15.2593 13.0875 15.8564 13.0202C16.4536 12.9529 17.0576 13.0543 17.6001 13.3127L29.512 18.9772C30.0485 19.2326 30.5017 19.6348 30.819 20.1372C31.1364 20.6396 31.3049 21.2216 31.305 21.8158C31.3051 22.41 31.1368 22.9921 30.8196 23.4946C30.5024 23.9971 30.0494 24.3994 29.5129 24.655L17.5992 30.3176C17.0568 30.5757 16.453 30.6768 15.8561 30.6094C15.2592 30.542 14.6931 30.3088 14.2219 29.9363C13.7508 29.5637 13.3933 29.0667 13.1901 28.5015C12.9868 27.9362 12.9459 27.3254 13.0719 26.7381ZM16.7358 28.5008L28.6467 22.8392C28.8409 22.7478 29.0051 22.603 29.1202 22.4217C29.2352 22.2405 29.2963 22.0303 29.2963 21.8156C29.2963 21.601 29.2352 21.3907 29.1202 21.2095C29.0051 21.0283 28.8409 20.8835 28.6467 20.7921L16.7377 15.1304C16.5344 15.0332 16.3079 14.9948 16.084 15.0197C15.86 15.0446 15.6474 15.1317 15.4705 15.2712C15.2935 15.4107 15.1591 15.597 15.0826 15.809C15.006 16.021 14.9904 16.2501 15.0375 16.4705L15.9672 20.8101L22.1833 20.8092C22.3167 20.8069 22.4493 20.8312 22.5732 20.8808C22.6972 20.9303 22.81 21.004 22.9052 21.0976C23.0003 21.1912 23.0759 21.3028 23.1275 21.4259C23.179 21.5491 23.2055 21.6812 23.2055 21.8147C23.2054 21.9482 23.1788 22.0803 23.1271 22.2033C23.0754 22.3264 22.9998 22.438 22.9045 22.5315C22.8093 22.625 22.6964 22.6986 22.5724 22.748C22.4484 22.7974 22.3158 22.8216 22.1823 22.8192L15.9663 22.8202L15.0375 27.1588C14.9902 27.3791 15.0056 27.6082 15.0819 27.8202C15.1582 28.0322 15.2923 28.2186 15.469 28.3583C15.6458 28.498 15.8582 28.5854 16.0821 28.6106C16.3059 28.6358 16.5324 28.5977 16.7358 28.5008Z"
      fill="white"
      fillOpacity="0.9"
    />
    <Path
      d="M29.4844 19.0358C30.0097 19.2859 30.4532 19.6798 30.7639 20.1717C31.0747 20.6638 31.2396 21.2339 31.2397 21.8159C31.2398 22.3978 31.0758 22.968 30.7653 23.4601C30.4547 23.9522 30.0105 24.3464 29.485 24.5967L17.5719 30.2591C17.0405 30.5119 16.4484 30.6109 15.8636 30.5449C15.2787 30.4789 14.7239 30.2505 14.2622 29.8855C13.8005 29.5204 13.4504 29.0334 13.2513 28.4796C13.0521 27.9257 13.0118 27.3273 13.1353 26.7518L14.1911 21.829L14.1939 21.8152L14.1904 21.8021L13.1353 16.88C13.0114 16.3043 13.0508 15.705 13.2499 15.1509C13.449 14.5967 13.7997 14.1095 14.2615 13.7442C14.7234 13.379 15.2785 13.15 15.8636 13.0841C16.4486 13.0182 17.0404 13.1182 17.5719 13.3714L29.4844 19.0358ZM29.175 21.1751C29.0534 20.9835 28.8796 20.8305 28.6744 20.7338L16.7654 15.0715C16.5513 14.9691 16.3121 14.9293 16.0762 14.9554C15.8406 14.9817 15.6169 15.0732 15.4306 15.2199C15.2441 15.3669 15.1024 15.5642 15.0218 15.7875C14.9413 16.0108 14.9246 16.2522 14.9742 16.4843L15.9036 20.8236L15.9147 20.8747H15.9671L22.1833 20.8733L22.184 20.874C22.3089 20.8719 22.4334 20.8947 22.5493 20.941C22.6652 20.9873 22.7711 21.0565 22.8601 21.144C22.949 21.2315 23.0197 21.3362 23.0679 21.4513C23.116 21.5663 23.1411 21.6898 23.1411 21.8145C23.141 21.9394 23.1156 22.0633 23.0672 22.1784C23.031 22.2647 22.9826 22.3451 22.9229 22.4167L22.8594 22.4857C22.7703 22.5732 22.6639 22.6418 22.5479 22.688C22.4321 22.7341 22.308 22.7566 22.1833 22.7543H22.182L15.9665 22.755H15.914L15.9029 22.8061L14.9742 27.1448C14.9244 27.3769 14.9408 27.6188 15.0211 27.8422C15.1015 28.0655 15.243 28.262 15.4292 28.4091C15.6154 28.5562 15.8391 28.6484 16.0749 28.675C16.3106 28.7015 16.5492 28.6616 16.7633 28.5597L28.6744 22.898C28.8797 22.8014 29.0534 22.6483 29.175 22.4567C29.2966 22.2651 29.3607 22.0421 29.3607 21.8152C29.3607 21.5885 29.2964 21.3665 29.175 21.1751Z"
      stroke="url(#paint0_linear_send)"
      strokeOpacity="0.8"
      strokeWidth="0.13"
    />
    <Defs>
      <LinearGradient
        id="paint0_linear_send"
        x1="18.4607"
        y1="13.2486"
        x2="22.6919"
        y2="32.0167"
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="white" />
        <Stop offset="1" stopColor="white" stopOpacity="0" />
      </LinearGradient>
    </Defs>
  </Svg>
);

/**
 * GeneralPromptModal - General prompt modal opened via AI button
 *
 * Features:
 * - Shows mode selector with animated tooltip
 * - Disabled text input until mode is selected
 * - Switches to appropriate modal when mode is chosen
 */
const GeneralPromptModal = ({
  visible,
  onClose,
  onHeightChange,
  onModeChange,
  llm,
  modelReady,
}) => {
  const [promptText, setPromptText] = useState("");
  const [showTooltip, setShowTooltip] = useState(true);
  const [modeSelected, setModeSelected] = useState(false);

  const MODAL_HEIGHT = 280;

  // Report height changes to parent for canvas animation
  React.useEffect(() => {
    if (onHeightChange) {
      const height = visible ? MODAL_HEIGHT : 0;
      onHeightChange(height);
    }

    // Dismiss keyboard when modal closes
    if (!visible) {
      Keyboard.dismiss();
      // Reset state when modal closes
      setShowTooltip(true);
      setModeSelected(false);
      setPromptText("");
    }
  }, [visible]);

  // Handle mode selection
  const handleModeChange = (mode) => {
    setShowTooltip(false);
    setModeSelected(true);

    // Close this modal and open the appropriate one
    if (onModeChange) {
      onModeChange(mode);
    }
  };

  // Handle tooltip dismiss
  const handleTooltipDismiss = () => {
    setShowTooltip(false);
  };

  // Handle header click (close modal)
  const handleHeaderClick = () => {
    Keyboard.dismiss();
    onClose();
  };

  // Placeholder functions
  const handleRefine = () => {
    console.log("Refine clicked");
  };

  const handleSend = async () => {
    console.log("Send clicked:", promptText);
    Keyboard.dismiss();
  };

  return (
    <ModalContainer
      visible={visible}
      onClose={onClose}
      height={MODAL_HEIGHT}
    >
      <View style={styles.container}>
        {/* Talk to Kimi Button */}
        <TalkToKimiButton onPress={() => console.log("Talk to Kimi")} />

        {/* Drawer Handle */}
        <DrawerToggle onPress={handleHeaderClick} />

        {/* Main Content */}
        <View style={styles.contentContainer}>
          {/* Header Row with ModeSelector */}
          <View style={styles.headerRow}>
            <ModeSelector
              currentMode="general"
              onModeChange={handleModeChange}
              onClose={onClose}
              showTooltip={showTooltip}
              onTooltipDismiss={handleTooltipDismiss}
            />
          </View>

          {/* Text Input Section */}
          <View style={styles.stateContent}>
            <GhostTextInput
              style={[
                styles.textInput,
                !modeSelected && styles.textInputDisabled,
              ]}
              value={promptText}
              onChangeText={setPromptText}
              placeholder={
                modeSelected
                  ? "Describe what you want to do..."
                  : "Select a mode above to get started"
              }
              placeholderTextColor="#949494"
              multiline
              llm={llm}
              modelReady={modelReady}
              editable={modeSelected}
            />

            <View style={styles.actionsRow}>
              <View style={{ flex: 1 }} />

              <View style={styles.rightActions}>
                <TouchableOpacity
                  style={[
                    styles.refineButton,
                    !modeSelected && styles.buttonDisabled,
                  ]}
                  onPress={handleRefine}
                  activeOpacity={0.7}
                  disabled={!modeSelected}
                >
                  <RefineIcon size={16} color={Colors.textAccent} />
                  <Text style={styles.buttonText}>Refine</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.sendButton,
                    !modeSelected && styles.buttonDisabled,
                  ]}
                  onPress={handleSend}
                  activeOpacity={0.7}
                  disabled={!modeSelected}
                >
                  <ArrowSendIcon size={44} color={Colors.aiPrimary} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    </ModalContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 12,
    paddingBottom: 4,
    paddingTop: Spacing.md,
    gap: Spacing.md,
  },
  contentContainer: {
    backgroundColor: "rgba(43, 40, 41, 0.95)",
    borderWidth: 0.681,
    borderColor: Colors.modalBorder,
    borderRadius: 24,
    paddingTop: Spacing.md,
    paddingHorizontal: Spacing.xxl,
    paddingBottom: Spacing.xxl,
    gap: Spacing.md,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  stateContent: {
    gap: Spacing.sm,
  },
  textInput: {
    fontFamily: Typography.fontFamily.regular,
    fontSize: Typography.fontSize.base,
    color: Colors.textPrimary,
    minHeight: 60,
    maxHeight: 100,
    textAlignVertical: "top",
  },
  textInputDisabled: {
    backgroundColor: "rgba(255, 255, 255, 0.03)",
    color: "rgba(255, 255, 255, 0.4)",
    opacity: 0.6,
  },
  actionsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
    paddingHorizontal: 10,
    height: 36,
  },
  buttonText: {
    fontFamily: Typography.fontFamily.regular,
    fontSize: Typography.fontSize.base,
    color: Colors.textAccent,
    letterSpacing: Typography.letterSpacing.normal,
  },
  sendButton: {
    width: 42,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonDisabled: {
    opacity: 0.4,
  },
});

export default GeneralPromptModal;

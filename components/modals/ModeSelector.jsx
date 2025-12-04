import { useEffect, useRef, useState } from "react";
import {
    Animated,
    Easing,
    Modal,
    Pressable,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import Svg, { Path } from "react-native-svg";
import { BorderRadius, Colors, Spacing, Typography } from "../../constants/Theme";

/**
 * Icons
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

const CheckIcon = ({ size = 16, color = "#8A2BE2" }) => (
  <Svg width={size} height={size} viewBox="0 0 16 16" fill="none">
    <Path
      d="M13.5 4.5L6.5 11.5L3 8"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

/**
 * Mode definitions
 */
const MODES = [
  { id: "smart-adjust", label: "Smart Adjust" },
  { id: "match-art-style", label: "Match Art Style" },
  { id: "rebuild-background", label: "Rebuild Background" },
  { id: "product-mockup", label: "Product Mockup" },
];

/**
 * ModeSelector - Dropdown for selecting editing mode
 *
 * Features:
 * - Shows current mode with dropdown chevron
 * - Opens modal dropdown with all available modes
 * - Animated tooltip for first-time users
 * - Supports mode switching between modals
 *
 * @param {string} currentMode - Current mode ID ('smart-adjust', 'match-art-style', etc.)
 * @param {function} onModeChange - Called when user selects a different mode
 * @param {function} onClose - Called when user clicks dropdown to close modal (same mode)
 * @param {boolean} showTooltip - Whether to show "Choose a mode" tooltip
 * @param {function} onTooltipDismiss - Called when tooltip is dismissed
 */
const ModeSelector = ({
  currentMode = "general",
  onModeChange,
  onClose,
  showTooltip = false,
  onTooltipDismiss,
}) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  // Animation values for tooltip
  const tooltipOpacity = useRef(new Animated.Value(0)).current;
  const tooltipScale = useRef(new Animated.Value(0.8)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  // Get current mode label
  const currentModeLabel = MODES.find(m => m.id === currentMode)?.label || "Choose Mode";

  // Animate tooltip when shown
  useEffect(() => {
    if (showTooltip) {
      // Fade in and scale up
      Animated.parallel([
        Animated.timing(tooltipOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.spring(tooltipScale, {
          toValue: 1,
          tension: 100,
          friction: 8,
          useNativeDriver: true,
        }),
      ]).start();

      // Start pulse animation
      const pulse = Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.05,
            duration: 800,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 800,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ])
      );
      pulse.start();

      return () => pulse.stop();
    } else {
      tooltipOpacity.setValue(0);
      tooltipScale.setValue(0.8);
    }
  }, [showTooltip]);

  // Handle dropdown button press
  const handlePress = () => {
    if (showTooltip && onTooltipDismiss) {
      onTooltipDismiss();
    }
    setDropdownVisible(true);
  };

  // Handle mode selection
  const handleModeSelect = (mode) => {
    setDropdownVisible(false);

    if (mode.id === currentMode) {
      // Same mode selected - close modal
      if (onClose) {
        onClose();
      }
    } else {
      // Different mode selected - switch mode
      if (onModeChange) {
        onModeChange(mode.id);
      }
    }
  };

  // Handle dropdown close (clicking outside)
  const handleDropdownClose = () => {
    setDropdownVisible(false);
  };

  return (
    <View style={styles.container}>
      {/* Main button */}
      <Animated.View style={[
        styles.buttonWrapper,
        showTooltip && { transform: [{ scale: pulseAnim }] }
      ]}>
        <TouchableOpacity
          style={[
            styles.button,
            showTooltip && styles.buttonHighlighted,
          ]}
          onPress={handlePress}
          activeOpacity={0.7}
        >
          <Text style={styles.buttonText}>{currentModeLabel}</Text>
          <DropdownIcon size={16} color={Colors.textAccent} />
        </TouchableOpacity>
      </Animated.View>

      {/* Animated tooltip */}
      {showTooltip && (
        <Animated.View
          style={[
            styles.tooltip,
            {
              opacity: tooltipOpacity,
              transform: [{ scale: tooltipScale }],
            },
          ]}
        >
          <View style={styles.tooltipArrow} />
          <Text style={styles.tooltipText}>👆 Choose a mode to get started</Text>
        </Animated.View>
      )}

      {/* Dropdown modal */}
      <Modal
        visible={dropdownVisible}
        transparent
        animationType="fade"
        onRequestClose={handleDropdownClose}
      >
        <Pressable style={styles.overlay} onPress={handleDropdownClose}>
          <View style={styles.dropdownContainer}>
            <View style={styles.dropdown}>
              {MODES.map((mode, index) => (
                <TouchableOpacity
                  key={mode.id}
                  style={[
                    styles.dropdownItem,
                    index === 0 && styles.dropdownItemFirst,
                    index === MODES.length - 1 && styles.dropdownItemLast,
                    currentMode === mode.id && styles.dropdownItemActive,
                  ]}
                  onPress={() => handleModeSelect(mode)}
                  activeOpacity={0.7}
                >
                  <Text
                    style={[
                      styles.dropdownItemText,
                      currentMode === mode.id && styles.dropdownItemTextActive,
                    ]}
                  >
                    {mode.label}
                  </Text>
                  {currentMode === mode.id && (
                    <CheckIcon size={16} color={Colors.aiPrimary} />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
  },
  buttonWrapper: {
    // For animation transforms
  },
  button: {
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
  },
  buttonHighlighted: {
    borderColor: Colors.aiPrimary,
    borderWidth: 1.5,
    shadowColor: Colors.aiPrimary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 8,
  },
  buttonText: {
    fontFamily: Typography.fontFamily.regular,
    fontSize: Typography.fontSize.base,
    color: Colors.textAccent,
    letterSpacing: Typography.letterSpacing.normal,
  },
  // Tooltip styles
  tooltip: {
    position: "absolute",
    top: "100%",
    left: 0,
    marginTop: 12,
    backgroundColor: "rgba(138, 43, 226, 0.95)",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    zIndex: 1000,
  },
  tooltipArrow: {
    position: "absolute",
    top: -6,
    left: 20,
    width: 12,
    height: 12,
    backgroundColor: "rgba(138, 43, 226, 0.95)",
    transform: [{ rotate: "45deg" }],
  },
  tooltipText: {
    fontFamily: Typography.fontFamily.medium,
    fontSize: 13,
    color: "#FFFFFF",
    letterSpacing: 0.2,
  },
  // Dropdown styles
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-start",
    paddingTop: 180, // Position below header area
  },
  dropdownContainer: {
    paddingHorizontal: 20,
  },
  dropdown: {
    backgroundColor: "rgba(50, 47, 48, 0.98)",
    borderRadius: 16,
    borderWidth: 0.5,
    borderColor: "rgba(255, 255, 255, 0.1)",
    overflow: "hidden",
  },
  dropdownItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 0.5,
    borderBottomColor: "rgba(255, 255, 255, 0.08)",
  },
  dropdownItemFirst: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  dropdownItemLast: {
    borderBottomWidth: 0,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  dropdownItemActive: {
    backgroundColor: "rgba(138, 43, 226, 0.15)",
  },
  dropdownItemText: {
    fontFamily: Typography.fontFamily.regular,
    fontSize: 15,
    color: Colors.textAccent,
    letterSpacing: 0.2,
  },
  dropdownItemTextActive: {
    color: Colors.aiPrimary,
    fontFamily: Typography.fontFamily.medium,
  },
});

export default ModeSelector;

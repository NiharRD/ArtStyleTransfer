/**
 * Theme Constants
 * Centralized design tokens for consistent styling across the app
 */

export const Colors = {
  // Background Colors
  background: "#191816",
  surface: "#2A2A28",
  surfaceLight: "#3A3A38",
  surfaceDark: "#191916",

  // Text Colors
  textPrimary: "#FFFFFF",
  textSecondary: "#CCCCCC",
  textTertiary: "#999999",
  textMuted: "#CACACA",
  textAccent: "#E6E6E6",
  textSubtle: "#BFBFBF",

  // Glass Morphism
  glassBackground: "rgba(118, 118, 128, 0.12)",
  glassBorder: "rgba(120, 120, 128, 0.16)",
  glassActive: "rgba(118, 118, 128, 0.24)",
  glassSurface: "#6C6C71",

  // AI Theme
  aiPrimary: "#8A2BE2",
  aiSecondary: "#FF1493",
  aiTertiary: "#00BFFF",
  aiGlow: "rgba(138, 43, 226, 0.3)",

  // Functional Colors
  border: "rgba(186, 182, 178, 0.7)",
  shadow: "rgba(0, 0, 0, 0.25)",
  overlay: "rgba(0, 0, 0, 0.6)",

  // Status Colors
  success: "#4CAF50",
  warning: "#FFC107",
  error: "#F44336",
  info: "#2196F3",

  // Home Indicator
  indicator: "#8E8E8E",
  indicatorDark: "#333333",

  // Modal Colors
  modalBackground: "rgba(43, 40, 41, 0.7)",
  modalOverlay: "rgba(0, 0, 0, 0.6)",
  tileGray: "#9a9a9a",
  modalBorder: "#FFFFFF",
  promptBackground: "#312f31",
  promptBorder: "#3d3b3e",
};

export const Typography = {
  // Font Families
  fontFamily: {
    regular: "System",
    medium: "System",
    semibold: "System",
    condensed: "System",
  },

  // Font Sizes
  fontSize: {
    xs: 12,
    sm: 13,
    md: 14,
    base: 16,
    lg: 17,
    xl: 20,
    xxl: 24,
  },

  // Line Heights
  lineHeight: {
    tight: 1.15,
    normal: 1.3,
    relaxed: 1.5,
  },

  // Letter Spacing
  letterSpacing: {
    tight: -0.23,
    normal: -0.16,
    wide: -0.06,
  },

  // Text Styles
  title: {
    fontSize: 16,
    letterSpacing: -0.23,
    lineHeight: 18,
    color: "#FFFFFF",
  },
  subtitle: {
    fontSize: 12,
    lineHeight: 14,
    color: "#999999",
  },
  body: {
    fontSize: 13,
    lineHeight: 17,
    color: "#CCCCCC",
  },
  button: {
    fontSize: 16,
    letterSpacing: -0.16,
    color: "#E6E6E6",
  },
  caption: {
    fontSize: 12,
    color: "#999999",
  },
};

export const Spacing = {
  xs: 4,
  sm: 5,
  md: 8,
  lg: 10,
  xl: 12,
  xxl: 16,
  xxxl: 20,
  huge: 24,
};

export const BorderRadius = {
  xs: 4,
  sm: 12,
  md: 14,
  lg: 21.5,
  xl: 22,
  xxl: 30,
  pill: 70,
  full: 100,
  circle: 264,
};

export const Shadows = {
  small: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1.4 },
    shadowOpacity: 0.06,
    shadowRadius: 14,
    elevation: 2,
  },
  medium: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  large: {
    shadowColor: "#8A2BE2",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 15,
    elevation: 10,
  },
};

export const Layout = {
  // Screen Dimensions
  headerHeight: 88,
  controlBarHeight: 52,
  quickActionHeight: 87,
  bottomSectionHeight: 150,

  // Image Display
  imageHeight: 450,
  imageMargin: 32, // Total horizontal margin (16 * 2)

  // Component Sizes
  iconSize: {
    xs: 15,
    sm: 16,
    md: 20,
    lg: 28,
  },
  buttonHeight: {
    small: 32,
    medium: 40,
    large: 48,
  },

  // Quick Action Button
  quickActionWidth: 89,
  quickActionMargin: 10,

  // AI Button
  aiButtonSize: 78,
  aiButtonInner: 60,

  // Drawer Toggle
  drawerHandleWidth: 36,
  drawerHandleHeight: 5,

  // Home Indicator
  homeIndicatorWidth: 140,
  homeIndicatorHeight: 5,
};

export const Animation = {
  // Duration
  duration: {
    fast: 200,
    normal: 300,
    slow: 500,
    verySlow: 1000,
  },

  // Easing
  easing: {
    linear: "linear",
    easeIn: "ease-in",
    easeOut: "ease-out",
    easeInOut: "ease-in-out",
  },

  // AI Button Animation
  aiRotation: 8000,
  aiPulse: 1500,
  aiScale: {
    min: 1,
    max: 1.05,
  },
};

export const Opacity = {
  disabled: 0.3,
  inactive: 0.5,
  semiTransparent: 0.7,
  almostOpaque: 0.9,
  opaque: 1,
};

// Gradient Presets
export const Gradients = {
  glass: {
    colors: ["rgba(247, 247, 247, 1)", "rgba(247, 247, 247, 1)"],
    locations: [0, 1],
  },
  glassOverlay: {
    colors: ["rgba(255, 255, 255, 0.08)", "rgba(255, 255, 255, 0.08)"],
    locations: [0, 1],
  },
  ai: {
    colors: ["#8A2BE2", "#FF1493", "#00BFFF"],
    locations: [0, 0.5, 1],
  },
};

// Export default theme object
export default {
  Colors,
  Typography,
  Spacing,
  BorderRadius,
  Shadows,
  Layout,
  Animation,
  Opacity,
  Gradients,
};

/**
 * Icon Components - Central export file for all SVG icons
 *
 * This file exports all icon components used throughout the app.
 * Each icon is defined in its own file for better organization and maintainability.
 *
 * All icons are SVG-based using react-native-svg for:
 * - Scalability without loss of quality
 * - Small bundle size
 * - Easy customization (size, color)
 * - Consistent rendering across platforms
 *
 * Usage:
 *   import { BrushIcon, CameraIcon } from '../components/icons/IconComponents';
 */

// Star icons (special decorative elements)
export { default as StarIcon } from "./StarIcon";
export { default as StarImageIcon } from "./StarImageIcon";

// Main action icons
export { default as AddIcon } from "./AddIcon";
export { default as BrushIcon } from "./BrushIcon";
export { default as CameraIcon } from "./CameraIcon";
export { default as TShirtIcon } from "./TShirtIcon";

// UI control icons
export { default as BackIcon } from "./BackIcon";
export { default as BranchIcon } from "./BranchIcon";
export { default as DotsIcon } from "./DotsIcon";
export { default as DropdownIcon } from "./DropdownIcon";
export { default as InfiniteViewIcon } from "./InfiniteViewIcon";
export { default as MasterIcon } from "./MasterIcon";
export { default as RedoIcon } from "./RedoIcon";
export { default as ResetIcon } from "./ResetIcon";
export { default as UndoIcon } from "./UndoIcon";

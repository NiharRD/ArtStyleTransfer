import React from "react";
import Svg, { Circle, Path } from "react-native-svg";

/**
 * FilterIcons - Icon components for image filter features
 * Based on SVG assets from assets/icons/
 */

// Brightness icon (based on brightness-svgrepo-com.svg)
export const BrightnessIcon = ({ size = 16, color = "#E6E6E6" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 1C11.4477 1 11 1.44772 11 2V4C11 4.55228 11.4477 5 12 5C12.5523 5 13 4.55228 13 4V2C13 1.44772 12.5523 1 12 1Z"
      fill={color}
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 17C14.7614 17 17 14.7614 17 12C17 9.23858 14.7614 7 12 7C9.23858 7 7 9.23858 7 12C7 14.7614 9.23858 17 12 17ZM9.46518 14.5348C8.83581 13.9054 8.47917 13.0625 8.47917 12.1667C8.47917 10.2292 10.0625 8.64583 12 8.64583C12.896 8.64583 13.739 8.99844 14.3682 9.62852L9.46518 14.5348Z"
      fill={color}
    />
    <Path
      d="M18.7071 4.29289C19.0976 4.68342 19.0976 5.31658 18.7071 5.70711L17.2929 7.12132C16.9024 7.51184 16.2692 7.51184 15.8787 7.12132C15.4882 6.73079 15.4882 6.09763 15.8787 5.70711L17.2929 4.29289C17.6834 3.90237 18.3166 3.90237 18.7071 4.29289Z"
      fill={color}
    />
    <Path
      d="M1 12C1 12.5523 1.44772 13 2 13H4C4.55228 13 5 12.5523 5 12C5 11.4477 4.55228 11 4 11H2C1.44772 11 1 11.4477 1 12Z"
      fill={color}
    />
    <Path
      d="M4.29289 5.70711C3.90237 5.31658 3.90237 4.68342 4.29289 4.29289C4.68342 3.90237 5.31658 3.90237 5.70711 4.29289L7.12132 5.70711C7.51184 6.09763 7.51184 6.73079 7.12132 7.12132C6.73079 7.51184 6.09763 7.51184 5.70711 7.12132L4.29289 5.70711Z"
      fill={color}
    />
    <Path
      d="M12 19C11.4477 19 11 19.4477 11 20V22C11 22.5523 11.4477 23 12 23C12.5523 23 13 22.5523 13 22V20C13 19.4477 12.5523 19 12 19Z"
      fill={color}
    />
    <Path
      d="M5.70711 17.2929C6.09763 16.9024 6.73079 16.9024 7.12132 17.2929C7.51184 17.6834 7.51184 18.3166 7.12132 18.7071L5.70711 20.1213C5.31658 20.5118 4.68342 20.5118 4.29289 20.1213C3.90237 19.7308 3.90237 19.0976 4.29289 18.7071L5.70711 17.2929Z"
      fill={color}
    />
    <Path
      d="M19 12C19 12.5523 19.4477 13 20 13H22C22.5523 13 23 12.5523 23 12C23 11.4477 22.5523 11 22 11H20C19.4477 11 19 11.4477 19 12Z"
      fill={color}
    />
    <Path
      d="M15.8787 18.7071C15.4882 18.3166 15.4882 17.6834 15.8787 17.2929C16.2692 16.9024 16.9024 16.9024 17.2929 17.2929L18.7071 18.7071C19.0976 19.0976 19.0976 19.7308 18.7071 20.1213C18.3166 20.5118 17.6834 20.5118 17.2929 20.1213L15.8787 18.7071Z"
      fill={color}
    />
  </Svg>
);

// Contrast icon (based on contrast-svgrepo-com.svg)
export const ContrastIcon = ({ size = 16, color = "#E6E6E6" }) => (
  <Svg width={size} height={size} viewBox="0 0 16 16" fill="none">
    <Path
      d="M8 4V12C9.06087 12 10.0783 11.5786 10.8284 10.8284C11.5786 10.0783 12 9.06087 12 8C12 6.93913 11.5786 5.92172 10.8284 5.17157C10.0783 4.42143 9.06087 4 8 4Z"
      fill={color}
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0 8C0 3.582 3.59 0 8 0C12.418 0 16 3.59 16 8C16 12.418 12.41 16 8 16C3.582 16 0 12.41 0 8ZM2 8C2 11.307 4.686 14 8 14C11.307 14 14 11.307 14 8C14 4.686 11.307 2 8 2C4.686 2 2 4.686 2 8Z"
      fill={color}
    />
  </Svg>
);

// Exposure icon (based on exposure-svgrepo-com.svg)
export const ExposureIcon = ({ size = 16, color = "#E6E6E6" }) => (
  <Svg width={size} height={size} viewBox="0 0 19 19" fill="none">
    <Path
      d="M9.5 4.5C9.5 4.22386 9.73193 4 10 4C10.2761 4 10.5 4.215 10.5 4.49L10.5 7.51C10.5 7.78 10.2681 8 10 8C9.72386 8 9.5 7.785 9.5 7.51L9.5 4.5Z"
      fill={color}
    />
    <Path
      d="M9.5 11.5C9.5 11.2239 9.73193 11 10 11C10.2761 11 10.5 11.215 10.5 11.49L10.5 14.51C10.5 14.78 10.2681 15 10 15C9.72386 15 9.5 14.785 9.5 14.51L9.5 11.5Z"
      fill={color}
    />
    <Path
      d="M4 9.5C4 9.22386 4.21507 9 4.49048 9L7.50952 9C7.78049 9 8 9.23193 8 9.5C8 9.77614 7.78493 10 7.50952 10L4.49048 10C4.21951 10 4 9.76807 4 9.5Z"
      fill={color}
    />
    <Path
      d="M11 9.5C11 9.22386 11.2151 9 11.4905 9L14.5095 9C14.7805 9 15 9.23193 15 9.5C15 9.77614 14.7849 10 14.5095 10L11.4905 10C11.2195 10 11 9.76807 11 9.5Z"
      fill={color}
    />
    <Circle cx="9.5" cy="9.5" r="3" stroke={color} strokeWidth="1.5" />
    <Circle cx="9.5" cy="9.5" r="6" stroke={color} strokeWidth="1.5" strokeDasharray="2 2" />
  </Svg>
);

// Hue/Saturation icon (based on hue-saturation-svgrepo-com.svg)
export const HueIcon = ({ size = 16, color = "#E6E6E6" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 2C12 2 17 7 17 12C17 14.7614 14.7614 17 12 17C9.23858 17 7 14.7614 7 12C7 7 12 2 12 2Z"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M12 2C12 2 17 7 17 12C17 14.7614 14.7614 17 12 17"
      fill={color}
      fillOpacity="0.3"
    />
    <Circle cx="12" cy="21" r="2" stroke={color} strokeWidth="1.5" />
  </Svg>
);

// Saturation icon (based on saturate-svgrepo-com.svg - water droplet)
export const SaturationIcon = ({ size = 16, color = "#E6E6E6" }) => (
  <Svg width={size} height={size} viewBox="0 0 12 15" fill="none">
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8.54029 3.62262C7.91917 2.84198 7.24107 2.12411 6.63952 1.59401C6.37551 1.36135 5.88945 1 6 1C6.11055 1 5.62449 1.36135 5.36048 1.59401C4.75893 2.12411 4.08083 2.84198 3.45971 3.62262C1.9375 5.53578 1 7.48793 1 9C1 11.8083 3.21066 14 6 14C8.78934 14 11 11.8083 11 9C11 7.48793 10.0625 5.53578 8.54029 3.62262ZM6 15C2.68629 15 0 12.3883 0 9C0 5 5.13916 0 6 0C6.86084 0 12 5 12 9C12 12.3883 9.31371 15 6 15Z"
      fill={color}
    />
  </Svg>
);

// Alternative simple icons for when assets aren't needed
export const SimpleHighlightsIcon = ({ size = 16, color = "#E6E6E6" }) => (
  <Svg width={size} height={size} viewBox="0 0 16 16" fill="none">
    <Path
      d="M2.5 10C2.5 10 4 8.5 8 8.5C12 8.5 13.5 10 13.5 10"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <Path
      d="M4 12.5C4 12.5 5.5 11 8 11C10.5 11 12 12.5 12 12.5"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <Circle cx="8" cy="5" r="2" stroke={color} strokeWidth="1.5" />
  </Svg>
);

export const SimpleShadowsIcon = ({ size = 16, color = "#E6E6E6" }) => (
  <Svg width={size} height={size} viewBox="0 0 16 16" fill="none">
    <Path
      d="M14 8C14 11.3137 11.3137 14 8 14C4.68629 14 2 11.3137 2 8C2 4.68629 4.68629 2 8 2"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <Path
      d="M10 2.5C10 2.5 12 3 13 4C14 5 14.5 7 14.5 7"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </Svg>
);

export const SimpleWhitesIcon = ({ size = 16, color = "#E6E6E6" }) => (
  <Svg width={size} height={size} viewBox="0 0 16 16" fill="none">
    <Circle cx="8" cy="8" r="6" stroke={color} strokeWidth="1.5" />
  </Svg>
);

export const SimpleBlacksIcon = ({ size = 16, color = "#E6E6E6" }) => (
  <Svg width={size} height={size} viewBox="0 0 16 16" fill="none">
    <Circle cx="8" cy="8" r="6" fill={color} />
  </Svg>
);

export const VibranceIcon = ({ size = 16, color = "#E6E6E6" }) => (
  <Svg width={size} height={size} viewBox="0 0 16 16" fill="none">
    <Path
      d="M8 2L9.5 5.5L13.5 6L10.5 9L11.5 13L8 11L4.5 13L5.5 9L2.5 6L6.5 5.5L8 2Z"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const ColorMixerIcon = ({ size = 16, color = "#E6E6E6" }) => (
  <Svg width={size} height={size} viewBox="0 0 16 16" fill="none">
    <Circle cx="6" cy="6" r="3" stroke={color} strokeWidth="1.5" />
    <Circle cx="10" cy="6" r="3" stroke={color} strokeWidth="1.5" />
    <Circle cx="8" cy="10" r="3" stroke={color} strokeWidth="1.5" />
  </Svg>
);

// Export all icons as a map
export const FILTER_ICONS = {
  brightness: BrightnessIcon,
  contrast: ContrastIcon,
  exposure: ExposureIcon,
  hue: HueIcon,
  saturation: SaturationIcon,
  highlights: SimpleHighlightsIcon,
  shadows: SimpleShadowsIcon,
  whites: SimpleWhitesIcon,
  blacks: SimpleBlacksIcon,
  vibrance: VibranceIcon,
  colorMixer: ColorMixerIcon,
};

export default FILTER_ICONS;


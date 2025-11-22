import React from "react";
import Svg, { Path } from "react-native-svg";

/**
 * Brush Icon - Paint brush
 *
 * Represents painting, art style transfer, or creative tools.
 *
 * @param {number} size - Width and height of the icon (default: 28)
 * @param {string} color - Color of the icon (default: "#E6E6E6")
 */
const BrushIcon = ({ size = 28, color = "#E6E6E6" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M3 21c1.5-1.5 3.5-2.5 5.5-2.5 1.8 0 2.5.7 2.5 2.5M20.586 3.414a2 2 0 010 2.828l-11 11a2 2 0 01-2.828 0 2 2 0 010-2.828l11-11a2 2 0 012.828 0z"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path d="M18 6l-4-4" stroke={color} strokeWidth={2} strokeLinecap="round" />
  </Svg>
);

export default BrushIcon;

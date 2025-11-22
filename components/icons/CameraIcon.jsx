import React from "react";
import Svg, { Circle, Path, Rect } from "react-native-svg";

/**
 * Camera Icon
 *
 * Represents photo capture, image selection, or camera functionality.
 *
 * @param {number} size - Width and height of the icon (default: 28)
 * @param {string} color - Color of the icon (default: "#E6E6E6")
 */
const CameraIcon = ({ size = 28, color = "#E6E6E6" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Rect
      x={2}
      y={6}
      width={20}
      height={14}
      rx={2}
      stroke={color}
      strokeWidth={2}
    />
    <Path
      d="M7 6L8.5 3h7L18 6"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Circle cx={12} cy={13} r={3} stroke={color} strokeWidth={2} />
  </Svg>
);

export default CameraIcon;

import React from "react";
import Svg, { Path } from "react-native-svg";

/**
 * Back Icon - Chevron left
 *
 * Indicates back navigation, previous page, or leftward movement.
 *
 * @param {number} size - Width and height of the icon (default: 20)
 * @param {string} color - Color of the icon (default: "#BFBFBF")
 */
const BackIcon = ({ size = 20, color = "#BFBFBF" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M15 18l-6-6 6-6"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default BackIcon;

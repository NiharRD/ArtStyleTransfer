import React from "react";
import Svg, { Circle } from "react-native-svg";

/**
 * Master Icon - Filled circle
 *
 * Represents a primary/master state, active indicator, or filled bullet point.
 *
 * @param {number} size - Width and height of the icon (default: 16)
 * @param {string} color - Color of the icon (default: "#E6E6E6")
 */
const MasterIcon = ({ size = 16, color = "#E6E6E6" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx={12} cy={12} r={8} fill={color} />
  </Svg>
);

export default MasterIcon;

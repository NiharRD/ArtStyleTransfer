import React from "react";
import Svg, { Circle } from "react-native-svg";

/**
 * Dots Icon - Three horizontal dots (more menu)
 *
 * Represents additional options, more menu, or settings.
 *
 * @param {number} size - Width and height of the icon (default: 20)
 * @param {string} color - Color of the icon (default: "#E6E6E6")
 */
const DotsIcon = ({ size = 20, color = "#E6E6E6" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx={5} cy={12} r={2} fill={color} />
    <Circle cx={12} cy={12} r={2} fill={color} />
    <Circle cx={19} cy={12} r={2} fill={color} />
  </Svg>
);

export default DotsIcon;

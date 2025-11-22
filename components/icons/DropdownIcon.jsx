import React from "react";
import Svg, { Path } from "react-native-svg";

/**
 * Dropdown Icon - Chevron down
 *
 * Indicates expandable content, dropdown menus, or downward navigation.
 *
 * @param {number} size - Width and height of the icon (default: 15)
 * @param {string} color - Color of the icon (default: "#E6E6E6")
 */
const DropdownIcon = ({ size = 15, color = "#E6E6E6" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M6 9l6 6 6-6"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default DropdownIcon;

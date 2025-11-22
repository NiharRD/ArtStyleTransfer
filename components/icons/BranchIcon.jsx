import React from "react";
import Svg, { Circle, Path } from "react-native-svg";

/**
 * Branch Icon - Git branch style
 *
 * Represents branching, options, or version control concepts.
 *
 * @param {number} size - Width and height of the icon (default: 16)
 * @param {string} color - Color of the icon (default: "#E6E6E6")
 */
const BranchIcon = ({ size = 16, color = "#E6E6E6" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx={6} cy={6} r={3} stroke={color} strokeWidth={2} />
    <Circle cx={18} cy={18} r={3} stroke={color} strokeWidth={2} />
    <Path
      d="M6 9v6a3 3 0 003 3h6"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
    />
  </Svg>
);

export default BranchIcon;

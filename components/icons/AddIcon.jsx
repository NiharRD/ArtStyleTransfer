import React from "react";
import Svg, { Path } from "react-native-svg";

/**
 * Add Icon - Plus sign
 *
 * A simple plus/add icon, perfect for creating new items or adding content.
 *
 * @param {number} size - Width and height of the icon (default: 28)
 * @param {string} color - Color of the icon (default: "#E6E6E6")
 */
const AddIcon = ({ size = 28, color = "#E6E6E6" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 5v14M5 12h14"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
    />
  </Svg>
);

export default AddIcon;

import React from "react";
import Svg, { Path } from "react-native-svg";

/**
 * T-Shirt Icon
 *
 * Represents mockup generation, clothing, or apparel design.
 *
 * @param {number} size - Width and height of the icon (default: 28)
 * @param {string} color - Color of the icon (default: "#E6E6E6")
 */
const TShirtIcon = ({ size = 28, color = "#E6E6E6" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M16 3h3a1 1 0 011 1v5l-3 1v10a1 1 0 01-1 1H8a1 1 0 01-1-1V10L4 9V4a1 1 0 011-1h3"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M12 3c0 1.5-1 3-3 3s-3-1.5-3-3M12 3c0 1.5 1 3 3 3s3-1.5 3-3"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
    />
  </Svg>
);

export default TShirtIcon;

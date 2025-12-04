import Svg, { Path } from "react-native-svg";

/**
 * Redo Icon - Arrow turning right (clockwise)
 *
 * Indicates redo action to restore the last undone change.
 *
 * @param {number} size - Width and height of the icon (default: 20)
 * @param {string} color - Color of the icon (default: "#E6E6E6")
 */
const RedoIcon = ({ size = 20, color = "#E6E6E6" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M21 9L17 5M21 9L17 13M21 9H8C5.23858 9 3 11.2386 3 14C3 16.7614 5.23858 19 8 19H12"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default RedoIcon;

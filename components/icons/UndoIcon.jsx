import Svg, { Path } from "react-native-svg";

/**
 * Undo Icon - Arrow turning left (counter-clockwise)
 *
 * Indicates undo action to revert the last change.
 *
 * @param {number} size - Width and height of the icon (default: 20)
 * @param {string} color - Color of the icon (default: "#E6E6E6")
 */
const UndoIcon = ({ size = 20, color = "#E6E6E6" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M3 9L7 5M3 9L7 13M3 9H16C18.7614 9 21 11.2386 21 14C21 16.7614 18.7614 19 16 19H12"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default UndoIcon;

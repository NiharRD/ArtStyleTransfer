import Svg, { Path } from "react-native-svg";

/**
 * Infinite View Icon - Grid/Gallery icon
 *
 * Indicates Infinite View feature for viewing image history.
 *
 * @param {number} size - Width and height of the icon (default: 20)
 * @param {string} color - Color of the icon (default: "#E6E6E6")
 */
const InfiniteViewIcon = ({ size = 20, color = "#E6E6E6" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M3 3H10V10H3V3Z"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M14 3H21V10H14V3Z"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M14 14H21V21H14V14Z"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M3 14H10V21H3V14Z"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default InfiniteViewIcon;

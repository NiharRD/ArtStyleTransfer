import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Svg, {
  Defs,
  G,
  LinearGradient,
  Path,
  Rect,
  Stop,
} from "react-native-svg";
import {
  BorderRadius,
  Colors,
  Spacing,
  Typography,
} from "../../constants/Theme";
import FeatureSliderContainer from "./FeatureSliderContainer";
import ModalContainer from "./ModalContainer";
import TalkToKimiButton from "./TalkToKimiButton";
import XYPad from "./XYPad";

// Constants for upper section animation
const UPPER_SECTION_HEIGHT = 220; // Height of XY Pad / Sliders section

/**
 * Icon Components
 */
const DropdownIcon = ({ size = 16, color = "#E6E6E6" }) => (
  <Svg width={size} height={size} viewBox="0 0 16 16" fill="none">
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M2.97001 5.47C3.11064 5.32955 3.30126 5.25066 3.50001 5.25066C3.69876 5.25066 3.88939 5.32955 4.03001 5.47L8.00001 9.44L11.97 5.47C12.0387 5.39631 12.1215 5.33721 12.2135 5.29622C12.3055 5.25523 12.4048 5.23319 12.5055 5.23141C12.6062 5.22963 12.7062 5.24816 12.7996 5.28588C12.893 5.3236 12.9778 5.37974 13.049 5.45096C13.1203 5.52218 13.1764 5.60701 13.2141 5.7004C13.2519 5.79379 13.2704 5.89382 13.2686 5.99452C13.2668 6.09523 13.2448 6.19454 13.2038 6.28654C13.1628 6.37854 13.1037 6.46134 13.03 6.53L8.53001 11.03C8.38939 11.1705 8.19876 11.2493 8.00001 11.2493C7.80126 11.2493 7.61064 11.1705 7.47001 11.03L2.97001 6.53C2.82956 6.38938 2.75067 6.19875 2.75067 6C2.75067 5.80125 2.82956 5.61063 2.97001 5.47Z"
      fill={color}
    />
  </Svg>
);

const BulbIcon = ({ size = 16, color = "#E6E6E6" }) => (
  <Svg width={size} height={size} viewBox="0 0 16 16" fill="none">
    <G clipPath="url(#clip0_bulb)">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.26 15.109C6.8026 15.3711 7.39741 15.5073 8 15.5073C8.6026 15.5073 9.19741 15.3711 9.74 15.109L9.87 15.046C10.2085 14.8825 10.494 14.6269 10.6939 14.3085C10.8937 13.9902 10.9998 13.6219 11 13.246V12.778C11 11.426 11.776 10.221 12.54 9.105C13.105 8.27872 13.4339 7.31391 13.491 6.31454C13.5482 5.31517 13.3315 4.31915 12.8644 3.43383C12.3973 2.5485 11.6974 1.80745 10.8402 1.29053C9.98302 0.773605 9.001 0.500423 8 0.500423C6.999 0.500423 6.01698 0.773605 5.15978 1.29053C4.30258 1.80745 3.6027 2.5485 3.13558 3.43383C2.66846 4.31915 2.45181 5.31517 2.50898 6.31454C2.56615 7.31391 2.89497 8.27872 3.46 9.105C4.224 10.221 5 11.426 5 12.779V13.246C4.99998 13.6221 5.10598 13.9905 5.30586 14.3091C5.50573 14.6277 5.79137 14.8834 6.13 15.047L6.26 15.109ZM9.088 13.759L9.218 13.695C9.30253 13.6541 9.37381 13.5901 9.42368 13.5105C9.47356 13.4309 9.50001 13.3389 9.5 13.245V12.778C9.5 12.608 9.50833 12.4413 9.525 12.278C8.53004 12.5751 7.46996 12.5751 6.475 12.278C6.491 12.4413 6.49933 12.608 6.5 12.778V13.245C6.5 13.3389 6.52645 13.4309 6.57632 13.5105C6.62619 13.5901 6.69748 13.6541 6.782 13.695L6.912 13.758C7.25126 13.922 7.62319 14.0072 8 14.0072C8.37681 14.0072 8.74875 13.923 9.088 13.759ZM4.698 8.257C5.092 8.833 5.589 9.559 5.961 10.405C6.57004 10.7937 7.27749 11.0002 8 11.0002C8.72251 11.0002 9.42996 10.7937 10.039 10.405C10.411 9.559 10.908 8.833 11.303 8.257C11.7137 7.65603 11.9526 6.95439 11.994 6.22767C12.0354 5.50095 11.8778 4.7767 11.538 4.13297C11.1982 3.48924 10.6892 2.95043 10.0659 2.57459C9.4425 2.19875 8.7284 2.00012 8.0005 2.00012C7.2726 2.00012 6.5585 2.19875 5.93514 2.57459C5.31178 2.95043 4.8028 3.48924 4.46302 4.13297C4.12325 4.7767 3.96557 5.50095 4.00698 6.22767C4.04839 6.95439 4.28731 7.65603 4.698 8.257Z"
        fill={color}
      />
      <Path
        d="M8 3.5C7.80109 3.5 7.61032 3.57902 7.46967 3.71967C7.32902 3.86032 7.25 4.05109 7.25 4.25C7.25 4.44891 7.32902 4.63968 7.46967 4.78033C7.61032 4.92098 7.80109 5 8 5C8.26522 5 8.51957 5.10536 8.70711 5.29289C8.89464 5.48043 9 5.73478 9 6C9 6.19891 9.07902 6.38968 9.21967 6.53033C9.36032 6.67098 9.55109 6.75 9.75 6.75C9.94891 6.75 10.1397 6.67098 10.2803 6.53033C10.421 6.38968 10.5 6.19891 10.5 6C10.5 5.33696 10.2366 4.70107 9.76777 4.23223C9.29893 3.76339 8.66304 3.5 8 3.5Z"
        fill={color}
      />
    </G>
    <Defs>
      <G id="clip0_bulb">
        <Rect width="16" height="16" fill="white" />
      </G>
    </Defs>
  </Svg>
);

const SlidersVerticalIcon = ({ size = 16, color = "#E6E6E6" }) => (
  <Svg width={size} height={size} viewBox="0 0 16 16" fill="none">
    <G clipPath="url(#clip0_sliders)">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.999 8.49895C10.6012 8.49895 10.2196 8.65698 9.93832 8.93829C9.65701 9.21959 9.49898 9.60112 9.49898 9.99895C9.49898 10.3968 9.65701 10.7783 9.93832 11.0596C10.2196 11.3409 10.6012 11.4989 10.999 11.4989C11.3968 11.4989 11.7783 11.3409 12.0596 11.0596C12.3409 10.7783 12.499 10.3968 12.499 9.99895C12.499 9.60112 12.3409 9.21959 12.0596 8.93829C11.7783 8.65698 11.3968 8.49895 10.999 8.49895ZM10.249 7.09295C9.60498 7.25942 9.03453 7.63513 8.62727 8.16104C8.22001 8.68696 7.99902 9.33328 7.99902 9.99845C7.99902 10.6636 8.22001 11.3099 8.62727 11.8359C9.03453 12.3618 9.60498 12.7375 10.249 12.9039V14.2509C10.249 14.4499 10.328 14.6406 10.4686 14.7813C10.6093 14.9219 10.8001 15.0009 10.999 15.0009C11.1979 15.0009 11.3887 14.9219 11.5293 14.7813C11.67 14.6406 11.749 14.4499 11.749 14.2509V12.9039C12.393 12.7375 12.9634 12.3618 13.3707 11.8359C13.7779 11.3099 13.9989 10.6636 13.9989 9.99845C13.9989 9.33328 13.7779 8.68696 13.3707 8.16104C12.9634 7.63513 12.393 7.25942 11.749 7.09295V1.74795C11.749 1.54904 11.67 1.35827 11.5293 1.21762C11.3887 1.07697 11.1979 0.997948 10.999 0.997948C10.8001 0.997948 10.6093 1.07697 10.4686 1.21762C10.328 1.35827 10.249 1.54904 10.249 1.74795V7.09295ZM5.74898 14.2509V8.90595C6.39254 8.73914 6.96249 8.36335 7.36936 7.83756C7.77624 7.31178 7.997 6.66577 7.997 6.00095C7.997 5.33612 7.77624 4.69012 7.36936 4.16433C6.96249 3.63855 6.39254 3.26276 5.74898 3.09595V1.74695C5.74898 1.54804 5.66996 1.35727 5.52931 1.21662C5.38866 1.07597 5.19789 0.996948 4.99898 0.996948C4.80006 0.996948 4.6093 1.07597 4.46865 1.21662C4.32799 1.35727 4.24898 1.54804 4.24898 1.74695V3.09395C3.60498 3.26042 3.03453 3.63613 2.62727 4.16204C2.22001 4.68796 1.99902 5.33428 1.99902 5.99945C1.99902 6.66462 2.22001 7.31094 2.62727 7.83685C3.03453 8.36277 3.60498 8.73848 4.24898 8.90495V14.2499C4.24898 14.4489 4.32799 14.6396 4.46865 14.7803C4.6093 14.9209 4.80006 14.9999 4.99898 14.9999C5.19789 14.9999 5.38866 14.9209 5.52931 14.7803C5.66996 14.6396 5.74898 14.4489 5.74898 14.2499M6.49898 5.99995C6.49898 6.39777 6.34094 6.7793 6.05964 7.06061C5.77833 7.34191 5.3968 7.49995 4.99898 7.49995C4.60115 7.49995 4.21962 7.34191 3.93832 7.06061C3.65701 6.7793 3.49898 6.39777 3.49898 5.99995C3.49898 5.60212 3.65701 5.22059 3.93832 4.93929C4.21962 4.65798 4.60115 4.49995 4.99898 4.49995C5.3968 4.49995 5.77833 4.65798 6.05964 4.93929C6.34094 5.22059 6.49898 5.60212 6.49898 5.99995Z"
        fill={color}
      />
    </G>
    <Defs>
      <G id="clip0_sliders">
        <Rect width="16" height="16" fill="white" />
      </G>
    </Defs>
  </Svg>
);

const CodeForkIcon = ({ size = 16, color = "#E6E6E6" }) => (
  <Svg width={size} height={size} viewBox="0 0 16 16" fill="none">
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M5 3.25C5.19891 3.25 5.38968 3.32902 5.53033 3.46967C5.67098 3.61032 5.75 3.80109 5.75 4V5.56C5.75 6.018 5.94 6.45 6.27 6.77L7.47 7.97C7.759 8.259 8 8.725 8 9.25V13.5C8 13.6989 7.92098 13.8897 7.78033 14.0303C7.63968 14.171 7.44891 14.25 7.25 14.25C7.05109 14.25 6.86032 14.171 6.71967 14.0303C6.57902 13.8897 6.5 13.6989 6.5 13.5V9.25C6.5 9.15 6.418 8.92 6.22 8.72L5.02 7.52C4.367 6.867 4 5.986 4 5.06V4C4 3.80109 4.07902 3.61032 4.21967 3.46967C4.36032 3.32902 4.55109 3.25 4.75 3.25H5ZM11 3.25C10.8011 3.25 10.6103 3.32902 10.4697 3.46967C10.329 3.61032 10.25 3.80109 10.25 4V5.56C10.25 6.018 10.06 6.45 9.73 6.77L8.53 7.97C8.241 8.259 8 8.725 8 9.25V4C8 3.80109 8.07902 3.61032 8.21967 3.46967C8.36032 3.32902 8.55109 3.25 8.75 3.25H11ZM11.25 3.25C11.4489 3.25 11.6397 3.32902 11.7803 3.46967C11.921 3.61032 12 3.80109 12 4V5.06C12 5.986 11.633 6.867 10.98 7.52L9.78 8.72C9.582 8.92 9.5 9.15 9.5 9.25V13.5C9.5 13.6989 9.42098 13.8897 9.28033 14.0303C9.13968 14.171 8.94891 14.25 8.75 14.25C8.55109 14.25 8.36032 14.171 8.21967 14.0303C8.07902 13.8897 8 13.6989 8 13.5V9.25C8 8.725 8.241 8.259 8.53 7.97L9.73 6.77C10.06 6.45 10.25 6.018 10.25 5.56V4C10.25 3.80109 10.329 3.61032 10.4697 3.46967C10.6103 3.32902 10.8011 3.25 11 3.25H11.25Z"
      fill={color}
    />
  </Svg>
);

const MicButtonIcon = ({ size = 44, color = "#8A2BE2" }) => (
  <Svg width={size} height={size} viewBox="0 0 44 44" fill="none">
    {/* Circular background */}
    <Path
      d="M22 44C34.1503 44 44 34.1503 44 22C44 9.84974 34.1503 0 22 0C9.84974 0 0 9.84974 0 22C0 34.1503 9.84974 44 22 44Z"
      fill={color}
    />
    {/* Microphone icon - centered */}
    <Path
      d="M22 13C21.2044 13 20.4413 13.3161 19.8787 13.8787C19.3161 14.4413 19 15.2044 19 16V22C19 22.7956 19.3161 23.5587 19.8787 24.1213C20.4413 24.6839 21.2044 25 22 25C22.7956 25 23.5587 24.6839 24.1213 24.1213C24.6839 23.5587 25 22.7956 25 22V16C25 15.2044 24.6839 14.4413 24.1213 13.8787C23.5587 13.3161 22.7956 13 22 13Z"
      fill="white"
      fillOpacity="0.9"
    />
    <Path
      d="M16 21C16.2652 21 16.5196 21.1054 16.7071 21.2929C16.8946 21.4804 17 21.7348 17 22C17 23.3261 17.5268 24.5979 18.4645 25.5355C19.4021 26.4732 20.6739 27 22 27C23.3261 27 24.5979 26.4732 25.5355 25.5355C26.4732 24.5979 27 23.3261 27 22C27 21.7348 27.1054 21.4804 27.2929 21.2929C27.4804 21.1054 27.7348 21 28 21C28.2652 21 28.5196 21.1054 28.7071 21.2929C28.8946 21.4804 29 21.7348 29 22C28.9986 23.8565 28.2888 25.6448 27.0099 27.0022C25.731 28.3596 23.9912 29.1791 22.14 29.296L22 29.3V31H25C25.2652 31 25.5196 31.1054 25.7071 31.2929C25.8946 31.4804 26 31.7348 26 32C26 32.2652 25.8946 32.5196 25.7071 32.7071C25.5196 32.8946 25.2652 33 25 33H19C18.7348 33 18.4804 32.8946 18.2929 32.7071C18.1054 32.5196 18 32.2652 18 32C18 31.7348 18.1054 31.4804 18.2929 31.2929C18.4804 31.1054 18.7348 31 19 31H21.86L22 31V29.3C20.1488 29.1791 18.409 28.3596 17.1301 27.0022C15.8512 25.6448 15.1414 23.8565 15.14 22L15 22C15 21.7348 15.1054 21.4804 15.2929 21.2929C15.4804 21.1054 15.7348 21 16 21Z"
      fill="white"
      fillOpacity="0.9"
    />
  </Svg>
);

const ArrowSendIcon = ({ size = 44, color = "#8A2BE2" }) => (
  <Svg width={size} height={size} viewBox="0 0 44 44" fill="none">
    {/* Circular background */}
    <Path
      d="M22 44C34.1503 44 44 34.1503 44 22C44 9.84974 34.1503 0 22 0C9.84974 0 0 9.84974 0 22C0 34.1503 9.84974 44 22 44Z"
      fill={color}
    />
    {/* Arrow icon - scaled and centered */}
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M13.0719 26.7381L14.1277 21.8156L13.0719 16.8932C12.9455 16.3057 12.9862 15.6946 13.1894 15.129C13.3926 14.5635 13.7502 14.0662 14.2215 13.6935C14.6929 13.3207 15.2593 13.0875 15.8564 13.0202C16.4536 12.9529 17.0576 13.0543 17.6001 13.3127L29.512 18.9772C30.0485 19.2326 30.5017 19.6348 30.819 20.1372C31.1364 20.6396 31.3049 21.2216 31.305 21.8158C31.3051 22.41 31.1368 22.9921 30.8196 23.4946C30.5024 23.9971 30.0494 24.3994 29.5129 24.655L17.5992 30.3176C17.0568 30.5757 16.453 30.6768 15.8561 30.6094C15.2592 30.542 14.6931 30.3088 14.2219 29.9363C13.7508 29.5637 13.3933 29.0667 13.1901 28.5015C12.9868 27.9362 12.9459 27.3254 13.0719 26.7381ZM16.7358 28.5008L28.6467 22.8392C28.8409 22.7478 29.0051 22.603 29.1202 22.4217C29.2352 22.2405 29.2963 22.0303 29.2963 21.8156C29.2963 21.601 29.2352 21.3907 29.1202 21.2095C29.0051 21.0283 28.8409 20.8835 28.6467 20.7921L16.7377 15.1304C16.5344 15.0332 16.3079 14.9948 16.084 15.0197C15.86 15.0446 15.6474 15.1317 15.4705 15.2712C15.2935 15.4107 15.1591 15.597 15.0826 15.809C15.006 16.021 14.9904 16.2501 15.0375 16.4705L15.9672 20.8101L22.1833 20.8092C22.3167 20.8069 22.4493 20.8312 22.5732 20.8808C22.6972 20.9303 22.81 21.004 22.9052 21.0976C23.0003 21.1912 23.0759 21.3028 23.1275 21.4259C23.179 21.5491 23.2055 21.6812 23.2055 21.8147C23.2054 21.9482 23.1788 22.0803 23.1271 22.2033C23.0754 22.3264 22.9998 22.438 22.9045 22.5315C22.8093 22.625 22.6964 22.6986 22.5724 22.748C22.4484 22.7974 22.3158 22.8216 22.1823 22.8192L15.9663 22.8202L15.0375 27.1588C14.9902 27.3791 15.0056 27.6082 15.0819 27.8202C15.1582 28.0322 15.2923 28.2186 15.469 28.3583C15.6458 28.498 15.8582 28.5854 16.0821 28.6106C16.3059 28.6358 16.5324 28.5977 16.7358 28.5008Z"
      fill="white"
      fillOpacity="0.9"
    />
    <Path
      d="M29.4844 19.0358C30.0097 19.2859 30.4532 19.6798 30.7639 20.1717C31.0747 20.6638 31.2396 21.2339 31.2397 21.8159C31.2398 22.3978 31.0758 22.968 30.7653 23.4601C30.4547 23.9522 30.0105 24.3464 29.485 24.5967L17.5719 30.2591C17.0405 30.5119 16.4484 30.6109 15.8636 30.5449C15.2787 30.4789 14.7239 30.2505 14.2622 29.8855C13.8005 29.5204 13.4504 29.0334 13.2513 28.4796C13.0521 27.9257 13.0118 27.3273 13.1353 26.7518L14.1911 21.829L14.1939 21.8152L14.1904 21.8021L13.1353 16.88C13.0114 16.3043 13.0508 15.705 13.2499 15.1509C13.449 14.5967 13.7997 14.1095 14.2615 13.7442C14.7234 13.379 15.2785 13.15 15.8636 13.0841C16.4486 13.0182 17.0404 13.1182 17.5719 13.3714L29.4844 19.0358ZM29.175 21.1751C29.0534 20.9835 28.8796 20.8305 28.6744 20.7338L16.7654 15.0715C16.5513 14.9691 16.3121 14.9293 16.0762 14.9554C15.8406 14.9817 15.6169 15.0732 15.4306 15.2199C15.2441 15.3669 15.1024 15.5642 15.0218 15.7875C14.9413 16.0108 14.9246 16.2522 14.9742 16.4843L15.9036 20.8236L15.9147 20.8747H15.9671L22.1833 20.8733L22.184 20.874C22.3089 20.8719 22.4334 20.8947 22.5493 20.941C22.6652 20.9873 22.7711 21.0565 22.8601 21.144C22.949 21.2315 23.0197 21.3362 23.0679 21.4513C23.116 21.5663 23.1411 21.6898 23.1411 21.8145C23.141 21.9394 23.1156 22.0633 23.0672 22.1784C23.031 22.2647 22.9826 22.3451 22.9229 22.4167L22.8594 22.4857C22.7703 22.5732 22.6639 22.6418 22.5479 22.688C22.4321 22.7341 22.308 22.7566 22.1833 22.7543H22.182L15.9665 22.755H15.914L15.9029 22.8061L14.9742 27.1448C14.9244 27.3769 14.9408 27.6188 15.0211 27.8422C15.1015 28.0655 15.243 28.262 15.4292 28.4091C15.6154 28.5562 15.8391 28.6484 16.0749 28.675C16.3106 28.7015 16.5492 28.6616 16.7633 28.5597L28.6744 22.898C28.8797 22.8014 29.0534 22.6483 29.175 22.4567C29.2966 22.2651 29.3607 22.0421 29.3607 21.8152C29.3607 21.5885 29.2964 21.3665 29.175 21.1751Z"
      stroke="url(#paint0_linear_send)"
      strokeOpacity="0.8"
      strokeWidth="0.13"
    />
    <Defs>
      <LinearGradient
        id="paint0_linear_send"
        x1="18.4607"
        y1="13.2486"
        x2="22.6919"
        y2="32.0167"
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="white" />
        <Stop offset="1" stopColor="white" stopOpacity="0" />
      </LinearGradient>
    </Defs>
  </Svg>
);

/**
 * GlobalEditingModal - Modal with input states and toggleable upper section
 *
 * Input States:
 * - 'textInput': Default state with send icon (ArrowSendIcon)
 * - 'voicePrompt': Voice prompt state with mic icon (MicButtonIcon)
 *
 * Upper Section States:
 * - 'bulbState': Shows XY Pad
 * - 'slidersState': Shows Feature Slider
 */
const GlobalEditingModal = ({ visible, onClose, onHeightChange }) => {
  // Input state: textInput (first state) or voicePrompt (second state)
  const [inputState, setInputState] = useState("textInput");

  // Upper section visibility (XY Pad / Sliders)
  const [upperSectionVisible, setUpperSectionVisible] = useState(false);

  // Modal state for upper section content (bulb = XY Pad, sliders = Feature Slider)
  const [modalState, setModalState] = useState("bulbState");
  const [promptText, setPromptText] = useState("");

  // Animation value for upper section height
  const upperSectionHeightAnim = useRef(new Animated.Value(0)).current;

  // XY Pad state management for bulb state
  const [xyPadValue, setXYPadValue] = useState({ x: 0, y: 0 });

  // Slider state management for all features
  const [sliderValues, setSliderValues] = useState({
    brightness: 0,
    contrast: 0,
    exposure: 0,
    highlights: 0,
    shadows: 0,
    whites: 0,
    blacks: 0,
    saturation: 0,
    vibrance: 5, // Default to 5
    colorMixer: {
      red: 0,
      orange: 0,
      yellow: 0,
      green: 0,
      cyan: 0,
      blue: 0,
      purple: 0,
    },
  });
  const [selectedFeature, setSelectedFeature] = useState("vibrance");
  const [selectedColorChannel, setSelectedColorChannel] = useState("red");

  // Handler for slider value changes
  const handleSliderValueChange = (feature, value) => {
    setSliderValues((prev) => ({
      ...prev,
      [feature]: value,
    }));
  };

  // Animate upper section height when visibility changes
  useEffect(() => {
    const targetHeight = upperSectionVisible ? UPPER_SECTION_HEIGHT : 0;
    Animated.spring(upperSectionHeightAnim, {
      toValue: targetHeight,
      useNativeDriver: false,
      tension: 65,
      friction: 11,
    }).start();
  }, [upperSectionVisible]);

  // Calculate modal height based on state
  const getModalHeight = () => {
    // Base height without upper section
    let baseHeight = 280;

    // Add upper section height if visible
    if (upperSectionVisible) {
      if (modalState === "slidersState") {
        // Taller when slider is shown, even taller when color mixer is selected
        baseHeight += selectedFeature === "colorMixer" ? 260 : 220;
      } else {
        baseHeight += UPPER_SECTION_HEIGHT;
      }
    }

    return baseHeight;
  };

  // Report height changes to parent for canvas animation
  useEffect(() => {
    if (onHeightChange) {
      const height = visible ? getModalHeight() : 0;
      onHeightChange(height);
    }
  }, [visible, modalState, selectedFeature, upperSectionVisible]);

  // Close modal when clicking "Global Editing" dropdown
  const handleHeaderClick = () => {
    onClose();
  };

  // Toggle between bulb/sliders states
  const handleBulbPress = () => {
    setModalState("bulbState");
  };

  const handleSlidersPress = () => {
    setModalState("slidersState");
  };

  // Handle Talk to Kimi button press - toggles input state
  const handleTalkToKimiPress = () => {
    if (inputState === "textInput") {
      setInputState("voicePrompt");
    } else {
      setInputState("textInput");
    }
  };

  // Handle send button press - reveals upper section
  const handleSend = () => {
    console.log("Send clicked:", promptText);
    // Reveal the upper section (XY Pad / Sliders)
    setUpperSectionVisible(true);
  };

  // Handle tick button press - reveals upper section (placeholder for AI/ML)
  const handleTickPress = () => {
    console.log("Tick clicked - revealing upper section");
    setUpperSectionVisible(true);
  };

  // Get Talk to Kimi button label based on input state
  const getTalkToKimiLabel = () => {
    return inputState === "textInput"
      ? "Talk to Kimi instead"
      : "Chat with Kimi";
  };

  return (
    <ModalContainer
      visible={visible}
      onClose={onClose}
      height={getModalHeight()}
    >
      <View style={styles.container}>
        {/* Talk to Kimi Button */}
        <TalkToKimiButton
          onPress={handleTalkToKimiPress}
          label={getTalkToKimiLabel()}
        />

        {/* Main Content */}
        <View style={styles.contentContainer}>
          {/* Upper Section - Animated container for XY Pad / Sliders */}
          <Animated.View
            style={[
              styles.upperSection,
              {
                height: upperSectionHeightAnim,
                opacity: upperSectionHeightAnim.interpolate({
                  inputRange: [
                    0,
                    UPPER_SECTION_HEIGHT * 0.5,
                    UPPER_SECTION_HEIGHT,
                  ],
                  outputRange: [0, 0.5, 1],
                }),
                overflow: "hidden",
              },
            ]}
          >
            {/* Header Row with helper text */}
            <View style={styles.helperRow}>
              {modalState === "bulbState" ? (
                <>
                  <BulbIcon size={15} color="rgba(255, 255, 255, 0.6)" />
                  <Text style={styles.helperText}>
                    Touch the point to help Kimi understand better.
                  </Text>
                </>
              ) : (
                <>
                  <SlidersVerticalIcon
                    size={15}
                    color="rgba(255, 255, 255, 0.6)"
                  />
                  <Text style={styles.helperText}>
                    Tweak these values for advanced changes
                  </Text>
                </>
              )}
            </View>

            {/* Content based on state */}
            {modalState === "bulbState" ? (
              <XYPad
                value={xyPadValue}
                onValueChange={setXYPadValue}
                dotColor="#8A2BE2"
              />
            ) : (
              <FeatureSliderContainer
                sliderValues={sliderValues}
                onSliderValueChange={handleSliderValueChange}
                selectedFeature={selectedFeature}
                onFeatureSelect={setSelectedFeature}
                selectedColorChannel={selectedColorChannel}
                onColorChannelSelect={setSelectedColorChannel}
              />
            )}
          </Animated.View>

          {/* Bottom Controls Row */}
          <View style={styles.controlsRow}>
            {/* Global Editing Dropdown - closes modal on click */}
            <TouchableOpacity
              style={styles.globalEditingButton}
              onPress={handleHeaderClick}
              activeOpacity={0.7}
            >
              <Text style={styles.globalEditingText}>Global Editing</Text>
              <DropdownIcon size={16} color={Colors.textAccent} />
            </TouchableOpacity>

            {/* Toggle Buttons - only show when upper section is visible */}
            {upperSectionVisible && (
              <View style={styles.toggleContainer}>
                {/* Bulb Button */}
                <TouchableOpacity
                  style={[
                    styles.toggleButton,
                    modalState === "bulbState" && styles.toggleButtonActive,
                  ]}
                  onPress={handleBulbPress}
                  activeOpacity={0.7}
                >
                  <BulbIcon
                    size={16}
                    color={modalState === "bulbState" ? "#1D1C1D" : "#E6E6E6"}
                  />
                </TouchableOpacity>

                {/* Sliders Button */}
                <TouchableOpacity
                  style={[
                    styles.toggleButton,
                    modalState === "slidersState" && styles.toggleButtonActive,
                  ]}
                  onPress={handleSlidersPress}
                  activeOpacity={0.7}
                >
                  <SlidersVerticalIcon
                    size={16}
                    color={
                      modalState === "slidersState" ? "#1D1C1D" : "#E6E6E6"
                    }
                  />
                </TouchableOpacity>
              </View>
            )}
          </View>

          {/* Static Chat History Section - only show when upper section is visible */}
          {upperSectionVisible && (
            <View style={styles.chatHistorySection}>
              <View style={styles.historyItem}>
                <CodeForkIcon size={16} color="rgba(255, 255, 255, 0.6)" />
                <View style={styles.historyContent}>
                  <Text style={styles.historyText}>
                    Gotcha! I have done those changes to your image. Can you
                    play with the point to help me deliver a more accurate
                    result?
                  </Text>
                  <View style={styles.historyTags}>
                    <View style={styles.historyTag}>
                      <Text style={styles.tagText}>Added Motion Blur</Text>
                    </View>
                    <View style={styles.historyTag}>
                      <Text style={styles.tagText}>Increased Sharpness</Text>
                    </View>
                    <View style={styles.historyTag}>
                      <Text style={styles.tagText}>5 more</Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          )}

          {/* Text Input Row */}
          <View style={styles.inputRow}>
            <TextInput
              style={styles.textInput}
              value={promptText}
              onChangeText={setPromptText}
              placeholder={
                inputState === "textInput"
                  ? "Can you make this scene more gloomy"
                  : "Awesome! Now change the mood to something..."
              }
              placeholderTextColor="rgba(255, 255, 255, 0.6)"
              multiline
            />
            <TouchableOpacity
              style={styles.sendButton}
              onPress={
                inputState === "textInput" ? handleSend : handleTickPress
              }
              activeOpacity={0.7}
            >
              {inputState === "textInput" ? (
                <ArrowSendIcon size={44} color={Colors.aiPrimary} />
              ) : (
                <MicButtonIcon size={44} color={Colors.aiPrimary} />
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ModalContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 12,
    paddingBottom: 4,
    paddingTop: Spacing.sm,
    gap: Spacing.sm,
  },
  contentContainer: {
    backgroundColor: "#1D1C1D",
    borderWidth: 0,
    borderColor: "#FFFFFF",
    borderRadius: 24,
    paddingTop: Spacing.md,
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.md,
    gap: Spacing.md,
  },
  upperSection: {
    gap: Spacing.md,
  },
  helperRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingHorizontal: 4,
    paddingVertical: 4,
  },
  helperText: {
    fontFamily: Typography.fontFamily.regular,
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.6)",
    letterSpacing: 0.28,
  },
  controlsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  globalEditingButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "rgba(47, 44, 45, 0.9)",
    borderWidth: 0.681,
    borderColor: Colors.glassBorder,
    borderRadius: BorderRadius.pill,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
  },
  globalEditingText: {
    fontFamily: Typography.fontFamily.regular,
    fontSize: Typography.fontSize.base,
    color: "#F2F2F7",
    letterSpacing: Typography.letterSpacing.normal,
  },
  toggleContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(47, 44, 45, 0.9)",
    borderWidth: 0.681,
    borderColor: Colors.glassBorder,
    borderRadius: BorderRadius.pill,
    height: 32,
    paddingHorizontal: 4,
    paddingVertical: 3,
    gap: 4,
  },
  toggleButton: {
    width: 23,
    height: 23,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  toggleButtonActive: {
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1.4 },
    shadowOpacity: 0.06,
    shadowRadius: 14,
    elevation: 2,
  },
  chatHistorySection: {
    gap: Spacing.sm,
  },
  historyItem: {
    flexDirection: "row",
    gap: 7,
    alignItems: "flex-start",
  },
  historyContent: {
    flex: 1,
    gap: 5,
  },
  historyText: {
    fontFamily: Typography.fontFamily.regular,
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.6)",
    letterSpacing: 0.28,
    lineHeight: 19,
  },
  historyTags: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 4,
  },
  historyTag: {
    backgroundColor: "rgba(47, 44, 45, 0.9)",
    borderWidth: 0.681,
    borderColor: Colors.glassBorder,
    borderRadius: BorderRadius.pill,
    paddingHorizontal: 6,
    paddingVertical: 4,
  },
  tagText: {
    fontFamily: Typography.fontFamily.regular,
    fontSize: 10,
    color: "rgba(242, 242, 247, 0.5)",
    letterSpacing: Typography.letterSpacing.normal,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.md,
  },
  textInput: {
    flex: 1,
    fontFamily: Typography.fontFamily.regular,
    fontSize: Typography.fontSize.base,
    color: Colors.textPrimary,
    letterSpacing: 0.16,
    minHeight: 40,
    maxHeight: 60,
  },
  sendButton: {
    width: 44,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default GlobalEditingModal;

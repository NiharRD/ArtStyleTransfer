import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import Svg, {
  Path,
  Mask,
  G,
  Defs,
  LinearGradient,
  Stop,
  Filter,
  FeFlood,
  FeBlend,
  FeGaussianBlur,
} from "react-native-svg";

/**
 * AI Prompt Button - Sparkle Icon from Assets
 *
 * Beautiful sparkle/star shape button with gradient effects.
 * Design: Based on PromptButtom.svg from assets folder.
 */
const AIPromptButton = ({ onPress }) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.85}
    >
      <Svg width={79} height={78} viewBox="0 0 79 78" fill="none">
        <Mask
          id="mask0_435_1631"
          style="mask-type:alpha"
          maskUnits="userSpaceOnUse"
          x="7"
          y="7"
          width="64"
          height="64"
        >
          <Path
            d="M33.1955 10.9645C35.8243 6.20788 42.6861 6.20788 45.3149 10.9645C50.4103 20.1842 58.058 27.7777 67.3222 32.7918C72.133 35.3955 72.133 42.2989 67.3222 44.9027C58.058 49.9168 50.4103 57.5102 45.3149 66.7299C42.6861 71.4866 35.8243 71.4866 33.1955 66.7299C28.1001 57.5102 20.4524 49.9168 11.1882 44.9027C6.3774 42.2989 6.3774 35.3955 11.1882 32.7918C20.4524 27.7777 28.1001 20.1842 33.1955 10.9645Z"
            fill="#1715A6"
          />
          <Path
            d="M33.1955 10.9645C35.8243 6.20788 42.6861 6.20788 45.3149 10.9645C50.4103 20.1842 58.058 27.7777 67.3222 32.7918C72.133 35.3955 72.133 42.2989 67.3222 44.9027C58.058 49.9168 50.4103 57.5102 45.3149 66.7299C42.6861 71.4866 35.8243 71.4866 33.1955 66.7299C28.1001 57.5102 20.4524 49.9168 11.1882 44.9027C6.3774 42.2989 6.3774 35.3955 11.1882 32.7918C20.4524 27.7777 28.1001 20.1842 33.1955 10.9645Z"
            fill="url(#paint0_linear_435_1631)"
          />
        </Mask>
        <G mask="url(#mask0_435_1631)">
          <G filter="url(#filter0_f_435_1631)">
            <Path
              d="M35.3227 7.71518C35.8699 4.12789 40.5849 3.15787 42.5039 6.23779L48.8094 16.3583C53.3472 23.6417 59.8696 29.4785 67.6102 33.1829C71.9278 35.2491 71.8658 41.4173 67.5075 43.3964L66.8342 43.7021C56.7291 48.2908 48.5967 56.3397 43.9038 66.3968L43.667 66.9044C41.6721 71.1797 35.5788 71.1499 33.5838 66.8745C28.7854 56.5913 20.1986 48.5007 9.63536 44.3547L7.84839 43.6533C3.50847 41.9499 3.80129 35.7125 8.2817 34.4231L13.0591 33.0483C24.7886 29.673 33.4819 19.7811 35.3227 7.71518Z"
              fill="url(#paint1_linear_435_1631)"
            />
          </G>
          <G filter="url(#filter1_f_435_1631)">
            <Path
              d="M37.4829 18.0331C37.8538 15.6016 41.0498 14.9441 42.3504 17.0317L46.6244 23.8916C49.7003 28.8284 54.1213 32.7847 59.368 35.2957C62.2946 36.6962 62.2526 40.8771 59.2984 42.2186L58.842 42.4258C51.9926 45.5361 46.4803 50.9918 43.2994 57.8088L43.1389 58.1527C41.7866 61.0507 37.6565 61.0305 36.3042 58.1325C33.0518 51.1623 27.2315 45.6784 20.0715 42.8681L18.8603 42.3927C15.9186 41.2381 16.1171 37.0103 19.154 36.1363L22.3922 35.2045C30.3427 32.9166 36.2352 26.2116 37.4829 18.0331Z"
              fill="url(#paint2_linear_435_1631)"
            />
          </G>
          <G filter="url(#filter2_f_435_1631)">
            <Path
              d="M38.5326 69.6186C36.3449 58.3574 30.703 52.316 26.7882 48.1517L38.7629 57.524L50.7375 48.1517C50.7375 48.1517 40.49 57.6536 38.5326 69.6186Z"
              fill="#D9D9D9"
              fillOpacity="0.5"
            />
          </G>
          <G filter="url(#filter3_f_435_1631)">
            <Path
              d="M38.3321 71.7146C34.2332 54.3339 23.6625 45.0097 16.3278 38.5825L29.0808 43.5018L38.3321 54.7354L48.6881 43.5018L61.1992 38.5825C61.1992 38.5825 41.9994 53.2476 38.3321 71.7146Z"
              fill="#D9D9D9"
              fillOpacity="0.3"
            />
          </G>
        </G>
        <Defs>
          <Filter
            id="filter0_f_435_1631"
            x="-13.8188"
            y="-14.1774"
            width="103.202"
            height="102.844"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <FeFlood floodOpacity="0" result="BackgroundImageFix" />
            <FeBlend
              mode="normal"
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            />
            <FeGaussianBlur
              stdDeviation="9.2853"
              result="effect1_foregroundBlur_435_1631"
            />
          </Filter>
          <Filter
            id="filter1_f_435_1631"
            x="1.47843"
            y="0.498454"
            width="75.3432"
            height="75.1006"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <FeFlood floodOpacity="0" result="BackgroundImageFix" />
            <FeBlend
              mode="normal"
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            />
            <FeGaussianBlur
              stdDeviation="7.64146"
              result="effect1_foregroundBlur_435_1631"
            />
          </Filter>
          <Filter
            id="filter2_f_435_1631"
            x="15.326"
            y="36.6895"
            width="46.8737"
            height="44.3913"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <FeFlood floodOpacity="0" result="BackgroundImageFix" />
            <FeBlend
              mode="normal"
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            />
            <FeGaussianBlur
              stdDeviation="5.73109"
              result="effect1_foregroundBlur_435_1631"
            />
          </Filter>
          <Filter
            id="filter3_f_435_1631"
            x="4.86557"
            y="27.1203"
            width="67.7958"
            height="56.0565"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <FeFlood floodOpacity="0" result="BackgroundImageFix" />
            <FeBlend
              mode="normal"
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            />
            <FeGaussianBlur
              stdDeviation="5.73109"
              result="effect1_foregroundBlur_435_1631"
            />
          </Filter>
          <LinearGradient
            id="paint0_linear_435_1631"
            x1="39.2552"
            y1="68.3108"
            x2="37.4632"
            y2="5.27696"
            gradientUnits="userSpaceOnUse"
          >
            <Stop stopColor="#FF432B" stopOpacity="0" />
            <Stop offset="1" stopColor="#FF432B" />
          </LinearGradient>
          <LinearGradient
            id="paint1_linear_435_1631"
            x1="38.6324"
            y1="3.29064"
            x2="38.6324"
            y2="73.5088"
            gradientUnits="userSpaceOnUse"
          >
            <Stop stopColor="#3D103D" />
            <Stop offset="0.471154" stopColor="#322DCA" />
            <Stop offset="1" stopColor="#AFBFFF" />
          </LinearGradient>
          <LinearGradient
            id="paint2_linear_435_1631"
            x1="39.7263"
            y1="15.0341"
            x2="39.7263"
            y2="62.6294"
            gradientUnits="userSpaceOnUse"
          >
            <Stop stopColor="#3D103D" />
            <Stop offset="0.471154" stopColor="#322DCA" />
            <Stop offset="1" stopColor="#AFBFFF" />
          </LinearGradient>
        </Defs>
      </Svg>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 79,
    height: 78,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default AIPromptButton;

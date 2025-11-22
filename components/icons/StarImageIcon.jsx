import React from "react";
import Svg, { Defs, Filter, FeBlend, FeFlood, FeGaussianBlur, G, LinearGradient, Mask, Path, Stop } from "react-native-svg";

/**
 * Star Image Icon - Decorative sparkle/star with gradient (From assets/icons/star.svg)
 * 
 * This is a more elaborate star design with gradients and filters,
 * suitable for decorative purposes, AI features, or premium elements.
 * 
 * @param {number} size - Width and height of the icon (default: 18)
 * @param {object} style - Additional styles to apply
 */
const StarImageIcon = ({ size = 18, style }) => {
  // Original SVG is 79x78
  const aspectRatio = 79 / 78;
  const width = size * aspectRatio;
  
  return (
    <Svg width={width} height={size} viewBox="0 0 79 78" fill="none" style={style}>
      <Defs>
        <Mask id="mask0_228_1187" maskUnits="userSpaceOnUse" x="7" y="7" width="64" height="64">
          <Path 
            d="M33.1956 10.9645C35.8244 6.20788 42.6862 6.20788 45.315 10.9645C50.4104 20.1842 58.0581 27.7777 67.3223 32.7918C72.1331 35.3955 72.1331 42.2989 67.3223 44.9027C58.0581 49.9168 50.4104 57.5102 45.315 66.7299C42.6862 71.4866 35.8244 71.4866 33.1956 66.7299C28.1002 57.5102 20.4525 49.9168 11.1883 44.9027C6.37751 42.2989 6.37751 35.3955 11.1883 32.7918C20.4525 27.7777 28.1002 20.1842 33.1956 10.9645Z" 
            fill="#1715A6"
          />
          <Path 
            d="M33.1956 10.9645C35.8244 6.20788 42.6862 6.20788 45.315 10.9645C50.4104 20.1842 58.0581 27.7777 67.3223 32.7918C72.1331 35.3955 72.1331 42.2989 67.3223 44.9027C58.0581 49.9168 50.4104 57.5102 45.315 66.7299C42.6862 71.4866 35.8244 71.4866 33.1956 66.7299C28.1002 57.5102 20.4525 49.9168 11.1883 44.9027C6.37751 42.2989 6.37751 35.3955 11.1883 32.7918C20.4525 27.7777 28.1002 20.1842 33.1956 10.9645Z" 
            fill="url(#paint0_linear_228_1187)"
          />
        </Mask>
        
        <LinearGradient id="paint0_linear_228_1187" x1="39.2553" y1="68.3108" x2="37.4633" y2="5.27696" gradientUnits="userSpaceOnUse">
          <Stop stopColor="#FF432B" stopOpacity="0"/>
          <Stop offset="1" stopColor="#FF432B"/>
        </LinearGradient>
        
        <LinearGradient id="paint1_linear_228_1187" x1="38.6322" y1="3.29064" x2="38.6322" y2="73.5088" gradientUnits="userSpaceOnUse">
          <Stop stopColor="#3D103D"/>
          <Stop offset="0.471154" stopColor="#322DCA"/>
          <Stop offset="1" stopColor="#AFBFFF"/>
        </LinearGradient>
        
        <LinearGradient id="paint2_linear_228_1187" x1="39.7265" y1="15.0341" x2="39.7265" y2="62.6294" gradientUnits="userSpaceOnUse">
          <Stop stopColor="#3D103D"/>
          <Stop offset="0.471154" stopColor="#322DCA"/>
          <Stop offset="1" stopColor="#AFBFFF"/>
        </LinearGradient>
        
        <Filter id="filter0_f_228_1187" x="-13.8191" y="-14.1775" width="103.202" height="102.844" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <FeFlood floodOpacity="0" result="BackgroundImageFix"/>
          <FeBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
          <FeGaussianBlur stdDeviation="9.2853" result="effect1_foregroundBlur_228_1187"/>
        </Filter>
        
        <Filter id="filter1_f_228_1187" x="1.4788" y="0.498576" width="75.3432" height="75.1005" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <FeFlood floodOpacity="0" result="BackgroundImageFix"/>
          <FeBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
          <FeGaussianBlur stdDeviation="7.64146" result="effect1_foregroundBlur_228_1187"/>
        </Filter>
        
        <Filter id="filter2_f_228_1187" x="15.3259" y="36.6894" width="46.8736" height="44.3912" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <FeFlood floodOpacity="0" result="BackgroundImageFix"/>
          <FeBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
          <FeGaussianBlur stdDeviation="5.73109" result="effect1_foregroundBlur_228_1187"/>
        </Filter>
        
        <Filter id="filter3_f_228_1187" x="4.86545" y="27.1203" width="67.796" height="56.0565" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <FeFlood floodOpacity="0" result="BackgroundImageFix"/>
          <FeBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
          <FeGaussianBlur stdDeviation="5.73109" result="effect1_foregroundBlur_228_1187"/>
        </Filter>
      </Defs>
      
      <G mask="url(#mask0_228_1187)">
        <G filter="url(#filter0_f_228_1187)">
          <Path 
            d="M35.3225 7.71518C35.8698 4.12789 40.5848 3.15787 42.5037 6.23779L48.8092 16.3583C53.347 23.6417 59.8695 29.4785 67.61 33.1829C71.9277 35.2491 71.8657 41.4173 67.5074 43.3964L66.8341 43.7021C56.729 48.2908 48.5965 56.3397 43.9037 66.3968L43.6669 66.9044C41.6719 71.1797 35.5786 71.1499 33.5836 66.8745C28.7853 56.5913 20.1984 48.5007 9.63521 44.3547L7.84824 43.6533C3.50832 41.9499 3.80114 35.7125 8.28155 34.4231L13.059 33.0483C24.7885 29.673 33.4818 19.7811 35.3225 7.71518Z" 
            fill="url(#paint1_linear_228_1187)"
          />
        </G>
        <G filter="url(#filter1_f_228_1187)">
          <Path 
            d="M37.4831 18.0331C37.854 15.6016 41.0499 14.9441 42.3506 17.0317L46.6246 23.8916C49.7005 28.8284 54.1215 32.7847 59.3682 35.2957C62.2948 36.6962 62.2527 40.8771 59.2986 42.2186L58.8422 42.4258C51.9928 45.5361 46.4804 50.9918 43.2996 57.8088L43.139 58.1527C41.7868 61.0507 37.6567 61.0305 36.3044 58.1325C33.052 51.1623 27.2316 45.6784 20.0717 42.8681L18.8605 42.3927C15.9188 41.2381 16.1172 37.0103 19.1542 36.1363L22.3924 35.2045C30.3429 32.9166 36.2354 26.2116 37.4831 18.0331Z" 
            fill="url(#paint2_linear_228_1187)"
          />
        </G>
        <G filter="url(#filter2_f_228_1187)">
          <Path 
            d="M38.5325 69.6185C36.3448 58.3573 30.7029 52.3159 26.7881 48.1516L38.7627 57.5239L50.7374 48.1516C50.7374 48.1516 40.4898 57.6534 38.5325 69.6185Z" 
            fill="#D9D9D9" 
            fillOpacity="0.5"
          />
        </G>
        <G filter="url(#filter3_f_228_1187)">
          <Path 
            d="M38.3319 71.7146C34.2331 54.3339 23.6624 45.0097 16.3276 38.5825L29.0807 43.5018L38.3319 54.7354L48.688 43.5018L61.1991 38.5825C61.1991 38.5825 41.9993 53.2476 38.3319 71.7146Z" 
            fill="#D9D9D9" 
            fillOpacity="0.3"
          />
        </G>
      </G>
    </Svg>
  );
};

export default StarImageIcon;

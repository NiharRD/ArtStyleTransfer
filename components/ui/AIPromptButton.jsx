import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import Svg, { Defs, LinearGradient, Path, Stop } from "react-native-svg";

/**
 * AI Prompt Button - Sparkle Icon from Assets
 * Simplified version without filters for React Native compatibility
 */
const AIPromptButton = ({ onPress }) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.85}
    >
      <Svg width={79} height={78} viewBox="0 0 79 78" fill="none">
        {/* Main sparkle shape - simplified without mask */}
        <Path
          d="M33.1955 10.9645C35.8243 6.20788 42.6861 6.20788 45.3149 10.9645C50.4103 20.1842 58.058 27.7777 67.3222 32.7918C72.133 35.3955 72.133 42.2989 67.3222 44.9027C58.058 49.9168 50.4103 57.5102 45.3149 66.7299C42.6861 71.4866 35.8243 71.4866 33.1955 66.7299C28.1001 57.5102 20.4524 49.9168 11.1882 44.9027C6.3774 42.2989 6.3774 35.3955 11.1882 32.7918C20.4524 27.7777 28.1001 20.1842 33.1955 10.9645Z"
          fill="url(#paint0_linear)"
        />

        {/* Inner glow shape */}
        <Path
          d="M37.4829 18.0331C37.8538 15.6016 41.0498 14.9441 42.3504 17.0317L46.6244 23.8916C49.7003 28.8284 54.1213 32.7847 59.368 35.2957C62.2946 36.6962 62.2526 40.8771 59.2984 42.2186L58.842 42.4258C51.9926 45.5361 46.4803 50.9918 43.2994 57.8088L43.1389 58.1527C41.7866 61.0507 37.6565 61.0305 36.3042 58.1325C33.0518 51.1623 27.2315 45.6784 20.0715 42.8681L18.8603 42.3927C15.9186 41.2381 16.1171 37.0103 19.154 36.1363L22.3922 35.2045C30.3427 32.9166 36.2352 26.2116 37.4829 18.0331Z"
          fill="url(#paint1_linear)"
          opacity="0.8"
        />

        <Defs>
          <LinearGradient
            id="paint0_linear"
            x1="39.2552"
            y1="68.3108"
            x2="37.4632"
            y2="5.27696"
            gradientUnits="userSpaceOnUse"
          >
            <Stop offset="0" stopColor="#3D103D" />
            <Stop offset="0.5" stopColor="#322DCA" />
            <Stop offset="1" stopColor="#AFBFFF" />
          </LinearGradient>
          <LinearGradient
            id="paint1_linear"
            x1="39.7263"
            y1="15.0341"
            x2="39.7263"
            y2="62.6294"
            gradientUnits="userSpaceOnUse"
          >
            <Stop offset="0" stopColor="#5B1F5B" />
            <Stop offset="0.5" stopColor="#4A3FE8" />
            <Stop offset="1" stopColor="#C5D3FF" />
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
    shadowColor: "#8A2BE2",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 12,
    elevation: 8,
  },
});

export default AIPromptButton;

import { Image, StyleSheet, TouchableOpacity } from "react-native";
import { Layout } from "../../constants/Theme";

/**
 * AI Prompt Button - Uses PNG icon from assets
 * Based on Figma design (97px size)
 */
const AIPromptButton = ({ onPress }) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.85}
    >
      <Image
        source={require("../../assets/icons/finalPromptButton.png")}
        style={styles.icon}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Layout.aiButtonSize,
    height: Layout.aiButtonSize,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    width: Layout.aiButtonSize,
    height: Layout.aiButtonSize,
  },
});

export default AIPromptButton;

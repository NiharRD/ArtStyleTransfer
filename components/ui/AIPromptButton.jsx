import { Image, StyleSheet, TouchableOpacity } from "react-native";

/**
 * AI Prompt Button - Uses PNG icon from assets
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
    width: 100,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 27.5,
  },
  icon: {
    width: 100,
    height: 100,
  },
});

export default AIPromptButton;

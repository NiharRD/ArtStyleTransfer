import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { BorderRadius, Colors, Typography } from "../../constants/Theme";

const Button = ({ icon, label, iconOnly = false, onPress }) => {
  return (
    <TouchableOpacity
      style={[styles.container, iconOnly && styles.iconOnlyContainer]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {iconOnly ? (
        icon
      ) : (
        <View style={styles.content}>
          {icon}
          {label && <Text style={styles.label}>{label}</Text>}
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: BorderRadius.pill,
    backgroundColor: Colors.glassBackground,
    borderWidth: 0.68,
    borderColor: Colors.glassBorder,
  },
  iconOnlyContainer: {
    width: 40,
    height: 40,
    borderRadius: 95,
    justifyContent: "center",
    alignItems: "center",
    padding: 0,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  label: {
    fontFamily: Typography.fontFamily.regular,
    fontSize: 15,
    color: Colors.textAccent,
    letterSpacing: Typography.letterSpacing.normal,
    includeFontPadding: false,
    textAlignVertical: "center",
    marginTop: -3,
  },
});

export default Button;

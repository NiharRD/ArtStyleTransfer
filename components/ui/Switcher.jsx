import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { BorderRadius, Colors, Typography } from "../../constants/Theme";
import { DropdownIcon, MasterIcon } from "../icons/IconComponents";

const Switcher = ({ label = "Main", onPress }) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.content}>
        <View style={styles.leftSection}>
          <MasterIcon size={16} color={Colors.textAccent} />
          <Text style={styles.label}>{label}</Text>
        </View>
        <DropdownIcon size={15} color={Colors.textAccent} />
      </View>
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
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 11,
  },
  leftSection: {
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
    marginTop: -2,
  },
});

export default Switcher;

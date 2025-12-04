import { StyleSheet, TouchableOpacity, View } from "react-native";
import { BorderRadius, Colors, Layout } from "../../constants/Theme";

const DrawerToggle = ({ onPress }) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.handle} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingVertical: 8,
  },
  handle: {
    width: Layout.drawerHandleWidth,
    height: Layout.drawerHandleHeight,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.indicatorDark,
  },
});

export default DrawerToggle;

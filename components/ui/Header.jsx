import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Colors, Opacity, Typography } from "../../constants/Theme";
import { BackIcon, DotsIcon, InfiniteViewIcon, RedoIcon, UndoIcon } from "../icons/IconComponents";

const Header = ({
  title = "Untitled Project 1",
  subtitle = "Synced just now",
  onBackPress,
  onMenuPress,
  onUndoPress,
  onRedoPress,
  onInfiniteViewPress,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={onBackPress}
          activeOpacity={0.7}
        >
          <BackIcon size={20} color={Colors.textAccent} />
        </TouchableOpacity>

        <View style={styles.titleContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
        </View>
      </View>

      <View style={styles.rightSection}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={onInfiniteViewPress}
          activeOpacity={0.7}
        >
          <InfiniteViewIcon size={20} color={Colors.textAccent} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.iconButton}
          onPress={onUndoPress}
          activeOpacity={0.7}
        >
          <UndoIcon size={20} color={Colors.textAccent} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.iconButton}
          onPress={onRedoPress}
          activeOpacity={0.7}
        >
          <RedoIcon size={20} color={Colors.textAccent} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.iconButton}
          onPress={onMenuPress}
          activeOpacity={0.7}
        >
          <DotsIcon size={20} color={Colors.textAccent} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 44,
    paddingBottom: 12,
    backgroundColor: "transparent",
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  rightSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    opacity: Opacity.headerIcons,
  },
  backButton: {
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  titleContainer: {
    paddingHorizontal: 2,
    paddingVertical: 3,
  },
  title: {
    fontFamily: Typography.fontFamily.medium,
    fontSize: Typography.fontSize.base,
    color: Colors.textPrimary,
    letterSpacing: Typography.letterSpacing.tight,
    lineHeight: Typography.lineHeight.xl,
  },
  subtitle: {
    fontFamily: Typography.fontFamily.medium,
    fontSize: Typography.fontSize.xs,
    color: Colors.textTertiary,
    lineHeight: Typography.lineHeight.md,
  },
  iconButton: {
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Header;

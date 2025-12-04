import { useRef } from "react";
import { Alert, ScrollView, StyleSheet, View } from "react-native";
import {
    AddIcon,
    BrushIcon,
    CameraIcon,
    TShirtIcon,
} from "../icons/IconComponents";
import QuickActionButton from "./QuickActionButton";

const QuickActionsBar = ({ onArtStylePress, onGenerateMockupPress, onGlobalEditingPress, onScroll, onScrollPosition }) => {
  const scrollViewRef = useRef(null);
  const contentWidthRef = useRef(0);
  const scrollViewWidthRef = useRef(0);

  const handleScrollBegin = () => {
    if (onScroll) {
      onScroll(true);
    }
  };

  const handleScrollEnd = (event) => {
    if (onScroll) {
      onScroll(false);
    }
    // Check if at the end
    checkScrollPosition(event);
  };

  const handleScroll = (event) => {
    checkScrollPosition(event);
  };

  const checkScrollPosition = (event) => {
    if (onScrollPosition) {
      const { contentOffset, contentSize, layoutMeasurement } = event.nativeEvent;
      const scrollX = contentOffset.x;
      const maxScrollX = contentSize.width - layoutMeasurement.width;

      // Consider "at end" if within 20px of the max scroll
      const isAtEnd = scrollX >= maxScrollX - 20;
      // Consider "at start" if within 20px of 0
      const isAtStart = scrollX <= 20;

      onScrollPosition({ isAtEnd, isAtStart, scrollX, maxScrollX });
    }
  };

  const handleActionPress = (actionId) => {
    switch (actionId) {
      case "art-style":
        if (onArtStylePress) {
          onArtStylePress();
        }
        break;
      case "generate-mockup":
        if (onGenerateMockupPress) {
          onGenerateMockupPress();
        }
        break;
      case "global-editing-1":
      case "global-editing-2":
        if (onGlobalEditingPress) {
          onGlobalEditingPress();
        }
        break;
      case "create":
        Alert.alert(
          "Create Shortcut",
          "Create a custom shortcut for quick access"
        );
        break;
      default:
        Alert.alert(
          "Coming Soon",
          `${actionId} feature will be available soon!`
        );
    }
  };

  const quickActions = [
    {
      id: "create",
      icon: <AddIcon size={28} color="#CACACA" />,
      label: "Create a\nshortcut",
      isDashed: true,
    },
    {
      id: "art-style",
      icon: <BrushIcon size={28} color="#CCCCCC" />,
      label: "Art Style\nTransfer",
      isActive: true,
    },
    {
      id: "generate-mockup",
      icon: <TShirtIcon size={28} color="#CCCCCC" />,
      label: "Generate\nMockup",
      isActive: true,
    },

    {
      id: "global-editing-1",
      icon: <CameraIcon size={28} color="#CCCCCC" />,
      label: "Global\nEditing",
      isActive: true,
    },
    {
      id: "product-mockup",
      icon: <TShirtIcon size={28} color="#CCCCCC" />,
      label: "Product\nMockup",
      isActive: true,
    },
  ];

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        decelerationRate="fast"
        snapToInterval={99} // width of button + margin
        onScrollBeginDrag={handleScrollBegin}
        onScrollEndDrag={handleScrollEnd}
        onMomentumScrollBegin={handleScrollBegin}
        onMomentumScrollEnd={handleScrollEnd}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {quickActions.map((action) => (
          <QuickActionButton
            key={action.id}
            icon={action.icon}
            label={action.label}
            isActive={action.isActive}
            isDashed={action.isDashed}
            onPress={() => handleActionPress(action.id)}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
  },
  scrollContent: {
    paddingHorizontal: 16,
    alignItems: "center",
  },
});

export default QuickActionsBar;

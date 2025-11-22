import { router } from "expo-router";
import React, { useRef } from "react";
import { Alert, ScrollView, StyleSheet, View } from "react-native";
import {
  AddIcon,
  BrushIcon,
  CameraIcon,
  TShirtIcon,
} from "../icons/IconComponents";
import QuickActionButton from "./QuickActionButton";

const QuickActionsBar = () => {
  const scrollViewRef = useRef(null);

  const handleActionPress = (actionId) => {
    switch (actionId) {
      case "art-style":
        router.push("/art-style-transfer");
        break;
      case "generate-mockup":
      case "product-mockup":
        router.push("/generate-mockup");
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
      id: "product-mockup",
      icon: <TShirtIcon size={28} color="#CCCCCC" />,
      label: "Product\nMockup",
      isActive: true,
    },
    {
      id: "global-editing-1",
      icon: <CameraIcon size={28} color="#CCCCCC" />,
      label: "Global\nEditing",
      isActive: true,
    },
    {
      id: "global-editing-2",
      icon: <CameraIcon size={28} color="#CCCCCC" />,
      label: "Global\nEditing",
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

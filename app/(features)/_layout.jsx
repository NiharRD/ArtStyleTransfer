import { Stack } from "expo-router";
import React from "react";
import { Colors } from "../../constants/Theme";

/**
 * Features Layout
 *
 * Route group for feature screens like art style transfer and mockup generation.
 * This layout provides stack navigation for all feature-related screens.
 */
export default function FeaturesLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: Colors.background },
        animation: "slide_from_right",
        animationDuration: 300,
      }}
    >
      <Stack.Screen
        name="art-style-transfer"
        options={{
          title: "Art Style Transfer",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="generate-mockup"
        options={{
          title: "Generate Mockup",
          headerShown: false,
        }}
      />
    </Stack>
  );
}

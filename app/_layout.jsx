import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Colors } from "../constants/Theme";

/**
 * Root Layout - Main navigation structure
 *
 * This is the root layout component that wraps the entire app.
 * It sets up the Stack navigation and global configurations.
 *
 * Route Structure:
 * - / (index) - Home screen with main workspace
 * - /(features)/* - Feature screens (art style transfer, mockup generation)
 * - /(demo)/* - Demo and example screens
 */
export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar style="light" backgroundColor={Colors.background} />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: Colors.background },
          animation: "slide_from_right",
          animationDuration: 300,
        }}
      >
        {/* Home Screen */}
        <Stack.Screen
          name="index"
          options={{
            title: "Art Style Transfer",
            headerShown: false,
          }}
        />

        {/* Features Route Group */}
        <Stack.Screen
          name="(features)"
          options={{
            headerShown: false,
          }}
        />

        {/* Demo Route Group */}
        <Stack.Screen
          name="(demo)"
          options={{
            headerShown: false,
            presentation: "modal",
          }}
        />
      </Stack>
    </GestureHandlerRootView>
  );
}

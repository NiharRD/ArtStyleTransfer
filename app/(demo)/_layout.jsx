import { Stack } from "expo-router";
import React from "react";
import { Colors } from "../../constants/Theme";

/**
 * Demo Layout
 *
 * Route group for demo and example screens.
 * These screens showcase UI components and design patterns.
 */
export default function DemoLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: Colors.background },
        animation: "slide_from_bottom",
        presentation: "modal",
      }}
    >
      <Stack.Screen
        name="star-demo"
        options={{
          title: "Star Icon Demo",
          headerShown: false,
        }}
      />
    </Stack>
  );
}

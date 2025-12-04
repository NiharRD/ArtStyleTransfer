import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Colors } from "../constants/Theme";
import { OnboardingProvider } from "../context/OnboardingContext";

// Prevent auto-hide splash screen while fonts load
SplashScreen.preventAutoHideAsync();

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
  // Load Adobe Clean fonts
  const [fontsLoaded] = useFonts({
    "AdobeClean-Regular": require("../assets/fonts/AdobeClean/AdobeClean-Regular.otf"),
    "AdobeClean-Medium": require("../assets/fonts/AdobeClean/AdobeClean-Medium.otf"),
    "AdobeClean-Bold": require("../assets/fonts/AdobeClean/AdobeClean-Bold.otf"),
    "AdobeClean-Light": require("../assets/fonts/AdobeClean/AdobeClean-Light.otf"),
    "AdobeClean-SemiLight": require("../assets/fonts/AdobeClean/AdobeClean-SemiLight.otf"),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <OnboardingProvider>
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
              title: "Match Art Style",
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
    </OnboardingProvider>
  );
}

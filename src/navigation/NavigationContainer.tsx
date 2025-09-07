import { ThemeProvider, useTheme } from "@/src/context/ThemeContext";
import { Stack } from "expo-router";
import { Platform, SafeAreaView as SafeAreaViewIOS } from "react-native";
import { SafeAreaView as SafeAreaViewAndroid } from "react-native-safe-area-context";

function NavigationContainer() {
  const { theme } = useTheme();
  const SafeAreaView = Platform.OS === "ios" ? SafeAreaViewIOS : SafeAreaViewAndroid;

  return (
    <ThemeProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
      </SafeAreaView>
    </ThemeProvider>
  );
}

export default NavigationContainer;

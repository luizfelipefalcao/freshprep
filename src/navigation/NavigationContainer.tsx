import { ThemeProvider, useTheme } from "@/src/context/ThemeContext";
import { Stack } from "expo-router";
import { SafeAreaView } from "react-native";

function NavigationContainer() {
  const { theme } = useTheme();

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

import { Stack } from "expo-router";
import { SafeAreaView, useColorScheme } from "react-native";
import { Colors } from "../constants/Colors";

function NavigationContainer() {
  const theme = useColorScheme();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors[theme ?? "light"].background }}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </SafeAreaView>
  );
}

export default NavigationContainer;

import { useTheme } from "@/src/context/ThemeContext";
import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { Platform, SafeAreaView as SafeAreaViewIOS } from "react-native";
import { SafeAreaView as SafeAreaViewAndroid } from "react-native-safe-area-context";
import Tooltip from "../components/Tooltip";
import useVerifyNetworkStatus from "../hooks/useVerifyNetworkStatus";

function NavigationContainer() {
  const { theme } = useTheme();
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const { isConnected } = useVerifyNetworkStatus();
  const SafeAreaView = Platform.OS === "ios" ? SafeAreaViewIOS : SafeAreaViewAndroid;

  useEffect(() => {
    const processNetworkVerification = () => {
      if (isConnected === false) return setIsTooltipVisible(true);
      return setIsTooltipVisible(false);
    };

    processNetworkVerification();
  }, [isConnected]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>

      <Tooltip status="warning" isVisible={isTooltipVisible} onClose={() => setIsTooltipVisible(false)} />
    </SafeAreaView>
  );
}

export default NavigationContainer;

import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { BlurView } from "expo-blur";
import { StyleSheet } from "react-native";

import { useTheme } from "@/src/context/ThemeContext";

export default function BlurTabBarBackground() {
  const { theme } = useTheme();

  return <BlurView intensity={0} style={[StyleSheet.absoluteFill, { backgroundColor: theme.colors.background }]} />;
}

export function useBottomTabOverflow() {
  return useBottomTabBarHeight();
}

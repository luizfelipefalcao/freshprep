import { Colors } from "@/src/constants/Colors";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { BlurView } from "expo-blur";
import { StyleSheet, useColorScheme } from "react-native";

export default function BlurTabBarBackground() {
  const theme = useColorScheme();

  return <BlurView intensity={0} style={[StyleSheet.absoluteFill, { backgroundColor: Colors[theme ?? "light"].background }]} />;
}

export function useBottomTabOverflow() {
  return useBottomTabBarHeight();
}

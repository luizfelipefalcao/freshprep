import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";

import { HapticTab } from "@/src/components/HapticTab";
import { IconSymbol } from "@/src/components/ui/IconSymbol";
import TabBarBackground from "@/src/components/ui/TabBarBackground";
import { useTheme } from "@/src/context/ThemeContext";
import { adjustScale } from "@/src/utils/ui";

export default function TabLayout() {
  const { theme } = useTheme();

  const tabBarStyleFormated = {
    height: adjustScale(60),
    paddingTop: adjustScale(5),
    backgroundColor: theme.colors.background,
    borderTopColor: theme.colors.border,
    position: "absolute",
    bottom: -adjustScale(10),
  };

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.colors.tintColor,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,

        tabBarStyle: Platform.select({
          ios: { ...tabBarStyleFormated },
          android: { ...tabBarStyleFormated },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="favourites"
        options={{
          title: "Favourites",
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="star.fill" color={color} />,
        }}
      />
    </Tabs>
  );
}

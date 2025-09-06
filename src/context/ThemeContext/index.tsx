import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { Appearance, ColorSchemeName } from "react-native";

import { darkTheme, lightTheme } from "@/src/theme";

type ThemeContextType = {
  theme: typeof lightTheme;
  enableDarkMode?: boolean;
  toggleThemeMode: () => void;
};

const appTheme = Appearance.getColorScheme();

const ThemeContext = createContext<ThemeContextType>({
  theme: appTheme === "dark" ? darkTheme : lightTheme,
  enableDarkMode: false,
  toggleThemeMode: () => {},
});

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [enableDarkMode, setEnableDarkMode] = useState<boolean>(appTheme === "dark" ? true : false);

  useEffect(() => {
    const loadThemePreference = async () => {
      try {
        const storedPreference = await AsyncStorage.getItem("enableDarkMode");
        const colorScheme: ColorSchemeName = appTheme;
        if (storedPreference !== null) {
          setEnableDarkMode(storedPreference === "true");
          return;
        }
        return setEnableDarkMode(colorScheme === "dark");
      } catch (error) {
        console.error("Failed to load theme preference:", error);
      }
    };

    loadThemePreference();
  }, []);

  useEffect(() => {
    const saveThemePreference = async () => {
      try {
        await AsyncStorage.setItem("enableDarkMode", enableDarkMode.toString());
      } catch (error) {
        console.error("Failed to save theme preference:", error);
      }
    };

    saveThemePreference();
  }, [enableDarkMode]);

  const toggleThemeMode = () => {
    setEnableDarkMode((prevMode) => !prevMode);
  };

  const theme = enableDarkMode ? darkTheme : lightTheme;

  return <ThemeContext.Provider value={{ theme, enableDarkMode, toggleThemeMode }}>{children}</ThemeContext.Provider>;
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

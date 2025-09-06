import { persistor, store } from "@/src/store/index";
import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import { Provider } from "react-redux";

import { useColorScheme } from "@/src/hooks/useColorScheme";
import NavigationContainer from "@/src/navigation/NavigationContainer";
import { QueryProvider } from "@/src/providers/QueryProvider";
import { PersistGate } from "redux-persist/integration/react";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({ SpaceMono: require("@/src/assets/fonts/SpaceMono-Regular.ttf") });

  if (!loaded) return null;

  return (
    <Provider store={store}>
      <QueryProvider>
        <PersistGate loading={null} persistor={persistor}>
          <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
            <NavigationContainer />
            <StatusBar style="dark" />
          </ThemeProvider>
        </PersistGate>
      </QueryProvider>
    </Provider>
  );
}

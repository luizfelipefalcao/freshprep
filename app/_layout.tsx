import { persistor, store } from "@/src/store/index";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import { Provider } from "react-redux";

import NavigationContainer from "@/src/navigation/NavigationContainer";
import { QueryProvider } from "@/src/providers/QueryProvider";
import { PersistGate } from "redux-persist/integration/react";

export default function RootLayout() {
  const [loaded] = useFonts({ SpaceMono: require("@/src/assets/fonts/SpaceMono-Regular.ttf") });

  if (!loaded) return null;

  return (
    <Provider store={store}>
      <QueryProvider>
        <PersistGate loading={null} persistor={persistor}>
          <NavigationContainer />
          <StatusBar style="auto" />
        </PersistGate>
      </QueryProvider>
    </Provider>
  );
}

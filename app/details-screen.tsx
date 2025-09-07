import { Stack } from "expo-router";

import Details from "@/src/screens/DetailsScreen";

export default function DetailsScreen() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <Details />
    </>
  );
}

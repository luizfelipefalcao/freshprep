import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

import { useTheme } from "@/src/context/ThemeContext";
import { adjustScale } from "@/src/utils/ui";
import Spacer from "../Spacer";
import Text from "../primitives/Text";

const Loading = ({ text }: { text?: string }) => {
  const { theme } = useTheme();
  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ActivityIndicator size="large" color={theme.colors.enabled} />
      <Spacer height={10} />

      <Text fontSize={16} fontWeight="medium" style={{ marginTop: adjustScale(12) }}>
        {text}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: -adjustScale(32),
  },
});

export default Loading;

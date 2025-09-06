import React from "react";
import { ActivityIndicator, View } from "react-native";

import { useTheme } from "@/src/context/ThemeContext";
import { adjustScale } from "@/src/utils/ui";
import Text from "../primitives/Text";

const Loading = ({ text = "Loading..." }: { text?: string }) => {
  const { theme } = useTheme();
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" color={theme.colors.enabled} />
      <Text fontSize={16} fontWeight="medium" style={{ marginTop: adjustScale(12) }}>
        {text}
      </Text>
    </View>
  );
};

export default Loading;

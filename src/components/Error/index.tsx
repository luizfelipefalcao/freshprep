import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

import { useTheme } from "@/src/context/ThemeContext";
import { adjustScale } from "@/src/utils/ui";
import Text from "../primitives/Text";
import Spacer from "../Spacer";

const Error = ({ message = "Error loading GitHub users", onPress }: { message?: string; onPress?: () => void }) => {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <MaterialIcons name="report-gmailerrorred" size={adjustScale(80)} color={theme.colors.danger} />
      <Spacer height={10} />

      <Text fontSize="large" fontWeight="medium">
        {message}
      </Text>
      <Spacer height={24} />

      <TouchableOpacity style={[styles.button, { backgroundColor: theme.colors.enabled }]} onPress={onPress}>
        <Text fontSize={18} color="white" fontWeight="medium">
          Retry
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: adjustScale(23),
  },
  button: {
    marginTop: adjustScale(16),
    paddingHorizontal: adjustScale(24),
    paddingVertical: adjustScale(6),
    borderRadius: adjustScale(12),
  },
});

export default Error;

import { FontAwesome5 } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";

import { useTheme } from "@/src/context/ThemeContext";
import { adjustScale } from "@/src/utils/ui";
import Spacer from "../Spacer";
import Text from "../primitives/Text";

function EmptyBox({ message = "No users found" }: { message?: string }) {
  const { theme } = useTheme();
  return (
    <View style={[styles.emptyContainer, { backgroundColor: theme.colors.background }]}>
      <FontAwesome5 name="users-slash" size={68} color={theme.colors.border} />
      <Spacer height={20} />

      <Text fontSize={21} fontWeight="medium" color={theme.colors.border}>
        {message}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    marginTop: -adjustScale(16),
    justifyContent: "center",
    alignItems: "center",
  },
});

export default EmptyBox;

import { adjustScale } from "@/src/utils/ui";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    gap: adjustScale(12),
    padding: adjustScale(23 / 3),
    marginBottom: adjustScale(10),
  },
  inputLabel: {
    fontSize: adjustScale(12),
    fontWeight: "600",
  },
  inputWrapper: {
    borderBottomWidth: adjustScale(1),
    height: adjustScale(24),
    justifyContent: "flex-end",
  },
});

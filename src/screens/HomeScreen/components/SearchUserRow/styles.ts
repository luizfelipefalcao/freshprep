import { StyleSheet } from "react-native";

import { adjustScale } from "@/src/utils/ui";

export const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    padding: adjustScale(18),
  },
  inputContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
    borderWidth: adjustScale(1),
    borderRadius: adjustScale(999),
    paddingLeft: adjustScale(24),
    paddingRight: adjustScale(24),
    paddingVertical: adjustScale(8),
  },
  icon: {
    position: "absolute",
    left: adjustScale(12),
    fontSize: adjustScale(18),
    zIndex: 1,
  },
  input: {
    flex: 1,
    fontSize: adjustScale(16),
    paddingVertical: adjustScale(6),
  },
});

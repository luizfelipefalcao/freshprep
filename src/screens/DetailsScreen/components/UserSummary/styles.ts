import { adjustScale } from "@/src/utils/ui";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: adjustScale(8),
  },
  attributesContainer: {
    flexDirection: "row",
    gap: adjustScale(12),
    marginLeft: -adjustScale(8),
  },
  attributeItem: {
    alignItems: "center",
    minWidth: adjustScale(60),
  },
  iconContainer: {
    marginBottom: adjustScale(4),
  },
});

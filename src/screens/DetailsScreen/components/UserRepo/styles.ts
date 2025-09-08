import { adjustScale } from "@/src/utils/ui";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  attributesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: adjustScale(12),
  },
  attributeItem: {
    maxWidth: "auto",
    padding: adjustScale(12),
    borderRadius: adjustScale(12),
  },
  iconContainer: {
    marginBottom: adjustScale(4),
  },
  loadingComponent: {
    height: adjustScale(100),
    justifyContent: "center",
    alignItems: "center",
  },
});

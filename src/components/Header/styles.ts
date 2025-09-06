import { adjustScale } from "@/src/utils/ui";
import { StyleSheet } from "react-native";

export const STYLES = StyleSheet.create({
  header: {
    paddingHorizontal: adjustScale(23),
    padding: adjustScale(23 * 0.6),
    height: adjustScale(50),
    zIndex: 999,
  },
  icon: {
    height: adjustScale(23),
    width: adjustScale(23),
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: adjustScale(10),
  },
  headerShadow: {
    position: "absolute",
    top: adjustScale(50),
    left: 0,
    right: 0,
    resizeMode: "stretch",
  },
});

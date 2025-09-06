import { adjustScale } from "@/src/utils/ui";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    padding: adjustScale(18),
    width: "100%",
    borderRadius: adjustScale(12),
  },
});

import { adjustScale } from "@/src/utils/ui";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    padding: adjustScale(23),
  },
  header: {
    height: adjustScale(40),
    alignItems: "center",
    justifyContent: "center",
  },
});

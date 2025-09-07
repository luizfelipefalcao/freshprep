import { adjustScale } from "@/src/utils/ui";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  avatarContainer: {
    alignItems: "center",
    width: adjustScale(90),
  },
  avatar: {
    width: adjustScale(70),
    height: adjustScale(70),
    borderRadius: adjustScale(60),
    borderWidth: adjustScale(1),
    marginBottom: adjustScale(2),
  },
});

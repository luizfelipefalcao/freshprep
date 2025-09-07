import { adjustScale } from "@/src/utils/ui";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  avatarContainer: {
    alignItems: "center",
    alignSelf: "center",
    width: "100%",
  },
  avatar: {
    width: adjustScale(120),
    height: adjustScale(120),
    borderRadius: adjustScale(60),
    borderWidth: adjustScale(1),
    marginBottom: adjustScale(2),
  },
});

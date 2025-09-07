import { StyleSheet } from "react-native";

import { adjustScale } from "@/src/utils/ui";

export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: adjustScale(90),
  },
  tooltip: {
    backgroundColor: "#FFD700",
    borderRadius: adjustScale(8),
    padding: adjustScale(16),
    marginHorizontal: adjustScale(20),
    width: "90%",
    position: "relative",
  },
  closeButton: {
    position: "absolute",
    top: adjustScale(8),
    right: adjustScale(8),
    width: adjustScale(24),
    height: adjustScale(24),
    borderRadius: adjustScale(12),
    justifyContent: "center",
    alignItems: "center",
  },
  closeButtonText: {
    color: "#000",
    fontSize: adjustScale(18),
    fontWeight: "bold",
  },
  message: {
    color: "#000",
    fontSize: adjustScale(16),
    textAlign: "center",
    paddingRight: adjustScale(20),
  },
  content: {
    flexWrap: "wrap",
    flexDirection: "row",
    marginRight: adjustScale(20),
  },
});

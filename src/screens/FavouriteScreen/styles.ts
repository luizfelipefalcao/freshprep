import { adjustScale } from "@/src/utils/ui";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: adjustScale(40),
    alignItems: "center",
    justifyContent: "center",
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: adjustScale(10),
    fontSize: adjustScale(16),
    color: "#666",
  },
  errorText: {
    fontSize: adjustScale(16),
    textAlign: "center",
    marginBottom: adjustScale(20),
  },
  retryButton: {
    paddingHorizontal: adjustScale(20),
    paddingVertical: adjustScale(10),
    borderRadius: adjustScale(8),
  },
  retryButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  listContainer: {
    padding: adjustScale(16),
  },
  userCard: {
    padding: adjustScale(16),
    marginBottom: adjustScale(12),
    borderRadius: adjustScale(8),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: adjustScale(2),
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  username: {
    fontSize: adjustScale(18),
    fontWeight: "bold",
    color: "#333",
    marginBottom: adjustScale(4),
  },
  userId: {
    fontSize: adjustScale(14),
    color: "#666",
    marginBottom: adjustScale(4),
  },
  userUrl: {
    fontSize: adjustScale(12),
  },
});

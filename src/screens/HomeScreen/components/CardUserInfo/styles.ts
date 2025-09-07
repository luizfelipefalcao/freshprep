import { StyleSheet } from "react-native";

import { adjustScale } from "@/src/utils/ui";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardContent: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
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
  containerFavourite: {
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginRight: -adjustScale(20),
  },
  iconFavourite: {
    width: adjustScale(46),
    height: adjustScale(46),
  },
  icon: {
    width: adjustScale(32),
    height: adjustScale(32),
  },
  userContent: {
    gap: adjustScale(5),
    width: adjustScale(170),
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: -adjustScale(12),
    padding: adjustScale(12),
    paddingLeft: -adjustScale(12),
    marginLeft: adjustScale(24),
  },
  arrowContainer: {
    position: "absolute",
    right: 0,
  },
});

export default styles;

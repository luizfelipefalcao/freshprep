import { Dimensions, Platform } from "react-native";

export const isIOS = Platform.OS === "ios";
export const isAndroid = Platform.OS === "android";

const GUIDELINE_BASE_WIDTH = 360;
const { width } = Dimensions.get("window");

const horizontalScale = (sizeFactor: number) => (width / GUIDELINE_BASE_WIDTH) * sizeFactor;
export const adjustScale = (sizeFactor: number, factor = 0.5) => {
  const scale = sizeFactor + (horizontalScale(sizeFactor) - sizeFactor) * factor;
  return Math.trunc(scale);
};

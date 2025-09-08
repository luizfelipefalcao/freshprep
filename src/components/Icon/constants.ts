import iconMap from "@/src/assets/icons/icon-map";
import { ImageProps } from "react-native";

type IIconNames = keyof typeof iconMap;
export interface AppIconProps extends Omit<ImageProps, "source"> {
  name?: IIconNames;
  height?: number;
  width?: number;
  color?: string;
}

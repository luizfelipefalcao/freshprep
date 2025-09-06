import iconMap from "@/src/assets/icons/icon-map";
import React from "react";
import { Image, ImageSourcePropType } from "react-native";
import { AppIconProps } from "./constants";

function AppIcon({ name, height = 0, width = 0, color, ...rest }: AppIconProps) {
  const key: keyof typeof iconMap = name;
  const IconSource = iconMap[key] as ImageSourcePropType;

  return <Image source={IconSource} width={width} height={height} tintColor={color} {...rest} />;
}

export default AppIcon;

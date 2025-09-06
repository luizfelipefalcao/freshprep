import React from "react";

import iconMap from "@/src/assets/icons/icon-map";
import AppIcon from "./AppIcon";
import { AppIconProps } from "./constants";

export type IIconNames = keyof typeof iconMap | undefined;

export function Icon({ name, height, width, color, ...props }: AppIconProps) {
  return <AppIcon height={height} width={width} {...props} name={name} color={color} />;
}

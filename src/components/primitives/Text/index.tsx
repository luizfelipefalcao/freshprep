import React, { ReactNode } from "react";
import { Platform, StyleSheet, Text as TextNative, TextProps as TextPropsNative } from "react-native";

import { useTheme } from "@/src/context/ThemeContext";
import { adjustScale } from "@/src/utils/ui";

export type TextProps = {
  fontSize?: "small" | "medium" | "large" | "extralarge" | "regular" | number;
  color?: string;
  lineHeight?: number;
  textDecorationLine?: string;
  fontWeight?: "medium" | "bold";
  children: ReactNode;
} & Pick<TextPropsNative, "testID" | "accessibilityLabel" | "allowFontScaling">;

function Text({ color, fontSize, fontWeight, lineHeight, textDecorationLine, children, style }: TextProps & React.ComponentProps<typeof TextNative>) {
  const { theme } = useTheme();

  const getFontSize = () => {
    if (typeof fontSize === "number") return adjustScale(fontSize);
    if (fontSize === "small") return adjustScale(10);
    if (fontSize === "regular") return adjustScale(14);
    if (fontSize === "medium") return adjustScale(16);
    if (fontSize === "large") return adjustScale(18);
    if (fontSize === "extralarge") return adjustScale(24);
    return adjustScale(12);
  };

  const getLineHeight = () => {
    if (lineHeight) return adjustScale(lineHeight);

    const size = getFontSize();
    return adjustScale(size * 1.2);
  };

  const getFontWeight = () => {
    if (fontWeight === "medium") return "500";
    if (fontWeight === "bold") return "700";
    return "400";
  };

  const textStyle = StyleSheet.create({
    text: {
      marginTop: Platform.OS === "android" ? -3 : 0,
      fontSize: getFontSize(),
      lineHeight: getLineHeight(),
      letterSpacing: 0.5,
      color: color || theme.colors.text,
      fontWeight: getFontWeight(),
      textDecorationLine: textDecorationLine as any,
    },
  });

  return <TextNative style={[textStyle.text, style]}>{children}</TextNative>;
}

export default Text;

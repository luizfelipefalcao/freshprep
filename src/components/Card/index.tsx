import React from "react";
import { View } from "react-native";
import { Shadow } from "react-native-shadow-2";

import { useTheme } from "@/src/context/ThemeContext";
import { adjustScale } from "@/src/utils/ui";
import { styles } from "./styles";

type CardProps = {
  children?: React.ReactNode;
  shadow?: boolean;
  backgroundColor?: string;
  noBorder?: boolean;
};

function Card({ children, shadow, backgroundColor, noBorder }: CardProps) {
  const { theme } = useTheme();

  const renderCard = (() => {
    if (shadow) {
      return (
        <Shadow distance={5} startColor="#00000010" offset={[1, 1]} style={{ width: "100%", borderRadius: adjustScale(12) }}>
          <View style={[styles.container, { backgroundColor: theme.colors.card, borderColor: theme.colors.border, borderWidth: adjustScale(noBorder ? 0 : 1) }]}>{children}</View>
        </Shadow>
      );
    }

    return <View style={[styles.container, { backgroundColor: backgroundColor, borderColor: theme.colors.border, borderWidth: adjustScale(noBorder ? 0 : 1) }]}>{children}</View>;
  })();

  return <View>{renderCard}</View>;
}

export default Card;

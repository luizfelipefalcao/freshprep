import { View } from "react-native";
import { Shadow } from "react-native-shadow-2";

import { useTheme } from "@/src/context/ThemeContext";
import { adjustScale } from "@/src/utils/ui";
import React from "react";

import { styles } from "./styles";

type CardProps = {
  children?: React.ReactNode;
  shadow?: boolean;
  backgroundColor?: string;
  borderColor?: string;
  noBorder?: boolean;
  noBorderBackground?: string;
};

function Card({ children, shadow, backgroundColor, borderColor, noBorder, noBorderBackground }: CardProps) {
  const { theme } = useTheme();
  const cardShadow = (
    <Shadow distance={5} startColor="#00000010" offset={[1, 1]} style={{ width: "100%", borderRadius: adjustScale(12) }}>
      <View style={styles.content}>{children}</View>
    </Shadow>
  );

  const cardNoShadow = <View style={[styles.content, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>{children}</View>;

  const renderCard = () => (shadow ? cardShadow : cardNoShadow);
  return <View style={styles.wrapper}>{renderCard()}</View>;
}

export default Card;

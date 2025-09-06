import React from "react";
import { TextInput as Input, View } from "react-native";

import Text from "@/src/components/primitives/Text";
import { useTheme } from "@/src/context/ThemeContext";
import { adjustScale } from "@/src/utils/ui";

import { styles } from "./styles";

export type InputStyleProps = {
  fontSize?: number;
  fontColor?: string;
  text?: string;
  keyboardType?: "phone-pad" | "number-pad" | "numeric" | "email-address" | "default";
  placeholder?: string;
  labelText?: string;
  onUpdate?: (value: any) => void;
  onFocus?: () => void;
};

function InputText({ fontSize = 20, fontColor, keyboardType = "default", text, placeholder, labelText, onFocus, onUpdate }: InputStyleProps) {
  const { theme } = useTheme();

  return (
    <View style={styles.wrapper}>
      {labelText && <Text>{labelText?.toUpperCase()}</Text>}

      <View style={styles.inputWrapper}>
        <Input
          value={text}
          placeholder={placeholder}
          placeholderTextColor={theme.colors.border}
          style={{
            fontSize: adjustScale(fontSize),
            color: theme.colors.text,
            paddingBottom: 2,
          }}
          onFocus={() => onFocus && onFocus()}
          onChangeText={(e: any) => onUpdate && onUpdate(e)}
          keyboardType={keyboardType}
        />
      </View>
    </View>
  );
}

export default InputText;

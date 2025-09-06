import { Image, TouchableOpacity, View } from "react-native";

import shadowImg from "@/src/assets/images/faux-top-down-shadow.webp";
import { Icon } from "@/src/components/Icon";
import Text from "@/src/components/primitives/Text";
import { useTheme } from "@/src/context/ThemeContext";

import { STYLES } from "./styles";

type HeaderProps = { onPressBack?: () => void; shadowVisible?: boolean; title: string; backIcon?: boolean; uppercase?: boolean };

function Header({ onPressBack, shadowVisible = false, title, backIcon = false, uppercase = false }: HeaderProps) {
  const { theme } = useTheme();

  return (
    <View style={STYLES.header}>
      <View style={STYLES.headerContent}>
        <TouchableOpacity onPress={onPressBack} style={STYLES.headerContent} activeOpacity={1}>
          {backIcon && <Icon name="arrowBack" style={STYLES.icon} tintColor={theme.colors.enabled} />}
          <Text fontSize={22} fontWeight="medium">
            {uppercase ? title.toUpperCase() : title}
          </Text>
        </TouchableOpacity>
      </View>
      {shadowVisible && <Image source={shadowImg} style={[STYLES.headerShadow]} />}
    </View>
  );
}

export default Header;

import { Feather } from "@expo/vector-icons";
import { Image, View } from "react-native";

import { useTheme } from "@/src/context/ThemeContext";

import { styles } from "./styles";

interface AvatarProps {
  avatar_url?: string;
  gravatar_id?: string;
}

function Avatar({ avatar_url, gravatar_id }: AvatarProps) {
  const { theme } = useTheme();

  return (
    <View style={styles.avatarContainer}>
      {avatar_url ? (
        <Image source={{ uri: avatar_url }} style={[styles.avatar, { borderColor: theme.colors.tabIcon }]} alt={gravatar_id} />
      ) : (
        <Feather name="image" size={120} color={theme.colors.tabIcon} />
      )}
    </View>
  );
}

export default Avatar;

import { View } from "react-native";

import { useTheme } from "@/src/context/ThemeContext";

import Text from "@/src/components/primitives/Text";
import { styles } from "./styles";

interface UserRepoProps {
  repos_url?: string;
}

function UserRepo({ repos_url }: UserRepoProps) {
  const { theme } = useTheme();

  return (
    <View style={styles.container}>
      <Text fontSize="large" fontWeight="medium">
        {repos_url}
      </Text>
    </View>
  );
}

export default UserRepo;

import { useCallback } from "react";
import { ActivityIndicator, Linking, TouchableOpacity, View } from "react-native";

import { IUserRepo } from "@/src/api/types";
import Text from "@/src/components/primitives/Text";
import Spacer from "@/src/components/Spacer";
import { useTheme } from "@/src/context/ThemeContext";

import { styles } from "./styles";

interface UserRepoProps {
  reposData?: IUserRepo[];
  isLoading?: boolean;
}

function UserRepo({ reposData, isLoading = false }: UserRepoProps) {
  const { theme } = useTheme();

  const handleExternalLink = useCallback(async (url: string) => {
    await Linking.openURL(url);
  }, []);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <View style={styles.loadingComponent}>
          <ActivityIndicator size="large" color={theme.colors.tabIcon} />
        </View>
      ) : (
        <View>
          <Text fontSize="large" fontWeight="medium">
            Top Repositories
          </Text>
          <Spacer height={10} />

          <View style={styles.attributesContainer}>
            {reposData?.slice(0, 12).map((repo, index) => (
              <TouchableOpacity key={`key_${index}`} style={[styles.attributeItem, { backgroundColor: theme.colors.cardBackground }]} onPress={() => handleExternalLink(repo?.html_url)}>
                <Text fontSize="regular" fontWeight="medium">
                  {repo?.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}
    </View>
  );
}

export default UserRepo;

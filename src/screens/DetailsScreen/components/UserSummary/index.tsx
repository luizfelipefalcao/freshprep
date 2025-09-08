import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { ScrollView, View } from "react-native";

import Text from "@/src/components/primitives/Text";
import { useTheme } from "@/src/context/ThemeContext";
import { styles } from "./styles";

interface UserSummaryProps {
  reposDataLength?: number;
  followersData?: number;
  followingData?: number;
}

export const UserSummary = ({ reposDataLength = 0, followingData = 0, followersData = 0 }: UserSummaryProps) => {
  const { theme } = useTheme();

  const attributes = [
    {
      icon: <AntDesign name="github" size={16} color={theme.colors.text} />,
      label: "Repos",
      value: reposDataLength,
    },
    {
      icon: <FontAwesome name="users" size={16} color={theme.colors.enabled} />,
      label: "Followers",
      value: followersData?.toString(),
    },
    {
      icon: <FontAwesome name="user-plus" size={16} color={theme.colors.danger} />,
      label: "Following",
      value: followingData?.toString(),
    },
  ];

  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {attributes?.map((attr, index) => (
          <View key={index} style={styles.attributeItem}>
            <View style={styles.iconContainer}>{attr?.icon}</View>
            <Text fontSize="large" fontWeight="bold">
              {attr?.value}
            </Text>
            <Text fontSize="small" fontWeight="medium">
              {attr?.label}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

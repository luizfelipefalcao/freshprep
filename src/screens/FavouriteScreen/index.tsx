import { FontAwesome5 } from "@expo/vector-icons";
import { FlatList, View } from "react-native";

import { TUser } from "@/src/api/types";
import Error from "@/src/components/Error";
import Header from "@/src/components/Header";
import Loading from "@/src/components/Loading";
import Text from "@/src/components/primitives/Text";
import Spacer from "@/src/components/Spacer";
import { useTheme } from "@/src/context/ThemeContext";
import { useFavouriteUsers } from "@/src/hooks/useFavouriteUsers";
import CardFavouritesInfo from "./components/CardFavouritesInfo";

import { styles } from "./styles";

function FavouriteScreen() {
  const { data: favouriteUsers, isLoading, error, refetch } = useFavouriteUsers();
  const { theme } = useTheme();

  const renderItem = ({ item }: { item: TUser }) => <CardFavouritesInfo {...item} />;

  if (isLoading) {
    return <Loading text="Loading favourite users..." />;
  }

  if (error) {
    return <Error message="Error loading favourite users" onPress={refetch} />;
  }

  if (favouriteUsers?.length === 0) {
    return (
      <View style={[styles.emptyContainer, { backgroundColor: theme.colors.background }]}>
        <FontAwesome5 name="users-slash" size={68} color={theme.colors.border} />
        <Spacer height={20} />

        <Text fontSize={21} fontWeight="medium" color={theme.colors.border}>
          Oops! No favourite users yet!
        </Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.header, { backgroundColor: theme.colors.background }]}>
        <Header title="Favourites" />
      </View>
      <Spacer height={10} />

      <FlatList
        data={favouriteUsers}
        keyExtractor={(item) => item?.id?.toString()}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        maxToRenderPerBatch={10}
        initialNumToRender={10}
        removeClippedSubviews={true}
        windowSize={10}
        contentContainerStyle={styles.listContainer}
      />
      <Spacer height={40} />
    </View>
  );
}

export default FavouriteScreen;

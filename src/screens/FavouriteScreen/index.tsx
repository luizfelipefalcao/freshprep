import { ActivityIndicator, FlatList, View } from "react-native";

import { TUser } from "@/src/api/types";
import EmptyBox from "@/src/components/EmptyBox";
import Error from "@/src/components/Error";
import Header from "@/src/components/Header";
import Spacer from "@/src/components/Spacer";
import { useTheme } from "@/src/context/ThemeContext";
import { useFavouriteUsers } from "@/src/hooks/useFavouriteUsers";
import CardFavouritesInfo from "./components/CardFavouritesInfo";

import { useCallback, useState } from "react";
import { styles } from "./styles";

function FavouriteScreen() {
  const { data: favouriteUsers, error } = useFavouriteUsers();
  const { theme } = useTheme();
  const [isRemoving, setIsRemoving] = useState(false);

  const handleOnPressRemove = useCallback(async () => {
    setIsRemoving(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    setIsRemoving(false);
  }, []);

  const renderItem = ({ item }: { item: TUser }) => <CardFavouritesInfo {...item} onPressRemove={handleOnPressRemove} />;

  if (error) {
    return <Error message="Error loading favourite users" />;
  }

  if (favouriteUsers?.length === 0) {
    return <EmptyBox message="Oops! No favourite users yet!" />;
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.header, { backgroundColor: theme.colors.background }]}>
        <Header title="Favourites" />
      </View>
      <Spacer height={10} />

      {isRemoving && <ActivityIndicator size="small" color={theme.colors.enabled} />}

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

import { FlatList, View } from "react-native";

import { TUser } from "@/src/api/types";
import EmptyBox from "@/src/components/EmptyBox";
import Error from "@/src/components/Error";
import Header from "@/src/components/Header";
import Loading from "@/src/components/Loading";
import Spacer from "@/src/components/Spacer";
import { useTheme } from "@/src/context/ThemeContext";
import { useFavouriteUsers } from "@/src/hooks/useFavouriteUsers";
import { RootState } from "@/src/store";
import { useSelector } from "react-redux";
import CardFavouritesInfo from "./components/CardFavouritesInfo";

import { styles } from "./styles";

function FavouriteScreen() {
  const { data: favouriteUsers, isLoading: isLoadingFavouriteUsers, error } = useFavouriteUsers();
  const { isLoading: isLoadingUI } = useSelector((state: RootState) => state.ui);
  const { theme } = useTheme();

  const renderItem = ({ item }: { item: TUser }) => <CardFavouritesInfo {...item} />;

  if (isLoadingUI || isLoadingFavouriteUsers) {
    return <Loading text="Loading favourite users..." />;
  }

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

import { router, useLocalSearchParams } from "expo-router";
import { useCallback, useState } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import Card from "@/src/components/Card";
import { HapticTab } from "@/src/components/HapticTab";
import Header from "@/src/components/Header";
import Text from "@/src/components/primitives/Text";
import Spacer from "@/src/components/Spacer";
import { useTheme } from "@/src/context/ThemeContext";
import { useUserRepos } from "@/src/hooks/useUserRepos";
import { RootState } from "@/src/store";
import { removeFavourite, updateFavourite } from "@/src/store/slicers/FavouritesSlice";
import { FontAwesome } from "@expo/vector-icons";
import Avatar from "./components/Avatar";
import UserRepo from "./components/UserRepo";
import { UserSummary } from "./components/UserSummary";

import { styles } from "./styles";

function DetailsScreen() {
  const dispatch = useDispatch();
  const { theme } = useTheme();
  const { user } = useLocalSearchParams();
  const { login, id, avatar_url, gravatar_id, followers, following } = JSON.parse(user as string);
  const { data: reposData = [], isLoading } = useUserRepos(login);
  const favouriteId = useSelector((state: RootState) => state.favourites.favouriteId);

  const [showShadow, setShowShadow] = useState(false);

  const handleScrollShadowVisible = useCallback((event: any) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    setShowShadow(offsetY > 0);
  }, []);

  const handleOnPressFavourite = useCallback(() => {
    const formattedId = `${id}-${login}`;

    if (favouriteId.includes(formattedId)) return dispatch(removeFavourite(formattedId));
    return dispatch(updateFavourite(formattedId));
  }, [dispatch, id, favouriteId, login]);

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.header, { backgroundColor: theme.colors.background }]}>
        <Header title="User Details" backIcon onPressBack={() => router.back()} shadowVisible={showShadow} />
      </View>

      <ScrollView onScroll={handleScrollShadowVisible} scrollEventThrottle={16} showsVerticalScrollIndicator={false} style={styles.scrollView}>
        <Card shadow>
          <Avatar avatar_url={avatar_url} gravatar_id={gravatar_id} />
          <Spacer height={4} />

          <Text fontSize="large" fontWeight="medium" numberOfLines={1} ellipsizeMode="tail" style={{ textAlign: "center" }}>
            {login}
          </Text>
          <Spacer height={20} />

          <View style={styles.containerFavourite}>
            <TouchableOpacity activeOpacity={1}>
              <HapticTab onPress={handleOnPressFavourite}>
                {favouriteId?.includes(`${id}-${login}`) ? <FontAwesome name="star" size={38} color={theme.colors.gold} /> : <FontAwesome name="star-o" size={38} color={theme.colors.gold} />}
              </HapticTab>
            </TouchableOpacity>
          </View>

          <UserSummary reposDataLength={reposData?.length} followingData={following} followersData={followers} isLoading={isLoading} />
        </Card>
        <Spacer height={20} />

        <UserRepo reposData={reposData} isLoading={isLoading} />
        <Spacer height={20} />
      </ScrollView>
    </View>
  );
}

export default DetailsScreen;

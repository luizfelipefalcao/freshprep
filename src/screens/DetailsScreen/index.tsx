import { router, useLocalSearchParams } from "expo-router";
import { useCallback, useState } from "react";
import { Linking, ScrollView, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import Card from "@/src/components/Card";
import { HapticTab } from "@/src/components/HapticTab";
import Header from "@/src/components/Header";
import Text from "@/src/components/primitives/Text";
import Spacer from "@/src/components/Spacer";
import { useTheme } from "@/src/context/ThemeContext";
import { RootState } from "@/src/store";
import { removeFavourite, updateFavourite } from "@/src/store/slicers/FavouritesSlice";
import { FontAwesome } from "@expo/vector-icons";
import Avatar from "./components/Avatar";
import UserRepo from "./components/UserRepo";

import { styles } from "./styles";

function DetailsScreen() {
  const { theme } = useTheme();
  const dispatch = useDispatch();
  const { user } = useLocalSearchParams();
  const { login, id, html_url, avatar_url, url, followers_url, following_url, gravatar_id, repos_url } = JSON.parse(user as string);
  const [showShadow, setShowShadow] = useState(false);
  const favouriteId = useSelector((state: RootState) => state.favourites.favouriteId);

  const handleScrollShadowVisible = useCallback((event: any) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    setShowShadow(offsetY > 0);
  }, []);

  const handleOnPressFavourite = useCallback(() => {
    // return dispatch(resetFavourites());
    const formattedId = `${id}-${login}`;

    if (favouriteId.includes(formattedId)) {
      dispatch(removeFavourite(formattedId));
      return;
    }
    dispatch(updateFavourite(formattedId));
  }, [dispatch, id, favouriteId, login]);

  const handleExternalLink = useCallback(async (url: string) => {
    try {
      const supported = await Linking.canOpenURL(url);
      if (!supported) return;
      await Linking.openURL(url);
    } catch (error) {
      console.log("Error", "Failed to open link");
    }
  }, []);

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

          <UserRepo repos_url={repos_url} />
        </Card>
        <Spacer height={20} />
      </ScrollView>
    </View>
  );
}

export default DetailsScreen;

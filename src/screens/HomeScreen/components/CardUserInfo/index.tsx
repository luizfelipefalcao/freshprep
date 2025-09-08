import { AntDesign, Entypo, FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useCallback } from "react";
import { TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { TUser } from "@/src/api/types";
import Card from "@/src/components/Card";
import { HapticTab } from "@/src/components/HapticTab";
import Text from "@/src/components/primitives/Text";
import Spacer from "@/src/components/Spacer";
import { useTheme } from "@/src/context/ThemeContext";
import { useUserFollowers } from "@/src/hooks/useUserFollowers";
import { useUserFollowing } from "@/src/hooks/useUserFollowing";
import { RootState } from "@/src/store";
import { removeFavourite, updateFavourite } from "@/src/store/slicers/FavouritesSlice";
import Avatar from "../Avatar";

import styles from "./styles";

function CardUserInfo({ login, id, html_url, avatar_url, gravatar_id }: TUser) {
  const { theme } = useTheme();
  const dispatch = useDispatch();
  const { data: followingData = [] } = useUserFollowing(login as string);
  const { data: followersData = [] } = useUserFollowers(login as string);
  const favouriteId = useSelector((state: RootState) => state.favourites.favouriteId);

  const userName = login ? `${login?.charAt(0)?.toUpperCase()}${login?.slice(1)}` : "";
  const htmlUrl = html_url?.replace("https://", " ") || " ";
  const followers = followersData?.length;
  const following = followingData?.length;

  const handleOnPressFavourite = useCallback(() => {
    const formattedId = `${id}-${login}`;
    if (favouriteId.includes(formattedId)) return dispatch(removeFavourite(formattedId));
    dispatch(updateFavourite(formattedId));
  }, [dispatch, id, favouriteId, login]);

  const handleOnPressCard = useCallback(() => {
    const params = { login, id, avatar_url, gravatar_id, followers, following };
    router.push({ pathname: "/details-screen", params: { user: JSON.stringify(params) } });
  }, [login, id, avatar_url, gravatar_id, followers, following]);

  if (!id || !login) return null;
  return (
    <View style={styles.container} key={`key_${id}`}>
      <Card shadow>
        <View style={styles.cardContent}>
          <TouchableOpacity style={styles.containerFavourite} activeOpacity={1}>
            <HapticTab onPress={handleOnPressFavourite}>
              {favouriteId?.includes(`${id}-${login}`) ? <FontAwesome name="star" size={32} color={theme.colors.gold} /> : <FontAwesome name="star-o" size={32} color={theme.colors.gold} />}
            </HapticTab>
          </TouchableOpacity>

          <TouchableOpacity style={styles.infoContainer} onPress={handleOnPressCard} activeOpacity={1}>
            <View>
              <Avatar avatar_url={avatar_url} gravatar_id={gravatar_id} iconSize={78} />
              <Spacer height={1} />

              <Text fontSize={12} fontWeight="medium" numberOfLines={1} ellipsizeMode="tail" style={{ textAlign: "center" }}>
                {userName}
              </Text>
            </View>

            <View style={styles.userContent}>
              <Text fontSize="regular" ellipsizeMode="tail" numberOfLines={1}>
                <AntDesign name="github" size={12} color={theme.colors.icon} />
                {htmlUrl?.length > 18 ? `${htmlUrl?.slice(0, 18)}...` : htmlUrl}
              </Text>
              <Text fontSize={11}>
                {followers} followers
                <Entypo name="dot-single" size={12} color={theme.colors.icon} />
                <Text fontSize={11}>{following} following</Text>
              </Text>
            </View>

            <MaterialIcons name="arrow-forward-ios" size={32} color={theme.colors.tabIcon} />
          </TouchableOpacity>
        </View>
      </Card>
      <Spacer height={14} />
    </View>
  );
}

export default CardUserInfo;

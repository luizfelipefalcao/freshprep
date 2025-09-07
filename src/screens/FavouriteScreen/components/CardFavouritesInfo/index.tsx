import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { useCallback } from "react";
import { TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { TUser } from "@/src/api/types";
import Card from "@/src/components/Card";
import { HapticTab } from "@/src/components/HapticTab";
import Text from "@/src/components/primitives/Text";
import Spacer from "@/src/components/Spacer";
import { useTheme } from "@/src/context/ThemeContext";
import Avatar from "@/src/screens/HomeScreen/components/Avatar";
import { RootState } from "@/src/store";
import { removeFavourite, updateFavourite } from "@/src/store/slicers/FavouritesSlice";

import styles from "./styles";

function CardFavouritesInfo({ login, id, html_url, avatar_url, gravatar_id }: TUser) {
  const { theme } = useTheme();
  const dispatch = useDispatch();
  const favouriteId = useSelector((state: RootState) => state.favourites.favouriteId);

  const userName = login ? `${login?.charAt(0)?.toUpperCase()}${login?.slice(1)}` : "";
  const htmlUrl = html_url?.replace("https://", " ") || " ";

  const handleOnPressFavourite = useCallback(() => {
    const formattedId = `${id}-${login}`;

    if (favouriteId.includes(formattedId)) {
      dispatch(removeFavourite(formattedId));
      return;
    }
    dispatch(updateFavourite(formattedId));
  }, [dispatch, id, favouriteId, login]);

  return (
    <View style={styles.container} key={`key_${id}`}>
      <Card shadow>
        <View style={styles.cardContent}>
          <View>
            <Avatar avatar_url={avatar_url} gravatar_id={gravatar_id} iconSize={78} />
            <Spacer height={1} />
          </View>

          <View style={styles.userContent}>
            <Text fontSize="large" fontWeight="medium" numberOfLines={1} ellipsizeMode="tail">
              {userName}
            </Text>
            <Text fontSize="regular" ellipsizeMode="tail" numberOfLines={1}>
              <AntDesign name="github" size={12} color={theme.colors.icon} />
              {htmlUrl?.length > 18 ? `${htmlUrl?.slice(0, 18)}...` : htmlUrl}
            </Text>
          </View>

          <TouchableOpacity activeOpacity={1}>
            <HapticTab onPress={handleOnPressFavourite}>
              <FontAwesome name="remove" size={36} color={theme.colors.darkRed} />
            </HapticTab>
          </TouchableOpacity>
        </View>
      </Card>
      <Spacer height={14} />
    </View>
  );
}

export default CardFavouritesInfo;

import { AntDesign, Entypo, FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import { TouchableOpacity, View } from "react-native";

import { TUser } from "@/src/api/types";
import Card from "@/src/components/Card";
import Text from "@/src/components/primitives/Text";
import Spacer from "@/src/components/Spacer";
import { useTheme } from "@/src/context/ThemeContext";

import Avatar from "../Avatar";
import styles from "./styles";

function CardUserInfo({ login, id, html_url, avatar_url, url, followers_url, following_url, gravatar_id, onPress }: TUser & { onPress: () => void }) {
  const { theme } = useTheme();
  const [favourite, setFavourite] = useState(false);

  const userName = login ? `${login?.charAt(0)?.toUpperCase()}${login?.slice(1)}` : "";
  const htmlUrl = html_url?.replace("https://", " ") || " ";
  const followers = followers_url?.length;
  const following = following_url?.length;

  return (
    <View style={styles.container} key={`key_${id}`}>
      <Card shadow>
        <View style={styles.cardContent}>
          <TouchableOpacity style={styles.containerFavourite} onPress={() => setFavourite(!favourite)} activeOpacity={1}>
            {favourite ? <FontAwesome name="star" size={32} color={theme.colors.gold} /> : <FontAwesome name="star-o" size={32} color={theme.colors.gold} />}
          </TouchableOpacity>

          <TouchableOpacity style={styles.infoContainer} onPress={onPress} activeOpacity={1}>
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

import { router } from "expo-router";
import React from "react";
import { FlatList, TouchableOpacity, View } from "react-native";

import { useTheme } from "@/src/context/ThemeContext";
import { useUsers } from "@/src/hooks/useUsers";

import { TUser } from "@/src/api/types";
import Header from "@/src/components/Header";
import Loading from "@/src/components/Loading";
import Text from "@/src/components/primitives/Text";
import Spacer from "@/src/components/Spacer";
import CardUserInfo from "./components/CardUserInfo";

import { styles } from "./styles";

function HomeScreen() {
  const { data: usersData, isLoading, error, refetch } = useUsers();
  const { theme } = useTheme();

  const handleOnPressCard = (user: TUser) => {
    router.push({
      pathname: "/details-screen",
      params: { user: JSON.stringify(user) },
    });
  };

  if (isLoading) {
    return <Loading text="Loading GitHub users..." />;
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text>Error: {error?.message || "Unknown error"}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={() => refetch()}>
          <Text>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const renderItem = ({ item }: { item: TUser }) => <CardUserInfo {...item} onPress={() => handleOnPressCard(item)} />;

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.header, { backgroundColor: theme.colors.background }]}>
        <Header title="GitHub Users" />
      </View>
      <Spacer height={10} />

      <View style={{ height: 100, backgroundColor: "#EEE" }} />

      <FlatList
        data={usersData?.data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        maxToRenderPerBatch={10}
        initialNumToRender={10}
        removeClippedSubviews={true}
        windowSize={10}
        onEndReachedThreshold={0.5}
        onEndReached={() => null}
        contentContainerStyle={styles.listContainer}
      />
      <Spacer height={40} />
    </View>
  );
}

export default HomeScreen;

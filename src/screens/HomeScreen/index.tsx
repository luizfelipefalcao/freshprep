import { router } from "expo-router";
import React, { useCallback, useState } from "react";
import { FlatList, View } from "react-native";

import { useTheme } from "@/src/context/ThemeContext";
import { useUsers } from "@/src/hooks/useUsers";

import { TUser } from "@/src/api/types";
import Error from "@/src/components/Error";
import Header from "@/src/components/Header";
import Loading from "@/src/components/Loading";
import Spacer from "@/src/components/Spacer";
import CardUserInfo from "./components/CardUserInfo";

import { styles } from "./styles";

function HomeScreen() {
  const { data: usersData, isLoading, error, refetch } = useUsers();
  const { theme } = useTheme();
  const [isRefreshing, setIsRefreshing] = useState(false);

  /* Leave this shere for reference:
  const { data: usersData, isLoading, error, isStale, isFetching } = useUsers();
  const { refreshUsers } = useUsersRefresh();
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      await refreshUsers();
    } finally {
      setRefreshing(false);
    }
  };
  */

  const handleOnPressCard = useCallback((user: TUser) => {
    router.push({
      pathname: "/details-screen",
      params: { user: JSON.stringify(user) },
    });
  }, []);

  const handleOnRefresh = useCallback(() => {
    setIsRefreshing(true);
    refetch();
    setTimeout(() => setIsRefreshing(false), 800);
  }, [refetch]);

  if (isLoading) {
    return <Loading text="Loading GitHub users..." />;
  }

  if (error) {
    return <Error message="Error loading GitHub users" onPress={handleOnRefresh} />;
  }

  const renderItem = ({ item }: { item: TUser }) => <CardUserInfo {...item} onPressCard={() => handleOnPressCard(item)} />;

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.header, { backgroundColor: theme.colors.background }]}>
        <Header title="GitHub Users" />
      </View>
      <Spacer height={10} />

      <View style={{ height: 100, backgroundColor: "#EEE" }} />

      <FlatList
        data={usersData?.data}
        keyExtractor={(item) => item?.id?.toString()}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        maxToRenderPerBatch={10}
        initialNumToRender={10}
        removeClippedSubviews={true}
        windowSize={10}
        onEndReachedThreshold={0.5}
        contentContainerStyle={styles.listContainer}
        onRefresh={handleOnRefresh}
        refreshing={isRefreshing}
      />
      <Spacer height={40} />

      {/* <FlatList
        data={usersData}
        renderItem={({ item }) => <CardUserInfo {...item} />}
        keyExtractor={(item) => item.id.toString()}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            // Only enable refresh if data is stale
            enabled={shouldShowRefresh}
          />
        }
        // Show loading state
        ListEmptyComponent={
          isLoading ? <LoadingComponent /> : <EmptyStateComponent />
        }
    /> */}
    </View>
  );
}

export default HomeScreen;

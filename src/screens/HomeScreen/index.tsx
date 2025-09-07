import { router } from "expo-router";
import React, { useCallback, useMemo, useState } from "react";
import { FlatList, RefreshControl, View } from "react-native";

import { TUser } from "@/src/api/types";
import EmptyBox from "@/src/components/EmptyBox";
import Error from "@/src/components/Error";
import Header from "@/src/components/Header";
import Loading from "@/src/components/Loading";
import Spacer from "@/src/components/Spacer";
import Tooltip from "@/src/components/Tooltip";
import { useTheme } from "@/src/context/ThemeContext";
import { usePaginatedUsers } from "@/src/hooks/usePaginatedUsers";
import useVerifyNetworkStatus from "@/src/hooks/useVerifyNetworkStatus";
import CardUserInfo from "./components/CardUserInfo";
import SearchUserRow from "./components/SearchUserRow";

import { styles } from "./styles";

function HomeScreen() {
  const { theme } = useTheme();
  const { data: usersData, isLoading, error, refetch: refetchUsers, fetchNextPage, hasNextPage } = usePaginatedUsers();
  const { isConnected } = useVerifyNetworkStatus();

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = useMemo(() => {
    const usersList = usersData?.pages?.flatMap((page) => page.data) || [];

    if (searchTerm === "") return usersList;
    return usersList?.filter((user) => user?.login?.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [searchTerm, usersData]);

  const handleVerifyNetwork = () => {
    if (isConnected === false) return setIsTooltipVisible(true);
    return setIsTooltipVisible(false);
  };

  const handleOnPressCard = useCallback((user: TUser) => {
    router.push({ pathname: "/details-screen", params: { user: JSON.stringify(user) } });
  }, []);

  const handleOnRefresh = useCallback(() => {
    setIsRefreshing(true);
    handleVerifyNetwork();
    refetchUsers();
    setTimeout(() => setIsRefreshing(false), 800);
  }, [refetchUsers]);

  const handleLoadMoreUsers = useCallback(() => {
    if (hasNextPage && !isLoading && searchTerm === "") {
      setIsLoadingMore(true);
      fetchNextPage();
      setTimeout(() => setIsLoadingMore(false), 800);
    }
  }, [hasNextPage, isLoading, fetchNextPage, searchTerm]);

  const renderFooter = useCallback(() => {
    if (!isLoadingMore) return null;
    return <Loading />;
  }, [isLoadingMore]);

  const renderItem = ({ item }: { item: TUser }) => <CardUserInfo {...item} onPressCard={() => handleOnPressCard(item)} />;

  const refreshControl = <RefreshControl refreshing={isRefreshing} onRefresh={handleOnRefresh} tintColor={theme.colors.enabled} />;

  if (isLoading) {
    return <Loading text="Loading GitHub users..." />;
  }

  if (error) {
    return <Error message="Error loading GitHub users" onPress={refetchUsers} />;
  }

  const renderContent = () => {
    if (!filteredUsers || filteredUsers?.length !== 0) return <EmptyBox message="No users found..." />;

    return (
      <FlatList
        data={filteredUsers}
        keyExtractor={(item) => item?.id?.toString()}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        maxToRenderPerBatch={10}
        initialNumToRender={10}
        removeClippedSubviews={true}
        windowSize={10}
        contentContainerStyle={styles.listContainer}
        onRefresh={handleOnRefresh}
        refreshControl={refreshControl}
        refreshing={isRefreshing}
        onEndReached={handleLoadMoreUsers}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
      />
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.header, { backgroundColor: theme.colors.background }]}>
        <Header title="GitHub Users" />
      </View>
      <Spacer height={10} />

      <SearchUserRow searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      {renderContent()}
      <Spacer height={40} />

      <Tooltip status="warning" isVisible={isTooltipVisible} onClose={() => setIsTooltipVisible(false)} />
    </View>
  );
}

export default HomeScreen;

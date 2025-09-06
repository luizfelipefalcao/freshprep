import { useUsers } from "@/src/hooks/useUsers";
import React from "react";
import { ActivityIndicator, FlatList, Text, TouchableOpacity, View } from "react-native";

import { styles } from "./styles";

function HomeScreen() {
  const { data, isLoading, error, refetch } = useUsers();

  if (isLoading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Loading GitHub users...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>Error: {error?.message || "Unknown error"}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={() => refetch()}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const renderUser = ({ item }: { item: any }) => (
    <View style={styles.userCard}>
      <Text style={styles.username}>{item.login}</Text>
      <Text style={styles.userId}>ID: {item.id}</Text>
      <Text style={styles.userUrl}>{item.html_url}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>GitHub Users</Text>
      <FlatList data={data?.data || []} keyExtractor={(item) => item.id.toString()} renderItem={renderUser} showsVerticalScrollIndicator={false} contentContainerStyle={styles.listContainer} />
    </View>
  );
}

export default HomeScreen;

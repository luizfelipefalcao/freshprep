import { FontAwesome5 } from "@expo/vector-icons";
import React, { useState } from "react";
import { TextInput, TouchableOpacity, View } from "react-native";

import { useTheme } from "@/src/context/ThemeContext";
import { styles } from "./styles";

type SearchUserRowProps = { searchTerm: string; setSearchTerm: (value: string) => void };

function SearchUserRow({ searchTerm = "", setSearchTerm }: SearchUserRowProps): React.ReactElement {
  const { theme } = useTheme();
  const [isFocused, setIsFocused] = useState(false);
  const borderColor = isFocused ? theme.colors.tabIconFocused : theme.colors.tabIcon;

  return (
    <View style={styles.row}>
      <View style={[styles.inputContainer, { backgroundColor: theme.colors.background, borderColor }]}>
        <TextInput
          style={[styles.input, { color: theme.colors.tabIcon }]}
          placeholder="Search users..."
          placeholderTextColor={theme.colors.tabIcon}
          value={searchTerm}
          onChangeText={setSearchTerm}
          autoCapitalize="none"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />

        {searchTerm !== "" ? (
          <TouchableOpacity onPress={() => setSearchTerm("")} accessibilityLabel="Clear search">
            <FontAwesome5 name="times" size={20} color={theme.colors.tabIcon} />
          </TouchableOpacity>
        ) : (
          <FontAwesome5 name="search" size={18} color={theme.colors.tabIcon} />
        )}
      </View>
    </View>
  );
}

export default SearchUserRow;

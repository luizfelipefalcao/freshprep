import React from "react";
import { Modal, TouchableOpacity, View } from "react-native";

import { useTheme } from "@/src/context/ThemeContext";
import { FontAwesome, SimpleLineIcons } from "@expo/vector-icons";
import Text from "../primitives/Text";
import { styles } from "./styles";

interface TooltipProps {
  message?: string;
  isVisible: boolean;
  status?: "warning" | "error";
  onClose: () => void;
}

function Tooltip({ message = "Seems like you are offline, please check your internet connection.", isVisible, status, onClose }: TooltipProps) {
  const { theme } = useTheme();
  const icon = status === "warning" ? "exclamation-triangle" : "times";

  if (!isVisible) return null;
  return (
    <Modal transparent visible={isVisible} animationType="fade" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.tooltip}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <SimpleLineIcons name="close" size={21} color={theme.colors.black} />
          </TouchableOpacity>
          <View style={styles.content}>
            <Text fontSize={16} color={theme.colors.black}>
              {status && <FontAwesome name={icon} size={16} color={theme.colors.black} />} {message}
            </Text>
          </View>
        </View>
      </View>
    </Modal>
  );
}

export default Tooltip;

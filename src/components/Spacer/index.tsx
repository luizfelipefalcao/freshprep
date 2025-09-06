import React from "react";
import { View } from "react-native";

import { adjustScale } from "@/src/utils/ui";
import { styles } from "./styles";

const Spacer = ({ height = adjustScale(15) }) => <View style={[styles.wrapper, { height: adjustScale(height) }]} />;

export default Spacer;

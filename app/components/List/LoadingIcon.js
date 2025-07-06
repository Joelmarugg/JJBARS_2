import React from "react";
import { View, Text, ActivityIndicator } from "react-native";
import styles from "./styles";

const LoadingIcon = props => {
  const {
    loadingText = "Loading Exercises..",
    iconColor = styles.$iconColor
  } = props;

  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <ActivityIndicator size="small" color={iconColor} />
      <Text style={styles.loadingText}>{loadingText}</Text>
    </View>
  );
};

export default LoadingIcon;

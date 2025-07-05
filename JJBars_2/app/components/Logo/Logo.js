import React from "react";
import { View, Image, Text } from "react-native";

import styles from "./styles";

const Logo = () => (
  <View style={styles.container}>
    <Text style={styles.text}> J&J BARS</Text>
    <Image
      resizeMode="contain"
      style={styles.containerImage}
      source={require("./jjbarslogo2.png")}
    />
  </View>
);

export default Logo;

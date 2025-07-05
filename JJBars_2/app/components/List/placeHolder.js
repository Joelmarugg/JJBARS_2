import React from "react";
import PropTypes from "prop-types";
import { Text, View } from "react-native";

import styles from "./styles";

const placeHolder = text => (
  <View style={{ alignItems: "center" }}>
    <Text style={styles.placeHolderText}>{text}</Text>
  </View>
);

placeHolder.propTypes = {
  text: PropTypes.string
};

export default placeHolder;

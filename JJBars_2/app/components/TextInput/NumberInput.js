import React from "react";
import PropTypes from "prop-types";
import { View, TextInput } from "react-native";

import styles from "./styles";

const NumberInput = props => {
  const { onChangeText } = props;

  return (
    <View style={styles.numberInputContainer}>
      <TextInput
        style={styles.numberInput}
        placeholder="10"
        underlineColorAndroid="transparent"
        keyboardType={"numeric"}
        onChangeText={onChangeText}
      />
    </View>
  );
};

NumberInput.propTypes = {
  onChangeText: PropTypes.func
};

export default NumberInput;

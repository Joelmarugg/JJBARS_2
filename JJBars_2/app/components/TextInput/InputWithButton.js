import React from "react";
import PropTypes from "prop-types";
import { View, Text, TouchableHighlight, TextInput } from "react-native";
import color from "color";

import styles from "./styles";

const InputWithButton = props => {
  const {
    onPress,
    buttonText,
    placeholder,
    value,
    editable,
    onChangeText,
    clear
  } = props;

  const underlayColor = color(styles.$buttonBackgroundColorBase).lighten(
    styles.$buttonBackgroundColorModifier
  );
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={value}
        placeholder={placeholder}
        underlineColorAndroid="transparent"
        onChangeText={onChangeText}
        clearTextOnFocus={clear}
        editable={editable}
      />
      <View style={styles.border} />
      <TouchableHighlight
        underlayColor={underlayColor}
        style={styles.buttonContainer}
        onPress={onPress}
      >
        <Text style={styles.buttonText}>{buttonText}</Text>
      </TouchableHighlight>
    </View>
  );
};

InputWithButton.propTypes = {
  onPress: PropTypes.func,
  buttonText: PropTypes.string,
  onChangeText: PropTypes.func,
  clear: PropTypes.bool
};

export default InputWithButton;

import React from "react";
import PropTypes from "prop-types";
import { View, Text, TouchableHighlight } from "react-native";
import color from "color";

import styles from "./styles";

const RepSecButton = props => {
  const { onPress, buttonText } = props;

  const underlayColor = color(styles.$buttonBackgroundColorBase).lighten(
    styles.$buttonBackgroundColorModifier
  );

  return (
    <View style={styles.RepSecButtonContainer}>
      <TouchableHighlight
        underlayColor={underlayColor}
        style={styles.RepSecButton}
        onPress={onPress}
      >
        <Text style={styles.RoundButtonText}>{buttonText}</Text>
      </TouchableHighlight>
    </View>
  );
};

RepSecButton.propTypes = {
  onPress: PropTypes.func,
  buttonText: PropTypes.string
};

export default RepSecButton;

import React from "react";
import PropTypes from "prop-types";
import { View, Text, TouchableHighlight } from "react-native";
import color from "color";

import styles from "./styles";

const RoundButton = props => {
  const { onPress, buttonText, cancelButton } = props;

  const cancelunderlayColor = color(
    styles.$cancelbuttonBackgroundColorBase
  ).lighten(styles.$cancelbuttonBackgroundColorModifier);

  const underlayColor = color(styles.$buttonBackgroundColorBase).lighten(
    styles.$buttonBackgroundColorModifier
  );

  return (
    <View
      style={
        cancelButton
          ? styles.CancelRoundButtonContainer
          : styles.RoundButtonContainer
      }
    >
      <TouchableHighlight
        underlayColor={cancelButton ? cancelunderlayColor : underlayColor}
        style={styles.RoundButton}
        onPress={onPress}
      >
        <Text
          style={
            cancelButton ? styles.CancelRoundButtonText : styles.RoundButtonText
          }
        >
          {buttonText}
        </Text>
      </TouchableHighlight>
    </View>
  );
};

RoundButton.propTypes = {
  onPress: PropTypes.func,
  buttonText: PropTypes.string
};

export default RoundButton;

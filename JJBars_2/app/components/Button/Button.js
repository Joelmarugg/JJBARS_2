import React from "react";
import PropTypes from "prop-types";
import { View, Text, TouchableHighlight, TouchableOpacity } from "react-native";
import color from "color";

import styles from "./styles";

const Button = props => {
  const { onPress, buttonText, variant = "filled", disabled = false, style } = props;

  const underlayColor = color(styles.$buttonBackgroundColorBase).lighten(
    styles.$buttonBackgroundColorModifier
  );

  // M3 Button Varianten
  const getButtonStyle = () => {
    switch (variant) {
      case "outlined":
        return styles.outlinedContainer;
      case "text":
        return styles.textContainer;
      default:
        return styles.container;
    }
  };

  const getTextStyle = () => {
    switch (variant) {
      case "outlined":
        return styles.outlinedButtonText;
      case "text":
        return styles.textButtonText;
      default:
        return styles.buttonText;
    }
  };

  const getTouchableComponent = () => {
    if (variant === "text") {
      return TouchableOpacity;
    }
    return TouchableHighlight;
  };

  const TouchableComponent = getTouchableComponent();

  return (
    <View style={[getButtonStyle(), style, disabled && { opacity: 0.38 }]}>
      <TouchableComponent
        underlayColor={variant === "filled" ? underlayColor : "transparent"}
        style={styles.button}
        onPress={onPress}
        disabled={disabled}
        activeOpacity={variant === "text" ? 0.7 : 1}
      >
        <Text style={getTextStyle()}>{buttonText}</Text>
      </TouchableComponent>
    </View>
  );
};

Button.propTypes = {
  onPress: PropTypes.func,
  buttonText: PropTypes.string,
  variant: PropTypes.oneOf(["filled", "outlined", "text"]),
  disabled: PropTypes.bool,
  style: PropTypes.object
};

export default Button;

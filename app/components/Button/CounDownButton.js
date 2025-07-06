import React from "react";
import PropTypes from "prop-types";
import { View, TouchableHighlight } from "react-native";
import color from "color";
import { Ionicons } from "@expo/vector-icons";

import styles from "./styles";

const CountDownButton = props => {
  const { onPress, customIcon = null, disabled } = props;

  // Icon immer M3-Grün und 32px, wenn Ionicons
  let iconToRender = customIcon;
  if (React.isValidElement(customIcon) && customIcon.type === Ionicons) {
    iconToRender = React.cloneElement(customIcon, { color: '#006C51', size: 32 });
  }

  return (
    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
      <TouchableHighlight
        underlayColor={'#E6EBE9'}
        style={{
          borderRadius: 28,
          width: 56,
          height: 56,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={onPress}
        disabled={disabled}
      >
        {iconToRender}
      </TouchableHighlight>
    </View>
  );
};

CountDownButton.propTypes = {
  onPress: PropTypes.func,
  customIcon: PropTypes.element
};

export default CountDownButton;

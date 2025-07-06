import React from "react";
import PropTypes from "prop-types";
import { View, Platform, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import color from "color";

import styles from "./styles";

const IosHomeHeader = props => {
  const { onPress } = props;

  const ICON_PREFIX = Platform.OS === "ios" ? "ios" : "md";

  const underlayColor = color(styles.$buttonBackgroundColorBase).lighten(
    styles.$buttonBackgroundColorModifier
  );

  return (
    <View style={styles.HomeHeader}>
      <TouchableOpacity
        onPress={onPress}

      >
        <View style={{ padding: 5 }}>
          <Ionicons name={`${ICON_PREFIX}-home`} color={"black"} size={23} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

IosHomeHeader.propTypes = {
  onPress: PropTypes.func
};

export default IosHomeHeader;

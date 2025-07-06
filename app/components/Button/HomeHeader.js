import React from "react";
import PropTypes from "prop-types";
import { View, Platform, TouchableNativeFeedback } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import color from "color";

import styles from "./styles";

const HomeHeader = props => {
  const { onPress } = props;

  const ICON_PREFIX = Platform.OS === "ios" ? "ios" : "md";

  const underlayColor = color(styles.$buttonBackgroundColorBase).lighten(
    styles.$buttonBackgroundColorModifier
  );

  return (
    <View style={styles.HomeHeader}>
      <TouchableNativeFeedback
        onPress={onPress}
        background={TouchableNativeFeedback.Ripple("gray", true)}
      >
        <View style={{ padding: 5 }}>
          <Ionicons name={`${ICON_PREFIX}-home`} color={"black"} size={23} />
        </View>
      </TouchableNativeFeedback>
    </View>
  );
};

HomeHeader.propTypes = {
  onPress: PropTypes.func
};

export default HomeHeader;

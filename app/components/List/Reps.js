import React from "react";
import PropTypes from "prop-types";
import { View, Text } from "react-native";

import styles from "./styles";

const Reps = ({ number, repText }) => {
  return (
    <View style={styles.numberStyle}>
      <Text style={{ fontSize: 12 }}>
        {number} {repText}
      </Text>
    </View>
  );
};

Reps.propTypes = {
  number: PropTypes.number
};

export default Reps;

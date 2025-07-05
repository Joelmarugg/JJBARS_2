import React from "react";
import PropTypes from "prop-types";
import { View } from "react-native";

import styles from "./styles";

const CWContainer = ({ children }) => (
  <View style={styles.CWcontainer}>{children}</View>
);

CWContainer.propTypes = {
  children: PropTypes.any
};

export default CWContainer;

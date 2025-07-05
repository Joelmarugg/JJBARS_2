import React from "react";
import PropTypes from "prop-types";
import { View } from "react-native";

import styles from "./styles";

const ListContainer = ({ children }) => (
  <View style={styles.Listcontainer}>{children}</View>
);

ListContainer.propTypes = {
  children: PropTypes.any
};

export default ListContainer;

import React from "react";
import PropTypes from "prop-types";
import { View } from "react-native";

import styles from "./styles";

const SearchContainer = ({ children }) => (
  <View style={styles.Searchcontainer}>{children}</View>
);
SearchContainer.propTypes = {
  children: PropTypes.any
};

export default SearchContainer;

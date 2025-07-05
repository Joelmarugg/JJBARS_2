import Button from "./Button";
import RoundButton from "./RoundButton";
import RepSecButton from "./RepSecButton";
import CountDownButton from "./CounDownButton";
import HomeHeader from "./HomeHeader";
import IosHomeHeader from "./IosHomeHeader";
import styles from "./styles";

export {
  Button,
  IosHomeHeader,
  CountDownButton,
  RepSecButton,
  HomeHeader,
  RoundButton,
  styles
};

// Neue M3 FAB Komponente
import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export const FloatingActionButton = ({ onPress, icon = "add", label, style }) => (
  <TouchableOpacity
    style={[label ? styles.extendedFabContainer : styles.fabContainer, style]}
    onPress={onPress}
    activeOpacity={0.8}
  >
    <Ionicons name={icon} size={24} color="#FFFFFF" style={label && { marginRight: 12 }} />
    {label && (
      <Text style={{
        fontFamily: "Roboto",
        fontSize: 16,
        fontWeight: "500",
        color: "#FFFFFF",
        textAlign: "center"
      }}>
        {label}
      </Text>
    )}
  </TouchableOpacity>
);

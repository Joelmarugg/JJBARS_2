import { StyleSheet, Dimensions } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";

const styles = EStyleSheet.create({
  modalView: {
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width,
    backgroundColor: "rgba(52, 52, 52, 0.8)",
    alignItems: "center",
    justifyContent: "center"
  },
  modalText: {
    fontFamily: "$primaryFont",
    fontSize: 20,
    fontWeight: "300",
    color: "$primaryBlack"
  },
  container: {
    padding: 40,
    backgroundColor: "$secondaryGreen",
    borderColor: "$darkBorder",
    borderWidth: StyleSheet.hairlineWidth,
    alignItems: "center",
    borderRadius: 30
  }
});

export default styles;

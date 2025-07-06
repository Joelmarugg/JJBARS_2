import { StyleSheet } from "react-native";
import EStyleSheet, { absoluteFill } from "react-native-extended-stylesheet";

const styles = EStyleSheet.create({
  $iconColor: "$secondaryGreen",

  row: {
    paddingVertical: 15,
    paddingLeft: 20,
    paddingRight: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "$primaryWhite",
    borderRadius: 10,
    borderBottomColor: "$border",
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  textUnselected: {
    fontSize: 16,
    color: "$darkText"
  },
  textmusclegroup: {
    fontSize: 10,
    paddingTop: 10,
    color: "$primaryGreen"
  },

  text: {
    paddingVertical: 20,
    fontSize: 14,
    color: "$darkText",
    width: "60%"
  },
  info: {
    paddingBottom: 20,
    fontSize: 10,
    color: "$secondaryGreen"
    //width: "70%"
  },
  bigtext: {
    paddingVertical: 20,
    fontSize: 18,
    color: "$darkText"
    //width: "70%"
  },
  bigtextWithInfo: {
    paddingTop: 20,
    paddingBottom: 10,
    fontSize: 18,
    color: "$darkText"
    //width: "70%"
  },
  separator: {
    marginLeft: 20,
    backgroundColor: "$border",
    flex: 1,
    height: StyleSheet.hairlineWidth
  },
  listEnd: {
    marginLeft: 0,
    backgroundColor: "$border",
    flex: 1,
    height: 2
  },
  numberStyle: {
    paddingVertical: 3,
    paddingHorizontal: 4,
    borderColor: "$border",
    backgroundColor: "$lightGreen",
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center"
  },

  placeHolderText: {
    marginTop: 11,
    margin: 7,
    padding: 5,
    borderRadius: 5,
    borderColor: "$border",
    borderWidth: StyleSheet.hairlineWidth,
    backgroundColor: "$lightGreen",
    color: "$primaryBlack",
    fontSize: 14,
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "$primaryFont"
  },

  round: {
    paddingVertical: 10,
    paddingLeft: 20,
    paddingRight: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "$lightGreen",
    borderRadius: 10,
    borderBottomColor: "$border",
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  editinground: {
    paddingVertical: 10,
    paddingLeft: 20,
    paddingRight: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "$cancelRed",
    borderRadius: 10,
    borderBottomColor: "$cancelRedBorder",
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  roundText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "$darkText"
  },
  editingroundText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "$primaryWhite"
  },
  loadingIconText: {
    fontSize: 12,
    fontFamily: "$primaryFont"
  },
  animView: {
    flexDirection: "row",
    justifyContent: "flex-start",

    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "transparent",
    zIndex: 999,
    elevation: 999
  }
});

export default styles;

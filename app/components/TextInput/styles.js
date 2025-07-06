import EStyleSheet from "react-native-extended-stylesheet";
import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";

const INPUT_WIDTH = Dimensions.get("window").width / 2;
const INPUT_HEIGHT = 48;
const BORDER_RADIUS = 5;

const styles = EStyleSheet.create({
  $buttonBackgroundColorBase: "$secondaryGreen",
  $buttonBackgroundColorModifier: 0.1,

  container: {
    backgroundColor: "$primaryWhite",
    width: "95%",
    height: INPUT_HEIGHT,
    borderRadius: BORDER_RADIUS,
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 11
  },
  buttonContainer: {
    height: INPUT_HEIGHT,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "$lightGreen",
    borderTopRightRadius: BORDER_RADIUS,
    borderBottomRightRadius: BORDER_RADIUS,
    borderWidth: StyleSheet.hairlineWidth * 2,
    borderColor: "$border"
  },
  buttonText: {
    fontFamily: "$primaryFont",
    fontWeight: "400",
    fontSize: 18,
    paddingHorizontal: 11,
    color: "$darkText"
  },
  input: {
    height: INPUT_HEIGHT,
    flex: 1,
    fontSize: 18,
    paddingHorizontal: 8,
    color: "$inputText",
    borderTopLeftRadius: BORDER_RADIUS,
    borderBottomLeftRadius: BORDER_RADIUS,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "$border"
  },
  border: {
    height: INPUT_HEIGHT
    //width: StyleSheet.hairlineWidth
    //backgroundColor: "$border"
  },

  inputBarContainer: {
    backgroundColor: "$primaryWhite",
    borderTopWidth: 0,
    borderBottomWidth: 0,
    borderRadius: 25,
    height: 60,
    width: INPUT_WIDTH
  },
  inputBar: {
    backgroundColor: "$primaryWhite",
    borderColor: "$border",

    borderWidth: StyleSheet.hairlineWidth
  },
  numberInputContainer: {
    backgroundColor: "$primaryWhite",
    width: 36,
    height: INPUT_HEIGHT,
    borderRadius: BORDER_RADIUS,
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 25,
    borderColor: "$border",
    borderWidth: StyleSheet.hairlineWidth,
    elevation: 5
  },
  numberInput: {
    height: INPUT_HEIGHT,
    flex: 1,
    fontSize: 18,
    paddingHorizontal: 7,
    color: "$inputText",
    textAlign: "center"
  }
});

export default styles;

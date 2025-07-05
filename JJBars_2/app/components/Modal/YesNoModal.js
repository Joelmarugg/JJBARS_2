import React from "react";
import PropTypes from "prop-types";
import { Text, Modal, View, TouchableHighlight } from "react-native";

import styles from "./styles";
import { RoundButton } from "../Button";

const YesNoModal = props => {
  const {
    onYesPress,
    onNoPress,

    onCancelPress,
    modalVisible
  } = props;

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={onCancelPress}
    >
      <TouchableHighlight onPress={onCancelPress}>
        <View style={styles.modalView}>
          <TouchableHighlight>
            <View style={styles.container}>
              <View
                style={{
                  paddingBottom: 30,
                  width: "73%",

                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <Text style={styles.modalText}>
                  This Workout Already Exists.. Do You Want It To Be
                  Overwritten?
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  paddingBottom: 30
                }}
              >
                <RoundButton onPress={onYesPress} buttonText={"Yes"} />

                <RoundButton onPress={onNoPress} buttonText={"No"} />
              </View>
            </View>
          </TouchableHighlight>
        </View>
      </TouchableHighlight>
    </Modal>
  );
};

YesNoModal.propTypes = {
  onPress: PropTypes.func,
  modalVisible: PropTypes.bool
};

export default YesNoModal;

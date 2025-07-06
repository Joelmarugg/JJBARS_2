import React from "react";
import PropTypes from "prop-types";
import { Modal, View, TouchableHighlight } from "react-native";

import styles from "./styles";
import { RoundButton } from "../Button";

const DeleteModal = props => {
  const {
    onEditPress,
    edit,
    onDeletePress,
    isdelete,
    onDownloadPress,
    download,
    onUploadPress,
    upload,
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
              {upload ? (
                <View style={{ paddingBottom: 20 }}>
                  <RoundButton onPress={onUploadPress} buttonText={"Upload"} />
                </View>
              ) : null}
              {edit ? (
                <View style={{ paddingBottom: 20 }}>
                  <RoundButton
                    onPress={onEditPress}
                    buttonText={"   Edit   "}
                  />
                </View>
              ) : null}
              {download ? (
                <RoundButton
                  onPress={onDownloadPress}
                  buttonText={"Download"}
                />
              ) : null}

              {isdelete ? (
                <RoundButton onPress={onDeletePress} buttonText={" Delete "} />
              ) : null}
              <View style={{ padding: 20 }} />
              <RoundButton
                onPress={onCancelPress}
                cancelButton={true}
                buttonText={"X"}
              />
            </View>
          </TouchableHighlight>
        </View>
      </TouchableHighlight>
    </Modal>
  );
};

DeleteModal.propTypes = {
  onPress: PropTypes.func,
  modalVisible: PropTypes.bool
};

export default DeleteModal;

import React, { Component } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Modal, {
  ModalTitle,
  ModalContent,
  SlideAnimation
} from "react-native-modals";

import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";

import { observer, inject } from "mobx-react";

export default class ChangeAvatarModal extends Component {
  componentWillMount() {
    if (this.props.modalVisible) this.props.myProfileStore.clearStore();
  }
  componentDidMount() {
    this.getPermissionAsync();
  }

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
  };

  pickImage = async (option: ?string) => {
    let result;
    if (option === "GET_FROM_LIBRARY") {
      result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        quality: 1,
        aspect: [1, 1]
      });
    }
    if (option === "TAKE_PHOTO") {
      result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        quality: 1,
        aspect: [1, 1]
      });
    }

    this.props.parent.setState({ modalVisible: false });
    if (!result.cancelled) {
        this.props.myProfileStore.uploadAvatar(result);
    }
  };

  render() {
    const { modalVisible, parent } = this.props;
    return (
      <Modal
        onTouchOutside={() => {
          parent.setState({ modalVisible: false });
        }}
        width={0.8}
        visible={modalVisible}
        onSwipeOut={() => parent.setState({ modalVisible: false })}
        modalAnimation={new SlideAnimation({ slideFrom: "bottom" })}
        onHardwareBackPress={() => {
          parent.setState({ modalVisible: false });
          return true;
        }}
        modalTitle={<ModalTitle title="Change your avatar" hasTitleBar={true} />}
      >
        <ModalContent>
          <TouchableOpacity
            style={{ justifyContent: "center" }}
            onPress={() => this.pickImage("TAKE_PHOTO")}
          >
            <Text style={{ alignSelf: "center", paddingVertical: 10 }}>
              Take photo by your camera
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.pickImage("GET_FROM_LIBRARY")}>
            <Text style={{ alignSelf: "center", paddingVertical: 10 }}>
              Select image from library...
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ justifyContent: "center" }}
            onPress={() => parent.setState({ modalVisible: false })}
          >
            <Text style={{ alignSelf: "center", paddingTop: 10 }}>Cancel</Text>
          </TouchableOpacity>
        </ModalContent>
      </Modal>
    );
  }
}

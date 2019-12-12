import React, { Component } from "react";
import {
  Container,
  Header,
  Left,
  Body,
  Right,
  Button,
  Icon,
  Title,
  Text,
  Content,
  Input,
  View,
  Form,
  Item,
  Spinner
} from "native-base";

import Firebase from "../../firebase/Firebase";
import {
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Keyboard
} from "react-native";
import { observer, inject } from "mobx-react";
import BackHeader from "../header/BackHeader";
import StatusBarCustom from "../header/StatusBarCustom";
import DateTimePicker from "react-native-modal-datetime-picker";
import SwitchSelector from "react-native-switch-selector";

@inject("editProfileStore", "navigationStore")
@observer
export default class EditProfileView extends Component {
  static navigationOptions = {
    drawerLabel: () => null
  };
  constructor(props) {
    super(props);
    this._keyboardDidHide = this._keyboardDidHide.bind(this);
    this._keyboardDidShow = this._keyboardDidShow.bind(this);
  }

  state = {
    keyBoardDidShow: false
  };

  componentDidMount() {
    this.props.editProfileStore.getData();
    this.keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      this._keyboardDidShow
    );

    this.keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      this._keyboardDidHide
    );
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }
  _keyboardDidShow() {
    this.setState({ keyBoardDidShow: true });
  }

  _keyboardDidHide() {
    this.setState({ keyBoardDidShow: false });
  }

  render() {
    const { editProfileStore } = this.props;
    return (
      <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
        <Container>
          <StatusBarCustom />
          <BackHeader title="Set up Profile" parent={this} />
          <View style={{ flex: 1 }}>
            <View style={{ flex: 6.5 }}>
              <Content>
                <View style={styles.viewDescription}>
                  <View style={{ height: 20 }} />
                  <Text style={styles.textDescription}>
                    Hey! We need few details from you before you start sharing
                    on Momento
                  </Text>
                </View>
                <Form style={styles.formInput}>
                  <Item regular style={{ borderRadius: 8 }}>
                    <Input
                      placeholder="Full Name "
                      placeholderTextColor="#cccccc"
                      value={editProfileStore.fullName}
                      onChangeText={value =>
                        editProfileStore.fullNameOnChange(value)
                      }
                    />
                  </Item>
                  <View style={{ height: 20 }}></View>
                  <Item
                    regular
                    style={{
                      borderRadius: 8
                    }}
                  >
                    <Input
                      placeholder="Date Of Birth"
                      placeholderTextColor="#cccccc"
                      value={editProfileStore.dateOfBirth}
                      onChangeText={value =>
                        editProfileStore.dateOfBirthOnChange(value)
                      }
                    ></Input>

                    <Icon
                      name="md-calendar"
                      style={styles.iconForm}
                      onPress={() => editProfileStore.showDateTimePicker()}
                    />
                    <DateTimePicker
                      mode="date"
                      date={new Date()}
                      isVisible={editProfileStore.isDateTimePickerVisible}
                      onConfirm={date =>
                        editProfileStore.handleDatePicked(date)
                      }
                      onCancel={() => editProfileStore.hideDateTimePicker()}
                    />
                  </Item>
                  <View style={{ height: 20 }}></View>
                  <Item regular style={{ borderRadius: 8 }}>
                    <Input
                      placeholder="Gender"
                      placeholderTextColor="#cccccc"
                      value={editProfileStore.gender}
                      onChangeText={value =>
                        editProfileStore.genderOnChange(value)
                      }
                    />
                    <SwitchSelector
                      initial={editProfileStore.gender === "Female" ? 0 : 1}
                      style={{ width: 150 }}
                      onPress={value => editProfileStore.genderOnChange(value)}
                      textColor="#7a44cf"
                      selectedColor={
                        editProfileStore.gender != "Male" &&
                        editProfileStore.gender != "Female"
                          ? "#7a44cf"
                          : "white"
                      }
                      buttonColor={
                        editProfileStore.gender != "Male" &&
                        editProfileStore.gender != "Female"
                          ? "white"
                          : "#7a44cf"
                      }
                      borderColor="#d9d9d9"
                      hasPadding
                      borderRadius={5}
                      options={[
                        {
                          label: "Female",
                          value: "Female"
                        },
                        {
                          label: "Male",
                          value: "Male"
                        }
                      ]}
                    />
                  </Item>
                  <View style={{ height: 20 }}></View>
                  <Item regular style={{ borderRadius: 8 }}>
                    <Input
                      placeholder="Location"
                      placeholderTextColor="#cccccc"
                      value={editProfileStore.location}
                      onChangeText={value =>
                        editProfileStore.locationOnChange(value)
                      }
                    />
                    <Icon
                      name="map-pin"
                      type="Feather"
                      style={styles.iconForm}
                    />
                  </Item>
                  <View style={{ height: 20 }}></View>
                  <Item regular style={{ borderRadius: 8 }}>
                    <Input
                      returnKeyType="Done"
                      blurOnSubmit
                      returnKeyType="Done"
                      placeholder="About Me"
                      placeholderTextColor="#cccccc"
                      value={editProfileStore.aboutMe}
                      onChangeText={value =>
                        editProfileStore.aboutMeOnChange(value)
                      }
                      multiline={true}
                      style={{
                        height: 100
                      }}
                    />
                  </Item>
                </Form>
              </Content>
            </View>
            {!this.state.keyBoardDidShow && (
              <View
                style={{
                  flex: 1,
                  flexDirection: "column",
                  justifyContent: "center"
                }}
              >
                <Button
                  style={styles.button}
                  onPress={async () => {
                    let mess = await editProfileStore.submitProfile();
                    this.props.editProfileStore.isLoading = false;
                    if (mess) Alert.alert(mess);
                    else {
                      this.props.navigation.goBack();
                    }
                  }}
                >
                  <Text uppercase={false} style={{ fontSize: 16 }}>
                    Update
                  </Text>
                </Button>
              </View>
            )}

            <View style={{ flex: 0.5 }}>
              {editProfileStore.isLoading && (
                <Spinner size="large" color="#0000ff" />
              )}
            </View>
          </View>
        </Container>
      </KeyboardAvoidingView>
    );
  }
}
const styles = StyleSheet.create({
  button: {
    height: 48,
    alignSelf: "stretch",
    borderRadius: 8,
    backgroundColor: "#ff6265",
    marginHorizontal: 30,
    justifyContent: "center",
    color: "white"
  },
  textDescription: {
    marginHorizontal: 45,
    fontSize: 15,
    color: "#4A4A4A" /*  */
  },
  viewDescription: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  headerTitle: {
    color: "black",
    alignSelf: "center",
    fontSize: 18
  },
  formInput: {
    marginHorizontal: 27,
    marginTop: 20
  },
  iconForm: {
    color: "#C4CAD6",
    alignSelf: "flex-start",
    marginTop: 12
  }
});

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

@inject("setUpProfileStore", "navigationStore")
@observer
export default class SetUpProfileView extends Component {
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
    this.props.navigationStore.currentNavigation = this.props.navigation;
  }
  _keyboardDidShow() {
    this.setState({ keyBoardDidShow: true });
  }

  _keyboardDidHide() {
    this.setState({ keyBoardDidShow: false });
  }

  render() {
    const { setUpProfileStore } = this.props;
    return (
      <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
        <Container>
          <StatusBarCustom/>
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
                      value={setUpProfileStore.fullName}
                      onChangeText={value =>
                        setUpProfileStore.fullNameOnChange(value)
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
                      value={setUpProfileStore.dateOfBirth}
                      onChangeText={value =>
                        setUpProfileStore.dateOfBirthOnChange(value)
                      }
                    ></Input>

                    <Icon
                      name="md-calendar"
                      style={styles.iconForm}
                      onPress={() => setUpProfileStore.showDateTimePicker()}
                    />
                    <DateTimePicker
                      mode="date"
                      date={new Date()}
                      isVisible={setUpProfileStore.isDateTimePickerVisible}
                      onConfirm={date =>
                        setUpProfileStore.handleDatePicked(date)
                      }
                      onCancel={() => setUpProfileStore.hideDateTimePicker()}
                    />
                  </Item>
                  <View style={{ height: 20 }}></View>
                  <Item regular style={{ borderRadius: 8 }}>
                    <Input
                      placeholder="Gender"
                      placeholderTextColor="#cccccc"
                      value={setUpProfileStore.gender}
                      onChangeText={value =>
                        setUpProfileStore.genderOnChange(value)
                      }
                    />
                    <SwitchSelector
                      initial={0}
                      style={{ width: 150 }}
                      onPress={value => setUpProfileStore.genderOnChange(value)}
                      textColor="#7a44cf"
                      selectedColor={
                        setUpProfileStore.gender != "Male" &&
                        setUpProfileStore.gender != "Female"
                          ? "#7a44cf"
                          : "white"
                      }
                      buttonColor={
                        setUpProfileStore.gender != "Male" &&
                        setUpProfileStore.gender != "Female"
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
                      value={setUpProfileStore.location}
                      onChangeText={value =>
                        setUpProfileStore.locationOnChange(value)
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
                      value={setUpProfileStore.aboutMe}
                      onChangeText={value =>
                        setUpProfileStore.aboutMeOnChange(value)
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
                    let mess = setUpProfileStore.submitProfile();
                    if (mess) Alert.alert(mess);
                    else {
                      //   this.props.navigation.navigate("Register");
                      //   mess = await setUpProfileStore.setProfileUser(
                      //     "123456789"
                      //   );
                      //   if (mess) Alert.alert(mess);
                      //   else Alert.alert("successfully");
                      this.props.navigation.navigate("Register");
                    }
                  }}
                >
                  <Text uppercase={false} style={{ fontSize: 16 }}>
                    Get Set Go
                  </Text>
                </Button>
              </View>
            )}

            <View style={{ flex: 0.5 }}>
              {/* {setUpProfileStore.isLoading && (
              <Spinner size="large" color="#0000ff" />
            )} */}
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

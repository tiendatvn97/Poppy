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
import { StyleSheet, Alert } from "react-native";
import { observer, inject } from "mobx-react";
import BackHeader from "../header/BackHeader";
import DateTimePicker from "react-native-modal-datetime-picker";
import SwitchSelector from "react-native-switch-selector";

@inject("setUpProfileStore")
@observer
export default class SetUpProfileView extends Component {
  static navigationOptions = {
    drawerLabel: () => null
  };
  render() {
    const { setUpProfileStore } = this.props;
    return (
      <Container>
        <BackHeader title="Set up Profile" parent={this} />
        <View style={{ flex: 1 }}>
          <View style={styles.viewDescription}>
            <Text style={styles.textDescription}>
              Hey! We need few details from you before you start sharing on
              Momento
            </Text>
          </View>
          <View style={{ height: 15 }} />
          <View style={{ flex: 5.1 }}>
            <Content>
              <Content>
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
                      style={{
                        color: "#C4CAD6",
                        fontSize: 25
                      }}
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
                      selectedColor={(setUpProfileStore.gender != "Male" && setUpProfileStore.gender != "Female") ? "#7a44cf": "white"}
                      buttonColor={(setUpProfileStore.gender != "Male" && setUpProfileStore.gender != "Female") ? "white": "#7a44cf"}
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
                  </Item>
                  <View style={{ height: 20 }}></View>
                  <Item regular style={{ borderRadius: 8 }}>
                    <Input
                      placeholder="About Me"
                      placeholderTextColor="#cccccc"
                      value={setUpProfileStore.aboutMe}
                      onChangeText={value =>
                        setUpProfileStore.aboutMeOnChange(value)
                      }
                    />
                  </Item>
                </Form>
              </Content>
            </Content>
          </View>

          <View
            style={{
              flex: 1,
              flexDirection: "column",
              justifyContent: "center"
            }}
          >
            <Button
              style={styles.button}
              //   onPress={async () => {
              //     // this.props.navigation.navigate("NewsFeed");

              //     let mess = setUpProfileStore.validate();
              //     if (!mess) {
              //       mess = await setUpProfileStore.register();
              //     }
              //     setUpProfileStore.isLoading = false;
              //     if (mess) {
              //       Alert.alert(mess);
              //     } else {
              //       console.log("okki");
              //       this.props.navigation.navigate("NewsFeed");
              //     }
              //   }}
            >
              <Text uppercase={false} style={{ fontSize: 16 }}>
                Get Set Go
              </Text>
            </Button>
          </View>
          <View style={{ flex: 1 }}>
            {/* {setUpProfileStore.isLoading && (
              <Spinner size="large" color="#0000ff" />
            )} */}
          </View>
        </View>
      </Container>
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
    fontSize: 13,
    color: "#4A4A4A" /*  */
  },
  viewDescription: {
    flex: 1,
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
  }
});

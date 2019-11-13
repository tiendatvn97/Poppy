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
import DatePicker from "react-native-datepicker";
import BackHeader from "../header/BackHeader";

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
                      //   value={registerStore.email}
                      //   onChangeText={value => registerStore.emailOnChange(value)}
                    />
                  </Item>
                  <View style={{ height: 20 }}></View>
                  <Item
                    regular
                    style={{
                      borderRadius: 8
                    }}
                  >
                    {/* <Input
                      placeholder="Date Of Birth"
                      placeholderTextColor="#cccccc"
                      //   value={registerStore.password}
                      //   onChangeText={value =>
                      //     registerStore.passwordOnChange(value)
                      //   }
                    ></Input> */}
                    <DatePicker
                      style={{ backgroundColor: "#ffffff" }}
                      mode="date"
                      //   date={attendCustomerStore.visitDateFrom}
                      //   onDateChange={date =>
                      //     attendCustomerStore.visitDateFromOnChange(date)
                      //   }
                      format="YYYY-MM-DD"
                      placeholder=" "
                      confirmBtnText="Confirm"
                      cancelBtnText="Cancel"
                      showIcon={false}
                      hideText = {true}
                      disabled={true}
                      ref={picker => {
                        this.datePickerFrom = picker;
                      }}
                      placeholder="test"
                    />
                    <Icon
                      name="md-calendar"
                      style={{
                        // paddingLeft: 5,
                        // paddingTop: 5,
                        color: "#C4CAD6",
                        fontSize: 25
                      }}
                      onPress={() => this.datePickerFrom.onPressDate()}
                    />
                    
                  </Item>
                  <View style={{ height: 20 }}></View>
                  <Item regular style={{ borderRadius: 8 }}>
                    <Input
                      placeholder="Gender"
                      placeholderTextColor="#cccccc"
                      //   value={registerStore.confirmPassword}
                      //   onChangeText={value =>
                      //     registerStore.confirmPasswordOnChange(value)
                      //   }
                    />
                  </Item>
                  <View style={{ height: 20 }}></View>
                  <Item regular style={{ borderRadius: 8 }}>
                    <Input
                      placeholder="Location"
                      placeholderTextColor="#cccccc"
                      //   value={registerStore.confirmPassword}
                      //   onChangeText={value =>
                      //     registerStore.confirmPasswordOnChange(value)
                      //   }
                    />
                  </Item>
                  <View style={{ height: 20 }}></View>
                  <Item regular style={{ borderRadius: 8 }}>
                    <Input
                      placeholder="About Me"
                      placeholderTextColor="#cccccc"
                      //   value={registerStore.confirmPassword}
                      //   onChangeText={value =>
                      //     registerStore.confirmPasswordOnChange(value)
                      //   }
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

              //     let mess = registerStore.validate();
              //     if (!mess) {
              //       mess = await registerStore.register();
              //     }
              //     registerStore.isLoading = false;
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
            {/* {registerStore.isLoading && (
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

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
import { StyleSheet, Alert, KeyboardAvoidingView } from "react-native";
import { observer, inject } from "mobx-react";

import BackHeader from "../header/BackHeader";
import StatusBarCustom from "../header/StatusBarCustom";

@inject("registerStore", "navigationStore", "setUpProfileStore")
@observer
export default class RegisterView extends Component {
  static navigationOptions = {
    drawerLabel: () => null
  };
  componentWillMount() {
    this.props.navigationStore.currentNavigation = this.props.navigation;
  }

  render() {
    const { registerStore, setUpProfileStore } = this.props;
    return (
      <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
        <StatusBarCustom/>
        <Container>
          <BackHeader title="Create Account" parent={this} />
          <View style={{ flex: 1 }}>
            <View style={{ flex: 4 }}>
              <Content>
                <View style={{ height: 15 }} />
                <View style={styles.viewDescription}>
                  <Text style={styles.textDescription}>
                    Fill in the required details and click Proceed. Fields
                    marked * are mandatory
                  </Text>
                </View>
                <View style={{ height: 5 }} />
                <Form style={styles.formInput}>
                  <Item regular style={{ borderRadius: 8 }}>
                    <Input
                      placeholder="Email "
                      placeholderTextColor="#cccccc"
                      value={registerStore.email}
                      onChangeText={value => registerStore.emailOnChange(value)}
                    />
                  </Item>
                  <View style={{ height: 20 }}></View>
                  <Item regular style={{ borderRadius: 8 }}>
                    <Input
                      placeholder="Password"
                      placeholderTextColor="#cccccc"
                      value={registerStore.password}
                      onChangeText={value =>
                        registerStore.passwordOnChange(value)
                      }
                    />
                  </Item>
                  <View style={{ height: 20 }}></View>
                  <Item regular style={{ borderRadius: 8 }}>
                    <Input
                      placeholder="Confirm Password"
                      placeholderTextColor="#cccccc"
                      value={registerStore.confirmPassword}
                      onChangeText={value =>
                        registerStore.confirmPasswordOnChange(value)
                      }
                    />
                  </Item>
                </Form>
                <View style={{ height: 20 }} />
                <View style={styles.viewDescription}>
                  <Text style={styles.textDescription}>
                    By Creating Account, you are automatically accepting all the{" "}
                    <Text style={{ color: "#ff6265", fontSize: 13 }}>
                      Terms & Conditions
                    </Text>{" "}
                    related to Momento
                  </Text>
                </View>
                <View style={{ height: 15 }} />
                <View
                  style={{
                    flexDirection: "column",
                    justifyContent: "center"
                  }}
                >
                  <Button
                    style={styles.button}
                    onPress={async () => {
                      // this.props.navigation.navigate("NewsFeed");

                      let mess = registerStore.validate();
                      if (!mess) {
                        mess = await registerStore.register();
                      }
                      registerStore.isLoading = false;
                      if (mess) {
                        Alert.alert(mess);
                      } else {
                        const test = Firebase.auth.currentUser;
                        mess = await setUpProfileStore.setProfileUser(test.uid);
                        if (mess) Alert.alert(mess);
                        else {
                          // Alert.alert("successfully");
                          console.log("successfully");
                          this.props.navigation.navigate("NewsFeed");
                        }
                      }
                    }}
                  >
                    <Text uppercase={false} style={{ fontSize: 16 }}>
                      Proceed
                    </Text>
                  </Button>
                </View>
                <View
                  style={{ justifyContent: "center", alignItems: "center" }}
                >
                  {registerStore.isLoading && (
                    <Spinner size="large" color="#0000ff" />
                  )}
                </View>
              </Content>
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
    fontSize: 13,
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
  }
});

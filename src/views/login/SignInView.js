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
  Row,
  Grid,
  Form,
  Item,
  Spinner
} from "native-base";
import BackHeader from "../header/BackHeader";
import { StyleSheet, Alert, KeyboardAvoidingView } from "react-native";

import Firebase from "../../firebase/Firebase";
import { observer, inject } from "mobx-react";

@inject("signInStore", "userStore")
@observer
export default class SignInView extends Component {
  static navigationOptions = {
    drawerLabel: () => null
  };

  constructor(props) {
    super(props);
    this.signIn = this.signIn.bind(this);
  }

  signIn = async () => {
    let mess = await this.props.signInStore.SignIn();
    if (mess) {
      Alert.alert(mess);
    } else {
      try {
        this.props.navigation.navigate("drawer");
      } catch (e) {
        console.log(`error:${e}`);
      }
    }
  };
  render() {
    const { signInStore } = this.props;
    return (
      <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
        <Container>
          <BackHeader title="Sign In" parent={this} />
          <View style={{ flex: 1 }}>
            <View style={styles.viewForm}>
              <Content>
                <View style={styles.viewDescription}>
                  <View style={{ height: 20 }}></View>
                  <Text style={styles.textDescription}>
                    Type in your Email ID and Password you chose for Momento and
                    click Go to Feed
                  </Text>
                  <View style={{ height: 20 }}></View>
                </View>
                <Form
                  style={{
                    marginHorizontal: 27,
                    marginTop: 20
                  }}
                >
                  <Item
                    regular
                    style={{
                      borderRadius: 8,
                      borderWidth: 0.5,
                      borderColor: "gray"
                    }}
                  >
                    <Input
                      placeholder="Email"
                      placeholderTextColor="#cccccc"
                      value={signInStore.email}
                      onChangeText={value => signInStore.emailOnChange(value)}
                    />
                  </Item>
                  <View style={{ height: 30 }}></View>
                  <Item regular style={{ borderRadius: 8 }}>
                    <Input
                      placeholder="Password"
                      placeholderTextColor="#cccccc"
                      value={signInStore.password}
                      onChangeText={value =>
                        signInStore.passwordOnChange(value)
                      }
                    />
                  </Item>
                </Form>
                <View>
                  <View style={{ height: 30 }}></View>
                  <Button style={styles.button} onPress={this.signIn}>
                    <Text uppercase={false} style={{ fontSize: 16 }}>
                      Go to Feed
                    </Text>
                  </Button>
                  <View style={{ height: 20 }} />
                  <Button
                    transparent
                    style={{ alignSelf: "center" }}
                    onPress={() => {
                      Alert.alert("ok");
                    }}
                  >
                    <Text uppercase={false} style={styles.textNewAcount}>
                      Can’t Sign In? Reset Password
                    </Text>
                  </Button>
                  <View style={{ height: 20 }}></View>
                  <View
                    style={{
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                  >
                    {signInStore.isLoading && <Spinner />}
                  </View>
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
    color: "#4A4A4A"
  },
  viewDescription: {
    flexDirection: "column",
    justifyContent: "center"
  },
  textNewAcount: {
    textAlign: "center",
    color: "#ff6265",
    alignSelf: "center"
  },
  viewForm: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center"
  }
});

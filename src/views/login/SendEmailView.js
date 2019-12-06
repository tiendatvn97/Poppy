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

import { StyleSheet, Alert, KeyboardAvoidingView } from "react-native";

import Firebase from "../../firebase/Firebase";
import { observer, inject } from "mobx-react";

import BackHeader from "../header/BackHeader";
import StatusBarCustom from "../header/StatusBarCustom";

@observer
export default class SendEmailView extends Component {
  static navigationOptions = {
    drawerLabel: () => null
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { navigation } = this.props;
    return (
      <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
        <StatusBarCustom />
        <Container>
          <BackHeader title="Reset Password" parent={this} />
          <View style={{ flex: 1 }}>
            <View style={styles.viewForm}>
              <Content>
                <View style={styles.viewDescription}>
                  <View style={{ height: 40 }}></View>
                  <Text style={styles.textDescription}>
                    No Problem! Just give in your Email ID and we will send you
                    a link to reset your password
                  </Text>
                  <View style={{ height: 20 }}></View>
                </View>
                <Form
                  style={{
                    marginHorizontal: 27,
                    marginTop: 20
                  }}
                >
                  <View style={{ height: 30 }}></View>
                  <Item regular style={{ borderRadius: 8 }}>
                    <Input
                      placeholder="Email"
                      placeholderTextColor="#cccccc"
                    />
                  </Item>
                </Form>
                <View>
                  <View style={{ height: 50 }}></View>
                  <Button
                    style={styles.button}
                    onPress={() => {
                      navigation.navigate("CreateNewPassword");
                    }}
                  >
                    <Text uppercase={false} style={{ fontSize: 16 }}>
                      Send Email
                    </Text>
                  </Button>
                  <View style={{ height: 20 }} />

                  <View style={{ height: 20 }}></View>
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
    fontSize: 15,
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

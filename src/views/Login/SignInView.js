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
  Item
} from "native-base";
import { StyleSheet, Alert } from "react-native";
export default class SignInView extends Component {
  render() {
    return (
      <Container>
        <Header transparent>
          <Left style={{ flex: 1 }}>
            <Button transparent>
              <Icon name="arrow-back" style={{ color: "black" }} />
            </Button>
          </Left>
          <Body>
            <Title
              style={{ color: "black", alignSelf: "center", fontSize: 18 }}
            >
              Sign in
            </Title>
          </Body>
          <Right style={{ flex: 1 }} />
        </Header>
        <View style={{ flex: 1}}>
          <View style={styles.viewDescription}>
            <Text style={styles.textDescription}>
              Type in your Email ID and Password you chose for Momento and click
              Go to Feed
            </Text>
          </View>
          <View style={styles.viewForm}>
            <Content>
              <Form
                style={{
                  marginHorizontal: 15,
                  marginTop: 20
                }}
              >
                <Item regular style={{ borderRadius: 8 }}>
                  <Input
                    placeholder="Email Id"
                    placeholderTextColor="#cccccc"
                  />
                </Item>
                <View style={{ height: 30 }}></View>
                <Item regular style={{ borderRadius: 8 }}>
                  <Input
                    placeholder="Password"
                    placeholderTextColor="#cccccc"
                  />
                </Item>
              </Form>
            </Content>
          </View>
          <View style={{ flex: 1.4 }}>
            <View style={{ flex: 1 }}>
              <View style={{ flex: 1 }} />
              <Button style={styles.button}>
                <Text uppercase={false} style={{ fontSize: 16 }}>
                  Sign In
                </Text>
              </Button>
              <View style={{ flex: 1 }} />
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
              <View style={{ flex: 1 }} />
            </View>
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
    marginHorizontal: 18,
    justifyContent: "center",
    color: "white"
  },
  textDescription: {
    marginHorizontal: 45,
    fontSize: 13
  },
  viewDescription: {
    flex: 1,
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

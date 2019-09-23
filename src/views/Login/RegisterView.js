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
  Item
} from "native-base";
import { StyleSheet, Alert } from "react-native";
export default class RegisterView extends Component {
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
            <Title style={styles.headerTitle}>Create Account</Title>
          </Body>
          <Right style={{ flex: 1 }} />
        </Header>
        <View style={{ flex: 1 }}>
          <View style={styles.viewDescription}>
            <Text style={styles.textDescription}>
              Fill in the required details and click Proceed. Fields marked *
              are mandatory
            </Text>
          </View>
          <View style={{ height: 35 }} />
          <View style={{ flex: 4 }}>
            <Content>
              <Content>
                <Form style={styles.formInput}>
                  <Item regular style={{ borderRadius: 8 }}>
                    <Input
                      placeholder="Email Id"
                      placeholderTextColor="#cccccc"
                    />
                  </Item>
                  <View style={{ height: 20 }}></View>
                  <Item regular style={{ borderRadius: 8 }}>
                    <Input
                      placeholder="Password"
                      placeholderTextColor="#cccccc"
                    />
                  </Item>
                  <View style={{ height: 20 }}></View>
                  <Item regular style={{ borderRadius: 8 }}>
                    <Input
                      placeholder="Confirm Password"
                      placeholderTextColor="#cccccc"
                    />
                  </Item>
                </Form>
              </Content>
            </Content>
          </View>
          <View style={styles.viewDescription}>
            <Text style={styles.textDescription}>
              By Creating Account, you are automatically accepting all the{" "}
              <Text style={{ color: "#ff6265", fontSize: 13 }}>
                Terms & Conditions
              </Text>{" "}
              related to Momento
            </Text>
          </View>
          <View
            style={{
              flex: 2,
              flexDirection: "column",
              justifyContent: "center"
            }}
          >
            <Button style={styles.button}>
              <Text uppercase={false} style={{ fontSize: 16 }}>
                Proceed
              </Text>
            </Button>
          </View>
          <View style={{ flex: 1.5 }}></View>
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
    justifyContent: "center",
    alignItems: "center"
  },
  headerTitle: {
    color: "black",
    alignSelf: "center",
    fontSize: 18
  },
  formInput: {
    marginHorizontal: 15,
    marginTop: 20
  }
});

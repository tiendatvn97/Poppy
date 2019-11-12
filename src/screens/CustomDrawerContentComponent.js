import React from "react";
import {
  View,
  Container,
  Text,
  Header,
  Content,
  // Icon,
  Body,
  Left,
  Right
} from "native-base";
import { StyleSheet, StatusBar, Image } from "react-native";
import { DrawerNavigatorItems } from "react-navigation-drawer";

const CustomDrawerContentComponent = props => (
  <Container>
    <Header style={styles.headerContainer}>
      <Left>
        <Image
          style={styles.headerImage}
          source={require("../icons/avatar.jpg")}
        ></Image>
      </Left>
      <Body>
        <Text>William Franklin</Text>
        <Text style={styles.textNote}>M, 27, Atlanta, GA</Text>
      </Body>
    </Header>
    <Content>
      <DrawerNavigatorItems {...props} />
    </Content>
  </Container>
);

const styles = StyleSheet.create({
  headerContainer: {
    height: 120,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    marginTop: StatusBar.currentHeight
  },
  headerImage: {
    backgroundColor: "green",

    width: 60,
    height: 60,
    borderRadius: 35
  },
  textNote: {
    fontSize: 10,
    color: "gray"
  }
});

export default CustomDrawerContentComponent;

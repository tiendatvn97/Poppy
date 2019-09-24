import React from "react";
import { ScrollView, SafeAreaView, Image } from "react-native";
import MainScreen from "./MainScreen";
import SecondScreen from "./SecondScreen";
import { StyleSheet, StatusBar } from "react-native";
import {
  createDrawerNavigator,
  DrawerNavigatorItems
} from "react-navigation-drawer";
import { createAppContainer } from "react-navigation";

import {
  View,
  Container,
  Text,
  Header,
  Content,
  // Icon,
  Body,
  Left
} from "native-base";

const CustomDrawerContentComponent = props => (
  <Container>
    <Header style={styles.headerContainer}>
      <Body style={{ alignItems: "center" }}>
        <Image
          style={styles.headerImage}
          source={require("../icons/avatar.jpg")}
        ></Image>
      </Body>
    </Header>
    <Content>
      <DrawerNavigatorItems {...props} />
    </Content>
  </Container>
);

let routeConfigs = {
  Main: { screen: MainScreen },
  Second: { screen: SecondScreen }
};
let drawerNavigationConfig = {
  initialRouteName: "Main",
  contentComponent: CustomDrawerContentComponent,
  contentOptions: {
    // activeTintColor: "orange".
    // drawerWidth: 150,
    // drawerPosition: "left",
  },
  // order:[Home, Setting]
  drawerPosition: "left"
  // order: ["Setting", "Home"]
};
const drawerNavigator = createDrawerNavigator(
  routeConfigs,
  drawerNavigationConfig
);
export default createAppContainer(drawerNavigator);
const styles = StyleSheet.create({
  headerContainer: {
    height: 200,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    marginTop: StatusBar.currentHeight
  },
  headerImage: {
    width: 150,
    height: 150,
    borderRadius: 75
  }
});

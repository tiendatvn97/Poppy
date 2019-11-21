import React, { Component } from "react";
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
import { observer, inject } from "mobx-react";
import Firebase from "../firebase/Firebase";


@inject("signInStore","navigationStore")
@observer
class CustomDrawerContentComponent extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Container>
        <Header style={styles.headerContainer}>
          <Left>
            <Image
              style={styles.headerImage}
              source={require("../icons/avatar.jpg")}
            ></Image>
          </Left>
          <Body>
            <Text>{Firebase.userInfo.name}</Text>
            <Text style={styles.textNote}>M, 27, Atlanta, GA</Text>
          </Body>
        </Header>
        <Content>
          <DrawerNavigatorItems
            {...this.props}
            onItemPress={async ({ route, focused }) => {
              await this.props.navigationStore.reset(route.routes[0].routeName);
              console.log(`route: ${JSON.stringify(route)}`);
              if (route.key === "SignOut") {
                console.log(`test ${JSON.stringify(this.props.navigation)}`);
                // this.props.navigation.dispatch(resetAction());
                await this.props.signInStore.SignOut();
              }
              this.props.onItemPress({ route, focused });
            }}
          />
        </Content>
      </Container>
    );
  }
}
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

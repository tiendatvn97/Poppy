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
import { StackActions, NavigationActions } from "react-navigation";

@inject("signInStore", "navigationStore", "userStore")
@observer
class CustomDrawerContentComponent extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { userStore } = this.props;
    return (
      <Container>
        <Header style={styles.headerContainer}>
          <Left>
            <Image
              style={styles.headerImage}
              source={{ uri: userStore.avatarImage }}
            ></Image>
          </Left>
          <Body>
            <Text>{userStore.profile.fullName}</Text>
            <Text style={styles.textNote}>{userStore.email}</Text>
          </Body>
        </Header>
        <Content>
          <DrawerNavigatorItems
            {...this.props}
            onItemPress={async ({ route, focused }) => {
              if (route.key === "SignOut") {
                await this.props.signInStore.SignOut();
                this.props.navigation.navigate("Login");
              } else {
                this.props.navigation.navigate(route.routeName);
                this.props.navigation.dispatch(
                  StackActions.reset({
                    index: 0,
                    key: null,
                    actions: [
                      NavigationActions.navigate({
                        routeName: route.routes[0].routeName
                      })
                    ]
                  })
                );
              }
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
    fontSize: 14,
    color: "gray"
  }
});

export default CustomDrawerContentComponent;

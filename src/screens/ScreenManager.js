import LoginView from "../views/login/LoginView";
import React from "react";

import CustomDrawerContentComponent from "./CustomDrawerContentComponent";

import { createDrawerNavigator } from "react-navigation-drawer";
import { createAppContainer } from "react-navigation";

import { Icon } from "native-base";

import {
  LoginStack,
  ChatStack,
  NewFeedStack,
  ProfileStack
} from "./StackNavigators";

import {
  StackActions,
  NavigationActions,
  createSwitchNavigator
} from "react-navigation";

export const resetAction = StackActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({ routeName: "Login" })]
});

let drawerNavigationConfig = {
  initialRouteName: "NewFeed",
  contentComponent: CustomDrawerContentComponent,
  contentOptions: {
    activeTintColor: "orange",
    drawerWidth: 150,
    drawerPosition: "left",
    labelStyle: {
      color: "gray"
    }
  },
  order: ["NewFeed", "Chat", "Profile", "SignOut"],
  drawerPosition: "left"
};

routeConfigs = {
  Chat: {
    screen: ChatStack,
    navigationOptions: {
      drawerLabel: "Chats",
      drawerIcon: ({ tintColor }) => (
        <Icon name="rocketchat" type="FontAwesome5" style={{ fontSize: 20 }} />
      )
    }
  },
  Profile: {
    screen: ProfileStack,
    navigationOptions: {
      drawerLabel: "My Profile",
      drawerIcon: ({ tintColor }) => (
        <Icon name="profile" type="AntDesign" style={{ fontSize: 20 }} />
      )
    }
  },
  SignOut: {
    screen: ProfileStack,
    navigationOptions: {
      drawerLabel: "Signout",
      drawerIcon: ({ tintColor }) => (
        <Icon name="logout" type="SimpleLineIcons" style={{ fontSize: 20 }} />
      )
    }
  },
  NewFeed: {
    screen: NewFeedStack,
    navigationOptions: {
      drawerLabel: "Home",
      drawerIcon: () => (
        <Icon name="home" type="AntDesign" style={{ fontSize: 20 }} />
      )
    }
  }
};
const drawerNavigator = createDrawerNavigator(
  routeConfigs,
  drawerNavigationConfig
);
const test = createSwitchNavigator(
  {
    Login: {
      screen: LoginStack
    },
    drawer: drawerNavigator
  },
  { initialRouteName: "Login" }
);

export default createAppContainer(test);

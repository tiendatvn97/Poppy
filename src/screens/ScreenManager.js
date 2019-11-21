import LoginView from "../views/login/LoginView";
import React from "react";

import CustomDrawerContentComponent from "./CustomDrawerContentComponent";

import { createDrawerNavigator } from "react-navigation-drawer";
import { createAppContainer } from "react-navigation";

import { Icon } from "native-base";
import {LoginStack, ChatStack, NewFeedStack, ProfileStack } from "./StackNavigators"


import { StackActions, NavigationActions } from 'react-navigation';

export const resetAction = StackActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({ routeName: 'Login' })],
});

let drawerNavigationConfig = {
  initialRouteName: "Login",
  contentComponent: CustomDrawerContentComponent,
  contentOptions: {
    activeTintColor: "orange",
    drawerWidth: 150,
    drawerPosition: "left",
    labelStyle: {
      color: "gray"
    }
  },
  order: ["NewFeed", "Login", "Chat", "Profile", "SignOut"],
  drawerPosition: "left"
};


routeConfigs = {
  Login: {
    screen: LoginStack,
    navigationOptions: {
      drawerLabel: () => null
    }
  },
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
  SignOut: LoginView,
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
const drawerNavigator = createDrawerNavigator(routeConfigs, drawerNavigationConfig);

export default createAppContainer(drawerNavigator);

// const LoginStack = createStackNavigator({
//   Login: LoginView,
//   Register: RegisterView,
//   SignIn: SignInView,
//   CreatePost: CreatePostView,
//   NewsFeed: NewsFeedView,
//   PostDetail: PostDetailView,
//   MyProfile: MyProfileView,
//   RecentChats: RecentChatsView,
//   SetUpProfile: SetUpProfileView,
//   Chat: ChatsView
// },{
//   initialRouteName: "Drawer"
// })
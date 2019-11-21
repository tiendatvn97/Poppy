import LoginView from "../views/login/LoginView";
import RegisterView from "../views/login/RegisterView";
import SignInView from "../views/login/SignInView";
import CreatePostView from "../views/feed/CreatePostView";
import NewsFeedView from "../views/feed/NewsFeedView";
import PostDetailView from "../views/feed/PostDetailView";
import MyProfileView from "../views/profile/MyProfileView";
import SetUpProfileView from "../views/profile/SetUpProfileView";
import RecentChatsView from "../views/chat/RecentChatsView";
import ChatsView from "../views/chat/ChatView";
import ContactView from "../views/InteractPeople/ContactView";

import { createStackNavigator } from "react-navigation-stack";
export const LoginStack = createStackNavigator(
    {
      Login: {
        navigationOptions: { header: null },
        screen: LoginView
      },
      Register: {
        navigationOptions: { header: null },
        screen: RegisterView
      },
      SignIn: {
        navigationOptions: { header: null },
        screen: SignInView
      },
      SetUpProfile: {
        navigationOptions: { header: null },
        screen: SetUpProfileView
      }
    },
    {
      initialRouteName: "Login"
    }
  );
  
  export const ProfileStack = createStackNavigator(
    {
      MyProfile: {
        navigationOptions: { header: null },
        screen: MyProfileView
      }
    },
    {
      MyProfile: "Drawer"
    }
  );
export const NewFeedStack = createStackNavigator(
    {
      CreatePost: {
        navigationOptions: { header: null },
        screen: CreatePostView
      },
      NewsFeed: {
        navigationOptions: { header: null },
        screen: NewsFeedView
      },
      PostDetail: {
        navigationOptions: { header: null },
        screen: PostDetailView
      },
      MyProfile: {
        navigationOptions: { header: null },
        screen: MyProfileView
      }
    },
    {
      initialRouteName: "NewsFeed"
    }
  );
  export const ChatStack = createStackNavigator(
    {
      RecentChats: {
        navigationOptions: { header: null },
        screen: RecentChatsView
      },
      Chat: {
        navigationOptions: { header: null },
        screen: ChatsView,
        
      },
      Contact: {
        navigationOptions: { header: null },
        screen: ContactView,
      }
    },
    {
      initialRouteName: "RecentChats"
    }
  );
import LoginView from "../views/login/LoginView";
import RegisterView from "../views/login/RegisterView";
import SignInView from "../views/login/SignInView";
import CreatePostView from "../views/feed/CreatePostView";
import NewsFeedView from "../views/feed/NewsFeedView";
import PostDetailView from "../views/feed/PostDetailView";
import MyProfileView from "../views/profile/MyProfileView";
import SetUpProfileView from "../views/profile/SetUpProfileView";
import RecentChatsView from "../views/chat/RecentChatsView";

import CustomDrawerContentComponent from "./CustomDrawerContentComponent";

import { createDrawerNavigator } from "react-navigation-drawer";
import { createAppContainer } from "react-navigation";

let routeConfigs = {
  Login: LoginView,
  Register: RegisterView,
  SignIn: SignInView,
  CreatePost: CreatePostView,
  NewsFeed: NewsFeedView,
  PostDetail: PostDetailView,
  MyProfile: MyProfileView,
  RecentChats: RecentChatsView,
  SetUpProfile: SetUpProfileView
};
let drawerNavigationConfig = {
  initialRouteName: "SetUpProfile",
  contentComponent: CustomDrawerContentComponent,
  contentOptions: {
    activeTintColor: "orange",
    drawerWidth: 150,
    drawerPosition: "left",
    labelStyle: {
      color: "gray"
    }
  },
  order: [
    "NewsFeed",
    "MyProfile",
    "RecentChats",
    "Login",
    "SignIn",
    "Register",
    "PostDetail",
    "CreatePost",
    "SetUpProfile"
  ],
  drawerPosition: "left"
  // order: [Login, Register]
};

const drawerNavigator = createDrawerNavigator(
  routeConfigs,
  drawerNavigationConfig
);

export default createAppContainer(drawerNavigator);

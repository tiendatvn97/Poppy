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
import SearchUserView from "../views/search/SearchUserView";
import ThirdProfileView from "../views/profile/ThirdProfileView";

import { createStackNavigator } from "react-navigation-stack";
export const LoginStack = createStackNavigator(
  {
    Login: LoginView,
    Register: RegisterView,
    SignIn: SignInView,
    SetUpProfile: SetUpProfileView
  },
  {
    initialRouteName: "Login",
    headerMode: "none"
  }
);

export const ProfileStack = createStackNavigator(
  {
    MyProfile: MyProfileView,
    ThirdProfile: ThirdProfileView
  },
  { initialRouteName: "ThirdProfile", headerMode: "none" }
);
export const NewFeedStack = createStackNavigator(
  {
    CreatePost: CreatePostView,
    NewsFeed: NewsFeedView,
    PostDetail: PostDetailView,
    MyProfile: MyProfileView,
    SearchUser: SearchUserView
  },

  {
    initialRouteName: "NewsFeed",
    headerMode: "none"
  }
);
export const ChatStack = createStackNavigator(
  {
    RecentChats: RecentChatsView,
    Chat: ChatsView,
    Contact: ContactView
  },
  {
    initialRouteName: "RecentChats",
    headerMode: "none"
  }
);

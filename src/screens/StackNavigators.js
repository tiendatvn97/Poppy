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
import ConfirmCodeFromEmailView from "../views/login/ConfirmCodeFromEmailView";
import CreateNewPasswordView from "../views/login/CreateNewPasswordView";
import SendEmailView from "../views/login/SendEmailView";
import EditProfileView from "../views/profile/EditProfileView";

import { createStackNavigator } from "react-navigation-stack";
export const LoginStack = createStackNavigator(
  {
    Login: LoginView,
    Register: RegisterView,
    SignIn: SignInView,
    SetUpProfile: SetUpProfileView,
    ConfirmCodeFromEmail: ConfirmCodeFromEmailView,
    CreateNewPassword: CreateNewPasswordView,
    SendEmail: SendEmailView
  },
  {
    initialRouteName: "Login",
    headerMode: "none"
  }
);

export const ProfileStack = createStackNavigator(
  {
    MyProfile: MyProfileView,
    ThirdProfile: ThirdProfileView,
    EditProfile: EditProfileView
  },
  { initialRouteName: "MyProfile", headerMode: "none" }
);
export const NewFeedStack = createStackNavigator(
  {
    CreatePost: CreatePostView,
    NewsFeed: NewsFeedView,
    PostDetail: PostDetailView,
    MyProfile: MyProfileView,
    SearchUser: SearchUserView,
    ThirdProfile: ThirdProfileView,
    ChatFromFeed: ChatsView,
   
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

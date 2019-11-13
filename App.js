import React from "react";
import { StyleSheet, Text, View } from "react-native";
import ScreenManager from "./src/screens/ScreenManager";
import { Provider } from "mobx-react/native";
import config from "./src/mobx";
import LoginView from "./src/views/login/LoginView";
// import NewsFeedCardComponent from "./src/views/feed/NewsFeedView/NewsFeedCardComponent"
// import NewsFeedView from "./src/views/feed/NewsFeedView/NewsFeedView"
// import PostDetailView from "./src/views/feed/PostDetailView"

import * as Font from "expo-font";
import { AppLoading } from "expo";
import Firebase from "./src/firebase/Firebase";


// import LoginView from "./src/views/login/LoginView";
// import MyProfileView  from "./src/views/profile/MyProfileView";
// import CreatePostView  from "./src/views/feed/CreatePostView";
// import RecentChatsView  from "./src/views/chat/RecentChatsView";
// import SingInView from "./src/views/Login/SignInView";
// import RegisterView from "./src/views/Login/RegisterView";
// import NewsFeedView from "./src/views/Feed/NewsFeedView";

// export default function App() {
//   const stores = config();
//   return (
// <Provider {...stores}>
//   <ScreenManager/>
// </Provider>
//   );
// }
const stores = config();

export default class App extends React.Component {
  state = {
    loading: true,
    authStatusReported: false,
    isUserAuthenticated: false
  };

  constructor(props) {
    console.disableYellowBox = true;
    super(props);
  }

  componentWillMount() {
    Firebase.init();
    this.loadStaticResources();
    Firebase.auth.onAuthStateChanged(user => {
      // console.log(`ok${JSON.stringify(user)}`)
      this.setState({
        authStatusReported: true,
        isUserAuthenticated: !!user
      });
    });
  }

  async loadStaticResources() {
    try {
      await Font.loadAsync({
        Roboto: require("./resources/Roboto.ttf"),
        Roboto_medium: require("./resources/Roboto_medium.ttf"),
        Ionicons: require("./resources/Ionicons.ttf")
      });
      this.setState({ loading: false });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const { loading, authStatusReported, isUserAuthenticated } = this.state;
    if (loading || !authStatusReported) {
      return <AppLoading />;
    }
    return (
      <Provider {...stores}>
        <ScreenManager />
      </Provider>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});

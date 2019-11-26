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

import { Notifications } from "expo";
import * as Permissions from "expo-permissions";

const PUSH_ENDPOINT = "https://your-server.com/users/push-token";

const stores = config();
let currentUser="";

export default class App extends React.Component {
  registerForPushNotificationsAsync = async () => {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;

    // only ask if permissions have not already been determined, because
    // iOS won't necessarily prompt the user a second time.
    if (existingStatus !== "granted") {
      // Android remote notification permissions are granted during the app
      // install, so this will only ask on iOS
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }

    // Stop here if the user did not grant permissions
    if (finalStatus !== "granted") {
      return;
    }

    // Get the token that uniquely identifies this device
    let token = await Notifications.getExpoPushTokenAsync();

    // POST the token to your backend server from where you can retrieve it to send push notifications.
    // return fetch(PUSH_ENDPOINT, {
    //   method: "POST",
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json"
    //   },
    //   body: JSON.stringify({
    //     token: {
    //       value: token
    //     },
    //     user: {
    //       username: "Brent"
    //     }
    //   })
    // });

    try {
      // console.log(`test current ${JSON.stringify(currentUser)}`)
      Firebase.database.ref('users/'+currentUser.uid+'/push_token').set(token);
    } catch (error) {
      console.log(error)
    }
  };

  state = {
    loading: true,
    authStatusReported: false,
    isUserAuthenticated: false
  };

  constructor(props) {
    console.disableYellowBox = true;
    super(props);
  }

  async componentWillMount() {
    Firebase.init();
    this.loadStaticResources();
    Firebase.auth.onAuthStateChanged(user => {
      if (user) {
        currentUser = Firebase.auth.currentUser
        this.registerForPushNotificationsAsync();
      }
      this.setState({
        authStatusReported: true,
        isUserAuthenticated: !!user
      });
    });
  }
  async componentDidMount() {
   
    
    // await this.registerForPushNotificationsAsync();
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

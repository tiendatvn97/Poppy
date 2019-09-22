import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ScreenManager from "./src/screens/ScreenManager"
import { Provider } from "mobx-react/native";
import config from "./src/mobx"

import * as Font from 'expo-font'
import { AppLoading } from 'expo';

import LoginView from "./src/views/Login/LoginView"

// export default function App() {
//   const stores = config();
//   return (
//     <Provider {...stores}>
//       <ScreenManager/>
//     </Provider>
//   );
// }

export default class App extends React.Component {
  constructor(props) {
    console.disableYellowBox = true;
    super(props);
    this.state = { loading: true };
  }
  async componentWillMount() {
    await Font.loadAsync({
      Roboto: require("./resources/Roboto.ttf"),
      Roboto_medium: require("./resources/Roboto_medium.ttf"),
      Ionicons: require("./resources/Ionicons.ttf"),
    });
    this.setState({ loading: false });
  }

  render(){
    if (this.state.loading) {
      return <AppLoading/>
    }
    return(
      <LoginView/>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

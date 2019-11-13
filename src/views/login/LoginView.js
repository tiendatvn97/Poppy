import React, { Component } from "react";
import { Button, Icon } from "native-base";
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
  View,
  Text,
} from "react-native";
export default class LoginView extends Component {
  static navigationOptions = {
    drawerLabel: "Sign Out",
    drawerIcon: ({ tintColor }) => (
      <Icon name="logout" type="SimpleLineIcons" style={{ fontSize: 20 }} />
    )
  };
  render() {
    return (
      <View style={{ flex: 1, flexDirection: "column" }}>
        <View style={{ height: 100 }} />
        <View style={{ justifyContent: "center", flexDirection: "row" }}>
          <Image source={require("../icons/logo.png")} style={styles.image} />
        </View>
        <View>
          <Text style={styles.textNameApp}>Poppy App</Text>
          <Text style={styles.textDescription}>
            Poppy is a social app that lets you share your moments with friends
          </Text>
        </View>

        <View style={{ flex: 1 }}>
          <View style={{ flex: 1 }} />
          <Button 
            style={styles.button}
            onPress={() => this.props.navigation.navigate("SignIn")}
          >
            <Text uppercase={false}>Sign In</Text>
          </Button>
          <View style={{ flex: 1 }} />
          <Button
            transparent
            style={{ alignSelf: "center" }}
            onPress={() => {
              this.props.navigation.navigate("Register")
            }}
          >
            <Text style={styles.textNewAcount}>Create New Account</Text>
          </Button>
          <View style={{ flex: 1 }} />
          <Text style={{ textAlign: "center", fontSize: 10 }}>
            © 2019 PoppyApp Inc
          </Text>
          <View style={{ height: 10 }} />
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  button: {
    height: 48,
    alignSelf: "stretch",
    borderRadius: 8,
    backgroundColor: "#ff6265",
    marginHorizontal: 30,
    justifyContent: "center",
    color: "white"
  },
  textDescription: {
    marginHorizontal: 40,
    textAlign: "center",
    fontSize: 12
  },
  textNameApp: {
    fontSize: 40,
    fontWeight: "bold",
    textAlign: "center",
    color: "#ff6265",
    marginVertical: 12
  },
  image: {
    width: 70,
    height: 70,
    alignItems: "center"
  },
  textNewAcount: {
    textAlign: "center",
    color: "#ff6265",
    alignSelf: "center"
  }
});

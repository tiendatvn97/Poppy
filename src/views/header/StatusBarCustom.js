import React, { Component } from "react";
import { StatusBar, View } from "react-native";

export default class StatusBarCustom extends Component {
  render() {
    return (
      <View
        style={{
          backgroundColor: "#999999",
          height: StatusBar.currentHeight
        }}
      >
        <StatusBar
          barStyle="light-content"
          hidden={false}
          translucent={false}
          networkActivityIndicatorVisible={true}
        />
      </View>
    );
  }
}

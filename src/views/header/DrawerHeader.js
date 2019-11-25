import React, { Component } from "react";
import {
  Container,
  Content,
  Text,
  Button,
  Title,
  Icon,
  Header,
  Left,
  Body,
  Right
} from "native-base";
import { Constants } from "expo";

export default class DrawerHeader extends Component {
  render() {
    const { title } = this.props;
    return (
      <Header
        style={{
          paddingTop: Constants.statusBarHeight / 2,
          backgroundColor: "white"
        }}
      >
        <Left style={{ flex: 1 }}>
          <Icon
            name="ios-menu"
            style={{}}
            onPress={() => {
              this.props.parent.props.navigation.openDrawer();
            }}
          ></Icon>
        </Left>
        <Body style={{ alignItems: "center", flex: 5 }}>
          <Text>{title}</Text>
        </Body>
        <Right style={{ flex: 1 }}>
          <Icon
            name={this.props.nameIcon}
            type={this.props.typeIcon}
            style={{ color: "black", fontSize: 20 }}
            onPress={() => {
              // this.props.parent.props.navigation.openDrawer();
              if (title == "Recent Chats") {
                this.props.parent.props.navigation.navigate("Contact");
              }
            }}
          ></Icon>
        </Right>
      </Header>
    );
  }
}

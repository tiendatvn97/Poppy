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
          backgroundColor: "white"
        }}
      >
        <Left style={{ flex: 1 }}>
          <Icon
            name={this.props.nameLeftIcon}
            type={this.props.typeLeftIcon}
            onPress={() => {
              if (this.props.nameLeftIcon === "ios-menu")
                this.props.parent.props.navigation.openDrawer();
              if (this.props.nameLeftIcon === "ios-arrow-back")
                this.props.parent.props.navigation.goBack();
            }}
          ></Icon>
        </Left>
        <Body style={{ alignItems: "center", flex: 5 }}>
          <Text>{title}</Text>
        </Body>
        <Right style={{ flex: 1 }}>
          <Icon
            name={this.props.nameRightIcon}
            type={this.props.typeRightIcon}
            style={{ color: "black", fontSize: 20 }}
            onPress={() => {
              // this.props.parent.props.navigation.openDrawer();
              if (title == "Recent Chats") {
                this.props.parent.props.navigation.navigate("Contact");
              }
              if (this.props.nameRightIcon === "search1") {
                this.props.parent.props.navigation.navigate("SearchUser");
              }
              if (this.props.nameRightIcon == "edit") {
                this.props.parent.props.navigation.navigate("EditProfile");
              }
            }}
          ></Icon>
        </Right>
      </Header>
    );
  }
}

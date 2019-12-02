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

export default class FullBackHeader extends Component {
  render() {
    const { title, nameRightIcon, typeRightIcon } = this.props;
    return (
      <Header
        style={{
          marginTop: Constants.statusBarHeight,
          backgroundColor: "white"
        }}
      >
        <Left style={{ flex: 1 }}>
          <Icon
            name="ios-arrow-back"
            type="Ionicons"
            style={{}}
            onPress={() => {
              this.props.parent.props.navigation.goBack();
            }}
          ></Icon>
        </Left>
        <Body style={{ alignItems: "center", flex: 5 }}>
          <Text>{title}</Text>
        </Body>
        <Right style={{ flex: 1 }}>
          <Icon
            name={nameRightIcon}
            type={typeRightIcon}
            style={{ color: "black", fontSize: 20 }}
            onPress={() => {
              this.props.parent.props.navigation.openDrawer();
            }}
          ></Icon>
        </Right>
      </Header>
    );
  }
}

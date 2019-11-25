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

export default class BackHeader extends Component {
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
          <Button
            transparent
            onPress={() => this.props.parent.props.navigation.goBack()}
          >
            <Icon name="arrow-back" style={{ color: "black" }} />
          </Button>
        </Left>
        <Body>
          <Title style={{ color: "black", alignSelf: "center", fontSize: 18 }}>
            {title}
          </Title>
        </Body>
        <Right style={{ flex: 1 }} />
      </Header>
    );
  }
}

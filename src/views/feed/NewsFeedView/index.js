import React, { Component } from "react";
import NewsFeedCardComponent from "./NewsFeedCardComponent";
import {
  Container,
  Header,
  Left,
  Body,
  Right,
  Button,
  Icon,
  Title,
  Text,
  Content,
  Input,
  View,
  Form,
  Item
} from "native-base";
import DrawerHeader from "../../header/DrawerHeader";
import { StyleSheet, Alert, Image } from "react-native";
export default class NewsFeedView extends Component {
  static navigationOptions = {
    drawerLabel: "Home",
    drawerIcon: () => (
      <Icon name="home" type="AntDesign" style={{ fontSize: 20 }} />
    )
  };
  render() {
    const data = [
      {
        key: "1",
        profileImage: require("../../../icons/3.jpg")
      },
      {
        key: "2",
        profileImage: require("../../../icons/1.jpg")
      },
      {
        key: "3",
        profileImage: require("../../../icons/2.jpg")
      }
    ];
    return (
      <Container style={{ paddingBottom: 15 }}>
        <DrawerHeader
          parent={this}
          title="My Feed"
          nameIcon="search1"
          typeIcon="AntDesign"
        />
        <Content contentContainerStyle={{ paddingHorizontal: 15 }}>
          {data.map(item => (
            <NewsFeedCardComponent
              parent={this}
              key={item.key}
              profileImage={item.profileImage}
            />
          ))}
        </Content>
        <Button
          style={{
            width: 55,
            height: 55,
            alignSelf: "center",
            borderRadius: 27.5,
            position: "absolute",
            right: 10,
            bottom: 10,
            backgroundColor: "#ff6265"
          }}
          onPress={() => {
            this.props.navigation.navigate("CreatePost")
          }}
        >
          <Icon name="video-camera" type="Entypo"></Icon>
        </Button>
      </Container>
    );
  }
}
const styles = StyleSheet.create({});

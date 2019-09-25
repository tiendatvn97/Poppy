import React, { Component } from "react";
import NewsFeedCardComponent from "./NewsFeedCardComponent" 
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
import { StyleSheet, Alert, Image } from "react-native";
export default class NewsFeedView extends Component {
  render() {
    const data=[
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
      },
    ]
    return (
      <Container style={{paddingBottom:15}}>
        <Content contentContainerStyle={{paddingHorizontal: 15}}>
          {
            data.map(item => <NewsFeedCardComponent key={item.key} profileImage={item.profileImage}/>)
          }
        </Content>
      </Container>
    );
  }
}
const styles = StyleSheet.create({

});

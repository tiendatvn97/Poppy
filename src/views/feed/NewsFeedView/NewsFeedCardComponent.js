import React, { Component } from "react";
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
  View,
  Form,
  Item,
  Card,
  CardItem,
  Thumbnail
} from "native-base";

// import Icons from "react-native-vector-icons"
import { StyleSheet, Alert, Image, TouchableOpacity } from "react-native";
export default class NewsFeedCardComponent extends Component {
  render() {
    return (
      <Card transparent style={{ marginBottom: 15 }}>
        <TouchableOpacity
          onPress={() => {
            this.props.parent.props.navigation.navigate("PostDetail");
          }}
        >
          <Image style={styles.image} source={this.props.profileImage}></Image>
        </TouchableOpacity>

        <CardItem
          style={{
            paddingLeft: 0,
            paddingBottom: 0,
            paddingTop: 5,
            paddingRight: 10
          }}
          transparent
        >
          <Left style={{}}>
            <Thumbnail
              style={{ alignSelf: "center", width: 45, height: 45 }}
              large
              source={this.props.profileImage}
            ></Thumbnail>
            <Body style={{}}>
              <Text style={{ fontSize: 12, padding: 2 }}>Dat 6 Mui</Text>
              <Text style={{ fontSize: 10, color: "gray" }}>10 mins ago</Text>
            </Body>
          </Left>
          <Right>
            <Button transparent>
              <Icon type="AntDesign" name="hearto"></Icon>
            </Button>
          </Right>
        </CardItem>
      </Card>
    );
  }
}
const styles = StyleSheet.create({
  image: {
    height: 200,
    width: null,
    flex: 1
  }
});

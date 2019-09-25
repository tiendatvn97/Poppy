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
import { StyleSheet, Alert, Image, Dimensions } from "react-native";
const widthScreen = Dimensions.get("window").width;
export default class PostDetail extends Component {
  render() {
    return (
      <Container>
        <Content>
          <Card transparent style={{backgroundColor:"yellow"}}>
            <CardItem
              style={{
                backgroundColor:"yellow",
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
                  <Text style={{ fontSize: 10, color: "gray" }}>
                    10 mins ago
                  </Text>
                </Body>
              </Left>
              <Right>
                <Button transparent>
                  <Icon type="AntDesign" name="hearto"></Icon>
                </Button>
              </Right>
            </CardItem>
          </Card>
          <Image source={require("../../../icons/2.jpg")} style={styles.image}>
              
          </Image>
        </Content>
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  image: {
    backgroundColor:"green",
    width: widthScreen,
    height:null
    // alignSelf:"center"
  }
});

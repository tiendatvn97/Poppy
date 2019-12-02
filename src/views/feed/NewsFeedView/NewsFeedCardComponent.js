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
  state = { userInfo: null };
  async componentWillMount() {
    const userInfo = await this.props.newsFeedStore.getUserInfo(
      this.props.fullData.data.userId
    );
    this.setState({ userInfo: userInfo });
  }
  render() {
    const { fullData, newsFeedStore, userStore, postDetailStore } = this.props;
    return (
      <Card transparent style={{ marginBottom: 15 }}>
        <TouchableOpacity
          onPress={async () => {
            postDetailStore.postInfo = fullData.data;
            this.props.parent.props.navigation.navigate("PostDetail");
          }}
        >
          <Image
            style={styles.image}
            source={{ uri: fullData.data.image }}
          ></Image>
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
              source={{
                uri: this.state.userInfo
                  ? this.state.userInfo.avatarImage
                  : null
              }}
            ></Thumbnail>
            <Body style={{}}>
              <Text style={{ fontSize: 12, padding: 2 }}>
                {this.state.userInfo
                  ? this.state.userInfo.profiles.fullName
                  : ""}
              </Text>
              <Text style={{ fontSize: 10, color: "gray" }}>
                {userStore.timeConverter(fullData.data.timeEdit)}
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

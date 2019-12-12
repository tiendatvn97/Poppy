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
import { NewFeedStack } from "../../../screens/StackNavigators";
export default class NewsFeedCardComponent extends Component {
  state = { userInfo: null, loves: [] };
  async componentWillMount() {
    const userInfo = await this.props.newsFeedStore.getUserInfo(
      this.props.fullData.data.userId
    );
    this.setState({ userInfo: userInfo });
  }
  componentDidMount() {
    this.setState({ loves: this.props.fullData.data.loves });
  }
  componentWillUpdate() {}

  render() {
    const {
      fullData,
      newsFeedStore,
      userStore,
      postDetailStore,
      thirdProfileStore
    } = this.props;
    if (fullData.data.loves !== this.state.loves) {
      this.setState({
        loves: fullData.data.loves
      });
    }
    return (
      <Card transparent style={{ marginBottom: 15 }}>
        <CardItem
          style={{
            paddingLeft: 0,
            paddingBottom: 5,
            paddingTop: 5,
            paddingRight: 10
          }}
          transparent
        >
          <Left style={{}}>
            <TouchableOpacity
              onPress={() => {
                if (this.state.userInfo) {
                  if (this.state.userInfo.id === userStore.id) {
                    this.props.parent.props.navigation.navigate("MyProfile");
                  } else {
                    thirdProfileStore.thirdUser = this.state.userInfo;
                    this.props.parent.props.navigation.navigate("ThirdProfile");
                  }
                }
              }}
            >
              <Thumbnail
                style={{ alignSelf: "center", width: 45, height: 45 }}
                large
                source={{
                  uri: this.state.userInfo
                    ? this.state.userInfo.avatarImage
                    : null
                }}
              />
            </TouchableOpacity>

            <Body>
              <Text style={{ fontSize: 16, padding: 2, fontWeight: "bold" }}>
                {this.state.userInfo
                  ? this.state.userInfo.profiles.fullName
                  : ""}
              </Text>
              <Text style={{ fontSize: 12, color: "gray" }}>
                {userStore.timeConverter(fullData.data.timeEdit)}
              </Text>
            </Body>
          </Left>
          <Right>
            {(this.state.loves &&
              this.state.loves.indexOf(userStore.id) !== -1 && (
                <Icon
                  type="AntDesign"
                  name="heart"
                  style={{ color: "red" }}
                  onPress={() => {
                    newsFeedStore.unLoveAction(fullData.data);
                  }}
                />
              )) || (
              <Icon
                type="AntDesign"
                name="hearto"
                onPress={() => {
                  newsFeedStore.loveAction(fullData.data);
                }}
              />
            )}
          </Right>
        </CardItem>
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

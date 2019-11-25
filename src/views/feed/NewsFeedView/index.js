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
import { observer, inject } from "mobx-react";
import DrawerHeader from "../../header/DrawerHeader";
import CameraModal from "../../modal/CameraModal";
import { StyleSheet } from "react-native";

import Firebase from "../../../firebase/Firebase";
@inject("createPostStore", "userStore", "newsFeedStore")
@observer
export default class NewsFeedView extends Component {
  state = {
    modalVisible: false,
    listPost: []
  };

  static navigationOptions = {
    drawerLabel: "Home",
    drawerIcon: () => (
      <Icon name="home" type="AntDesign" style={{ fontSize: 20 }} />
    )
  };
  async componentWillMount() {
    await this.props.userStore.following.map(async item => {
      await Firebase.database
        .ref("postGroup/postByUser/" + item)
        .on("child_added", async data => {
          await Firebase.database
            .ref("postGroup/postList/" + data.key)
            .on("child_added", async result => {
              if (result.key === "published") {
                const post = {
                  postId: data.key,
                  data: data.val(),
                  published: result.val()
                };
                this.props.newsFeedStore.listPost.push(post);
                this.sortPost();
              }
            });
        });
    });
  }
  async sortPost() {
    let test;
    this.props.newsFeedStore.listPost = await this.props.newsFeedStore.listPost.sort(
      (a, b) => {
        return b.published - a.published;
      }
    );
  }
  componentDidMount() {
    this.props.newsFeedStore.clearStore();
  }

  render() {
    return (
      <Container style={{ paddingBottom: 15 }}>
        <DrawerHeader
          parent={this}
          title="My Feed"
          nameIcon="search1"
          typeIcon="AntDesign"
        />
        <Content contentContainerStyle={{ paddingHorizontal: 15 }}>
          {this.props.newsFeedStore.listPost.map(item => (
            <NewsFeedCardComponent
              newsFeedStore={this.props.newsFeedStore}
              parent={this}
              key={item.postId}
              fullData={item}
            />
          ))}
          <CameraModal
            modalVisible={this.state.modalVisible}
            parent={this}
            createPostStore={this.props.createPostStore}
          />
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
            this.setState({ modalVisible: true });
          }}
        >
          <Icon name="video-camera" type="Entypo"></Icon>
        </Button>
      </Container>
    );
  }
}
const styles = StyleSheet.create({});

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
import { StyleSheet, StatusBar } from "react-native";

import Firebase from "../../../firebase/Firebase";
@inject("createPostStore", "userStore", "newsFeedStore")
@observer
export default class NewsFeedView extends Component {
  constructor(props) {
    super(props);
    this.props.newsFeedStore.clearStore();
  }
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
    let test = [];
    await Promise.all(
      this.props.userStore.following.map(async item => {
        console.log("item+" + JSON.stringify(item));
        await Promise.all(
          Firebase.database
            .ref("postGroup/postByUser/" + item)
            .on("child_added", async (data) => {
              await Promise.all(
                Firebase.database
                  .ref("postGroup/postList/" + data.key)
                  .on("child_added", async result => {
                    if (result.key === "published") {
                      const post = await {
                        postId: data.key,
                        data: data.val(),
                        published: result.val()
                      };
                    
                      await test.push(post);
                    }
                  })
              );
            })
        );
      })
    );
    // this.props.userStore.listPost = await this.sortPost(test);
    console.log("test" + JSON.stringify(test));
  }

  async sortPost(test: ?(any[])) {
    return Promise.all(
      test.listPost.sort((a, b) => {
        return b.published - a.published;
      })
    );
  }
  componentDidMount() {
    this.props.newsFeedStore.clearStore();
    console.log("didmount new feed");
  }

  render() {
    return (
      <Container style={{ paddingBottom: 15 }}>
        <StatusBar hidden={false} backgroundColor="blue" />
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

a="";
function test(){
  return new Promise((resolve,reject) => {
    setTimeout(()=>{resolve("ok");return null},3000)
  })
};
test().then((a) => a=b);
setTimeout(()=>{console.log(a)},3000)

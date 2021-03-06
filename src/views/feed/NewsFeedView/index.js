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
import StatusBarCustom from "../../header/StatusBarCustom";
import CameraModal from "../../modal/CameraModal";
import { StyleSheet, StatusBar, FlatList } from "react-native";

import Firebase from "../../../firebase/Firebase";
import { timezone } from "expo-localization";

@inject(
  "createPostStore",
  "userStore",
  "newsFeedStore",
  "postDetailStore",
  "thirdProfileStore"
)
@observer
export default class NewsFeedView extends Component {
  constructor(props) {
    super(props);
    this.props.newsFeedStore.clearStore();
  }
  state = {
    modalVisible: false,
    listPost: [],
    isLoading: false
  };

  static navigationOptions = {
    drawerLabel: "Home",
    drawerIcon: () => (
      <Icon name="home" type="AntDesign" style={{ fontSize: 20 }} />
    )
  };

  componentWillMount() {}
  componentDidMount() {
    this.loadFeed();
    setTimeout(() => {
      this.props.userStore.following.map(item => {
        Firebase.database
          .ref("postGroup/postByUser/" + item)
          .on("child_changed", snapshot => {
            if (snapshot.val()) {
              setTimeout(() => {
                const index =
                  this.state.listPost &&
                  this.state.listPost
                    .map(item => item.postId)
                    .indexOf(snapshot.val().postId);

                if (index !== -1) {
                  const postChanged = {
                    postId:
                      this.state.listPost && this.state.listPost[index].postId,
                    data: snapshot.val(),
                    published:
                      this.state.listPost &&
                      this.state.listPost[index].published
                  };
                  this.setState(preState => {
                    preState.listPost.splice(index, 1, postChanged);
                    return {
                      listPost: preState.listPost
                    };
                  });
                }
              }, 700);
            }
          });
      });
    }, 1200);
  }
  loadFeed() {
    this.setState({ isLoading: true });
    let test = [];
    setTimeout(() => {
      this.setState({ listPost: [] });
      this.sortPost(test);
    }, 1000);

    this.props.userStore.following.map(async user => {
      Firebase.database
        .ref("postGroup/postByUser/" + user)
        .once("value")
        .then(snapshot => {
          snapshot.forEach(data => {
            Firebase.database
              .ref("postGroup/postList/" + data.key)
              .once("value")
              .then(result => {
                result.forEach(item => {
                  if (item.key === "published") {
                    const post = {
                      postId: data.key,
                      data: data.val(),
                      published: item.val()
                    };
                    test = [...test, post];
                  }
                });
              });
          });
        });
    });
  }
  sortPost(test = []) {
    this.state.listPost = test.sort((a, b) => {
      return b.published - a.published;
    });
    this.setState({ isLoading: false });
  }

  render() {
    const {
      userStore,
      newsFeedStore,
      postDetailStore,
      thirdProfileStore
    } = this.props;
    return (
      <Container style={{ paddingBottom: 15 }}>
        <StatusBarCustom />
        <DrawerHeader
          parent={this}
          title="My Feed"
          nameRightIcon="search1"
          typeRightIcon="AntDesign"
          nameLeftIcon="ios-menu"
          typeLeftIcon="Ionicons"
        />
        <View contentContainerStyle={{ paddingHorizontal: 15 }}>
          <FlatList
            refreshing={this.state.isLoading}
            onRefresh={this.loadFeed.bind(this)}
            data={this.state.listPost}
            renderItem={({ item, index }) => (
              <NewsFeedCardComponent
                postDetailStore={postDetailStore}
                parent={this}
                fullData={item}
                userStore={userStore}
                newsFeedStore={newsFeedStore}
                thirdProfileStore={thirdProfileStore}
              />
            )}
            keyExtractor={item => item.postId}
          />

          <CameraModal
            modalVisible={this.state.modalVisible}
            parent={this}
            createPostStore={this.props.createPostStore}
          />
        </View>
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

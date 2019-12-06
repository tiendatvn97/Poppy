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
  Thumbnail,
  Footer,
  Input,
  Spinner
} from "native-base";
// import Icons from "react-native-vector-icons"
import {
  StyleSheet,
  Alert,
  Dimensions,
  KeyboardAvoidingView,
  FlatList
} from "react-native";
import Image from "react-native-scalable-image";
import StatusBarCustom from "../../header/StatusBarCustom";
import BackHeader from "../../header/BackHeader";
const widthScreen = Dimensions.get("window").width;
import { observer, inject } from "mobx-react";
import Firebase from "../../../firebase/Firebase";
import { ScrollView } from "react-native-gesture-handler";
import ThirdProfileStore from "../../../mobx/stores/ThirdProfileStore";
let userInfo = "";
@inject("postDetailStore", "userStore")
@observer
export default class PostDetailView extends Component {
  state = {
    postAuth: null,
    comments: [],
    isLoading: true
  };
  static navigationOptions = {
    drawerLabel: () => null
  };
  componentDidMount() {}

  async componentWillMount() {
    this.props.postDetailStore.refresh();
    setTimeout(() => {
      this.setState({ isLoading: false });
    }, 500);
    const postAuth = await this.props.postDetailStore.getUserInfo(
      this.props.postDetailStore.postInfo.userId
    );

    this.setState({ postAuth: postAuth });
    this.props.postDetailStore.postInfo &&
      Firebase.database
        .ref(`comments/${this.props.postDetailStore.postInfo.postId}`)
        .on("child_added", value => {
          if (value.val()) {
            this.setState(preState => {
              return {
                comments: [value.val(), ...preState.comments]
              };
            });
          }
        });
  }
  render() {
    const { postDetailStore, userStore } = this.props;
    const { postAuth, comments, isLoading } = this.state;
    return (
      <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
        <Container>
          <StatusBarCustom />
          <BackHeader
            parent={this}
            title={`${postAuth ? postAuth.profiles.fullName : ""}'s Moment`}
          />
          <Content >
            <Card transparent style={{ elevation: 0 }}>
              <CardItem
                style={{
                  paddingLeft: 0,
                  paddingTop: 5,
                  paddingRight: 10
                }}
                transparent
              >
                <Left style={{ flex: 1, justifyContent: "flex-start" }}>
                  <Thumbnail
                    style={{ alignSelf: "center", width: 45, height: 45 }}
                    large
                    source={{ uri: postAuth && postAuth.avatarImage }}
                  />
                  <Body style={{ flex: 7 }}>
              <Text style={{ fontWeight: "bold" }}>{postAuth && postAuth.profiles.fullName}</Text>
                  </Body>
                </Left>
                <Right style={{ flex: 1 }}>
                  <Button transparent>
                    <Icon type="Entypo" name="dots-three-vertical" />
                  </Button>
                </Right>
              </CardItem>

              <Image
                source={{ uri: postDetailStore.postInfo.image }}
                width={widthScreen}
              />
              {postAuth && postDetailStore.postInfo && (
                <CardItem style={{ elevation: 0, paddingLeft: 0 }}>
                  <Left
                    style={{
                      maxWidth: 80,
                      alignItems: "flex-start",
                      justifyContent: "flex-start",
                      alignSelf: "flex-start"
                    }}
                  >
                    <Text style={{ fontWeight: "bold" }}>
                      {postAuth.profiles.fullName}
                    </Text>
                  </Left>
                  <Body style={{ paddingLeft: 10 }}>
                    <Text>{`${postDetailStore.postInfo.content}`}</Text>
                    <Text style={{ fontSize: 12, color: "gray" }}>
                      {postDetailStore.timeConverter(
                        postDetailStore.postInfo.timeEdit
                      )}
                    </Text>
                  </Body>
                </CardItem>
              )}
            </Card>
            <Card style={{ elevation: 0 }}>
              <CardItem>
                <Left
                  style={{ justifyContent: "center", alignItems: "center" }}
                  bordered
                >
                  {postDetailStore.loveState && (
                    <Icon
                      type="AntDesign"
                      name="heart"
                      style={{ color: "red" }}
                      onPress={() => {
                        postDetailStore.unLoveAction();
                      }}
                    />
                  )}
                  {!postDetailStore.loveState && (
                    <Icon
                      type="AntDesign"
                      name="hearto"
                      onPress={() => {
                        postDetailStore.loveAction();
                      }}
                    />
                  )}

                  <Text>{postDetailStore.loveList.length}</Text>
                </Left>
                <Left
                  style={{ justifyContent: "center", alignItems: "center" }}
                >
                  <Icon type="AntDesign" name="sharealt" />
                  <Text>{postDetailStore.shareList.length}</Text>
                </Left>
                <Left
                  style={{ justifyContent: "center", alignItems: "center" }}
                >
                  <Text>{comments.length} comments</Text>
                </Left>
              </CardItem>
            </Card>
            {isLoading && <Spinner size="large" color="#0000ff" />}
            {!isLoading && (
              <Card transparent style={{ elevation: 0 }}>
                <ScrollView style={{ maxHeight: 200, minHeight:120 }}>
                  <FlatList
                    data={comments}
                    renderItem={({ item, index }) => {
                      userInfo = null;
                      userInfo = userStore.listUser.find(
                        user => user.id === item.userId
                      );
                      if (userInfo) {
                        return (
                          <CardItem transparent style={{ paddingTop: 0 }}>
                            <Left>
                              <Thumbnail
                                source={{ uri: userInfo.avatarImage }}
                                small
                                style={{ alignSelf: "flex-start" }}
                              />
                              <Body>
                                <View
                                  style={{
                                    flexDirection: "row",
                                    justifyContent: "space-between"
                                  }}
                                >
                                  <Text style={{ fontWeight: "bold" }}>
                                    {userInfo && userInfo.profiles.fullName}
                                  </Text>
                                  <Text style={styles.textNote}>
                                    {postDetailStore.timeConverter(
                                      item.timeEdit
                                    )}
                                  </Text>
                                </View>
                                <Text
                                  style={{
                                    backgroundColor: "#edf0f5",
                                    alignSelf: "flex-start",
                                    padding: 7,
                                    borderRadius: 7
                                  }}
                                >
                                  {item.content}
                                </Text>
                              </Body>
                            </Left>
                          </CardItem>
                        );
                      } else return null;
                    }}
                  ></FlatList>
                </ScrollView>
                <Card style={{ marginBottom: 0, borderTopWidth: 1.5 }}>
                  <Form>
                    <Item>
                      <Input
                        onChangeText={value =>
                          postDetailStore.commentContentOnChange(value)
                        }
                        value={postDetailStore.commentContent}
                        placeholder="Write comment..."
                        style={{ fontSize: 16, height: 45 }}
                        multiline
                      />
                      <Icon
                        name="emoticon-devil"
                        type="MaterialCommunityIcons"
                      />
                      <View style={styles.sendIcon}>
                        <Icon
                          name="ios-send"
                          style={{ paddingRight: 0, color: "white" }}
                          onPress={() => {
                            postDetailStore.updateComment();
                          }}
                        />
                      </View>
                    </Item>
                  </Form>
                </Card>
              </Card>
            )}
          </Content>
        </Container>
      </KeyboardAvoidingView>
    );
  }
}
const styles = StyleSheet.create({
  image: {
    flex: 1,
    width: null,
    height: null,
    alignItems: "center",
    justifyContent: "center"
    // alignSelf:"center"
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff"
  },
  textNote: {
    fontSize: 12,
    color: "gray"
  },
  sendIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#ff6265",
    justifyContent: "center",
    alignItems: "center"
  }
});

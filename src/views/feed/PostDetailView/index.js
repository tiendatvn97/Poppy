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
  componentDidMount() {
    // console.log("postAuth:" + JSON.stringify(postAuth));
  }

  async componentWillMount() {
    setTimeout(() => {
      this.setState({ isLoading: false });
    }, 1000);
    const postAuth = await this.props.postDetailStore.getUserInfo(
      this.props.postDetailStore.postInfo.data.userId
    );
    this.setState({ postAuth: postAuth });
    this.props.postDetailStore.postInfo &&
      Firebase.database
        .ref(`comments/${this.props.postDetailStore.postInfo.postId}`)
        .on("child_added", value => {
          if (value.val()) {
            console.log("value: " + JSON.stringify(value.val()));
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
            title={`${postAuth && postAuth.profiles.fullName}'s Moment`}
          />
          <Content>
            <Card transparent style={{ elevation: 1 }}>
              <CardItem
                style={{
                  paddingLeft: 0,
                  paddingTop: 5,
                  paddingRight: 10
                }}
                transparent
              >
                <Left style={{}}>
                  <Thumbnail
                    style={{ alignSelf: "center", width: 45, height: 45 }}
                    large
                    source={{ uri: postAuth && postAuth.avatarImage }}
                  />
                  <Body style={{}}>
                    <Text style={{ fontSize: 12, padding: 2 }}>Dat 6 Mui</Text>
                    <Text style={{ fontSize: 10, color: "gray" }}>
                      {postDetailStore.timeConverter(
                        postDetailStore.postInfo.data.timeEdit
                      )}
                    </Text>
                  </Body>
                </Left>
                <Right>
                  <Button transparent>
                    <Icon type="AntDesign" name="hearto" />
                  </Button>
                </Right>
              </CardItem>

              <Image
                source={{ uri: postDetailStore.postInfo.data.image }}
                width={widthScreen}
              />

              {/* <CardItem>
              <Left>
                <Icon name="map-pin" type="Feather" size={10} />
                <Text style={styles.textNote}>10 mins ago</Text>
              </Left>
            </CardItem> */}
            </Card>
            <Card style={{ elevation: 0 }}>
              <CardItem>
                <Left
                  style={{ justifyContent: "center", alignItems: "center" }}
                  bordered
                >
                  <Icon type="AntDesign" name="hearto" />
                  <Text>214</Text>
                </Left>
                <Left
                  style={{ justifyContent: "center", alignItems: "center" }}
                >
                  <Icon type="AntDesign" name="sharealt" />
                  <Text>214</Text>
                </Left>
              </CardItem>
            </Card>
            {isLoading && <Spinner size="large" color="#0000ff" />}
            {!isLoading  && (
              <Card transparent style={{ elevation: 0 }}>
                <CardItem transparent>
                  <Left>
                    <Text style={styles.textNote}>
                      {comments.length} Comments
                    </Text>
                  </Left>
                  {/* <Left style={{ justifyContent: "flex-end" }}>
                  <Text style={[styles.textNote, { color: "#ff6265" }]}>
                    View All
                  </Text>
                </Left> */}
                </CardItem>

                <ScrollView style={{ maxHeight: 200 }}>
                  <FlatList
                    data={comments}
                    renderItem={({ item, index }) => {
                      userInfo = null;
                      userInfo = userStore.listUser.find(
                        user => user.id === item.userId
                      );
                      if (userInfo) {
                        console.log("ok lam" + JSON.stringify(userInfo));
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
                                  <Text>
                                    {userInfo && userInfo.profiles.fullName}
                                  </Text>
                                  <Text style={styles.textNote}>
                                    {postDetailStore.timeConverter(
                                      item.timeEdit
                                    )}
                                  </Text>
                                </View>
                                <Text style={{ fontSize: 10 }}>
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
                        style={{ fontSize: 12, height: 50 }}
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
    fontSize: 10,
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

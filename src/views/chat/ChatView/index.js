import React, { Component, Fragment } from "react";
import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Thumbnail,
  Left,
  Body,
  Right,
  Button,
  Icon,
  Footer,
  Card,
  Form,
  Item,
  Input
} from "native-base";

import { observer, inject } from "mobx-react";

import DrawerHeader from "../../header/DrawerHeader";
import StatusBarCustom from "../../header/StatusBarCustom";
import {
  StyleSheet,
  Alert,
  FlatList,
  Image,
  View,
  Text,
  KeyboardAvoidingView,
  Keyboard,
  Dimensions,
  TouchableOpacity
} from "react-native";
let isDisplayAvatar = true;
import Firebase from "../../../firebase/Firebase";
import { ScrollView } from "react-native-gesture-handler";
const { height } = Dimensions.get("window");
@inject("userStore", "chatStore")
@observer
export default class ChatView extends Component {
  state = {
    messageList: [],
    isDisplayTime: [],
    flatListHeight: height
  };
  static navigationOptions = {
    drawerLabel: "Chats",
    drawerIcon: ({ tintColor }) => (
      <Icon name="rocketchat" type="FontAwesome5" style={{ fontSize: 20 }} />
    )
  };
  // componentWillUnmount() {
  //   this.keyboardDidShowListener.remove();
  //   this.keyboardDidHideListener.remove();
  // }
  // _keyboardDidShow(e) {
  //   console.log(e);
  //   // this.scrollView.scrollToEnd({animated: true})
  //   // this.flatList.scrollToEnd({ animated: true });
  //   this.setState({
  //     flatListHeight: height - e.height
  //   });
  // }
  // _keyboardDidHide(e) {
  //   this.setState({
  //     flatListHeight: height
  //   });
  // }
  // constructor(props) {
  //   super(props);
  //   this._keyboardDidShow = this._keyboardDidShow.bind(this);
  //   this._keyboardDidHide = this._keyboardDidHide.bind(this);
  // }

  componentDidMount() {
    this.flatList.scrollToEnd();
  }
  componentWillMount() {
    Firebase.database
      .ref("messages")
      .child(this.props.chatStore.hostChat)
      .child(this.props.chatStore.partnerChat)
      .on("child_added", value => {
        this.setState(preState => {
          return {
            messageList: [value.val(), ...preState.messageList],
            isDisplayTime: [false, ...preState.isDisplayTime]
          };
        });
      });
  }
  render() {
    const { chatStore } = this.props;
    return (
      <Container>
        <StatusBarCustom/>
        <DrawerHeader
          parent={this}
          title="Chats"
          nameIcon="user-friends"
          typeIcon="FontAwesome5"
        />
        <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
          <FlatList
            inverted
            ref={test => (this.flatList = test)}
            style={{ marginTop: 10 }}
            data={this.state.messageList}
            keyExtractor={item => item.id}
            renderItem={({ item, index }) => {
              if (index == 0) isDisplayAvatar = true;
              if (
                index > 0 &&
                this.state.messageList[index].from ===
                  this.state.messageList[index - 1].from
              )
                isDisplayAvatar = false;
              else isDisplayAvatar = true;
              if (item.from !== chatStore.hostChat)
                return (
                  <View
                    style={{
                      flexDirection: "row",
                      marginHorizontal: 15,
                      marginBottom: 10
                    }}
                  >
                    <Image
                      style={{ width: 30, height: 30, borderRadius: 15 }}
                      source={
                        isDisplayAvatar ? require("../../../icons/3.jpg") : ""
                      }
                    ></Image>

                    <View style={{ marginLeft: 10 }}>
                      <TouchableOpacity
                        onPress={() => {
                          this.setState(preState => {
                            let state = preState.isDisplayTime;
                            state[index] = !state[index];
                            return {
                              isDisplayTime: state
                            };
                          });
                        }}
                      >
                        <Text style={styles.textReceive}>{item.content}</Text>
                      </TouchableOpacity>
                      {this.state.isDisplayTime[index] && (
                        <Text style={{ fontSize: 10, color: "#e6e6e6" }}>
                          {chatStore.convertTime(item.time)}
                        </Text>
                      )}
                    </View>
                  </View>
                );
              else
                return (
                  <View
                    style={{
                      flexDirection: "row",
                      marginHorizontal: 15,
                      justifyContent: "flex-end",
                      marginBottom: 10
                    }}
                  >
                    <View style={{ marginRight: 10, marginLeft: 15 }}>
                      <TouchableOpacity
                        onPress={() => {
                          this.setState(preState => {
                            let state = preState.isDisplayTime;
                            state[index] = !state[index];
                            return {
                              isDisplayTime: state
                            };
                          });
                        }}
                      >
                        <Text style={styles.textSend}>{item.content}</Text>
                      </TouchableOpacity>
                      {this.state.isDisplayTime[index] && (
                        <Text
                          style={{
                            fontSize: 10,
                            color: "gray",
                            marginLeft: 10
                          }}
                        >
                          {chatStore.convertTime(item.time)}
                        </Text>
                      )}
                    </View>
                    <Image
                      style={{ width: 30, height: 30, borderRadius: 15 }}
                      source={
                        isDisplayAvatar ? require("../../../icons/3.jpg") : ""
                      }
                    ></Image>
                  </View>
                );
            }}
          ></FlatList>

          <Card style={{ marginBottom: 0, borderTopWidth: 1.5 }}>
            <Form>
              <Item>
                <Input
                  placeholder="Write comment..."
                  multiline
                  style={{ fontSize: 12, height: 50 }}
                  value={chatStore.textMessage}
                  onChangeText={value => chatStore.textMessageOnChange(value)}
                />
                <Icon name="emoticon-devil" type="MaterialCommunityIcons" />
                <View style={styles.sendIcon}>
                  <Icon
                    name="ios-send"
                    style={{ paddingRight: 0, color: "white" }}
                    onPress={() => chatStore.sendMessage()}
                  />
                </View>
              </Item>
            </Form>
          </Card>
        </KeyboardAvoidingView>
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  textReceive: {
    width: "auto",
    marginRight: 50,
    borderWidth: 0.5,
    borderColor: "gray",
    borderRadius: 7,
    fontSize: 12,
    padding: 5
  },
  textSend: {
    width: "auto",
    borderWidth: 1,
    borderColor: "red",
    borderRadius: 7,
    fontSize: 12,
    padding: 5,
    marginLeft: 10
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

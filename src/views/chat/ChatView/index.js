import React, { Component } from "react";
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
import {
  StyleSheet,
  Alert,
  FlatList,
  Image,
  View,
  Text,
  KeyboardAvoidingView,
  keyboardDidShowListener,
  Keyboard
} from "react-native";
let isDisplayAvatar = true;
import Firebase from "../../../firebase/Firebase";
const data = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    image: require("../../../icons/1.jpg")
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    image: require("../../../icons/2.jpg")
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    image: require("../../../icons/3.jpg")
  },
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    image: require("../../../icons/3.jpg")
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    image: require("../../../icons/2.jpg")
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    image: require("../../../icons/1.jpg")
  },
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    image: require("../../../icons/1.jpg")
  }
];

@inject("userStore", "chatStore")
@observer
export default class ChatView extends Component {
  state = {
    messageList: []
  };
  static navigationOptions = {
    drawerLabel: "Chats",
    drawerIcon: ({ tintColor }) => (
      <Icon name="rocketchat" type="FontAwesome5" style={{ fontSize: 20 }} />
    )
  };

  componentWillMount() {
    Firebase.database
      .ref("messages")
      .child(this.props.chatStore.hostChat)
      .child(this.props.chatStore.partnerChat)
      .on("child_added", value => {
        this.setState(preState => {
          return {
            messageList: [...preState.messageList, value.val()]
          };
        });
        console.log(`ok ${JSON.stringify(this.messageList)}`);
      });
  }
  render() {
    const { chatStore } = this.props;
    return (
      <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
        <Container>
          <DrawerHeader
            parent={this}
            title="Chats"
            nameIcon="user-friends"
            typeIcon="FontAwesome5"
          />
          <Content>
            <FlatList
              style={{ marginTop: 10 }}
              data={this.state.messageList}
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
                        marginHorizontal: 15
                      }}
                    >
                      <Image
                        style={{ width: 30, height: 30, borderRadius: 15 }}
                        source={
                          isDisplayAvatar ? require("../../../icons/3.jpg") : ""
                        }
                      ></Image>

                      <View style={{ marginLeft: 10 }}>
                        <Text style={styles.textReceive}>{item.content}</Text>
                        <Text style={{ fontSize: 10, color: "#e6e6e6" }}>
                          1:23 PM
                        </Text>
                      </View>
                    </View>
                  );
                else
                  return (
                    <View
                      style={{
                        flexDirection: "row",
                        marginHorizontal: 15,
                        justifyContent: "flex-end"
                      }}
                    >
                      <View style={{ marginRight: 10, marginLeft: 15 }}>
                        <Text style={styles.textSend}>{item.content}</Text>
                        <Text
                          style={{
                            fontSize: 10,
                            color: "gray",
                            marginLeft: 10
                          }}
                        >
                          1:23 PM
                        </Text>
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
          </Content>

          <Card style={{ marginBottom: 0, borderTopWidth: 1.5 }}>
            <Form>
              <Item>
                <Input
                  placeholder="Write comment..."
                  style={{ fontSize: 12 }}
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
        </Container>
      </KeyboardAvoidingView>
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

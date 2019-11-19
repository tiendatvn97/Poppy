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

@inject("userStore")
@observer
export default class ChatView extends Component {
  static navigationOptions = {
    drawerLabel: "Chats",
    drawerIcon: ({ tintColor }) => (
      <Icon name="rocketchat" type="FontAwesome5" style={{ fontSize: 20 }} />
    )
  };
  componentDidMount() {
    // console.log(`ok: ${JSON.stringify(this.myReff)}`)
  }
  // componentWillMount(){
  //   this.myReff.scrollToEnd()
  // }

  _scrollEnd = evt => {
    this.myReff.scrollToEnd();
    console.log('oo')
    console.log(this.myReff)
  };
  componentDidMount() {
    this._keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      this._scrollEnd
    );
    this._keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      this._scrollEnd
    );
  }
  render() {
    console.log("test");
    console.log(JSON.stringify(this.props.userStore.listUser));
    return (
      <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
      <Container>
        <DrawerHeader
          parent={this}
          title="Chats"
          nameIcon="user-friends"
          typeIcon="FontAwesome5"
        />
        <Content scrollToEnd>
          <FlatList
            ref={test => (this.myReff = test)}
            onContentSizeChange={()=> this.myReff.scrollToEnd()}
            style={{ marginTop: 10 }}
            data={data}
            renderItem={({ item, index }) => {
              if (index % 2 === 0)
                return (
                  <View style={{ flexDirection: "row", margin: 15 }}>
                    <Image
                      style={{ width: 30, height: 30, borderRadius: 15 }}
                      source={require("../../../icons/3.jpg")}
                    ></Image>

                    <View style={{ marginLeft: 10 }}>
                      <Text style={styles.textReceive}>
                        So strongly and metaphysically did I conceive of my
                      </Text>
                      <Text style={{ fontSize: 10, color: "gray" }}>
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
                      margin: 15,
                      justifyContent: "flex-end"
                    }}
                  >
                    <View style={{ marginRight: 10 }}>
                      <Text style={styles.textSend}>
                        So strongly and metaphysically did I conceive of my
                      </Text>
                      <Text style={{ fontSize: 10, color: "gray" }}>
                        1:23 PM
                      </Text>
                    </View>
                    <Image
                      style={{ width: 30, height: 30, borderRadius: 15 }}
                      source={require("../../../icons/3.jpg")}
                    ></Image>
                  </View>
                );
            }}
          ></FlatList>
        </Content>

        <Card style={{ marginBottom: 0, borderTopWidth: 1.5 }}>
          <Form>
            <Item>
              <Input placeholder="Write comment..." style={{ fontSize: 12 }} />
              <Icon name="emoticon-devil" type="MaterialCommunityIcons" />
              <View style={styles.sendIcon}>
                <Icon
                  name="ios-send"
                  style={{ paddingRight: 0, color: "white" }}
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
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 7,
    fontSize: 12,
    padding: 10
  },
  textSend: {
    width: "auto",
    borderWidth: 1,
    borderColor: "red",
    borderRadius: 7,
    fontSize: 12,
    padding: 10
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

import React, { Component } from "react";
import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Thumbnail,
  Text,
  Left,
  Body,
  Right,
  Button,
  Icon
} from "native-base";
import Firebase from "../../../firebase/Firebase";
import DrawerHeader from "../../header/DrawerHeader";
import StatusBarCustom from "../../header/StatusBarCustom";
import { StyleSheet, Alert } from "react-native";
import { observer, inject } from "mobx-react";

@inject("userStore", "chatStore")
@observer
export default class RecentChatsView extends Component {
  state = {
    recentChats: []
  };
  static navigationOptions = {
    drawerLabel: "Chats",
    drawerIcon: ({ tintColor }) => (
      <Icon name="rocketchat" type="FontAwesome5" style={{ fontSize: 20 }} />
    )
  };

  async componentDidMount() {
    await Firebase.database
      .ref("messages")
      .child(this.props.userStore.id)
      .on("child_added", value => {
        if (value.val()) {
          const tmp = {};
          tmp[value.key] = value.val();
          this.setState(preState => {
            return {
              recentChats: [tmp,...preState.recentChats]
            };
          });
        }
      });
  }

  render() {
    const { userStore, chatStore, navigation } = this.props;
    return (
      <Container>
        <StatusBarCustom />
        <DrawerHeader
          parent={this}
          title="Recent Chats"
          nameRightIcon="user-friends"
          typeRightIcon="FontAwesome5"
          nameLeftIcon="ios-menu"
          typeLeftIcon="Ionicons"
        />
        <Content>
          <List>
            {this.state.recentChats.map(item => {
              let userInfo = null;
              let arr = Object.values(Object.values(item)[0]);
              userStore.listUser.map(user => {
                if (user.id === Object.keys(item)[0]) userInfo = user;
              });
              if (
                userInfo &&
                chatStore.historyChat
                  .map(item => item.userId)
                  .indexOf(userInfo.id) == -1
              )
                return (
                  <ListItem
                    thumbnail
                    onPress={() => {
                      chatStore.setValue(userStore.id, userInfo.id);
                      navigation.navigate("Chat");
                    }}
                  >
                    <Left>
                      <Thumbnail source={{uri: userInfo.avatarImage}} />
                    </Left>
                    <Body>
                      <Text>{userInfo.profiles.fullName}</Text>
                      <Text note numberOfLines={1}>
                        {arr[arr.length - 1]["content"]}
                      </Text>
                    </Body>
                    <Right style={{ paddingRight: 0, paddingTop: 0 }}>
                      <Button transparent>
                        <Text style={styles.textNote} uppercase={false}>
                          {chatStore.convertTime(arr[arr.length - 1]["time"])}
                        </Text>
                      </Button>
                    </Right>
                  </ListItem>
                );
              else if (
                userInfo &&
                (index = chatStore.historyChat
                  .map(item => item.userId)
                  .indexOf(userInfo.id)) !== -1
              )
                return (
                  <ListItem
                    thumbnail
                    onPress={() => {
                      chatStore.setValue(userStore.id, userInfo.id);
                      navigation.navigate("Chat");
                    }}
                  >
                    <Left>
                      <Thumbnail source={{uri: userInfo.avatarImage}} />
                    </Left>
                    <Body>
                      <Text>{userInfo.profiles.fullName}</Text>
                      <Text note numberOfLines={1}>
                        {chatStore.historyChat[index].content}
                      </Text>
                    </Body>
                    <Right style={{ paddingRight: 0, paddingTop: 0 }}>
                      <Button transparent>
                        <Text style={styles.textNote} uppercase={false}>
                          {chatStore.convertTime(
                            chatStore.historyChat[index].time
                          )}
                        </Text>
                      </Button>
                    </Right>
                  </ListItem>
                );
            })}
          </List>
        </Content>
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  textNote: {
    fontSize: 12,
    color: "gray"
  }
});

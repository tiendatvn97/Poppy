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
import { StyleSheet, Alert } from "react-native";
import { observer, inject } from "mobx-react";

@inject("userStore", "chatStore", "navigationStore")
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

  async componentWillMount() {
    this.props.navigationStore.currentNavigation = this.props.navigation;
    await Firebase.database
      .ref("messages")
      .child(this.props.userStore.id)
      .on("child_added", value => {
        if (value.val()) {
          const tmp = {};
          tmp[value.key] = value.val();
          this.setState(preState => {
            return {
              recentChats: [...preState.recentChats, tmp]
            };
          });
        }

        console.log(`ok recent ${JSON.stringify(this.state.recentChats)}`);
      });
  }
  render() {
    const { userStore, chatStore, navigation } = this.props;
    return (
      <Container>
        <DrawerHeader
          parent={this}
          title="Recent Chats"
          nameIcon="user-friends"
          typeIcon="FontAwesome5"
        />
        <Content>
          <List>
            {this.state.recentChats.map(item => {
              let userInfo = null;
              let arr = Object.values(Object.values(item)[0]);
              userStore.listUser.map(user => {
                if (user.id === Object.keys(item)[0]) userInfo = user;
              });
              if (userInfo)
                return (
                  <ListItem
                    thumbnail
                    onPress={() => {
                      chatStore.setValue(userStore.id, userInfo.id);
                      navigation.navigate("Chat");
                    }}
                  >
                    <Left>
                      <Thumbnail source={require("../../../icons/2.jpg")} />
                    </Left>
                    <Body>
                      <Text>{userInfo.profiles.fullName}</Text>
                      <Text note numberOfLines={1}>
                        {arr[arr.length - 1]["content"] || ""}
                      </Text>
                    </Body>
                    <Right style={{ paddingRight: 0, paddingTop: 0 }}>
                      <Button transparent>
                        <Text style={styles.textNote} uppercase={false}>
                          1h
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
    fontSize: 10,
    color: "gray"
  }
});

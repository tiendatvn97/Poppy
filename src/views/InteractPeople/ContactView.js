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
import Firebase from "../../firebase/Firebase";
import DrawerHeader from "../header/DrawerHeader";
import { StyleSheet, Alert } from "react-native";

import { observer, inject } from "mobx-react";

@inject("userStore", "navigationStore", "chatStore")
@observer
export default class ContactView extends Component {
  static navigationOptions = {
    drawerLabel: "Contact",
    drawerIcon: ({ tintColor }) => (
      <Icon name="rocketchat" type="FontAwesome5" style={{ fontSize: 20 }} />
    )
  };

  state = {
    contactList: []
  };

  async componentWillMount() {
    this.props.navigationStore.currentNavigation = this.props.navigation;
    await Firebase.database.ref("users").on("child_added", value => {
      if (value.val())
        this.setState(preState => {
          return {
            contactList: [...preState.contactList, value.val()]
          };
        });
    });
  }
  render() {
    const { userStore, chatStore, navigation } = this.props;
    return (
      <Container>
        <DrawerHeader
          parent={this}
          title="Contact"
          nameIcon="user-friends"
          typeIcon="FontAwesome5"
        />
        <Content>
          <List>
            {this.state.contactList.map(item => (
              <ListItem
                thumbnail
                noBorder
                onPress={() => {
                  chatStore.setValue(userStore.id, item.id);
                  navigation.navigate("Chat");
                }}
              >
                <Left>
                  <Thumbnail
                    source={require("../../../src/icons/3.jpg")}
                    small
                  />
                </Left>
                <Body>
                  <Text>{item.profiles.fullName}</Text>
                </Body>
              </ListItem>
            ))}
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

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

import DrawerHeader from "../header/DrawerHeader";
import { StyleSheet, Alert } from "react-native";

import { observer, inject } from "mobx-react";

const data = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    image: require("../../../src/icons/1.jpg")
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    image: require("../../../src/icons/2.jpg")
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    image: require("../../../src/icons/3.jpg")
  }
];
@inject("userStore", "navigationStore", "chatStore")
@observer
export default class ContactView extends Component {
  static navigationOptions = {
    drawerLabel: "Contact",
    drawerIcon: ({ tintColor }) => (
      <Icon name="rocketchat" type="FontAwesome5" style={{ fontSize: 20 }} />
    )
  };

  componentWillMount() {
    this.props.navigationStore.currentNavigation = this.props.navigation;
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
          {/* <List>
            {userStore.listUser.map(item => {
              <ListItem
                thumbnail
                onPress={() => {
                  chatStore.setValue(userStore.id, item.id);
                  navigation.navigate("Chat");
                }}
              >
                <Left>
                  <Thumbnail source={require("../../../src/icons/2.jpg")} />
                </Left>
                <Body>
                  <Text>{item.profiles.fullName}</Text>
                </Body>
              </ListItem>;
            })}
          </List> */}

          <List>
            {userStore.listUser.map(item => (
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

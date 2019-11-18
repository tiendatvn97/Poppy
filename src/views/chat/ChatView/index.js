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

import DrawerHeader from "../../header/DrawerHeader"
import { StyleSheet, Alert } from "react-native";
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
export default class ChatView extends Component {
  static navigationOptions = {
    drawerLabel: "Chats",
    drawerIcon: ({ tintColor }) => (
      <Icon name="rocketchat" type="FontAwesome5" style={{ fontSize: 20 }} />
    )
  };
  render() {
    return (
      <Container>
        <DrawerHeader parent={this} title="Recent Chats" nameIcon="user-friends" typeIcon="FontAwesome5"/>
        <Content>
          <List>
            {data.map(item => (
              <ListItem thumbnail onPress={() => Alert.alert("ok")}>
                <Left>
                  <Thumbnail source={item.image} />
                </Left>
                <Body>
                  <Text>Sankhadeep</Text>
                  <Text note numberOfLines={1}>
                    Its time to build a difference blabla bla. .
                  </Text>
                </Body>
                <Right style={{ paddingRight: 0, paddingTop: 0 }}>
                  <Button transparent>
                    <Text style={styles.textNote} uppercase={false}>1h</Text>
                  </Button>
                </Right>
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

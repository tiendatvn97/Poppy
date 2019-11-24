import React, { Component } from "react";
import NewsFeedCardComponent from "./NewsFeedCardComponent";
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
  Input,
  View,
  Form,
  Item
} from "native-base";
import { observer, inject } from "mobx-react";
import DrawerHeader from "../../header/DrawerHeader";
import CameraModal from "../../modal/CameraModal";
import {StyleSheet} from "react-native"
@inject("createPostStore")
@observer
export default class NewsFeedView extends Component {
  state = {
    modalVisible: false
  };
  static navigationOptions = {
    drawerLabel: "Home",
    drawerIcon: () => (
      <Icon name="home" type="AntDesign" style={{ fontSize: 20 }} />
    )
  };
  componentWillMount() {
    // this.props.navigationStore.currentNavigation = this.props.navigation;
  }

  render() {
    const data = [
      {
        key: "1",
        profileImage: require("../../../icons/3.jpg")
      },
      {
        key: "2",
        profileImage: require("../../../icons/1.jpg")
      },
      {
        key: "3",
        profileImage: require("../../../icons/2.jpg")
      }
    ];
    return (
      <Container style={{ paddingBottom: 15 }}>
        <DrawerHeader
          parent={this}
          title="My Feed"
          nameIcon="search1"
          typeIcon="AntDesign"
        />
        <Content contentContainerStyle={{ paddingHorizontal: 15 }}>
          {data.map(item => (
            <NewsFeedCardComponent
              parent={this}
              key={item.key}
              profileImage={item.profileImage}
            />
          ))}
          <CameraModal modalVisible={this.state.modalVisible} parent={this} createPostStore={this.props.createPostStore} />
        </Content>
        <Button
          style={{
            width: 55,
            height: 55,
            alignSelf: "center",
            borderRadius: 27.5,
            position: "absolute",
            right: 10,
            bottom: 10,
            backgroundColor: "#ff6265"
          }}
          onPress={() => {
            this.setState({ modalVisible: true });
          }}
        >
          <Icon name="video-camera" type="Entypo"></Icon>
        </Button>
      </Container>
    );
  }
}
const styles = StyleSheet.create({});

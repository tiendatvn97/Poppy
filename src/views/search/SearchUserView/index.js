import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native";
import SearchInput, { createFilter } from "react-native-search-filter";
const KEYS_TO_FILTERS = ["profiles.fullName"];
import { observer, inject } from "mobx-react";
import {
  Container,
  Content,
  Button,
  Title,
  Icon,
  Header,
  Left,
  Body,
  Right,
  Input,
  Card,
  CardItem,
  Thumbnail
} from "native-base";
import { Constants } from "expo";
@inject("userStore")
@observer
export default class SearchUserView extends Component {
  state = {
    searchTerm: ""
  };
  searchUpdated(term) {
    this.setState({ searchTerm: term });
  }

  render() {
    const { userStore } = this.props;
    const filteredUsers = userStore.listUser.filter(
      createFilter(this.state.searchTerm, KEYS_TO_FILTERS)
    );
    return (
      <TouchableWithoutFeedback
        style={{ flex: 1 }}
        onPress={() => Keyboard.dismiss()}
      >
        <Container>
          <Header
            style={{
              marginTop: Constants.statusBarHeight,
              backgroundColor: "white"
            }}
          >
            <Left style={{ flex: 0.1 }}>
              <Icon
                name="ios-arrow-back"
                type="Ionicons"
                onPress={() => {
                  this.props.navigation.goBack();
                }}
              ></Icon>
            </Left>
            <Input
              style={{
                backgroundColor: "#f2f2f2",
                alignItems: "center",
                alignSelf: "center",
                flex: 1,
                height: 40,
                borderRadius: 15
              }}
              onChangeText={term => {
                this.searchUpdated(term);
              }}
              placeholder="search"
            />
            <Right style={{ flex: 0.1 }}>
              <Icon
                name="search1"
                type="AntDesign"
                style={{ color: "black", fontSize: 20 }}
                onPress={() => {
                  Keyboard.dismiss();
                }}
              ></Icon>
            </Right>
          </Header>

          {filteredUsers.map((userFound, index) => {
            userInfo = null;
            userFound && console.log("userFound: " + JSON.stringify(userFound));
            userInfo = userStore.listUser.find(
              user => user.id === userFound.id
            );
            userInfo && console.log("userInfo: " + JSON.stringify(userInfo));
            if (userInfo && index < 10) {
              return (
                <TouchableOpacity onPress={() => this.props.navigation.navigate("Profile")}>
                  <CardItem transparent style={{ paddingTop: 0 }}>
                    <Left
                      style={{
                        flex: 1,
                        alignItems: "center"
                      }}
                    >
                      <Thumbnail source={require("../../../icons/2.jpg")} />
                    </Left>
                    <Right
                      style={{
                        paddingRight: 0,
                        paddingTop: 0,
                        flex: 6,
                        alignItems: "flex-start"
                      }}
                    >
                      <Button transparent>
                        <Text
                          style={{ marginLeft: 15, fontSize: 14 }}
                          uppercase={false}
                        >
                          {userFound.profiles.fullName}
                        </Text>
                      </Button>
                    </Right>
                  </CardItem>
                </TouchableOpacity>
              );
            } else return null;
          })}
        </Container>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "flex-start"
  },
  emailItem: {
    borderBottomWidth: 0.5,
    borderColor: "rgba(0,0,0,0.3)",
    padding: 10
  },
  emailSubject: {
    color: "rgba(0,0,0,0.5)"
  },
  searchInput: {
    padding: 10,
    borderColor: "#CCC",
    borderWidth: 1
  },
  textNote: {
    fontSize: 10,
    color: "gray"
  }
});

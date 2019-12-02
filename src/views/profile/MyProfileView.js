import React, { Component } from "react";
import {
  Container,
  Header,
  Left,
  Body,
  Right,
  Button,
  Icon,
  Text,
  Content,
  View,
  Form,
  Item,
  Card,
  CardItem,
  Thumbnail,
  Footer,
  Input,
  Spinner
} from "native-base";
// import Icons from "react-native-vector-icons"
import {
  StyleSheet,
  Alert,
  Dimensions,
  KeyboardAvoidingView,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView
} from "react-native";

const widthScreen = Dimensions.get("window").width;
import DrawerHeader from "../header/DrawerHeader";
import StatusBarCustom from "../header/StatusBarCustom";
import { observer, inject } from "mobx-react";
import ChangeAvatarModal from "../modal/ChangeAvatarModal";
import Firebase from "../../firebase/Firebase";

@inject("userStore", "myProfileStore", "newsFeedStore", "postDetailStore")
@observer
export default class MyProfileView extends Component {
  state = {
    modalVisible: false,
    listPost: [],
    isLoading: true
  };
  static navigationOptions = {
    drawerLabel: "My Profile",
    drawerIcon: ({ tintColor }) => (
      <Icon name="profile" type="AntDesign" style={{ fontSize: 20 }} />
    )
  };
  componentDidMount() {
    this.props.myProfileStore.clearStore();
    setTimeout(() => {
      this.setState({ isLoading: false });
    }, 500);
    Firebase.database
      .ref("postGroup/postByUser")
      .child(this.props.userStore.id)
      .orderByChild("timeEdit")
      .on("child_added", snapshot => {
        if (snapshot.val()) {
          this.setState(preState => {
            return {
              listPost: [snapshot.val(), ...preState.listPost]
            };
          });
        }
      });
  }

  render() {
    const {
      userStore,
      myProfileStore,
      newsFeedStore,
      postDetailStore,
      navigation
    } = this.props;
    const { listPost, isLoading } = this.state;
    return (
      <Container>
        <StatusBarCustom />
        <DrawerHeader
          parent={this}
          title="My Profile"
          nameRightIcon="edit"
          typeRightIcon="Feather"
          nameLeftIcon="ios-menu"
          typeLeftIcon="Ionicons"
        />
        <Content>
          <Card style={{ elevation: 0 }}>
            <CardItem>
              <Left>
                <TouchableOpacity
                  style={{ borderRadius: 27 }}
                  onPress={() => {
                    this.setState({ modalVisible: true });
                  }}
                >
                  <Thumbnail source={{ uri: userStore.avatarImage }} />
                </TouchableOpacity>
                <Body>
                  <Text>{userStore.profile.fullName}</Text>
                  <Text style={styles.textNote}>{userStore.email}</Text>
                </Body>
              </Left>
            </CardItem>
          </Card>
          <Card style={styles.cardAbout}>
            <CardItem Body>
              <Body>
                <Text style={{ marginBottom: 10 }}>About</Text>
                <Text style={styles.textNote}>{userStore.profile.aboutMe}</Text>
              </Body>
            </CardItem>
          </Card>
          {isLoading && <Spinner size="large" color="#0000ff" />}
          {!isLoading && (
            <ScrollView>
              <Card style={styles.cardRate}>
                <CardItem>
                  <Body>
                    <Text style={{ marginVertical: 5 }}>Stars</Text>
                    <Item style={styles.itemRate}>
                      <Body style={styles.bodyRate}>
                        <Text style={styles.textRateNuber}>
                          {listPost.length}
                        </Text>
                        <Text style={styles.textNote}>MOMENTS</Text>
                      </Body>
                      <Body style={styles.bodyRate}>
                        <Text style={styles.textRateNuber}>
                          {userStore.follower.length - 1}
                        </Text>
                        <Text style={styles.textNote}>FOLLOWERS</Text>
                      </Body>
                      <Body style={[styles.bodyRate, { flex: 0.7 }]}>
                        <Text style={styles.textRateNuber}>
                          {userStore.following.length - 1}
                        </Text>
                        <Text style={styles.textNote}>FOLLOWING</Text>
                      </Body>
                    </Item>
                  </Body>
                </CardItem>
              </Card>
              <Text style={{ marginLeft: 17, marginTop: 17 }}>Moments</Text>
              <FlatList
                style={{ padding: 17 }}
                data={listPost}
                numColumns={3}
                keyExtractor={item => item.postId}
                ItemSeparatorComponent={() => (
                  <View style={{ height: 17, width: widthScreen }}></View>
                )}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => {
                      postDetailStore.postInfo = item;
                      navigation.navigate("PostDetail");
                    }}
                  >
                    <Image
                      style={styles.imageFlatList}
                      source={{ uri: item.image }}
                    />
                  </TouchableOpacity>
                )}
              />
            </ScrollView>
          )}
          <ChangeAvatarModal
            modalVisible={this.state.modalVisible}
            parent={this}
            myProfileStore={myProfileStore}
          />
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
        >
          <Icon name="video-camera" type="Entypo"></Icon>
        </Button>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    width: null,
    height: null,
    alignItems: "center",
    justifyContent: "center"
    // alignSelf:"center"
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff"
  },
  textNote: {
    fontSize: 10,
    color: "gray"
  },
  bodyRate: {
    flex: 1,
    alignItems: "flex-start",
    alignSelf: "flex-start"
  },
  textRateNuber: {
    color: "#ff6265"
  },
  imageFlatList: {
    borderRadius: 8,
    width: widthScreen / 3 - 17,
    height: widthScreen / 3 - 17,
    resizeMode: "cover"
  },
  itemRate: {
    borderBottomWidth: 0,
    flex: 1,
    flexDirection: "row",
    marginRight: 0,
    marginBottom: 0
  },
  cardRate: {
    marginTop: 0,
    marginBottom: 0,
    elevation: 1.5,
    marginHorizontal: 0
  },
  cardAbout: {
    marginHorizontal: 0,
    paddingVertical: 4,
    marginBottom: 0,
    borderColor: "#e6e6e6",
    shadowRadius: 0.2,
    elevation: 1.5
  }
});
